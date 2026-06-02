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
func StringToPgUUID(id string) (pgtype.UUID, error) {
	parsedUUID, err := uuid.Parse(id)
	if err != nil {
		return pgtype.UUID{Valid: false}, err
	}

	return pgtype.UUID{
		Bytes: parsedUUID,
		Valid: true,
	}, nil
}
