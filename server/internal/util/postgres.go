package util

import (
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

func ToPgText(value string) pgtype.Text {
	if value == "" {
		return pgtype.Text{
			Valid: false,
		}
	}

	return pgtype.Text{
		String: value,
		Valid:  true,
	}
}

func PgUUIDToString(id pgtype.UUID) string {
	if !id.Valid {
		return ""
	}

	return uuid.UUID(id.Bytes).String()
}

func PgTextToString(text pgtype.Text) string {
	if !text.Valid {
		return ""
	}

	return text.String
}
