package httptransport

import (
	"github.com/gin-gonic/gin"
	"github.com/harshal5-dev/workspace-hub/server/internal/auth"
)

type authModule struct {
	handler *auth.Handler
}

func newAuthModule(handler *auth.Handler) RouteModule {
	return &authModule{handler: handler}
}

func (module *authModule) RegisterPublicRoutes(public *gin.RouterGroup) {
	authGroup := public.Group("/auth")
	authGroup.POST("/register", module.handler.RegisterUser)
}

func (module *authModule) RegisterProtectedRoutes(_ *gin.RouterGroup) {
	// add protected auth routes here when needed
}
