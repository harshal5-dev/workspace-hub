package httptransport

import (
	"github.com/gin-gonic/gin"
	"github.com/harshal5-dev/workspace-hub/server/internal/middleware"
)

type RouteModule interface {
	RegisterPublicRoutes(*gin.RouterGroup)
	RegisterProtectedRoutes(*gin.RouterGroup)
}

func (server *Server) registerModules(api *gin.RouterGroup) {
	cfg := server.config
	public := api.Group("")
	protected := api.Group("")
	protected.Use(middleware.AuthMiddleware(cfg.CookieTokenName, cfg.JWTSecret))

	for _, module := range server.modules {
		module.RegisterPublicRoutes(public)
		module.RegisterProtectedRoutes(protected)
	}
}
