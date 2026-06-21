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

	RabbitMQURL               string `mapstructure:"RABBITMQ_URL"`
	RabbitMQMailQueue         string `mapstructure:"RABBITMQ_MAIL_QUEUE"`
	RabbitMQMailWorkerEnabled bool   `mapstructure:"RABBITMQ_MAIL_WORKER_ENABLED"`

	SMTPHost     string `mapstructure:"SMTP_HOST"`
	SMTPPort     int    `mapstructure:"SMTP_PORT"`
	SMTPUsername string `mapstructure:"SMTP_USERNAME"`
	SMTPPassword string `mapstructure:"SMTP_PASSWORD"`
	SMTPFrom     string `mapstructure:"SMTP_FROM"`

	JWTSecret            string        `mapstructure:"JWT_SECRET"`
	AccessTokenDuration  time.Duration `mapstructure:"ACCESS_TOKEN_DURATION"`
	RefreshTokenDuration time.Duration `mapstructure:"REFRESH_TOKEN_DURATION"`
	Issuer               string        `mapstructure:"ISSUER"`

	CookieSecure    bool   `mapstructure:"COOKIE_SECURE"`
	CookieDomain    string `mapstructure:"COOKIE_DOMAIN"`
	CookieTokenName string `mapstructure:"COOKIE_TOKEN_NAME"`
	CookieTokenAge  int    `mapstructure:"COOKIE_TOKEN_AGE"`
	CookieSamesite  string `mapstructure:"COOKIE_SAMESITE"`
	CookieHttpOnly  bool   `mapstructure:"COOKIE_HTTP_ONLY"`
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
	viper.SetDefault("RABBITMQ_MAIL_QUEUE", "mail.jobs")
	viper.SetDefault("RABBITMQ_MAIL_WORKER_ENABLED", false)
	viper.SetDefault("SMTP_PORT", 587)

	err = viper.ReadInConfig()
	if err != nil {
		return Config{}, fmt.Errorf("failed to read config file: %w", err)
	}

	err = viper.Unmarshal(&config)
	if err != nil {
		return Config{}, fmt.Errorf("failed to unmarshal config: %w", err)
	}

	return config, nil
}
