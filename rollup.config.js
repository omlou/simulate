import terser from "@rollup/plugin-terser"
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const name="simulate"
const globalName="Simulate"
const {NODE_ENV}=process.env
const commonPlugins=[
  resolve(),
  commonjs(),
  typescript()
]

const config=[
  {
    input:"src/main.ts",
    output:[
      {
        file:`dist/umd/${name}.js`,
        format:'umd',
        name:globalName,
      },
      {
        file:`dist/umd/${name}.min.js`,
        format:'umd',
        name:globalName,
        sourcemap:true,
        plugins: [terser()]
      },
      {
        file:`dist/es/${name}.js`,
        format:'es'
      },
      {
        file:`dist/es/${name}.min.js`,
        format:'es',
        sourcemap:true,
        plugins: [terser()]
      }
    ],
    plugins: commonPlugins
  }
]
if(NODE_ENV==="development"){
  config.push({
    input:"src/app.ts",
    output:[
      {
        file:`docs/app.js`,
        format:'umd'
      },
      {
        file:`docs/app.min.js`,
        format:'umd',
        sourcemap:true,
        plugins: [terser()]
      }
    ],
    plugins: commonPlugins
  })
}

export default config