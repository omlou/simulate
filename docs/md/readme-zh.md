### 语言

* [English](https://github.com/omlou/simulate#readme)
* [简体中文](https://github.com/omlou/simulate/blob/master/docs/md/readme-zh.md)
* [日本語](https://github.com/omlou/simulate/blob/master/docs/md/readme-ja.md)
* [한국어](https://github.com/omlou/simulate/blob/master/docs/md/readme-ko.md)
* [Français](https://github.com/omlou/simulate/blob/master/docs/md/readme-fr.md)

### 介绍

* 纯前端模拟后端 api 接口的工具
* 支持 XMLHttpRequest 和 fetch 请求
* node 项目打包之后也可以使用

### 使用

#### 使用 Script 标签引入

```html
<script src="https://unpkg.com/@xlou/simulate@1.0.8/dist/umd/simulate.min.js"></script>
<!-- 建议下载下来使用 -->
<script>
  /* 引入了该 js 文件后，会在 window 上赋值 Simulate 对象 */
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

#### 在 Node 及模块化项目中使用

安装

``` bash
npm i @xlou/simulate -S
```

引入

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

定义接口 api

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

使用

```js
/* 配置 api 接口 */
serve({
  "/getById":{ // 设置请求路径
    type:'get', // 设置请求类型，如：post、get
    response({url,type,params,data}){
      /* 
        可通过入参获取请求的参数
        url：请求地址
        type：请求类型
        params：请求的 url 参数
        data: 请求的 body 参数，一般 post 请求才有
      */
    }
  }
})

/* 查询和配置 Simulate */
serve.setConfig({
  wait:1000 // 设置请求的响应时间为 1 秒
})
serve.getConfig() // 获取配置信息
// { wait: 1000 }
```

#### int

输出一个指定位数的随机整数

`int:(n:string|number)=>number`

```js
int(3) // 输出一个3位的随机整数
```

#### fixed

输出一个随机的小数，可以指定整数位数和小数位数，小数位数不指定默认为 2

`fixed:(n:string|number,f?:string|number)=>string`

```js
fixed(8,3) // 输出一个整数位数是 8 ，小数位数是 3 位的随机小数
```

#### id

生成一个唯一不重复的随机字符串

`id:()=>string`

```js
id()
```

#### img

生成一张随机的格子图片，返回 Base64 ，可以指定长、宽、颜色，长宽不指定默认为 512 ，颜色默认随机

`img:(width?:number,height?:number,color?:string)=>string`

```js
img(256,256,'#f00') // 颜色支持 16 进制字符串和 rgb 函数字符串
```
![img()](https://github.com/omlou/simulate/assets/73682875/34e30e69-923c-4f40-8a31-f33d57713a36)