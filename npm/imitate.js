const getAllQuery=(str)=>{
  if(!str)return
  var arr=str.split("&")
  var obj={}
  for(let item of arr){
    let itemarr=item.split("=")
    obj[decodeURIComponent(itemarr[0])]=decodeURIComponent(itemarr[1])
  }
  return obj
}
export const fixed=function(n,f){
  var n=Number(n)
  var dec=f===undefined?2:Number(f);
  var str=String(Math.random()).split('.')[1]
  var one=""
  var res=""
  if(n===1){
    one=str.slice(0,1)
    str=str.slice(1)
  }else{
    var match=str.match(new RegExp(`([1-9]\\d{${n-1}})(\\d*)`))
    one=match[1]
    str=match[2]
  }
  if(dec===0){
    res=one
  }else{
    res=one+"."+str.slice(0,dec)
  }
  return res
}
export const int=function(n){
  n=Number(n)
  var str=String(Math.random()).split('.')[1]
  var res=parseInt(str.match(new RegExp(`[1-9]\\d{${n-1}}`))[0])
  return res
}
export const id=function(){
  return parseInt(Math.random()*10e13).toString(36)+Date.now().toString(36)
}
export const img=function(size,color){

}
export const Imitate=function(obj){
  var config={
    wait:500
  }
  if(Imitate.config)Object.assign(config,Imitate.config)
  var {wait}=config
  XMLHttpRequest.prototype.imitateOpen=XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open=function(){
    var [type,url]=arguments
    var pathname=url.split('?')[0]
    var params=getAllQuery(url.split('?')[1])
    type=type.toUpperCase()
    for(let i in obj){
      let item=obj[i]
      item.type=item.type.toUpperCase()
      if(i===pathname&&type===item.type){
        Object.defineProperty(this,'_imitatestoreobject',{
          configurable:true,
          value:{
            isImitate:true,
            itemFunc:item.method,
            type,pathname,params
          }
        })
      }
    }
    this.imitateOpen(...arguments)
  }
  XMLHttpRequest.prototype.imitateSend=XMLHttpRequest.prototype.send
  XMLHttpRequest.prototype.send=function(){
    if(this._imitatestoreobject){
      var obj=arguments[0]
      var {params,pathname,type,itemFunc}=this._imitatestoreobject
      if(obj){
        try{
          obj=JSON.parse(obj)
        }catch(err){
          obj=getAllQuery(obj)
        }
      }
      var response=itemFunc({
        params,type,
        url:pathname,
        data:obj
      })
      Object.defineProperty(this,'responseText',{configurable:true,value:response})
      Object.defineProperty(this,'responseXML',{configurable:true,value:response})
      Object.defineProperty(this,'response',{configurable:true,value:response})
      Object.defineProperty(this,'status',{configurable:true,value:200})
      Object.defineProperty(this,'statusText',{configurable:true,value:"OK"})
      if(wait){
        setTimeout(()=>{
          this.dispatchEvent(new Event('load'))
        },wait)
      }else{
        this.dispatchEvent(new Event('load'))
      }
    }else{
      this.imitateSend(...arguments)
    }
  }
}
/**
 * Developed by xiaolou On Jun 02 2021
 */