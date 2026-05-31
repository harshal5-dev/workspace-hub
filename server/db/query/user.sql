-- name: CreateUser :one
INSERT INTO users (first_name, last_name, user_name, email_id, hash_password, profile_picture_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
