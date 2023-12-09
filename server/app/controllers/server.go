package controllers

import (
	"net/http"
	"os"
)


func StartMainServer() error  {
	http.HandleFunc("/",top)
	mux := http.NewServeMux()
	mux.HandleFunc("/api/v1/data/", dataHandler)

	//本番環境用
	port := os.Getenv("PORT")
	return http.ListenAndServe(":"+port,mux)
	//開発環境用
	// return http.ListenAndServe(":"+config.Config.Port,mux)
}