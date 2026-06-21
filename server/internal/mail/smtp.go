package mail

import (
	"context"
	"errors"
	"fmt"
	"net"
	"net/smtp"
	"strconv"
	"strings"
)

type SMTPConfig struct {
	Host     string
	Port     int
	Username string
	Password string
	From     string
}

type SMTPSender struct {
	host     string
	port     int
	username string
	password string
	from     string
}

func NewSMTPSender(cfg SMTPConfig) (*SMTPSender, error) {
	if cfg.Host == "" {
		return nil, errors.New("smtp host is required")
	}
	if cfg.From == "" {
		return nil, errors.New("smtp from address is required")
	}
	if cfg.Port == 0 {
		cfg.Port = 587
	}

	return &SMTPSender{
		host:     cfg.Host,
		port:     cfg.Port,
		username: cfg.Username,
		password: cfg.Password,
		from:     cfg.From,
	}, nil
}

func (sender *SMTPSender) Send(ctx context.Context, message Message) error {
	if message.To == "" {
		return errors.New("mail recipient is required")
	}
	if message.Subject == "" {
		return errors.New("mail subject is required")
	}

	addr := net.JoinHostPort(sender.host, strconv.Itoa(sender.port))
	auth := smtp.Auth(nil)
	if sender.username != "" || sender.password != "" {
		auth = smtp.PlainAuth("", sender.username, sender.password, sender.host)
	}

	payload := buildPayload(sender.from, message)
	errCh := make(chan error, 1)
	go func() {
		errCh <- smtp.SendMail(addr, auth, sender.from, []string{message.To}, []byte(payload))
	}()

	select {
	case <-ctx.Done():
		return ctx.Err()
	case err := <-errCh:
		if err != nil {
			return fmt.Errorf("send smtp mail: %w", err)
		}
		return nil
	}
}

func buildPayload(from string, message Message) string {
	headers := []string{
		"From: " + from,
		"To: " + message.To,
		"Subject: " + message.Subject,
		"MIME-Version: 1.0",
		"Content-Type: text/plain; charset=\"UTF-8\"",
	}

	var builder strings.Builder
	for _, header := range headers {
		builder.WriteString(header)
		builder.WriteString("\r\n")
	}
	builder.WriteString("\r\n")
	builder.WriteString(message.Body)

	return builder.String()
}
