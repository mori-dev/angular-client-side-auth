angular-client-side-auth
========================

## 仕様

これは AngularJS を用いた、認証と認可(権限に応じた画面表示項目の出し分け)を行うアプリです。[fnakstad/angular-client-side-auth](https://github.com/fnakstad/angular-client-side-auth) をベースにして改変しています。

  - ログイン、ログアウト、ユーザ登録機能があります
  - ユーザのロールには guest_role, nomal_role, admin_role があります
  - 画面のアクセス権限には  public_level, guest_level, nomal_level, admin_level があります
  - public_level エリアは guest_role, nomal_role, admin_role のすべてのロールで表示されます
  - guest_level エリアは guest_role のロールで表示されます
  - nomal_level エリアは nomal_role, admin_role のロールで表示されます
  - admin_level エリアは、 admin_role のロールで表示されます

以下のような前提です。

どのようなロールのユーザであれ、画面表示項目の「テンプレート」は取得されています。たとえば、nomal_role のユーザでも、admin_level エリアのテンプレートは取得されています。さらに具体的にいうと、非ログインユーザでも、ページを開いて、HTMLソースを表示すれば、かりに admin ユーザでログインしたら何々についての情報がわかるのか、ということがわかります。ただし、その「何々」の値などはわからない、といったことです。「何々の値」は、admin ユーザでログインし、その何々を表示するタブをクリックしたタイミングで REST API で問い合わせて、サーバ側で権限チェックを行います。ブラウザ側では、ログイン時に自分のロールを取得するが、そこで得たロールと画面のアクセス権限は、画面の表示項目を算出する(どれを display none にするのかを算出する)のに用いる用途です。

このリポジトリに付属する express では、ブラウザ側と同程度のチェックしか行っておりません。動作確認程度のものです。

### 参考記事

  - [Original post discussing Angular.js client-side solution](http://www.frederiknakstad.com/authentication-in-single-page-applications-with-angular-js/)
  - [Follow-up post discussing Node.js server-side solution](http://www.frederiknakstad.com/blog/2013/08/04/authentication-in-single-page-applications-with-angular.js-part-2/)
  - [UI-router and angular-client-side-auth](http://www.frederiknakstad.com/2014/02/09/ui-router-in-angular-client-side-auth/)

## セットアップ

Node, npm, bower をインストールして、以下のコマンドを実行して下さい。

```
npm install
npm start
```

## テスト

以下のコマンドを実行して下さい。


```
npm test
```

## License

```
The MIT License (MIT)

Copyright (c) 2015 @mori-dev

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
