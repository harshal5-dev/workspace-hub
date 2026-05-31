-- name: CreateTenant :one
INSERT INTO tenants (name, description) VALUES ($1, $2) RETURNING *;
