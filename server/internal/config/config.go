package config

import (
	"fmt"
	"strings"
	"time"

	"github.com/spf13/viper"
)

type Config struct {
	AppEnv        string `mapstructure:"APP_ENV"`
	ServerAddress string `mapstructure:"SERVER_ADDRESS"`

	DBSource string `mapstructure:"DATABASE_SOURCE"`

	JWTSecret            string        `mapstructure:"JWT_SECRET"`
	AccessTokenDuration  time.Duration `mapstructure:"ACCESS_TOKEN_DURATION"`
	RefreshTokenDuration time.Duration `mapstructure:"REFRESH_TOKEN_DURATION"`

	CookieSecure    bool   `mapstructure:"COOKIE_SECURE"`
	CookieDomain    string `mapstructure:"COOKIE_DOMAIN"`
	CookieTokenName string `mapstructure:"COOKIE_TOKEN_NAME"`
}

func LoafConfig(path, env string) (config Config, err error) {

	if env == "" {
		env = defaultEnv
	}

	viper.AddConfigPath(path)
	viper.SetConfigName(".env." + env)
	viper.SetConfigType("env")

	viper.AutomaticEnv()
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

	err = viper.ReadInConfig()
	if err != nil {
		return Config{}, fmt.Errorf("failed to read config file: %w", err)
	}

	err = viper.Unmarshal(&config)
	return config, nil
}
