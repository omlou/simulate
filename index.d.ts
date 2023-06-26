declare global{
  interface Window{
    Simulate:Simulate
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

declare interface RequestArgs {
  params:any,
  type:string,
  url:string,
  data:any
}
declare interface ApiOption {
  [prop:string]:{
    type?:string,
    response:(req:RequestArgs)=>any
  }
}
export declare interface Simulate {
  fixed:(n:string|number,f?:string|number)=>string
  int:(n:string|number)=>number
  id:()=>string
  img:(width?:number,height?:number,color?:string)=>string
  serve:((obj:ApiOption)=>void)&SetConfig
}
export declare const fixed:Simulate["fixed"]
export declare const int:Simulate["int"]
export declare const id:Simulate["id"]
export declare const img:Simulate["img"]
export declare const serve:Simulate["serve"]