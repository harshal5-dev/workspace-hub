package auth

type RegisterRequest struct {
	FirstName string  `json:"firstName" binding:"required"`
	LastName  *string `json:"lastName"`
	EmailId   string  `json:"emailId" binding:"required,email"`
	Password  string  `json:"password" binding:"required"`
}

type RegisterResponse struct {
	TenantId   string `json:"tenantId"`
	TenantName string `json:"tenantName"`
	FirstName  string `json:"firstName"`
	LastName   string `json:"lastName"`
	Email      string `json:"email"`
	UserId     string `json:"userId"`
}
