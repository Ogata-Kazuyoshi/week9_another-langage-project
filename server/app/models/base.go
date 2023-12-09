package models

import (
	"crypto/rand"
	"crypto/sha1"
	"database/sql"
	"encoding/base64"
	"fmt"
	"log"
	"os"
	"todoapp/config"

	"github.com/google/uuid"

	"github.com/joho/godotenv"
	"github.com/lib/pq"
	_ "github.com/lib/pq"
)

var Db *sql.DB

var err error

const (
	tableNameUser = "users"
	tableNameMemo = "memos"
)

func init() {

	err := godotenv.Load()
	if err != nil {
		// log.Fatal("Error loading .env file")
		fmt.Println("No .env file")
	}


	goEnv := os.Getenv("GO_ENV")
	fmt.Println("GO_ENV : ",goEnv)

	if goEnv == "production" {
		//本番環境用
		url := os.Getenv("DATABASE_URL")
		connection, _ := pq.ParseURL(url)
		connection += "sslmode=require"
		Db, err = sql.Open(config.Config.SQLDriver,connection)
		if err != nil {
			log.Fatalln(err)
		}
	} else if goEnv == "development" {
		//下記は開発環境よう
		Db,err = sql.Open(config.Config.SQLDriver,fmt.Sprintf(`user=user  dbname=` + config.Config.DbName + ` sslmode=disable`))
		if err != nil {
			log.Fatalln(err)
		}
	}

	//本番環境用
	// url := os.Getenv("DATABASE_URL")
	// connection, _ := pq.ParseURL(url)
	// connection += "sslmode=require"
	// Db, err = sql.Open(config.Config.SQLDriver,connection)
	// if err != nil {
	// 	log.Fatalln(err)
	// }

	//下記は開発環境よう
	// Db,err = sql.Open(config.Config.SQLDriver,fmt.Sprintf(`user=user  dbname=` + config.Config.DbName + ` sslmode=disable`))
	// if err != nil {
	// 	log.Fatalln(err)
	// }
	
	cmdU := fmt.Sprintf(`CREATE TABLE IF NOT EXISTS %s(
		id SERIAL PRIMARY KEY,
		user_name TEXT,
		salt TEXT,
		hashed_password TEXT,
		created_at TIMESTAMP)`,tableNameUser)

	_, err = Db.Exec(cmdU)
	if err != nil {
		log.Fatalln(err)
	}

	cmdT := fmt.Sprintf(`CREATE TABLE IF NOT EXISTS %s(
		id SERIAL PRIMARY KEY,
		user_id INTEGER,
		create_date TIMESTAMP,
		update_date TIMESTAMP,
		bought_date DATE,
		category TEXT,
		content TEXT,
		jpy DOUBLE PRECISION,
		krw DOUBLE PRECISION,
		at_jp BOOLEAN)`,tableNameMemo)

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

func AddSalt() (string) {
	salt := make([]byte, 16)
	_, err := rand.Read(salt)
	if err != nil {
		return ""
	}
	return base64.StdEncoding.EncodeToString(salt)
}