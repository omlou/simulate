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
export const Service=function(obj){
  var {wait}=Service.config
  XMLHttpRequest.prototype.serviceOpen=XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open=function(){
    var [type,url]=arguments
    var pathname=url.split('?')[0]
    var params=getAllQuery(url.split('?')[1])
    type=type.toUpperCase()
    for(let i in obj){
      let item=obj[i]
      item.type=item.type.toUpperCase()
      if(i===pathname&&type===item.type){
        Object.defineProperty(this,'_servicestoreobject',{
          configurable:true,
          value:{
            isService:true,
            itemFunc:item.method,
            type,pathname,params
          }
        })
      }
    }
    this.serviceOpen(...arguments)
  }
  XMLHttpRequest.prototype.serviceSend=XMLHttpRequest.prototype.send
  XMLHttpRequest.prototype.send=function(){
    if(this._servicestoreobject){
      var obj=arguments[0]
      var {params,pathname,type,itemFunc}=this._servicestoreobject
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
      this.serviceSend(...arguments)
    }
  }
}
/**
 * Developed by xiaolou On Jun 02 2021
 */