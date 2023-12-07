package controllers

import (
	"encoding/json"
	"fmt"
	"io"
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
	case http.MethodPost:
		handlePost(w, r)
	case http.MethodPut:
		handlePut(w, r)
	case http.MethodDelete:
		handleDelete(w, r)
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

func handlePost(w http.ResponseWriter, r *http.Request){
	enableCors(w)
	todo := &models.Todo{}
	err := json.NewDecoder(r.Body).Decode(todo)
	if err != nil {
		log.Fatalf("Error decoding body: %v", err)
		return
	}
	
	todo.CreateTodo()


	// メッセージをマップに格納
	msg := map[string]string{"message": "新規登録完了"}
	// マップをJSONにエンコードしてレスポンスに書き込む
	json.NewEncoder(w).Encode(msg)
}


func handlePut(w http.ResponseWriter, r *http.Request){
	enableCors(w)
	
	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Fatalln("Error : ",err)
	}
	param := strings.TrimPrefix(r.URL.Path, "/api/v1/data/")
	id , err := strconv.Atoi(param)
	if err != nil {
		log.Fatalln(err)
	}
	var data map[string]interface{}
	err = json.Unmarshal(body, &data)
	if err != nil {
		log.Fatalf("Error decoding body: %v", err)
		return
	}
	
	todo := &models.Todo{}
	todo.UpdateTodo(id,data)
	
	// メッセージをマップに格納
	msg := map[string]string{"message": "編集完了"}
	// マップをJSONにエンコードしてレスポンスに書き込む
	json.NewEncoder(w).Encode(msg)
}

func handleDelete(w http.ResponseWriter, r *http.Request){
	enableCors(w)

	param := strings.TrimPrefix(r.URL.Path, "/api/v1/data/")
	id , err := strconv.Atoi(param)
	if err != nil {
		log.Fatalln(err)
	}
	models.DeleteTodo(id)

	// メッセージをマップに格納
	msg := map[string]string{"message": "削除完了"}
	// マップをJSONにエンコードしてレスポンスに書き込む
	json.NewEncoder(w).Encode(msg)
}