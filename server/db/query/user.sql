-- name: CreateUser :one
INSERT INTO users (first_name, last_name, email_id, hash_password, profile_picture_url) VALUES ($1, $2, $3, $4, $5) RETURNING *;

-- name: CheckUserExistsByEmailId :one
SELECT EXISTS (
  SELECT 1
  FROM users
  WHERE email_id = $1
);
