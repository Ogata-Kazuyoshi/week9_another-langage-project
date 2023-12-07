package models

import (
	"log"
	"time"

	sq "github.com/Masterminds/squirrel"
)

type User struct {
	ID int
	Name string
	Salt string
	Password string
	CreatedAt time.Time
}

var tablenameUser string =  "users"

//新規作成用 これは(u *User)をつけてるので、Userとしてのメソッドに組み込む。理由はUserの型で存在して欲しいから
func (u *User) CreateUser() (err error) {
	cmd := `insert into `+ tablenameUser+ ` (
		user_name,
		salt,
		hashed_password,
		created_at) values ($1, $2, $3, $4)`

	_, err = Db.Exec(cmd, u.Name , AddSalt(), Encrypt(u.Password),time.Now())
	if err != nil {
		log.Fatalln(err)
	}
	return err 
}

//ユーザー名で該当するデータを取ってくる用 これは(u *User)をつけていないので、単なる関数として呼び出し可能
func GetUser(username string) ([]User, error)  {
	var users []User
	psql := sq.StatementBuilder.PlaceholderFormat(sq.Dollar)

	sql, args, err := psql.Select("*").From(tablenameUser).Where(sq.Eq{"name":username}).ToSql()
	if err != nil {
		return nil, err
	}

	rows, err := Db.Query(sql, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var user User
		err = rows.Scan(&user.ID,  &user.Name, &user.Salt, &user.Password, &user.CreatedAt)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return users, nil
}

//データをすべて取得するよう これは(u *User)をつけていないので、単なる関数として呼び出し可能
func GetAllUser() ([]User, error)  {
	var users []User
	psql := sq.StatementBuilder.PlaceholderFormat(sq.Dollar)

	sql, args, err := psql.Select("*").From(tablenameUser).ToSql()
	if err != nil {
		return nil, err
	}

	rows, err := Db.Query(sql, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var user User
		err = rows.Scan(&user.ID,  &user.Name, &user.Salt, &user.Password, &user.CreatedAt)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return users, nil
}

//該当するIdのデータを更新するよう これは(u *User)をつけてるので、Userとしてのメソッドに組み込む。理由はUserの型を持った変数でUpdateかけたいから
func (u *User) UpdateUser(id int, updates map[string]interface{}) {
	psql := sq.StatementBuilder.PlaceholderFormat(sq.Dollar)
	
	update := psql.Update(tablenameUser)
	for column, value := range updates {
		update = update.Set(column, value)
	}
	
	sql, args, err := update.Where(sq.Eq{"id": id}).ToSql()
	if err != nil {
		log.Fatalln(err)
	}

	_, err = Db.Exec(sql, args...)
	if err != nil {
		log.Fatalln(err)
	}
}

//該当するIdのデータを削除するよう これは(u *User)をつけていないので、単なる関数として呼び出し可能。idさえ指定したら一意に決めれる
func  DeleteUser(id int) {
	psql := sq.StatementBuilder.PlaceholderFormat(sq.Dollar)
	
	sql, args, err := psql.Delete(tablenameUser).Where(sq.Eq{"id": id}).ToSql()
	if err != nil {
		log.Fatalln(err)
	}

	_, err = Db.Exec(sql, args...)
	if err != nil {
		log.Fatalln(err)
	}
}