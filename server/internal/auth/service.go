package auth

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	"github.com/jackc/pgx/v5"

	"github.com/harshal5-dev/workspace-hub/server/internal/common"
	db "github.com/harshal5-dev/workspace-hub/server/internal/db/sqlc"
	"github.com/harshal5-dev/workspace-hub/server/internal/util"
)

type Service struct {
	store db.Store
}

func NewService(store db.Store) *Service {
	return &Service{
		store: store,
	}
}

func (service *Service) RegisterUser(ctx context.Context, payload RegisterRequest) (RegisterResponse, *common.AppError) {
	errMessage := "Unable to register user. Please try again later."
	isExists, err := service.store.CheckUserExistsByEmailId(ctx, payload.EmailId)

	if err != nil {
		return RegisterResponse{}, common.NewAppError(errors.New(errMessage), http.StatusInternalServerError)
	}

	if isExists {
		errMessage := fmt.Sprintf("User already exists with %s email id. ", payload.EmailId)
		return RegisterResponse{}, common.NewAppError(errors.New(errMessage), http.StatusConflict)
	}

	hashPassword, err := util.HashPassword(payload.Password)
	if err != nil {
		return RegisterResponse{}, common.NewAppError(errors.New(errMessage), http.StatusInternalServerError)
	}

	result, err := service.store.RegisterUserTx(ctx, db.RegisterUserTxParams{
		FirstName:      payload.FirstName,
		LastName:       payload.GetLastName(),
		EmailId:        payload.EmailId,
		HashedPassword: hashPassword,
	})

	if err != nil {
		return RegisterResponse{}, common.NewAppError(errors.New(errMessage), http.StatusInternalServerError)
	}

	return RegisterResponse{
		TenantId:   util.PgUUIDToString(result.Tenant.ID),
		TenantName: result.Tenant.Name,
		FirstName:  result.User.FirstName,
		LastName:   util.PgTextToString(result.User.LastName),
		Email:      result.User.EmailID,
		UserId:     util.PgUUIDToString(result.User.ID),
	}, nil
}

func (service *Service) Login(ctx context.Context, payload LoginRequest) (LoginResponse, *common.AppError) {
	fetchUser, err := service.store.GetUserByEmailId(ctx, payload.EmailId)
	errMessage := "Invalid emailId or password"

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return LoginResponse{}, common.NewAppError(errors.New(errMessage), http.StatusBadRequest)
		}

		errMessage = "Unable to login. Please try again later."
		return LoginResponse{}, common.NewAppError(errors.New(errMessage), http.StatusBadRequest)
	}

	if err := util.CheckPassword(fetchUser.HashPassword, payload.Password); err != nil {
		return LoginResponse{}, common.NewAppError(errors.New(errMessage), http.StatusBadRequest)
	}

	return LoginResponse{
		FirstName: fetchUser.FirstName,
		LastName:  fetchUser.LastName.String,
		Email:     fetchUser.EmailID,
	}, nil
}
