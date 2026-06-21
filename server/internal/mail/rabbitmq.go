package mail

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"sync"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

const (
	retryHeader        = "x-mail-attempts"
	maxDeliveryAttempt = 3
)

type RabbitMQPublisher struct {
	channel   *amqp.Channel
	queue     string
	publishMu sync.Mutex
}

func NewRabbitMQPublisher(conn *amqp.Connection, queueName string) (*RabbitMQPublisher, error) {
	channel, err := conn.Channel()
	if err != nil {
		return nil, fmt.Errorf("open RabbitMQ channel: %w", err)
	}

	queueName = normalizeQueueName(queueName)
	if err := declareMailQueue(channel, queueName); err != nil {
		_ = channel.Close()
		return nil, err
	}

	return &RabbitMQPublisher{channel: channel, queue: queueName}, nil
}

func (publisher *RabbitMQPublisher) Publish(ctx context.Context, message Message) error {
	body, err := json.Marshal(message)
	if err != nil {
		return fmt.Errorf("marshal mail message: %w", err)
	}

	publisher.publishMu.Lock()
	defer publisher.publishMu.Unlock()

	return publisher.channel.PublishWithContext(
		ctx,
		"",
		publisher.queue,
		false,
		false,
		amqp.Publishing{
			ContentType:  "application/json",
			DeliveryMode: amqp.Persistent,
			Timestamp:    time.Now(),
			Body:         body,
		},
	)
}

func (publisher *RabbitMQPublisher) Close() error {
	return publisher.channel.Close()
}

type RabbitMQConsumer struct {
	channel *amqp.Channel
	queue   string
	sender  Sender
}

func NewRabbitMQConsumer(conn *amqp.Connection, queueName string, sender Sender) (*RabbitMQConsumer, error) {
	if sender == nil {
		return nil, errors.New("mail sender is required")
	}

	channel, err := conn.Channel()
	if err != nil {
		return nil, fmt.Errorf("open RabbitMQ channel: %w", err)
	}

	queueName = normalizeQueueName(queueName)
	if err := declareMailQueue(channel, queueName); err != nil {
		_ = channel.Close()
		return nil, err
	}

	if err := channel.Qos(1, 0, false); err != nil {
		_ = channel.Close()
		return nil, fmt.Errorf("configure RabbitMQ qos: %w", err)
	}

	return &RabbitMQConsumer{
		channel: channel,
		queue:   queueName,
		sender:  sender,
	}, nil
}

func (consumer *RabbitMQConsumer) Start(ctx context.Context) error {
	deliveries, err := consumer.channel.Consume(
		consumer.queue,
		"",
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return fmt.Errorf("consume RabbitMQ mail queue: %w", err)
	}

	for {
		select {
		case <-ctx.Done():
			return nil
		case delivery, ok := <-deliveries:
			if !ok {
				return nil
			}
			consumer.handleDelivery(ctx, delivery)
		}
	}
}

func (consumer *RabbitMQConsumer) Close() error {
	return consumer.channel.Close()
}

func (consumer *RabbitMQConsumer) handleDelivery(ctx context.Context, delivery amqp.Delivery) {
	var message Message
	if err := json.Unmarshal(delivery.Body, &message); err != nil {
		log.Printf("discarding invalid mail job: %v", err)
		_ = delivery.Nack(false, false)
		return
	}

	sendCtx, cancel := context.WithTimeout(ctx, 30*time.Second)
	err := consumer.sender.Send(sendCtx, message)
	cancel()

	if err != nil {
		consumer.retryDelivery(ctx, delivery, err)
		return
	}

	if err := delivery.Ack(false); err != nil {
		log.Printf("failed to ack mail job: %v", err)
	}
}

func (consumer *RabbitMQConsumer) retryDelivery(ctx context.Context, delivery amqp.Delivery, sendErr error) {
	nextAttempt := deliveryAttempts(delivery.Headers) + 1
	if nextAttempt >= maxDeliveryAttempt {
		log.Printf("discarding mail job after %d attempts: %v", nextAttempt, sendErr)
		_ = delivery.Nack(false, false)
		return
	}

	headers := amqp.Table{retryHeader: nextAttempt}
	for key, value := range delivery.Headers {
		if key != retryHeader {
			headers[key] = value
		}
	}

	err := consumer.channel.PublishWithContext(
		ctx,
		"",
		consumer.queue,
		false,
		false,
		amqp.Publishing{
			ContentType:  "application/json",
			DeliveryMode: amqp.Persistent,
			Timestamp:    time.Now(),
			Headers:      headers,
			Body:         delivery.Body,
		},
	)
	if err != nil {
		log.Printf("failed to republish mail job: %v", err)
		_ = delivery.Nack(false, true)
		return
	}

	log.Printf("mail job failed, retrying attempt %d/%d: %v", nextAttempt+1, maxDeliveryAttempt, sendErr)
	_ = delivery.Ack(false)
}

func deliveryAttempts(headers amqp.Table) int {
	switch value := headers[retryHeader].(type) {
	case int:
		return value
	case int32:
		return int(value)
	case int64:
		return int(value)
	case uint8:
		return int(value)
	default:
		return 0
	}
}

func normalizeQueueName(queueName string) string {
	if queueName == "" {
		return DefaultQueueName
	}
	return queueName
}

func declareMailQueue(channel *amqp.Channel, queueName string) error {
	_, err := channel.QueueDeclare(
		queueName,
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return fmt.Errorf("declare RabbitMQ mail queue: %w", err)
	}
	return nil
}
