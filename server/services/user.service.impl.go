package services

import (
	"context"
	"server/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserServiceImpl struct {
	userCollection *mongo.Collection
	ctx            context.Context
}

func NewUserService(userCollection *mongo.Collection, ctx context.Context) UserService {
	return &UserServiceImpl{
		userCollection: userCollection,
		ctx:            ctx,
	}
}

func (u *UserServiceImpl) CreateUser(user *models.User) error {

	_, err := u.userCollection.InsertOne(u.ctx, user)

	return err
}

func (u *UserServiceImpl) GetUser(_id *string) (*models.User, error) {
	var user *models.User
	query := bson.D{bson.E{Key: "_id", Value: _id}}
	err := u.userCollection.FindOne(u.ctx, query).Decode(&user)
	return user, err
}

func (u *UserServiceImpl) UpdateUser(user *models.User, id *string) (interface{}, error) {

	filter := bson.D{bson.E{Key: "_id", Value: id}}

	updatedUser := bson.D{
		bson.E{Key: "$set", Value: bson.D{
			bson.E{Key: "name", Value: user.Name},
			bson.E{Key: "email", Value: user.Email},
			bson.E{Key: "updated_at", Value: user.UpdatedAt},
		},
		},
	}

	result, err := u.userCollection.UpdateOne(u.ctx, filter, updatedUser)
	return result, err
}

func (u *UserServiceImpl) DeleteUser(_id *string) error {

	filter := bson.D{bson.E{Key: "_id", Value: _id}}
	_, err := u.userCollection.DeleteOne(u.ctx, filter)
	if err != nil {
		return err
	}
	return nil
}
