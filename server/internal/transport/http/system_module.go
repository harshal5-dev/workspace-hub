package httptransport

import "github.com/gin-gonic/gin"

type systemModule struct {
	healthHandler gin.HandlerFunc
}

func newSystemModule(healthHandler gin.HandlerFunc) RouteModule {
	return &systemModule{healthHandler: healthHandler}
}

func (module *systemModule) RegisterPublicRoutes(public *gin.RouterGroup) {
	public.GET("/health", module.healthHandler)
}

func (module *systemModule) RegisterProtectedRoutes(_ *gin.RouterGroup) {
	// add protected system routes here when needed
}
