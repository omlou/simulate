import webserver from 'gulp-webserver'
import fs from 'fs-extra'
import pkg from 'gulp'
import minimist from 'minimist'
import {exec} from 'child_process'
const {src} = pkg
const i18nMap = new Map([
  ["zh","gitee"],
  ["en","github"]
])
const ServeURL = './src/assets/serve.json'

async function simplify(){
  let npm=await fs.readJSON('package.json')
  let serve=await fs.readJSON(ServeURL)
  let options = minimist(process.argv.slice(2), {string: 'host', default: ''})
  /* change package.json */
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
  /* update version */
  if(options.host==="upgrade")npm.version=updateVersion(npm.version)
  function updateVersion(str){
    let arr=str.split(".").map(item=>Number(item))
    let thr=arr[2]+1
    if(thr>=100){
      let two=arr[1]+1
      if(two>=100){
        arr[0]=arr[0]+1
        arr[1]=arr[2]=0
      }else{
        arr[1]=two
        arr[2]=0
      }
    }else{
      arr[2]=thr
    }
    return arr.join(".")
  }
  /* update readme.md */
  await i18n("en")
  await fs.writeJSON('package.json',npm,{spaces:2})
}

async function dev(){
  const npm=await fs.readJSON('package.json')
  const serve=await fs.readJSON(ServeURL)
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

async function push(){
  let options = minimist(process.argv.slice(2), {
    string: ['host', 'port'],
    default: {host: "en", port: ""}
  })
  if(! i18nMap.has(options.host)) options.host = "en"
  await i18n(options.host)
  execFunc(`git add -A && git commit -m "${options.port}" && git push ${i18nMap.get(options.host)} master`)
}

async function i18n(key){
  let options = key? {host: key} : minimist(process.argv.slice(2), {string: 'host', default: 'en'});
  if(! i18nMap.has(options.host)) options.host = "en"
  let i18n = await fs.readFile(`./src/assets/i18n-${options.host}.md`, 'utf8')
  let {version} = await fs.readJSON('package.json')
  i18n = i18n.replace(/\/simulate@\d+\.\d+\.\d+\//g, `/simulate@${version}/`)
  await fs.writeFile('readme.md', i18n)
  return options.host
}

function execFunc(str){
  exec(str, function(err, stdout, stderr){
    if(err === null){
      console.log("Command executed successfully!")
    }else{
      console.log(stdout, stderr)
    }
  })
}

function serve(){
  return src('./').pipe(webserver({
    host:'127.0.0.1',
    port:'5000',
    livereload:true,
    open:'docs/index.html'
  }))
}
export {
  serve,simplify,dev,i18n,push
}