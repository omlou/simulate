import { img, id, serve, fixed, int } from "./main"
import ajax from '@xlou/ajax'

declare let app: Element

serve({
  "/getData": {
    type: 'post',
    response(q) {
      console.log("simulate", q)
      return {
        code: 200
      }
    }
  }
})

let image = img(256, 100, 'rgb(255,0,0)')

console.log(image, int(3), id(), fixed(7))

window.onload=()=>{
  app.innerHTML=`<img src="${image}"/>`
}

ajax({
  url: '/getData?id=12'
})
.then(res => {
  console.log("ajax", res)
})

fetch("/getData?id=12", {
  method: "post",
  body: JSON.stringify({ a: 1 })
})
.then(async res => {
  console.log("fetch1", res, await res.json())
})

fetch("/getData?id=13")
.then(async res => {
  console.log("fetch2", res, await res.json())
})