### Introduction

* A pure front-end tool for simulating back-end API interfaces.
* Supports both XMLHttpRequest and fetch requests.
* Can also be used in Node.js projects after bundling.

### Usage

#### Using in a traditional project

```html
<script src="https://unpkg.com/@xlou/simulate@1.0.7/dist/umd/simulate.min.js"></script>
<!-- It is recommended to download and use the file -->
<script>
  /* After importing this JS file, the Simulate object will be assigned to the window */
  Simulate.serve({
    "/updateById":{
      type:'post',
      response({data}){
        return {
          code:200,
          data:{
            id:data.id
          }
        }
      }
    }
  })
</script>
```

#### Using in Vue, React, Angular, and other Node.js projects

Installation

``` bash
npm i @xlou/simulate -S
```

Usage in main.js / main.ts

``` javascript
import {serve} from '@xlou/simulate'

serve({
  "/getById":{
    type:'get',
    response({params}){
      return {
        code:200,
        data:{
          id:params.id
        }
      }
    }
  },
  "/updateById":{
    type:'post',
    response({data}){
      return {
        code:200,
        data:{
          id:data.id
        }
      }
    }
  }
})
```

### API

#### serve

Defines API interfaces.

```typescript
interface SetConfig {
  getConfig:()=>SimulateConfig
  setConfig:(obj:SimulateConfig)=>void
}
interface SimulateConfig {
  wait:number
}
const serve:((obj:object)=>void)|SetConfig
```

Usage

```js
/* Configure API interfaces */
serve({
  "/getById":{ // Set the request path
    type:'get', // Set the request type, e.g., post, get
    response({url,type,params,data}){
      /* 
        You can retrieve the request parameters using the input parameters
        url: Request URL
        type: Request type
        params: URL parameters of the request
        data: Body parameters of the request (usually for POST requests)
      */
    }
  }
})

/* Query and configure Simulate */
serve.setConfig({
  wait:1000 // Set the response time for requests to 1 second
})
serve.getConfig() // Get the configuration information
// { wait: 1000 }
```

#### int

Outputs a random integer with the specified number of digits.

`int:(n:string|number)=>number`

```js
int(3) // Outputs a random integer with 3 digits
```

#### fixed

Outputs a random decimal number with the specified number of integer and decimal digits. If the number of decimal digits is not specified, it defaults to 2.

`fixed:(n:string|number,f?:string|number)=>string`

```js
fixed(8,3) // Outputs a random decimal number with 8 digits before the decimal point and 3 decimal digits
```

#### id

Generates a unique and non-repetitive random string.

`id:()=>string`

```js
id()
```

#### img

Generates a random grid image and returns it in Base64 format. You can specify the width, height, and color. If width and height are not specified, they default to 512. The color is random by default.

`img:(width?:number,height?:number,color?:string)=>string`

```js
img(256,256,'#f00') // The color supports hexadecimal strings and rgb function strings
```

![img()](https://github.com/omlou/simulate/assets/73682875/34e30e69-923c-4f40-8a31-f33d57713a36)