# まとめて管理

# deploy 情報

### web 版 : https://account-book-web.onrender.com

### 質問事項

1. すでにマシンにインストールされているか？
   <br>
   A : No.
2. Go には複数 Ver がありますか？ベストな Ver は？
   <br>
   A : 現在最新は 1.21.4
   Go 1.8 で HTTP のサーバーサイドのサポート、 Go 1.11s でパッケージ管理の Go Modules の導入などが実施された。基本は最新版で良さそう。
3. Go のオンラインサンドボックスはあるか？
   <br>
   A : Yes
4. インストール方法は？
   <br>
   A : Go 公式サイトから、インストーラーをダウンロードしてインストール。
   <br>
   https://go.dev/doc/install
5. packagemanager は何か？
   <br>
   A : Go Modules が標準
6. 一般的な IDE は？
   <br>
   A : VScode. 今回の開発は Cursor editor を使用。
7. どのテストスイートが最も人気があるか？
   <br>
   A : testify。BDD としては Ginkgo がある。
8. packagemanager はどこから依存関係を読み込むか
   <br>
   A : go mod ファイルか（go Modules）
9. 最も人気のあるフレームワークは何か？
   <br>
   A :
   <br>
   1. Gin : 軽量かつ高速にするためのフレームワーク
      <br>
   2. Echo : シンプルで直感的な API を表現できるフレームワーク。今回使用しなかったが、かなり使いやすそうなのでリファクタリングしたい。
10. Go にデバッガーはあるか？
    <br>
    A : Yes.delve がある
    <br>
    https://qiita.com/momotaro98/items/7fbcad57a9d8488fe999
11. Hacker News に興味ある記事があるか？
    <br>
    A : Go に対しての好きなところ、嫌いなところの記事
    <br>
    https://news.ycombinator.com/item?id=33757306
12. その他気になった記事
    <br>
    DeNA techCon が既存のソフトウェアを C#→Go に変更。１００以上の API が存在した
    <br>
    https://speakerdeck.com/dena_tech/techcon2023-session22

# Index

- [About](#about)
- [ローカル環境での設定手順](#ローカル環境での設定手順)
- [今後の計画](#今後の計画)

# About

日本、海外両方での生活をされているあなた。通貨の違いで、お金の管理が大変と感じることはないでしょうか？
<br>
本アプリは通貨の換算を気にせず、入力すれば、勝手に計算してデータを保存してくれます。
<br>
円、ウォンの表示切り替えもボタン１つで実施でき、今までの管理労力を低減してくれます。

# ローカル環境での設定手順

### < Database >

PostgreSQL の使用を前提に書いてます。 `account_book`のデータベースを作成してください。

### <リポジトリーのクローン>

1.本ページより、Clone してください

2.Server 側の設定

- ディレクトリの変更

- .env ファイルの作成
  このプロダクトは.env ファイルを使用して環境変数を定義しています。
  server フォルダ直下に.env ファイルを作成して 「GO_ENV=development」を定義してください。
- サーバーの起動。ターミナルで下記を実行すると 8080 ポートでサーバーが立ち上がります。

3. Client 側の設定 react-native 　（ネイティブアプリ用）
   - expo の初期設定がまだの方は設定してください。また、ios シミュレーターで実行したい方は、x-code , simulator のインストールも併せて実施してください
   - ディレクトリの変更
   ```zh
   cd client_graph
   ```
   - node_modules のインストール。下記コマンドを実行
   ```zh
   npm i
   ```
   - expo アプリの立ち上げ、ios シミュレータ使用の際は下記コマンド実行後に i をキーダウン
   ```zh
   npx expo start
   ```
4. Client 側の設定 react (web アプリ用)

- ディレクトリの変更

```zh
cd client_React
```

- node_modules のインストール。下記コマンドを実行

```zh
npm i
```

- 下記コマンド実行。ブラウザの立ち上げ、5173 ポートで開きます。

```zh
npm run dev
```

# 今後の計画

- 通貨を API で自動取得
- ユーザー認証機能実装
- 各月の Total 収支を棒グラフで表す
- 各カテゴリーごとでの表示ができる機能実装
- web 版の機能実装（現在表示するのみ）
