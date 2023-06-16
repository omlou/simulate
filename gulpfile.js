const webserver=require('gulp-webserver')
const fs=require("fs-extra")

const simplify=async function(){
  const npm=await fs.readJSON('package.json')
  const serve=await fs.readJSON('serve.json')
  for(let i in serve){
    let item=serve[i]
    for(let j in item){
      Reflect.deleteProperty(npm[i],j)
    }
  }
  await fs.writeJSON('package.json',npm)
}

const serve=function(){
  return src('./').pipe(webserver({
    host:'127.0.0.1',
    port:'5000',
    livereload:true,
    open:'docs/index.html'
  }))
}
module.exports={
  serve,simplify
}