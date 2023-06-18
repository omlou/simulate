import webserver from 'gulp-webserver'
import fs from 'fs-extra'

const simplify=async function(){
  const npm=await fs.readJSON('package.json')
  const serve=await fs.readJSON('serve.json')
  delProp(serve,npm)
  function delProp(obj,target){
    for(let i in obj){
      let item=obj[i]
      if(Array.isArray(item)&&target[i]){
        for(let child of item){
          let index=target[i].findIndex(str=>str===child)
          if(index!==-1)target[i].splice(index,1)
        }
      }else if(typeof(item)==='object'&&target[i]&&item!==null){
        delProp(item,target[i])
      }else{
        Reflect.deleteProperty(target,i)
      }
    }
  }
  await fs.writeJSON('package.json',npm,{spaces:2})
}

const dev=async function(){
  const npm=await fs.readJSON('package.json')
  const serve=await fs.readJSON('serve.json')
  addProp(serve,npm)
  function addProp(obj,target){
    for(let i in obj){
      let item=obj[i]
      if(Array.isArray(item)&&target[i]){
        target[i]=target[i].concat(item)
      }else if(typeof(item)==='object'&&target[i]&&item!==null){
        addProp(item,target[i])
      }else{
        target[i]=item
      }
    }
  }
  await fs.writeJSON('package.json',npm,{spaces:2})
}

const serve=function(){
  return src('./').pipe(webserver({
    host:'127.0.0.1',
    port:'5000',
    livereload:true,
    open:'docs/index.html'
  }))
}
export {
  serve,simplify,dev
}