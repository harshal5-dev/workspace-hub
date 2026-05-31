postgres:
	docker run --name postgres18 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=12345 -d postgres:18-alpine

create-db:
	docker exec -it postgres18 createdb --username=root --owner=root workspace_hub_db

drop-db:
	docker exec -it postgres18 dropdb workspace_hub_db

migrate-create:
	migrate create -ext sql -dir db/migration -seq $(name)
	# make migrate-create name=init_schema

migrate-up:
	migrate -path db/migration -database "postgres://root:12345@localhost:5432/workspace_hub_db?sslmode=disable" -verbose up

migrate-down:
	migrate -path db/migration -database "postgres://root:12345@localhost:5432/workspace_hub_db?sslmode=disable" -verbose down

sqlc:
	sqlc generate

server-dev:
	go run main.go

server-prod:
	APP_ENV=production go run main.go

.PHONY: postgres create-db drop-db migrate-create migrate-up migrate-down sqlc server-dev server-prod
