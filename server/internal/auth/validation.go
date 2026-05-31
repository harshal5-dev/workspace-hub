package auth

import (
	"errors"
	"fmt"

	"github.com/go-playground/validator/v10"
)

var requestValidator = validator.New()

func validateRegisterRequest(request RegisterRequest) error {
	return requestValidator.Struct(request)
}

func buildValidationErrorDetails(err error) map[string]string {
	var validationErr validator.ValidationErrors
	if !errors.As(err, &validationErr) {
		return map[string]string{"body": err.Error()}
	}

	details := make(map[string]string, len(validationErr))
	for _, fieldErr := range validationErr {
		field := jsonFieldName(fieldErr.Field())
		details[field] = validationMessage(fieldErr)
	}

	return details
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
