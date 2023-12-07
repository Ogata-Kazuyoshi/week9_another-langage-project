package controllers

import (
	"net/http"
	"text/template"
)

func top(w http.ResponseWriter, r *http.Request)  {
	t, _ := template.ParseFiles("./app/views/templates/top.html") //main.goからの相対パスでファイルの位置は指定
	t.Execute(w, "server button") //何も渡したくない時は、nilでOK
}
