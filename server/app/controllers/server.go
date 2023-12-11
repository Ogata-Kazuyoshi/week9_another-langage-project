package controllers

import (
	"net/http"
	"os"
	"todoapp/config"

	"github.com/labstack/echo/v4"
)


func StartMainServer() error  {
	http.HandleFunc("/",top)
	mux := http.NewServeMux()
	mux.HandleFunc("/api/v1/data/", dataHandler)

	e := echo.New()

	e.GET("/personal/main", func(c echo.Context) error {
		return c.Redirect(http.StatusMovedPermanently, "/")
	})
 
	//本番環境用 / 開発環境用の切り替えができるようにする
	port := os.Getenv("PORT")
	if port == "" {
		port = config.Config.Port
	}
	return http.ListenAndServe(":"+port,mux)

	// return http.ListenAndServe(":"+ port || config.Config.Port , mux)
	
}