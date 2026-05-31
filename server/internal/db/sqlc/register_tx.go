package db

import (
	"context"
	"fmt"

	"github.com/harshal5-dev/workspace-hub/server/internal/util"
)

type RegisterUserTxParams struct {
	FirstName      string
	LastName       string
	EmailId        string
	HashedPassword string
}

type RegisterUserTxResult struct {
	User       User
	Tenant     Tenant
	TenantUser TenantUser
}

const (
	OwnerRoleCode = "OWNER"
)

func (store *SQLStore) RegisterUserTx(ctx context.Context, arg RegisterUserTxParams) (RegisterUserTxResult, error) {
	var result RegisterUserTxResult

	err := store.execTx(ctx, func(q *Queries) error {
		var err error

		result.User, err = q.CreateUser(ctx, CreateUserParams{
			FirstName:         arg.FirstName,
			LastName:          util.ToPgText(arg.LastName),
			EmailID:           arg.EmailId,
			HashPassword:      arg.HashedPassword,
			ProfilePictureUrl: util.ToPgText(""),
		})
		if err != nil {
			return err
		}

		workspaceName := fmt.Sprintf("%s's Workspace", arg.FirstName)

		result.Tenant, err = q.CreateTenant(ctx, CreateTenantParams{
			Name:        workspaceName,
			Description: util.ToPgText(""),
		})
		if err != nil {
			return err
		}

		role, err := q.GetRoleByCode(ctx, OwnerRoleCode)
		if err != nil {
			return err
		}

		result.TenantUser, err = q.CreateTenantUser(ctx, CreateTenantUserParams{
			UserID:   result.User.ID,
			TenantID: result.Tenant.ID,
			RoleID:   role.ID,
		})
		if err != nil {
			return err
		}

		return nil
	})

	return result, err
}
