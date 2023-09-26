package services

import "server/models"

type UserService interface {
	CreateUser(*models.User) error
	GetUser(*string) (*models.User, error)
	UpdateUser(*models.User, *string) (interface{}, error)
	DeleteUser(*string) error
}
