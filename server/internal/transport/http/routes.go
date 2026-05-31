package httptransport

import "github.com/gin-gonic/gin"

func (server *Server) setupRoutes(router *gin.Engine) {
	api := router.Group("/api/v1")
	server.registerModules(api)
}
