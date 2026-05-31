CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE "tenant_status" AS ENUM (
  'ACTIVE',
  'IN_ACTIVE',
  'DELETED'
);

CREATE TYPE "user_status" AS ENUM (
  'INVITED',
  'ACTIVE',
  'DISABLED',
  'SUSPENDED',
  'DELETED'
);

CREATE TYPE "tenant_user_status" AS ENUM (
  'ACTIVE',
  'INVITED',
  'IN_ACTIVE',
  'REMOVED'
);

CREATE TYPE "role_scope" AS ENUM (
  'SYSTEM',
  'TENANT'
);

CREATE TYPE "role_status" AS ENUM (
  'ACTIVE',
  'IN_ACTIVE'
);

CREATE TABLE "tenants" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar(200) NOT NULL,
  "description" varchar(500),
  "isActive" bool NOT NULL DEFAULT false,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now()),
  "status" "tenant_status" NOT NULL DEFAULT ('ACTIVE')
);

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "first_name" varchar(150) NOT NULL,
  "last_name" varchar(150),
  "email_id" varchar(500) UNIQUE NOT NULL,
  "hash_password" varchar(500) NOT NULL,
  "profile_picture_url" varchar(2000),
  "status" "user_status" NOT NULL DEFAULT ('INVITED'),
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "tenant_users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid,
  "tenant_id" uuid,
  "role_id" uuid,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now()),
  "status" "tenant_user_status" NOT NULL DEFAULT ('ACTIVE')
);

CREATE TABLE "roles" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar(100) NOT NULL,
  "code" varchar(100) NOT NULL UNIQUE,
  "description" varchar(500),
  "scope" "role_scope" DEFAULT ('TENANT'),
  "status" "role_status" NOT NULL DEFAULT ('ACTIVE'),
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "permissions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar(100) NOT NULL,
  "description" varchar(500),
  "code" varchar(100) NOT NULL UNIQUE,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "role_permissions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "role_id" uuid NOT NULL,
  "permission_id" uuid NOT NULL
);


CREATE TABLE "reset_password" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "otp" varchar(10) NOT NULL,
  "expires_at" timestamp NOT NULL,
  "user_id" uuid NOT NULL,
  "used_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid,
  "refresh_token" varchar(2000) UNIQUE NOT NULL,
  "user_agent" varchar(2500),
  "ip_address" varchar(20),
  "is_revoked" bool NOT NULL DEFAULT false,
  "expires_at" timestamp NOT NULL DEFAULT (now()),
  "revoked_at" timestamp NOT NULL DEFAULT (now()),
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE INDEX ON "users" ("email_id");

CREATE UNIQUE INDEX ON "tenant_users" ("user_id", "tenant_id");

CREATE UNIQUE INDEX ON "role_permissions" ("role_id", "permission_id");

ALTER TABLE "tenant_users" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "tenant_users" ADD FOREIGN KEY ("tenant_id") REFERENCES "tenants" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "tenant_users" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "role_permissions" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "role_permissions" ADD FOREIGN KEY ("permission_id") REFERENCES "permissions" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "reset_password" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "sessions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;
