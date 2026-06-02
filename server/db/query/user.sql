-- name: CreateUser :one
INSERT INTO users (first_name, last_name, email_id, hash_password, profile_picture_url) VALUES ($1, $2, $3, $4, $5) RETURNING *;

-- name: CheckUserExistsByEmailId :one
SELECT EXISTS (
  SELECT 1
  FROM users
  WHERE email_id = $1
);


-- name: GetUserByEmailId :one
SELECT * FROM users WHERE email_id = $1 LIMIT 1;

-- name: GetUserById :one
SELECT * FROM users WHERE id = $1 LIMIT 1;
