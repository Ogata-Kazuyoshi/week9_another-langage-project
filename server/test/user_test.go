package test

import (
	"fmt"
	"testing"
	"todoapp/app/models"

	"github.com/stretchr/testify/assert"
)

func TestGetUser(t *testing.T) {
	assert := assert.New(t)

	result,_ := models.GetAllUser()
	fmt.Println("result : ",result)
	assert.Equal(3, result, "1 + 2 should equal 3")
}