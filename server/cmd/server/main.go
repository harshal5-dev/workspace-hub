package main

import (
	"context"
	"log"
	"os"

	"github.com/harshal5-dev/workspace-hub/server/internal/app"
	"github.com/harshal5-dev/workspace-hub/server/internal/config"
	"github.com/harshal5-dev/workspace-hub/server/internal/db"
	"github.com/harshal5-dev/workspace-hub/server/internal/mail"
	httptransport "github.com/harshal5-dev/workspace-hub/server/internal/transport/http"
	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	env := os.Getenv("APP_ENV")
	cfg, err := config.LoafConfig(config.ConfigFilePath, env)
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	store, err := db.Init(cfg.DBSource)
	if err != nil {
		log.Fatal("cannot connect to database:", err)
	}
	defer store.Close()

	// mailPublisher, closeMail := setupMail(cfg)
	// defer closeMail()

	// container := app.NewContainer(cfg, store, mailPublisher)
	container := app.NewContainer(cfg, store)
	server := httptransport.NewServer(container)

	if err := server.Start(); err != nil {
		log.Fatal("server not started:", err)
	}
}

func setupMail(cfg config.Config) (mail.Publisher, func()) {
	if cfg.RabbitMQURL == "" {
		return nil, func() {}
	}

	conn, err := amqp.Dial(cfg.RabbitMQURL)
	if err != nil {
		log.Fatal("cannot connect to RabbitMQ:", err)
	}

	publisher, err := mail.NewRabbitMQPublisher(conn, cfg.RabbitMQMailQueue)
	if err != nil {
		_ = conn.Close()
		log.Fatal("cannot create RabbitMQ mail publisher:", err)
	}

	var consumer *mail.RabbitMQConsumer
	var cancelWorker context.CancelFunc = func() {}
	if cfg.RabbitMQMailWorkerEnabled {
		sender, err := mail.NewSMTPSender(mail.SMTPConfig{
			Host:     cfg.SMTPHost,
			Port:     cfg.SMTPPort,
			Username: cfg.SMTPUsername,
			Password: cfg.SMTPPassword,
			From:     cfg.SMTPFrom,
		})
		if err != nil {
			_ = publisher.Close()
			_ = conn.Close()
			log.Fatal("cannot create SMTP mail sender:", err)
		}

		consumer, err = mail.NewRabbitMQConsumer(conn, cfg.RabbitMQMailQueue, sender)
		if err != nil {
			_ = publisher.Close()
			_ = conn.Close()
			log.Fatal("cannot create RabbitMQ mail consumer:", err)
		}

		workerCtx, cancel := context.WithCancel(context.Background())
		cancelWorker = cancel
		go func() {
			log.Println("RabbitMQ mail worker started")
			if err := consumer.Start(workerCtx); err != nil {
				log.Printf("RabbitMQ mail worker stopped: %v", err)
			}
		}()
	}

	closeMail := func() {
		cancelWorker()
		if consumer != nil {
			_ = consumer.Close()
		}
		_ = publisher.Close()
		_ = conn.Close()
	}

	return publisher, closeMail
}
