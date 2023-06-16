import {img,id} from "./main"
declare let app:any
window.onload=function(){
  app.innerHTML=`<img id="img" src="${img()}" alt="">`
}
console.log(id())