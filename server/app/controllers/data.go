package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"todoapp/app/models"
)

func enableCors(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
}

func dataHandler(w http.ResponseWriter, r *http.Request) { //パスパラメータの有無でエンドポイント分けれないので、無理やりURLを解析する。
	switch r.Method {
	case http.MethodGet:
		param := strings.TrimPrefix(r.URL.Path, "/api/v1/data/")
		if param == "" || param == "/" {	
			getAlltodo(w,r)
		} else {
			getSingleTodo(w,r,param)
		}
	// case http.MethodPost:
	// 	// POSTリクエストの処理
	// 	handlePost(w, r)
	// case http.MethodPut:
	// 	// PUTリクエストの処理
	// 	handlePut(w, r)
	// case http.MethodDelete:
	// 	// DELETEリクエストの処理
	// 	handleDelete(w, r)
	default:
		http.Error(w, "Invalid method", http.StatusMethodNotAllowed)
	}
}

func getAlltodo(w http.ResponseWriter, r *http.Request) {
	enableCors(w)
	u , _ := models.GetAllTodo()		
	// JSONにエンコード
	json.NewEncoder(w).Encode(u)
}

func getSingleTodo(w http.ResponseWriter, r *http.Request, param string){
	enableCors(w)
	id , err := strconv.Atoi(param)
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println("id : ",id)
	u , _ := models.GetTodo(id)
	// JSONにエンコード
	json.NewEncoder(w).Encode(u)
}
