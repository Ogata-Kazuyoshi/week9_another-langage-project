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
		{Name: "test11",Password: "test1"},
		{Name: "test22",Password: "test2"},
		{Name: "test33", Password: "test3"},
	}

	for _, user := range users {
		u := &user
		fmt.Println(u)
		u.CreateUser()
	}

		// テーブルの全てのデータを削除
		_, err2 := models.Db.Exec("TRUNCATE TABLE memos")
		if err2!= nil {
			log.Fatalln(err)
		}
	
		// 新しいSeedを流す
		todos := []models.Todo {
			{UserID : 1, Category : "食費",BoughtDate:"2023-10-02" ,Content:"スーパー" ,Jpy:110 , Krw: 1000 ,AtJp:false},
			{UserID : 1, Category : "日用品",BoughtDate:"2023-10-10" ,Content:"ドラッグストア" ,Jpy:110 , Krw: 1000 ,AtJp:false},
			{UserID : 1, Category : "食費",BoughtDate:"2023-10-05" ,Content:"コノミヤ" ,Jpy:110 , Krw: 1000 ,AtJp:false},
			{UserID : 1, Category : "交際費",BoughtDate:"2023-10-23" ,Content:"飲み会" ,Jpy:110 , Krw: 1000 ,AtJp:false},
			{UserID : 2, Category : "食費",BoughtDate:"2023-10-03" ,Content:"コンビニ" ,Jpy:110 , Krw: 1000 ,AtJp:false},
			{UserID : 1, Category : "その他" ,BoughtDate:"2023-10-10",Content:"ご褒美" ,Jpy:110 , Krw: 1000 ,AtJp:false},
		}

	
		for _, todo := range todos {
			u := &todo
			fmt.Println(u)
			u.CreateTodo()
		}

	

}