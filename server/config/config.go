package config

import (
	"log"
	"todoapp/utils"

	"gopkg.in/go-ini/ini.v1"
)

type ConfigList struct {
	Port string
	SQLDriver string
	DbName string
	Logfile string
}

var Config ConfigList

func init()  {
	LoadConfig()
	utils.LoggingSetting(Config.Logfile)
}

func LoadConfig(){
	cfg, err  := ini.Load("config.ini")
	if err != nil {
		log.Fatalln(err)
	}
	Config = ConfigList{
		Port: cfg.Section("web").Key("port").MustString("8080"),
		SQLDriver: cfg.Section("db").Key("driver").String(),
		DbName : cfg.Section("db").Key("name").String(),
		Logfile: cfg.Section("web").Key("logfile").String(),
	}
}