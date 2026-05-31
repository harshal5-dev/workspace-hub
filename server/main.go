package main

import (
	"log"
	"os"

	"github.com/harshal5-dev/workspace-hub/server/cmd/api"
	"github.com/harshal5-dev/workspace-hub/server/internal/config"
	"github.com/harshal5-dev/workspace-hub/server/internal/db"
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

	server := api.NewServer(cfg, store)

	err = server.Start()
	if err != nil {
		log.Fatal("server not started:", err)
	}
}
