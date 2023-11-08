### 言語

* [English](https://github.com/omlou/simulate#readme)
* [简体中文](https://github.com/omlou/simulate/blob/master/docs/md/readme-zh.md)
* [日本語](https://github.com/omlou/simulate/blob/master/docs/md/readme-ja.md)
* [한국어](https://github.com/omlou/simulate/blob/master/docs/md/readme-ko.md)
* [Français](https://github.com/omlou/simulate/blob/master/docs/md/readme-fr.md)

### 紹介

* バックエンドAPIインターフェースをシミュレートするための純粋なフロントエンドツールです。
* XMLHttpRequestおよびfetchリクエストをサポートします。
* バンドル後のNode.jsプロジェクトでも使用できます。

### 使用法

#### スクリプトタグを使用する

```html
<script src="https://unpkg.com/@xlou/simulate@1.0.8/dist/umd/simulate.min.js"></script>
<!-- JSファイルをローカルにダウンロードして使用することをお勧めします -->
<script>
  /* このJSファイルを含めると、Simulateオブジェクトがwindowに割り当てられます */
  Simulate.serve({
    "/updateById": {
      type: 'post',
      response({ data }) {
        return {
          code: 200,
          data: {
            id: data.id
          }
        };
      }
    }
  });
</script>
```

#### Node.jsおよびモジュール化プロジェクトで使用する

インストール

```bash
npm i @xlou/simulate -S
```

インポート

```javascript
import { serve } from '@xlou/simulate';

serve({
  "/getById": {
    type: 'get',
    response({ params }) {
      return {
        code: 200,
        data: {
          id: params.id
        }
      };
    }
  },
  "/updateById": {
    type: 'post',
    response({ data }) {
      return {
        code: 200,
        data: {
          id: data.id
        }
      };
    }
  });
```

### API

#### serve

APIインターフェースを定義します。

```typescript
interface SetConfig {
  getConfig: () => SimulateConfig;
  setConfig: (obj: SimulateConfig) => void;
}
interface SimulateConfig {
  wait: number;
}
const serve: ((obj: object) => void) | SetConfig;
```

使用法

```js
/* APIインターフェースを構成します */
serve({
  "/getById": { // リクエストパスを設定
    type: 'get', // リクエストのタイプを設定（例：post、get）
    response({ url, type, params, data }) {
      /* 
        入力パラメータを介してリクエストパラメータにアクセスできます
        url: リクエストURL
        type: リクエストのタイプ
        params: リクエストのURLパラメータ
        data: リクエストのボディパラメータ（通常、POSTリクエストで使用可能）
      */
    }
  }
});

/* Simulateのクエリと構成 */
serve.setConfig({
  wait: 1000 // リクエストの応答時間を1秒に設定
});
serve.getConfig(); // 構成情報を取得
// { wait: 1000 }
```

#### int

指定された桁数のランダムな整数を生成します。

`int: (n: string | number) => number`

```js
int(3); // 3桁のランダムな整数を生成
```

#### fixed

整数部および小数部の桁数を指定してランダムな小数を生成します。デフォルトの小数部の桁数は2です。

`fixed: (n: string | number, f?: string | number) => string`

```js
fixed(8, 3); // 8桁の整数部と3桁の小数部を持つランダムな小数を生成
```

#### id

一意で重複しないランダムな文字列を生成します。

`id: () => string`

```js
id();
```

#### img

ランダムなグリッド画像を生成し、Base64形式で返します。幅、高さ、および色を指定できます。幅と高さが指定されていない場合、デフォルトは512で、色はランダムに生成されます。

`img: (width?: number, height?: number, color?: string) => string`

```js
img(256, 256, '#f00'); // 色は16進数文字列とRGB関数文字列をサポートします
```

![img()](https://github.com/omlou/simulate/assets/73682875/34e30e69-923c-4f40-8a31-f33d57713a36)