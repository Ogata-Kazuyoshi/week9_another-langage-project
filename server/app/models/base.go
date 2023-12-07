package models

import (
	"crypto/sha1"
	"database/sql"
	"fmt"
	"log"
	"todoapp/config"

	"github.com/google/uuid"

	_ "github.com/lib/pq"
)

var Db *sql.DB

var err error

const (
	tableNameUser = "users"
	tableNameTodo = "todos"
)

func init() {
	Db,err = sql.Open(config.Config.SQLDriver,fmt.Sprintf("user=user  dbname=go_todo sslmode=disable"))
	if err != nil {
		log.Fatalln(err)
	}
	
	cmdU := fmt.Sprintf(`CREATE TABLE IF NOT EXISTS %s(
		id SERIAL PRIMARY KEY,
		uuid TEXT NOT NULL UNIQUE,
		name TEXT,
		email TEXT,
		password TEXT,
		created_at TIMESTAMP)`,tableNameUser)

	_, err = Db.Exec(cmdU)
	if err != nil {
		log.Fatalln(err)
	}

	cmdT := fmt.Sprintf(`CREATE TABLE IF NOT EXISTS %s(
		id SERIAL PRIMARY KEY,
		content TEXT,
		user_id INTEGER,
		created_at TIMESTAMP)`,tableNameTodo)

	_, err = Db.Exec(cmdT)
	if err != nil {
		log.Fatalln(err)
	}

}

func createUUID() (uuidobj uuid.UUID)  {
	uuidobj, _ = uuid.NewUUID()
	fmt.Println("uuidObj : ",uuidobj)
	return uuidobj
}

func Encrypt(plaintext string) (cryptext string) {
	cryptext =fmt.Sprintf("%x", sha1.Sum([]byte(plaintext)))
	fmt.Println("cryptext : ",cryptext)
	return cryptext
}