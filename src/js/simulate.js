(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function(e,t){"object"==typeof module&&"object"==typeof module.exports?module.exports=t():"object"==typeof exports?exports=t():"object"==typeof e?(e.tools=t(),e.Base64=t().Base64):"object"==typeof window?(window.tools=t(),window.Base64=t().Base64):console.warn("webtools startup failure.")}(this,(function(){return{filterObject:function(e,t,r){var o={};if(null==t)return Object.assign(o,e);var n=t.split(",");if(void 0===r&&(r=!0),r)for(let t of n)e[t]&&(o[t]=e[t]);else{Object.assign(o,e);for(let e of n)Reflect.deleteProperty(o,e)}return o},deepCopy:function e(t){let r="Array"===t.constructor.name?[]:{};for(let o in t)"object"==typeof t[o]&&null!==t[o]?(r[o]="Array"===t[o].constructor.name?[]:{},r[o]=e(t[o])):r[o]=t[o];return r},getQuery:function(e=window.location.href){var t={},r=e.indexOf("?");if(-1===r)return t;var o=e.slice(r+1);return""===o||o.split("&").map((e=>{let r=e.split("=");t[decodeURIComponent(r[0])]=decodeURIComponent(r[1])})),t},queryString:function(e,t=!0){var r=[];for(let t in e)null!==e[t]&&void 0!==e[t]||(e[t]=""),r.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));var o=r.join("&");return o&&t?"?"+o:o},toFixed:function(e,t){if(void 0===e)return;let r=Number(e);if(isNaN(r))throw"argument for toFixed error";if(r>Math.pow(10,21))return String(r);let o=Number(t);if(void 0===t||0==o)return String(Math.round(r));if(isNaN(o))throw"The argument of C.toFixed must be a number";if(o>20||o<0)throw"The second argument of C.toFixed must be between 0 and 20";let n=String(r),i=n.split(".");if(i.length<2){n+=".";for(let e=0;e<o;e++)n+="0";return n}let a=i[0],f=i[1];if(f.length==o)return n;if(f.length<o){for(let e=0;e<o-f.length;e++)n+="0";return n}n=a+"."+f.slice(0,o);let c=f.slice(o,o+1);if(parseInt(c,10)>=5){let e=10**o;n=(parseFloat(n)*e+1)/e,n=n.toFixed(o)}return n},formSubmit:function(e){var{document:t}=window,r=t.createElement("form"),{data:o}=e;Reflect.deleteProperty(e,"data");for(let t in e)e[t]&&(r[t]=e[t]);r.style.display="none";for(let e in o){let n=t.createElement("input");n.setAttribute("type","hidden"),n.setAttribute("name",e),n.value=o[e],r.appendChild(n)}t.body.appendChild(r),r.submit()},readText:function(e){return new Promise(((t,r)=>{let o=new XMLHttpRequest;o.onload=e=>{t(o.response)},o.onerror=e=>{r(e)},o.open("GET",e,!0),o.send()}))},readJSON:function(e){return new Promise(((t,r)=>{let o=new XMLHttpRequest;o.onload=e=>{t(JSON.parse(o.response))},o.onerror=e=>{r(e)},o.open("GET",e,!0),o.send()}))},getStore:function(e){var t=localStorage.getItem(e);if("string"==typeof t)try{t=JSON.parse(t)}catch(e){}return t},setStore:function(e,t){if("object"==typeof t&&null!==t)try{t=JSON.stringify(t)}catch(e){}localStorage.setItem(e,t)},unid:function(){return parseInt(1e14*Math.random()).toString(36)+Date.now().toString(36)},colorRGB:function(e){var t=e.toLowerCase(),r=[];if(/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)){if(4===t.length){for(var o="#",n=1;n<4;n+=1)o+=t.slice(n,n+1).concat(t.slice(n,n+1));t=o}for(n=1;n<7;n+=2)r.push(parseInt("0x"+t.slice(n,n+2)));return r}if(/^(rgb\(|RGB\()[\s\S]+\)/.test(t))return(r=t.replace(/( |\(|\)|rgb|RGB)+/g,"").split(",")).map(Number)},Base64:new function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";this.encode=function(r){var o,n,i,a,f,c,l,u="",d=0;for(r=t(r);d<r.length;)a=(o=r.charCodeAt(d++))>>2,f=(3&o)<<4|(n=r.charCodeAt(d++))>>4,c=(15&n)<<2|(i=r.charCodeAt(d++))>>6,l=63&i,isNaN(n)?c=l=64:isNaN(i)&&(l=64),u=u+e.charAt(a)+e.charAt(f)+e.charAt(c)+e.charAt(l);return u},this.decode=function(t){var o,n,i,a,f,c,l="",u=0;for(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"");u<t.length;)o=e.indexOf(t.charAt(u++))<<2|(a=e.indexOf(t.charAt(u++)))>>4,n=(15&a)<<4|(f=e.indexOf(t.charAt(u++)))>>2,i=(3&f)<<6|(c=e.indexOf(t.charAt(u++))),l+=String.fromCharCode(o),64!=f&&(l+=String.fromCharCode(n)),64!=c&&(l+=String.fromCharCode(i));return l=r(l)};var t=function(e){e=e.replace(/\r\n/g,"\n");for(var t="",r=0;r<e.length;r++){var o=e.charCodeAt(r);o<128?t+=String.fromCharCode(o):o>127&&o<2048?(t+=String.fromCharCode(o>>6|192),t+=String.fromCharCode(63&o|128)):(t+=String.fromCharCode(o>>12|224),t+=String.fromCharCode(o>>6&63|128),t+=String.fromCharCode(63&o|128))}return t},r=function(e){for(var t="",r=0,o=0,n=0,i=0;r<e.length;)(o=e.charCodeAt(r))<128?(t+=String.fromCharCode(o),r++):o>191&&o<224?(n=e.charCodeAt(r+1),t+=String.fromCharCode((31&o)<<6|63&n),r+=2):(n=e.charCodeAt(r+1),i=e.charCodeAt(r+2),t+=String.fromCharCode((15&o)<<12|(63&n)<<6|63&i),r+=3);return t}}}}));
},{}],2:[function(require,module,exports){
!function(e,t){"object"==typeof module&&"object"==typeof module.exports?module.exports=t():"object"==typeof exports?exports=t():"object"==typeof e?e.ajax=t().ajax:"object"==typeof window?window.ajax=t().ajax:console.warn("clear-ajax startup failure.")}(this,(function(){function e(e){let t=[];if(e instanceof Object)for(let o in e)t.push(encodeURIComponent(o)+"="+encodeURIComponent(e[o]));return t.join("&")}return{ajax:function(t){return new Promise((function(o,r){var n=new XMLHttpRequest;n.addEventListener("load",(e=>{if(t.getResponse){var s={},a=n.getAllResponseHeaders().split("\r\n");for(let e of a){let t=e.split(": ");t[0]&&(s[t[0]]=t[1])}t.getResponse(s)}var{status:d}=n;200==d?o(n.response):r({status:d,result:n,error:e})})),n.addEventListener("error",(e=>{r({status:n.status,result:n,error:e})})),n.addEventListener("timeout",(e=>{r({status:n.status,result:n,error:e})})),t.uploadProgress&&(n.upload.addEventListener("loadstart",(e=>{t.uploadProgress(e)})),n.upload.addEventListener("progress",(e=>{t.uploadProgress(e)})),n.upload.addEventListener("load",(e=>{t.uploadProgress(e)})),n.upload.addEventListener("loadend",(e=>{t.uploadProgress(e)})),n.upload.addEventListener("error",(e=>{t.uploadProgress(e)})));t.downloadProgress&&(n.addEventListener("loadstart",(e=>{t.downloadProgress(e)})),n.addEventListener("progress",(e=>{t.downloadProgress(e)})),n.addEventListener("loadend",(e=>{t.downloadProgress(e)})));var s=t.method,{url:a,params:d={},data:i={},headers:p,timeout:u,responseType:l,withCredentials:c}=t,f=!1;s=s?s.toUpperCase():"GET";new Set(["GET","DELETE","HEAD","OPTIONS","TRACE"]).has(s)&&(f=!0);a+=function(t,o){if(!o)return"";var r=o instanceof Object?e(o):o;return-1!==t.indexOf("?")?"&"+r:"?"+r}(a,d),n.open(s,a,!0),void 0!==c&&(n.withCredentials=c);n.responseType=l||"json";for(let e in p)n.setRequestHeader(e,p[e]),e=e.toLowerCase();p&&p["content-type"]||"FormData"==i.constructor.name?p&&p["content-type"]&&-1!==p["content-type"].indexOf("application/json")&&i instanceof Object&&(i=JSON.stringify(i)):n.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=UTF-8");n.timeout=u||6e4,n.send(f?null:function(t){return t?"string"==typeof t||t instanceof FormData?t:e(t):null}(i))}))}}}));
},{}],3:[function(require,module,exports){
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "@xlou/webtools", "clear-ajax"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.server = exports.img = exports.id = exports["int"] = exports.fixed = void 0;
  var webtools_1 = require("@xlou/webtools");
  var clear_ajax_1 = require("clear-ajax");
  function fixed(n) {
    var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    n = Number(n), f = Number(f);
    var str = String(Math.random()).split('.')[1];
    var one = "";
    var res = "";
    if (n === 1) {
      one = str.slice(0, 1);
      str = str.slice(1);
    } else {
      var match = str.match(new RegExp("([1-9]\\d{".concat(n - 1, "})(\\d*)")));
      if (match !== null) {
        one = match[1];
        str = match[2];
      }
    }
    if (f === 0) {
      res = one;
    } else {
      res = one + "." + str.slice(0, f);
    }
    return res;
  }
  exports.fixed = fixed;
  function _int(n) {
    n = Number(n);
    var str = String(Math.random()).split('.')[1];
    var res = parseInt(str.match(new RegExp("[1-9]\\d{".concat(n - 1, "}")))[0]);
    return res;
  }
  exports["int"] = _int;
  exports.id = webtools_1.unid;
  function img() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 512;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 512;
    var color = arguments.length > 2 ? arguments[2] : undefined;
    if (!document) throw "Function img is only supported in the browser environment";
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var rgb = color ? (0, webtools_1.colorRGB)(color) : [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var _rgb = _slicedToArray(rgb, 3),
      r = _rgb[0],
      g = _rgb[1],
      b = _rgb[2];
    canvas.width = width;
    canvas.height = height;
    /* 纵奇 */
    ctx.beginPath();
    ctx.fillStyle = "rgba(".concat(r, ",").concat(g, ",").concat(b, ",0.2)");
    var wi = width / 5;
    var hi = height / 5;
    for (var i = 0; i <= wi * 4; i = i + 2 * wi) {
      ctx.rect(i, 0, wi, height);
    }
    ctx.fill();
    /* 纵偶 */
    ctx.beginPath();
    ctx.fillStyle = "rgba(".concat(r, ",").concat(g, ",").concat(b, ",0.4)");
    for (var _i2 = wi; _i2 <= wi * 3; _i2 = _i2 + 2 * wi) {
      ctx.rect(_i2, 0, wi, height);
    }
    ctx.fill();
    /* 横奇 */
    ctx.beginPath();
    ctx.fillStyle = "rgba(".concat(r, ",").concat(g, ",").concat(b, ",0.4)");
    for (var _i3 = 0; _i3 <= hi * 4; _i3 = _i3 + 2 * hi) {
      ctx.rect(0, _i3, width, hi);
    }
    ctx.fill();
    /* 横偶 */
    ctx.beginPath();
    ctx.fillStyle = "rgba(".concat(r, ",").concat(g, ",").concat(b, ",0.2)");
    for (var _i4 = hi; _i4 <= hi * 3; _i4 = _i4 + 2 * hi) {
      ctx.rect(0, _i4, width, hi);
    }
    ctx.fill();
    /*
      ctx.beginPath() // 画文字
      ctx.fillStyle="#fff"
      ctx.font=`bold ${0.17*width}px 'Source Han Sans CN'`
      var str=String(Math.random()).split('.')[1]
      var res=parseInt(str.match(new RegExp(`[1-9]\\d{7}`))[0])
      ctx.fillText(res,0.12*width,0.5*height+0.06*width)
    */
    return canvas.toDataURL();
  }
  exports.img = img;
  var serverConfig = {
    wait: 500
  };
  function server(obj) {
    var wait = serverConfig.wait;
    XMLHttpRequest.prototype.serviceOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function () {
      var _arguments = Array.prototype.slice.call(arguments),
        type = _arguments[0],
        url = _arguments[1];
      var pathname = url.split('?')[0];
      var params = (0, webtools_1.getQuery)(url);
      type = type.toUpperCase();
      for (var i in obj) {
        var item = obj[i];
        item.type = item.type.toUpperCase();
        if (i === pathname && type === item.type) {
          Object.defineProperty(this, '_servicestoreobject', {
            configurable: true,
            value: {
              isService: true,
              itemFunc: item.method,
              type: type,
              pathname: pathname,
              params: params
            }
          });
        }
      }
      this.serviceOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.serviceSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function () {
      var _this = this;
      if (this._servicestoreobject) {
        var obj = arguments[0];
        var _this$_servicestoreob = this._servicestoreobject,
          params = _this$_servicestoreob.params,
          pathname = _this$_servicestoreob.pathname,
          type = _this$_servicestoreob.type,
          itemFunc = _this$_servicestoreob.itemFunc;
        if (obj) {
          try {
            obj = JSON.parse(obj);
          } catch (err) {
            obj = (0, webtools_1.getQuery)(obj);
          }
        }
        var response = itemFunc({
          params: params,
          type: type,
          url: pathname,
          data: obj
        });
        Object.defineProperty(this, 'responseText', {
          configurable: true,
          value: response
        });
        Object.defineProperty(this, 'responseXML', {
          configurable: true,
          value: response
        });
        Object.defineProperty(this, 'response', {
          configurable: true,
          value: response
        });
        Object.defineProperty(this, 'status', {
          configurable: true,
          value: 200
        });
        Object.defineProperty(this, 'statusText', {
          configurable: true,
          value: "OK"
        });
        if (wait) {
          setTimeout(function () {
            _this.dispatchEvent(new Event('load'));
          }, wait);
        } else {
          this.dispatchEvent(new Event('load'));
        }
      } else {
        this.serviceSend.apply(this, arguments);
      }
    };
  }
  exports.server = server;
  server.getConfig = function () {
    return _objectSpread({}, serverConfig);
  };
  server.setConfig = function (obj) {
    Object.assign(serverConfig, obj);
  };
  if (window) window.simulate = {
    fixed: fixed,
    "int": _int,
    id: exports.id,
    img: img,
    server: server
  };
  server({
    "/server/getdata": {
      type: 'post',
      method: function method(_ref) {
        var params = _ref.params;
        return params;
      }
    }
  });
  (0, clear_ajax_1.ajax)({
    method: 'post',
    url: "/server/getdata",
    params: {
      id: 5
    }
  }).then(function (res) {
    console.log(res);
  });
});

},{"@xlou/webtools":1,"clear-ajax":2}]},{},[3]);
