(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */


    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var e=function(){return e=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},e.apply(this,arguments)};function t(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,a=r.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(n=a.next()).done;)i.push(n.value);}catch(e){o={error:e};}finally{try{n&&!n.done&&(r=a.return)&&r.call(a);}finally{if(o)throw o.error}}return i}function r(e,t,r){if(r||2===arguments.length)for(var n,o=0,a=t.length;o<a;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))}var o={filterObject:function(e,t,r){var n={};if(null==t)return Object.assign(n,e);var o=t.split(",");if(void 0===r&&(r=!0),r)for(let t of o)e[t]&&(n[t]=e[t]);else {Object.assign(n,e);for(let e of o)Reflect.deleteProperty(n,e);}return n},deepCopy:function e(t){let r="Array"===t.constructor.name?[]:{};for(let n in t)"object"==typeof t[n]&&null!==t[n]?(r[n]="Array"===t[n].constructor.name?[]:{},r[n]=e(t[n])):r[n]=t[n];return r},getQuery:function(e=window.location.href){var t={},r=e.indexOf("?");if(-1===r)return t;var n=e.slice(r+1);return ""===n||n.split("&").map((e=>{let r=e.split("=");t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]);})),t},queryString:function(e,t=!0){var r=[];for(let t in e)null!==e[t]&&void 0!==e[t]||(e[t]=""),r.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));var n=r.join("&");return n&&t?"?"+n:n},toFixed:function(e,t){if(void 0===e)return;let r=Number(e);if(isNaN(r))throw "argument for toFixed error";if(r>Math.pow(10,21))return String(r);let n=Number(t);if(void 0===t||0==n)return String(Math.round(r));if(isNaN(n))throw "The argument of C.toFixed must be a number";if(n>20||n<0)throw "The second argument of C.toFixed must be between 0 and 20";let o=String(r),a=o.split(".");if(a.length<2){o+=".";for(let e=0;e<n;e++)o+="0";return o}let i=a[0],c=a[1];if(c.length==n)return o;if(c.length<n){for(let e=0;e<n-c.length;e++)o+="0";return o}o=i+"."+c.slice(0,n);let f=c.slice(n,n+1);if(parseInt(f,10)>=5){let e=10**n;o=(parseFloat(o)*e+1)/e,o=o.toFixed(n);}return o},formSubmit:function(e){var{document:t}=window,r=t.createElement("form"),{data:n}=e;Reflect.deleteProperty(e,"data");for(let t in e)e[t]&&(r[t]=e[t]);r.style.display="none";for(let e in n){let o=t.createElement("input");o.setAttribute("type","hidden"),o.setAttribute("name",e),o.value=n[e],r.appendChild(o);}t.body.appendChild(r),r.submit();},readText:function(e){return new Promise(((t,r)=>{let n=new XMLHttpRequest;n.onload=e=>{t(n.response);},n.onerror=e=>{r(e);},n.open("GET",e,!0),n.send();}))},readJSON:function(e){return new Promise(((t,r)=>{let n=new XMLHttpRequest;n.onload=e=>{t(JSON.parse(n.response));},n.onerror=e=>{r(e);},n.open("GET",e,!0),n.send();}))},getStore:function(e){var t=localStorage.getItem(e);if("string"==typeof t)try{t=JSON.parse(t);}catch(e){}return t},setStore:function(e,t){if("object"==typeof t&&null!==t)try{t=JSON.stringify(t);}catch(e){}localStorage.setItem(e,t);},unid:function(){return parseInt(1e14*Math.random()).toString(36)+Date.now().toString(36)},colorRGB:function(e){var t=e.toLowerCase(),r=[];if(/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)){if(4===t.length){for(var n="#",o=1;o<4;o+=1)n+=t.slice(o,o+1).concat(t.slice(o,o+1));t=n;}for(o=1;o<7;o+=2)r.push(parseInt("0x"+t.slice(o,o+2)));return r}if(/^(rgb\(|RGB\()[\s\S]+\)/.test(t))return (r=t.replace(/( |\(|\)|rgb|RGB)+/g,"").split(",")).map(Number)},Base64:new function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";this.encode=function(r){var n,o,a,i,c,f,l,u="",s=0;for(r=t(r);s<r.length;)i=(n=r.charCodeAt(s++))>>2,c=(3&n)<<4|(o=r.charCodeAt(s++))>>4,f=(15&o)<<2|(a=r.charCodeAt(s++))>>6,l=63&a,isNaN(o)?f=l=64:isNaN(a)&&(l=64),u=u+e.charAt(i)+e.charAt(c)+e.charAt(f)+e.charAt(l);return u},this.decode=function(t){var n,o,a,i,c,f,l="",u=0;for(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"");u<t.length;)n=e.indexOf(t.charAt(u++))<<2|(i=e.indexOf(t.charAt(u++)))>>4,o=(15&i)<<4|(c=e.indexOf(t.charAt(u++)))>>2,a=(3&c)<<6|(f=e.indexOf(t.charAt(u++))),l+=String.fromCharCode(n),64!=c&&(l+=String.fromCharCode(o)),64!=f&&(l+=String.fromCharCode(a));return r(l)};var t=function(e){e=e.replace(/\r\n/g,"\n");for(var t="",r=0;r<e.length;r++){var n=e.charCodeAt(r);n<128?t+=String.fromCharCode(n):n>127&&n<2048?(t+=String.fromCharCode(n>>6|192),t+=String.fromCharCode(63&n|128)):(t+=String.fromCharCode(n>>12|224),t+=String.fromCharCode(n>>6&63|128),t+=String.fromCharCode(63&n|128));}return t},r=function(e){for(var t="",r=0,n=0,o=0,a=0;r<e.length;)(n=e.charCodeAt(r))<128?(t+=String.fromCharCode(n),r++):n>191&&n<224?(o=e.charCodeAt(r+1),t+=String.fromCharCode((31&n)<<6|63&o),r+=2):(o=e.charCodeAt(r+1),a=e.charCodeAt(r+2),t+=String.fromCharCode((15&n)<<12|(63&o)<<6|63&a),r+=3);return t};}};function a(e,t){void 0===t&&(t=2),e=Number(e),t=Number(t);var r=String(Math.random()).split(".")[1],n="";if(1===e)n=r.slice(0,1),r=r.slice(1);else {var o=r.match(new RegExp("([1-9]\\d{".concat(e-1,"})(\\d*)")));null!==o&&(n=o[1],r=o[2]);}return 0===t?n:n+"."+r.slice(0,t)}function i(e){e=Number(e);var t=String(Math.random()).split(".")[1].match(new RegExp("[1-9]\\d{".concat(e-1,"}")))||["0"];return parseInt(t[0])}var c=o.unid;function f(e,r,n){if(void 0===e&&(e=512),void 0===r&&(r=512),!document)throw "Function img is only supported in the browser environment";var a=document.createElement("canvas"),i=a.getContext("2d"),c=t(n?o.colorRGB(n):[256*Math.random(),256*Math.random(),256*Math.random()],3),f=c[0],l=c[1],u=c[2];if(a.width=e,a.height=r,!i)throw "Canvas creation failed";i.beginPath(),i.fillStyle="rgba(".concat(f,",").concat(l,",").concat(u,",0.2)");for(var s=e/5,p=r/5,d=0;d<=4*s;d+=2*s)i.rect(d,0,s,r);i.fill(),i.beginPath(),i.fillStyle="rgba(".concat(f,",").concat(l,",").concat(u,",0.4)");for(d=s;d<=3*s;d+=2*s)i.rect(d,0,s,r);i.fill(),i.beginPath(),i.fillStyle="rgba(".concat(f,",").concat(l,",").concat(u,",0.4)");for(d=0;d<=4*p;d+=2*p)i.rect(0,d,e,p);i.fill(),i.beginPath(),i.fillStyle="rgba(".concat(f,",").concat(l,",").concat(u,",0.2)");for(d=p;d<=3*p;d+=2*p)i.rect(0,d,e,p);return i.fill(),a.toDataURL()}var l={wait:500};function u(n){var a=l.wait,i=window.fetch;window.fetch=function(){console.log("arguments",arguments);var c=arguments[0],f=arguments[1]||{method:"get",body:null},l=f.method,u=f.body,s=c.split("?")[0],p=o.getQuery(c);l=l.toUpperCase();var d=function(t){var r=n[t];if(r.type=(r.type||"get").toUpperCase(),t===s&&l===r.type){if(u)try{u=JSON.parse(u);}catch(e){u=o.getQuery(u);}var i=r.response({params:p,type:l,url:s,data:u}),f={ok:!0,status:200,statusText:"OK",url:c,type:"basic",redirected:!1,headers:new Headers,text:function(){return new Promise((function(e){e(i);}))},json:function(){return new Promise((function(e){e(i);}))},clone:function(){return e({},f)}};return {value:new Promise((function(e){setTimeout((function(){e(f);}),a||0);}))}}};for(var h in n){var g=d(h);if("object"==typeof g)return g.value}return i.apply(void 0,r([],t(arguments),!1))},XMLHttpRequest.prototype.serviceOpen=XMLHttpRequest.prototype.open,XMLHttpRequest.prototype.open=function(){var e=t(arguments,2),a=e[0],i=e[1],c=i.split("?")[0],f=o.getQuery(i);for(var l in a=a.toUpperCase(),n){var u=n[l];if(u.type=(u.type||"get").toUpperCase(),l===c&&a===u.type){Object.defineProperty(this,"__SIMULATE_SERVICE_OBJECT__",{configurable:!0,value:{isService:!0,itemFunc:u.response,type:a,pathname:c,params:f}});break}}this.serviceOpen.apply(this,r([],t(arguments),!1));},XMLHttpRequest.prototype.serviceSend=XMLHttpRequest.prototype.send,XMLHttpRequest.prototype.send=function(){var e=this,n=this.__SIMULATE_SERVICE_OBJECT__;if(n){var i=arguments[0],c=n.params,f=n.pathname,l=n.type,u=n.itemFunc;if(i)try{i=JSON.parse(i);}catch(e){i=o.getQuery(i);}var s=u({params:c,type:l,url:f,data:i});Object.defineProperty(this,"responseText",{configurable:!0,value:s}),Object.defineProperty(this,"responseXML",{configurable:!0,value:s}),Object.defineProperty(this,"response",{configurable:!0,value:s}),Object.defineProperty(this,"status",{configurable:!0,value:200}),Object.defineProperty(this,"statusText",{configurable:!0,value:"OK"}),setTimeout((function(){e.dispatchEvent(new Event("load"));}),a||0);}else this.serviceSend.apply(this,r([],t(arguments),!1));};}u.getConfig=function(){return e({},l)},u.setConfig=function(e){Object.assign(l,e);};

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var clearAjax_min = {exports: {}};

    (function (module, exports) {
    	!function(e,t){module.exports=t();}(commonjsGlobal,(function(){function e(e){let t=[];if(e instanceof Object)for(let o in e)t.push(encodeURIComponent(o)+"="+encodeURIComponent(e[o]));return t.join("&")}return {ajax:function(t){return new Promise((function(o,r){var n=new XMLHttpRequest;n.addEventListener("load",(e=>{if(t.getResponse){var s={},a=n.getAllResponseHeaders().split("\r\n");for(let e of a){let t=e.split(": ");t[0]&&(s[t[0]]=t[1]);}t.getResponse(s);}var{status:d}=n;200==d?o(n.response):r({status:d,result:n,error:e});})),n.addEventListener("error",(e=>{r({status:n.status,result:n,error:e});})),n.addEventListener("timeout",(e=>{r({status:n.status,result:n,error:e});})),t.uploadProgress&&(n.upload.addEventListener("loadstart",(e=>{t.uploadProgress(e);})),n.upload.addEventListener("progress",(e=>{t.uploadProgress(e);})),n.upload.addEventListener("load",(e=>{t.uploadProgress(e);})),n.upload.addEventListener("loadend",(e=>{t.uploadProgress(e);})),n.upload.addEventListener("error",(e=>{t.uploadProgress(e);})));t.downloadProgress&&(n.addEventListener("loadstart",(e=>{t.downloadProgress(e);})),n.addEventListener("progress",(e=>{t.downloadProgress(e);})),n.addEventListener("loadend",(e=>{t.downloadProgress(e);})));var s=t.method,{url:a,params:d={},data:i={},headers:p,timeout:u,responseType:l,withCredentials:c}=t,f=!1;s=s?s.toUpperCase():"GET";new Set(["GET","DELETE","HEAD","OPTIONS","TRACE"]).has(s)&&(f=!0);a+=function(t,o){if(!o)return "";var r=o instanceof Object?e(o):o;return -1!==t.indexOf("?")?"&"+r:"?"+r}(a,d),n.open(s,a,!0),void 0!==c&&(n.withCredentials=c);n.responseType=l||"json";for(let e in p)n.setRequestHeader(e,p[e]),e=e.toLowerCase();p&&p["content-type"]||"FormData"==i.constructor.name?p&&p["content-type"]&&-1!==p["content-type"].indexOf("application/json")&&i instanceof Object&&(i=JSON.stringify(i)):n.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=UTF-8");n.timeout=u||6e4,n.send(f?null:function(t){return t?"string"==typeof t||t instanceof FormData?t:e(t):null}(i));}))}}})); 
    } (clearAjax_min));

    var clearAjax_minExports = clearAjax_min.exports;

    u({
        "/getData": {
            type: 'post',
            response: function (q) {
                console.log("simulate", q);
                return {
                    code: 200
                };
            }
        }
    });
    var image = f(256, 100, 'rgb(255,0,0)');
    console.log(image, i(3), c(), a(7));
    window.onload = function () {
        app.innerHTML = "<img src=\"".concat(image, "\"/>");
    };
    clearAjax_minExports.ajax({
        method: 'get',
        url: '/getData?id=12'
    })
        .then(function (res) {
        console.log("ajax", res);
    });
    fetch("/getData?id=12", {
        method: "post",
        body: JSON.stringify({ a: 1 })
    })
        .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _b = (_a = console).log;
                    _c = ["fetch1", res];
                    return [4 /*yield*/, res.json()];
                case 1:
                    _b.apply(_a, _c.concat([_g.sent()]));
                    _e = (_d = console).log;
                    _f = ["fetch1clone", res.clone()];
                    return [4 /*yield*/, res.clone().json()];
                case 2:
                    _e.apply(_d, _f.concat([_g.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    // fetch("/getData?id=13")
    // .then(async res=>{
    //   console.log("fetch2",res,await res.json())
    // })

}));
