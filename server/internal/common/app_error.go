package common

type AppError struct {
	Err            error
	HttpStatusCode int
}

func NewAppError(err error, httpStatusCode int) *AppError {
	return &AppError{
		Err:            err,
		HttpStatusCode: httpStatusCode,
	}
}
