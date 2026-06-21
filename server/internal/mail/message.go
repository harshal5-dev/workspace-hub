package mail

import "context"

const DefaultQueueName = "mail.jobs"

type Message struct {
	To      string `json:"to"`
	Subject string `json:"subject"`
	Body    string `json:"body"`
}

type Publisher interface {
	Publish(ctx context.Context, message Message) error
}

type Sender interface {
	Send(ctx context.Context, message Message) error
}
