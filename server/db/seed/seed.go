package main

import (
	"fmt"
	"log"
	"todoapp/app/models"
)

func main() {
	// テーブルの全てのデータを削除
	_, err := models.Db.Exec("TRUNCATE TABLE users")
	if err != nil {
		log.Fatalln(err)
	}

	// 新しいSeedを流す
	users := []models.User {
		{Name: "test11", Email:"test11@gmail.com",Password: "test1"},
		{Name: "test22", Email:"test22@gmail.com",Password: "test2"},
		{Name: "test33", Email:"test33@gmail.com",Password: "test3"},
	}

	for _, user := range users {
		u := &user
		fmt.Println(u)
		u.CreateUser()
	}

		// テーブルの全てのデータを削除
		_, err2 := models.Db.Exec("TRUNCATE TABLE todos")
		if err2!= nil {
			log.Fatalln(err)
		}
	
		// 新しいSeedを流す
		todos := []models.Todo {
			{Content: "abcdef",UserID: 5},
			{Content: "ghijk",UserID: 5},
			{Content: "fadsfadsf",UserID: 5},
		}
	
		for _, todo := range todos {
			u := &todo
			fmt.Println(u)
			u.CreateTodo()
		}

	

}