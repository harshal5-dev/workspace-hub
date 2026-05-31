package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/harshal5-dev/workspace-hub/server/internal/config"
	db "github.com/harshal5-dev/workspace-hub/server/internal/db/sqlc"
)

type Server struct {
	config config.Config
	store  db.Store
	router *gin.Engine
}

func NewServer(config config.Config, store db.Store) *Server {
	server := &Server{
		config: config,
		store:  store,
	}
	router := gin.Default()

	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "api is ok",
		})
	})

	server.router = router
	return server
}

func (server *Server) Start() error {
	return server.router.Run(server.config.ServerAddress)
}
