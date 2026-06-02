package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/harshal5-dev/workspace-hub/server/internal/util"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
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

	ctx.JSON(http.StatusOK, loginResponse)
}
