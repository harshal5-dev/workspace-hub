postgres:
	docker run --name postgres18 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=12345 -d postgres:18-alpine

create-db:
	docker exec -it postgres18 createdb --username=root --owner=root workspace_hub_db

drop-db:
	docker exec -it postgres18 dropdb workspace_hub_db

migrate-up:
	migrate -path migrations -database "postgres://root:12345@localhost:5432/workspace_hub_db?sslmode=disable" -verbose up

migrate-down:
	migrate -path migrations -database "postgres://root:12345@localhost:5432/workspace_hub_db?sslmode=disable" -verbose down

sqlc:
	sqlc generate

server-dev:
	go run ./cmd/api/main.go

server-prod:
	APP_ENV=production go run ./cmd/api/main.go

.PHONY: postgres create-db drop-db migrate-up migrate-down sqlc server-dev server-prod
