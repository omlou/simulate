declare global{
  interface Window{
    simulate:Simulate
  }
  interface XMLHttpRequest{
    serviceOpen:Function
    serviceSend:Function
  }
}
export declare interface SimulateConfig {
  wait:number
}
declare interface SetConfig {
  getConfig:()=>SimulateConfig
  setConfig:(obj:SimulateConfig)=>void
}
export declare interface Simulate {
  fixed:(n:string|number,f?:string|number)=>string
  int:(n:string|number)=>number
  id:()=>string
  img:(width?:number,height?:number,color?:string)=>string
  server:((obj:object)=>void)|SetConfig
}
export declare const fixed:Simulate["fixed"]
export declare const int:Simulate["int"]
export declare const id:Simulate["id"]
export declare const img:Simulate["img"]
export declare const server:Simulate["server"]