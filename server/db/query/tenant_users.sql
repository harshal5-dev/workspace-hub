-- name: CreateTenantUser :one
INSERT INTO tenant_users (
  user_id,
  tenant_id,
  role_id
) VALUES (
  $1,
  $2,
  $3
) RETURNING *;
