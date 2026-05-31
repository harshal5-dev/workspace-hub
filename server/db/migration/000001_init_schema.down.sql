DROP TABLE IF EXISTS "sessions";
DROP TABLE IF EXISTS "reset_password";
DROP TABLE IF EXISTS "role_permissions";
DROP TABLE IF EXISTS "permissions";
DROP TABLE IF EXISTS "tenant_users";
DROP TABLE IF EXISTS "roles";
DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "tenants";

DROP TYPE IF EXISTS "role_status";
DROP TYPE IF EXISTS "role_scope";
DROP TYPE IF EXISTS "tenant_user_status";
DROP TYPE IF EXISTS "user_status";
DROP TYPE IF EXISTS "tenant_status";

DROP EXTENSION IF EXISTS pgcrypto;
