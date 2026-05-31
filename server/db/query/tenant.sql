-- name: CreateTenant :one
INSERT INTO tenants (name, description) VALUES ($1, $2) RETURNING *;

-- name: GetTenant :one
SELECT * FROM tenants WHERE id = $1 LIMIT 1;
