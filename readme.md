### Language

* [English](https://github.com/omlou/simulate#readme)
* [简体中文](https://github.com/omlou/simulate/blob/master/docs/md/readme-zh.md)
* [日本語](https://github.com/omlou/simulate/blob/master/docs/md/readme-ja.md)
* [한국어](https://github.com/omlou/simulate/blob/master/docs/md/readme-ko.md)
* [Français](https://github.com/omlou/simulate/blob/master/docs/md/readme-fr.md)

### Introduction

* A pure front-end tool for simulating backend API interfaces.
* Supports XMLHttpRequest and fetch requests.
* Can be used in Node.js projects after bundling.

### Usage

#### Using Script Tags

```html
<script src="https://unpkg.com/@xlou/simulate@1.0.8/dist/umd/simulate.min.js"></script>
<!-- It is recommended to download and use the JS file locally -->
<script>
  /* After including this JS file, a Simulate object will be assigned to the window */
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

#### Using in Node.js and Modular Projects

Installation

```bash
npm i @xlou/simulate -S
```

Import

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
  }
});
```

### API

#### serve

Define API interfaces.

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

Usage

```js
/* Configure API interfaces */
serve({
  "/getById": { // Set the request path
    type: 'get', // Set the request type, e.g., post, get
    response({ url, type, params, data }) {
      /* 
        You can access the request parameters through the input parameters
        url: Request URL
        type: Request type
        params: URL parameters of the request
        data: Request body parameters (usually available for POST requests)
      */
    }
  }
});

/* Query and configure Simulate */
serve.setConfig({
  wait: 1000 // Set the response time for requests to 1 second
});
serve.getConfig(); // Get configuration information
// { wait: 1000 }
```

#### int

Generate a random integer with a specified number of digits.

`int: (n: string | number) => number`

```js
int(3); // Generate a random integer with 3 digits
```

#### fixed

Generate a random decimal number with the option to specify the number of integer and decimal digits. The default number of decimal digits is 2.

`fixed: (n: string | number, f?: string | number) => string`

```js
fixed(8, 3); // Generate a random decimal number with 8 integer digits and 3 decimal digits
```

#### id

Generate a unique and non-repeating random string.

`id: () => string`

```js
id();
```

#### img

Generate a random grid image and return it in Base64 format. You can specify the width, height, and color. If width and height are not specified, they default to 512, and the color is randomly generated.

`img: (width?: number, height?: number, color?: string) => string`

```js
img(256, 256, '#f00'); // The color supports hexadecimal strings and RGB function strings
```

![img()](https://github.com/omlou/simulate/assets/73682875/34e30e69-923c-4f40-8a31-f33d57713a36)