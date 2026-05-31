package main

import (
	"log"
	"os"

	"github.com/harshal5-dev/workspace-hub/server/config"
)

func main() {

	env := os.Getenv("APP_ENV")
	cfg, err := config.LoafConfig(config.ConfigFilePath, env)
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	log.Println(cfg)
}
