package auth

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

var requestValidator = validator.New()

func validateRegisterRequest(request RegisterRequest) error {
	return requestValidator.Struct(request)
}

func validateLoginRequest(request LoginRequest) error {
	return requestValidator.Struct(request)
}

func jsonFieldName(structField string) string {
	switch structField {
	case "FirstName":
		return "firstName"
	case "LastName":
		return "lastName"
	case "EmailId":
		return "emailId"
	case "Password":
		return "password"
	default:
		return structField
	}
}

func validationMessage(fieldErr validator.FieldError) string {
	switch fieldErr.Tag() {
	case "required":
		return "is required"
	case "email":
		return "must be a valid email address"
	case "min":
		return fmt.Sprintf("must be at least %s characters", fieldErr.Param())
	case "max":
		return fmt.Sprintf("must be at most %s characters", fieldErr.Param())
	case "omitempty":
		return "is invalid"
	default:
		return fmt.Sprintf("is invalid (%s)", fieldErr.Tag())
	}
}
