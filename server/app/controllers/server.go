package controllers

import (
	"net/http"
	"todoapp/config"
)


func StartMainServer() error  {
	http.HandleFunc("/",top)
	mux := http.NewServeMux()
	mux.HandleFunc("/api/v1/data/", dataHandler)
	return http.ListenAndServe(":"+config.Config.Port,mux)
}