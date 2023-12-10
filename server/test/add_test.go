package test

import (
	"testing"
	testseed "todoapp/testSeed"

	"github.com/stretchr/testify/assert"
)

func TestAdd(t *testing.T) {
	assert := assert.New(t)

	result := testseed.Add(1,2)
	assert.Equal(3, result, "1 + 2 should equal 3")
}