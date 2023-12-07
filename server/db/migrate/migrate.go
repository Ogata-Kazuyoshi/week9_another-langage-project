package main

import (
	"fmt"
	"todoapp/app/models"
)

func main() {
	fmt.Println(models.Db) //base.goで定義しているinit関数を呼び出すためのもの特にprintlnでなくても良いこれによってテーブルが作成される。
}