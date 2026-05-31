package httptransport

import "github.com/gin-gonic/gin"

type RouteModule interface {
	RegisterPublicRoutes(*gin.RouterGroup)
	RegisterProtectedRoutes(*gin.RouterGroup)
}

func (server *Server) registerModules(api *gin.RouterGroup) {
	public := api.Group("")
	protected := api.Group("")

	for _, module := range server.modules {
		module.RegisterPublicRoutes(public)
		module.RegisterProtectedRoutes(protected)
	}
}
