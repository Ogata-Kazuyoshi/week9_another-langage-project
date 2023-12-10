package controllers

import (
	"net/http"
	"os"
	"todoapp/config"
)


func StartMainServer() error  {
	http.HandleFunc("/",top)
	mux := http.NewServeMux()
	mux.HandleFunc("/api/v1/data/", dataHandler)

	//本番環境用 / 開発環境用の切り替えができるようにする
	port := os.Getenv("PORT")
	if port == "" {
		port = config.Config.Port
	}
	return http.ListenAndServe(":"+port,mux)

	// return http.ListenAndServe(":"+ port || config.Config.Port , mux)
	
}