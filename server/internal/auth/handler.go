package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

func (handler *Handler) RegisterUser(c *gin.Context) {
	var payload RegisterRequest
	if err := c.ShouldBindJSON(&payload); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	registerUserResponse, appErr := handler.service.RegisterUser(c.Request.Context(), payload)
	if appErr != nil {

		c.JSON(appErr.HttpStatusCode, gin.H{"error": appErr.Err.Error()})
		return
	}
	c.JSON(http.StatusCreated, registerUserResponse)
}
