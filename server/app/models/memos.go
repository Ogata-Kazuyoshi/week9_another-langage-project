package models

import (
	"log"
	"time"

	sq "github.com/Masterminds/squirrel"
)

type Todo struct {
	ID int
	UserID int
	CreateDate time.Time
	UpdateDate time.Time
	Category string
	Content string
	Jpy float64
	Krw float64
	AtJp bool
}

var tablename string =  "memos"

//新規作成用 これは(t *Todo)をつけてるので、Userとしてのメソッドに組み込む。理由はUserの型で存在して欲しいから
func (t *Todo) CreateTodo() (err error) {
	cmd := `insert into ` + tablename + ` (
		user_id,
		create_date,
		update_date,
		category,
		content,
		jpy,
		krw,
		at_jp) values ($1, $2, $3,$4,$5,$6,$7,$8)`

	_, err = Db.Exec(cmd, t.UserID,time.Now(),time.Now(),t.Category,t.Content,t.Jpy,t.Krw,t.AtJp)
	if err != nil {
		log.Fatalln(err)
	}
	return err 
}

//ユーザー名で該当するデータを取ってくる用 これは(u *User)をつけていないので、単なる関数として呼び出し可能
func GetTodo(id int) ([]Todo, error)  {
	var todos []Todo
	psql := sq.StatementBuilder.PlaceholderFormat(sq.Dollar)

	sql, args, err := psql.Select("*").From(tablename).Where(sq.Eq{"id":id}).ToSql()
	if err != nil {
		return nil, err
	}

	rows, err := Db.Query(sql, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var todo Todo
		err = rows.Scan(&todo.ID,&todo.UserID,&todo.CreateDate,&todo.UpdateDate,&todo.Category, &todo.Content, &todo.Jpy, &todo.Krw,&todo.AtJp)
		if err != nil {
			return nil, err
		}
		todos = append(todos, todo)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return todos, nil
}

//データをすべて取得するよう これは(u *User)をつけていないので、単なる関数として呼び出し可能
func GetAllTodo() ([]Todo, error)  {
	var todos []Todo
	psql := sq.StatementBuilder.PlaceholderFormat(sq.Dollar)

	sql, args, err := psql.Select("*").From(tablename).ToSql()
	if err != nil {
		return nil, err
	}

	rows, err := Db.Query(sql, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var todo Todo
		err = rows.Scan(&todo.ID,&todo.UserID,&todo.CreateDate,&todo.UpdateDate,&todo.Category, &todo.Content, &todo.Jpy, &todo.Krw,&todo.AtJp)
		if err != nil {
			return nil, err
		}
		todos = append(todos, todo)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return todos, nil
}

//該当するIdのデータを更新するよう これは(t *Todo)をつけてるので、Userとしてのメソッドに組み込む。理由はUserの型を持った変数でUpdateかけたいから
func (t *Todo) UpdateTodo(id int, updates map[string]interface{}) {
	psql := sq.StatementBuilder.PlaceholderFormat(sq.Dollar)
	
	update := psql.Update(tablename)
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

//該当するIdのデータを削除するよう これは(t *Todo)をつけていないので、単なる関数として呼び出し可能。idさえ指定したら一意に決めれる
func  DeleteTodo(id int) {
	psql := sq.StatementBuilder.PlaceholderFormat(sq.Dollar)
	sql, args, err := psql.Delete(tablename).Where(sq.Eq{"id": id}).ToSql()
	if err != nil {
		log.Fatalln(err)
	}
	_, err = Db.Exec(sql, args...)
	if err != nil {
		log.Fatalln(err)
	}
}