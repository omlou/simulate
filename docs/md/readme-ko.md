### 언어

* [English](https://github.com/omlou/simulate#readme)
* [简体中文](https://github.com/omlou/simulate/blob/master/docs/md/readme-zh.md)
* [日本語](https://github.com/omlou/simulate/blob/master/docs/md/readme-ja.md)
* [한국어](https://github.com/omlou/simulate/blob/master/docs/md/readme-ko.md)
* [Français](https://github.com/omlou/simulate/blob/master/docs/md/readme-fr.md)

### 소개

* 백엔드 API 인터페이스를 시뮬레이션하는 순수 프런트엔드 도구입니다.
* XMLHttpRequest 및 fetch 요청을 지원합니다.
* 번들링 후에 Node.js 프로젝트에서 사용할 수 있습니다.

### 사용 방법

#### 스크립트 태그 사용

```html
<script src="https://unpkg.com/@xlou/simulate@1.0.8/dist/umd/simulate.min.js"></script>
<!-- JS 파일을 로컬로 다운로드하고 사용하는 것이 좋습니다. -->
<script>
  /* 이 JS 파일을 포함한 후에 Simulate 객체가 window에 할당됩니다. */
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

#### Node.js 및 모듈화된 프로젝트에서 사용

설치

```bash
npm i @xlou/simulate -S
```

임포트

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

API 인터페이스를 정의합니다.

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

사용 방법

```js
/* API 인터페이스를 구성합니다. */
serve({
  "/getById": { // 요청 경로 설정
    type: 'get', // 요청 타입 설정, 예: post, get
    response({ url, type, params, data }) {
      /* 
        입력 매개변수를 통해 요청 매개변수에 액세스할 수 있습니다.
        url: 요청 URL
        type: 요청 타입
        params: 요청의 URL 매개변수
        data: 요청의 본문 매개변수 (일반적으로 POST 요청에 사용 가능)
      */
    }
  }
});

/* Simulate 구성 및 쿼리 */
serve.setConfig({
  wait: 1000 // 요청의 응답 시간을 1초로 설정
});
serve.getConfig(); // 구성 정보 가져오기
// { wait: 1000 }
```

#### int

지정된 자릿수의 무작위 정수를 생성합니다.

`int: (n: string | number) => number`

```js
int(3); // 3 자릿수의 무작위 정수 생성
```

#### fixed

정수 및 소수 자릿수를 지정하여 무작위 소수를 생성합니다. 기본 소수 자릿수는 2입니다.

`fixed: (n: string | number, f?: string | number) => string`

```js
fixed(8, 3); // 8 자릿수의 정수 부분과 3 자릿수의 소수 부분을 가지는 무작위 소수 생성
```

#### id

고유하고 중복되지 않는 무작위 문자열을 생성합니다.

`id: () => string`

```js
id();
```

#### img

무작위 격자 이미지를 생성하고 Base64 형식으로 반환합니다. 폭, 높이 및 색상을 지정할 수 있습니다. 폭과 높이가 지정되지 않은 경우 기본값은 512이며, 색상은 무작위로 생성됩니다.

`img: (width?: number, height?: number, color?: string) => string`

```js
img(256, 256, '#f00'); // 색상은 16진수 문자열 및 RGB 함수 문자열을 지원합니다.
```

![img()](https://github.com/omlou/simulate/assets/73682875/34e30e69-923c-4f40-8a31-f33d57713a36)