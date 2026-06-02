package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/harshal5-dev/workspace-hub/server/internal/util"
)

func AuthMiddleware(cookieTokenName, jwtSecret string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		tokenString, err := ctx.Cookie(cookieTokenName)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized - no token provided"})
			return
		}

		claims, err := util.VerifyToken(tokenString, jwtSecret)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized - invalid or expired token"})
			return
		}

		ctx.Set("userId", claims.UserId)

		ctx.Next()
	}
}
