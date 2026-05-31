package app

import (
	"github.com/harshal5-dev/workspace-hub/server/internal/auth"
	"github.com/harshal5-dev/workspace-hub/server/internal/config"
	db "github.com/harshal5-dev/workspace-hub/server/internal/db/sqlc"
)

type Services struct {
	Auth *auth.Service
}

type Handlers struct {
	Auth *auth.Handler
}

type Container struct {
	Config   config.Config
	Store    db.Store
	Services Services
	Handlers Handlers
}

func NewContainer(config config.Config, store db.Store) *Container {
	container := &Container{
		Config: config,
		Store:  store,
	}

	container.Services = Services{
		Auth: auth.NewService(container.Store),
	}

	container.Handlers = Handlers{
		Auth: auth.NewHandler(container.Services.Auth),
	}

	return container
}
