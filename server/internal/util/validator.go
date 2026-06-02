package util

import (
	"errors"

	"github.com/go-playground/validator/v10"
)

type fieldNameFunc func(string) string
type validationMsgFunc func(validator.FieldError) string

func BuildValidationErrorDetails(err error, jsonFieldName fieldNameFunc, validationMessage validationMsgFunc) map[string]string {
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
