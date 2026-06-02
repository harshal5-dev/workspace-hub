package auth

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/harshal5-dev/workspace-hub/server/internal/config"
	"github.com/harshal5-dev/workspace-hub/server/internal/util"
)

type Handler struct {
	service *Service
	config  config.Config
}

func NewHandler(service *Service, cfg config.Config) *Handler {
	return &Handler{service: service, config: cfg}
}

func (handler *Handler) RegisterUser(ctx *gin.Context) {
	var payload RegisterRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error":   "invalid request body",
			"details": util.BuildValidationErrorDetails(err, jsonFieldName, validationMessage),
		})
		return
	}

	payload.Normalize()

	if err := validateRegisterRequest(payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error":   "invalid request body",
			"details": util.BuildValidationErrorDetails(err, jsonFieldName, validationMessage),
		})
		return
	}

	registerUserResponse, appErr := handler.service.RegisterUser(ctx.Request.Context(), payload)
	if appErr != nil {
		ctx.JSON(appErr.HttpStatusCode, gin.H{"error": appErr.Err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, registerUserResponse)
}

func (handler *Handler) LoginUser(ctx *gin.Context) {
	var payload LoginRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error":   "invalid request body",
			"details": util.BuildValidationErrorDetails(err, jsonFieldName, validationMessage),
		})
		return
	}

	payload.Normalize()

	if err := validateLoginRequest(payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error":   "invalid request body",
			"details": util.BuildValidationErrorDetails(err, jsonFieldName, validationMessage),
		})
		return
	}

	loginResponse, appErr := handler.service.Login(ctx, payload)
	if appErr != nil {
		ctx.JSON(appErr.HttpStatusCode, gin.H{"error": appErr.Err.Error()})
		return
	}

	cookieConfig := util.CookieConfig{
		CookieSecure:    handler.config.CookieSecure,
		CookieTokenName: handler.config.CookieTokenName,
		CookieTokenAge:  handler.service.config.CookieTokenAge,
		CookieSamesite:  handler.config.CookieSamesite,
		CookieDomain:    handler.config.CookieDomain,
		CookieHttpOnly:  handler.config.CookieHttpOnly,
	}
	log.Println(loginResponse.Token)
	util.SetAuthCookie(ctx, loginResponse.Token, cookieConfig)

	ctx.JSON(http.StatusOK, loginResponse)
}

func (handler *Handler) GetCurrentUser(ctx *gin.Context) {
	rawUserID, exists := ctx.Get("userId")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized user"})
		return
	}

	userId, ok := rawUserID.(string)
	if !ok {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error: unexpected user ID type"})
		return
	}

	userResponse, appErr := handler.service.GetCurrentUser(ctx, userId)
	if appErr != nil {
		ctx.JSON(appErr.HttpStatusCode, gin.H{"error": appErr.Err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, userResponse)
}
