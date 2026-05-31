package auth

import (
	"strings"
)

type RegisterRequest struct {
	FirstName string  `json:"firstName" binding:"required,min=2,max=150"`
	LastName  *string `json:"lastName" binding:"omitempty,min=1,max=150"`
	EmailId   string  `json:"emailId" binding:"required,email,max=500"`
	Password  string  `json:"password" binding:"required,min=8,max=72"`
}

func (request *RegisterRequest) Normalize() {
	request.FirstName = strings.TrimSpace(request.FirstName)
	request.EmailId = strings.ToLower(strings.TrimSpace(request.EmailId))

	if request.LastName == nil {
		return
	}

	trimmedLastName := strings.TrimSpace(*request.LastName)
	if trimmedLastName == "" {
		request.LastName = nil
		return
	}

	request.LastName = &trimmedLastName
}

type RegisterResponse struct {
	TenantId   string `json:"tenantId"`
	TenantName string `json:"tenantName"`
	FirstName  string `json:"firstName"`
	LastName   string `json:"lastName"`
	Email      string `json:"email"`
	UserId     string `json:"userId"`
}
