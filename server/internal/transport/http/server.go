package httptransport

import (
	"github.com/gin-gonic/gin"
	"github.com/harshal5-dev/workspace-hub/server/internal/app"
	"github.com/harshal5-dev/workspace-hub/server/internal/config"
)

type Server struct {
	config    config.Config
	container *app.Container
	router    *gin.Engine
	modules   []RouteModule
}

func NewServer(container *app.Container) *Server {
	server := &Server{
		config:    container.Config,
		container: container,
	}

	server.configureModules()

	router := gin.Default()
	server.setupRoutes(router)

	server.router = router
	return server
}

func (server *Server) Start() error {
	return server.router.Run(server.config.ServerAddress)
}

func (server *Server) configureModules() {
	server.modules = []RouteModule{
		newSystemModule(server.healthCheck),
		newAuthModule(server.container.Handlers.Auth),
	}
}
