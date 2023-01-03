var {src,dest,watch,series,parallel}=require('gulp')
var uglify=require('gulp-uglify-es').default
var rename=require('gulp-rename')
var del=require('del')
var webserver=require('gulp-webserver')
// var babel = require("gulp-babel")
// var browserify=require('gulp-browserify')
var browserify=require('browserify')
// var babelify=require('babelify')
// var tsify=require('tsify')
var source=require('vinyl-source-stream')
var buffer=require('vinyl-buffer')
var ts=require('gulp-typescript')

const delTask=function(){
  return del(['dist/'])
}

// const tsTask=function(){
//   return browserify({
//     basedir: 'src/ts',
//     entries: ['index.ts']
//   })
//   .plugin(tsify,{}).bundle()
//   .pipe(source('simulate.js'))
//   .pipe(buffer())
//   .pipe(dest('src/js/'))
// }

const tsProject=ts.createProject('tsconfig.json')
const tsTask=function(){
  return src('src/ts/index.ts')
    .pipe(tsProject())
    .pipe(dest('src/js/'))
}

const jsTask=series(tsTask,delTask,function(){
  return browserify({
    basedir: 'src/js',
    entries: ['index.js']
  }).transform("babelify",{presets:["@babel/preset-env","@babel/preset-react"]})
  .bundle()
  .pipe(source('simulate.js'))
  .pipe(buffer())
  .pipe(dest('src/js/'))
  .pipe(uglify())
  .pipe(rename({suffix:'.min'}))
  .pipe(dest('dist/'))
  
})

const watchTask=function(){
  watch('src/ts/*.ts',jsTask)
}

const serverTask=series(
  jsTask,
  function(){
    return src('./')
      .pipe(webserver({
        host:'127.0.0.1',
        port:'5000',
        livereload:true,
        open:'docs/index.html'
      }))
  },
  watchTask
)

module.exports={
  server:serverTask,
  default:jsTask
}