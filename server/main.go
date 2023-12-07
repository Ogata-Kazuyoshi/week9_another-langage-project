package main

import (
	"fmt"
	"log"

	"todoapp/app/controllers"
	"todoapp/config"
)

func main()  {
	fmt.Println(config.Config.Port)
	fmt.Println(config.Config.SQLDriver)
	fmt.Println(config.Config.DbName)
	fmt.Println(config.Config.Logfile)

	log.Println("tets")
	//  get確認用
	// u,_:= models.GetAllUser()
	// fmt.Println("getAllUser : ",u)

	//update用 
	// user := &models.User{}
	// user.UpdateUser(1, map[string]interface{}{"email": "newemailnewEmail@gmail.com"})
	// u,_:= models.GetAllUser()
	// fmt.Println("getAllUser : ",u)

	// delete確認用
	// models.DeleteUser(4)
	// u, _ := models.GetAllUser()
	// fmt.Println("getAllUser :",u)


	//TOdo関係

	// update用 
	// todo := &models.Todo{}
	// todo.UpdateTodo(1, map[string]interface{}{"content": "12345"})

	// delete確認用
	// models.DeleteTodo(2)

	// utodo, _ := models.GetAllTodo()
	// fmt.Println("getAllTodo : ",utodo)

	// ulimittodo, _ := models.GetTodo(1)
	// fmt.Println("getTodo : ",ulimittodo)

	controllers.StartMainServer()

}