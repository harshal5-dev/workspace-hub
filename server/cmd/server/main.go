package main

import (
	"log"
	"os"

	"github.com/harshal5-dev/workspace-hub/server/internal/app"
	"github.com/harshal5-dev/workspace-hub/server/internal/config"
	"github.com/harshal5-dev/workspace-hub/server/internal/db"
	httptransport "github.com/harshal5-dev/workspace-hub/server/internal/transport/http"
)

func main() {
	env := os.Getenv("APP_ENV")
	cfg, err := config.LoafConfig(config.ConfigFilePath, env)
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	store, err := db.Init(cfg.DBSource)
	if err != nil {
		log.Fatal("cannot connect to database:", err)
	}

	container := app.NewContainer(cfg, store)
	server := httptransport.NewServer(container)

	if err := server.Start(); err != nil {
		log.Fatal("server not started:", err)
	}
}
