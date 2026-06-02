package util

import (
	"github.com/gin-gonic/gin"
)

type CookieConfig struct {
	CookieSecure    bool
	CookieDomain    string
	CookieTokenName string
	CookieTokenAge  int
	CookieSamesite  string
	CookieHttpOnly  bool
}

func SetAuthCookie(ctx *gin.Context, token string, cfg CookieConfig) {
	ctx.SetCookie(
		cfg.CookieTokenName,
		token,
		cfg.CookieTokenAge*60,
		"/",
		cfg.CookieDomain,
		cfg.CookieSecure, // Secure: set to true in production if using HTTPS
		cfg.CookieHttpOnly,
	)
}

func ClearAuthCookie(ctx *gin.Context, cfg CookieConfig) {
	ctx.SetCookie(
		cfg.CookieTokenName,
		"",
		-1,
		"/",
		"",
		cfg.CookieSecure, // Secure: set to true in production if using HTTPS
		cfg.CookieHttpOnly,
	)
}
