-- name: GetRoleByCode :one
SELECT * FROM roles WHERE code = $1 LIMIT 1;
