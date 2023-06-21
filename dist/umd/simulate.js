(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Simulate = {}));
})(this, (function (exports) { 'use strict';

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


    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var webtools_min = {exports: {}};

    (function (module, exports) {
    	!function(e,t){module.exports=t();}(commonjsGlobal,(function(){return {filterObject:function(e,t,r){var o={};if(null==t)return Object.assign(o,e);var n=t.split(",");if(void 0===r&&(r=!0),r)for(let t of n)e[t]&&(o[t]=e[t]);else {Object.assign(o,e);for(let e of n)Reflect.deleteProperty(o,e);}return o},deepCopy:function e(t){let r="Array"===t.constructor.name?[]:{};for(let o in t)"object"==typeof t[o]&&null!==t[o]?(r[o]="Array"===t[o].constructor.name?[]:{},r[o]=e(t[o])):r[o]=t[o];return r},getQuery:function(e=window.location.href){var t={},r=e.indexOf("?");if(-1===r)return t;var o=e.slice(r+1);return ""===o||o.split("&").map((e=>{let r=e.split("=");t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]);})),t},queryString:function(e,t=!0){var r=[];for(let t in e)null!==e[t]&&void 0!==e[t]||(e[t]=""),r.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));var o=r.join("&");return o&&t?"?"+o:o},toFixed:function(e,t){if(void 0===e)return;let r=Number(e);if(isNaN(r))throw "argument for toFixed error";if(r>Math.pow(10,21))return String(r);let o=Number(t);if(void 0===t||0==o)return String(Math.round(r));if(isNaN(o))throw "The argument of C.toFixed must be a number";if(o>20||o<0)throw "The second argument of C.toFixed must be between 0 and 20";let n=String(r),i=n.split(".");if(i.length<2){n+=".";for(let e=0;e<o;e++)n+="0";return n}let a=i[0],f=i[1];if(f.length==o)return n;if(f.length<o){for(let e=0;e<o-f.length;e++)n+="0";return n}n=a+"."+f.slice(0,o);let c=f.slice(o,o+1);if(parseInt(c,10)>=5){let e=10**o;n=(parseFloat(n)*e+1)/e,n=n.toFixed(o);}return n},formSubmit:function(e){var{document:t}=window,r=t.createElement("form"),{data:o}=e;Reflect.deleteProperty(e,"data");for(let t in e)e[t]&&(r[t]=e[t]);r.style.display="none";for(let e in o){let n=t.createElement("input");n.setAttribute("type","hidden"),n.setAttribute("name",e),n.value=o[e],r.appendChild(n);}t.body.appendChild(r),r.submit();},readText:function(e){return new Promise(((t,r)=>{let o=new XMLHttpRequest;o.onload=e=>{t(o.response);},o.onerror=e=>{r(e);},o.open("GET",e,!0),o.send();}))},readJSON:function(e){return new Promise(((t,r)=>{let o=new XMLHttpRequest;o.onload=e=>{t(JSON.parse(o.response));},o.onerror=e=>{r(e);},o.open("GET",e,!0),o.send();}))},getStore:function(e){var t=localStorage.getItem(e);if("string"==typeof t)try{t=JSON.parse(t);}catch(e){}return t},setStore:function(e,t){if("object"==typeof t&&null!==t)try{t=JSON.stringify(t);}catch(e){}localStorage.setItem(e,t);},unid:function(){return parseInt(1e14*Math.random()).toString(36)+Date.now().toString(36)},colorRGB:function(e){var t=e.toLowerCase(),r=[];if(/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)){if(4===t.length){for(var o="#",n=1;n<4;n+=1)o+=t.slice(n,n+1).concat(t.slice(n,n+1));t=o;}for(n=1;n<7;n+=2)r.push(parseInt("0x"+t.slice(n,n+2)));return r}if(/^(rgb\(|RGB\()[\s\S]+\)/.test(t))return (r=t.replace(/( |\(|\)|rgb|RGB)+/g,"").split(",")).map(Number)},Base64:new function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";this.encode=function(r){var o,n,i,a,f,c,l,u="",d=0;for(r=t(r);d<r.length;)a=(o=r.charCodeAt(d++))>>2,f=(3&o)<<4|(n=r.charCodeAt(d++))>>4,c=(15&n)<<2|(i=r.charCodeAt(d++))>>6,l=63&i,isNaN(n)?c=l=64:isNaN(i)&&(l=64),u=u+e.charAt(a)+e.charAt(f)+e.charAt(c)+e.charAt(l);return u},this.decode=function(t){var o,n,i,a,f,c,l="",u=0;for(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"");u<t.length;)o=e.indexOf(t.charAt(u++))<<2|(a=e.indexOf(t.charAt(u++)))>>4,n=(15&a)<<4|(f=e.indexOf(t.charAt(u++)))>>2,i=(3&f)<<6|(c=e.indexOf(t.charAt(u++))),l+=String.fromCharCode(o),64!=f&&(l+=String.fromCharCode(n)),64!=c&&(l+=String.fromCharCode(i));return l=r(l)};var t=function(e){e=e.replace(/\r\n/g,"\n");for(var t="",r=0;r<e.length;r++){var o=e.charCodeAt(r);o<128?t+=String.fromCharCode(o):o>127&&o<2048?(t+=String.fromCharCode(o>>6|192),t+=String.fromCharCode(63&o|128)):(t+=String.fromCharCode(o>>12|224),t+=String.fromCharCode(o>>6&63|128),t+=String.fromCharCode(63&o|128));}return t},r=function(e){for(var t="",r=0,o=0,n=0,i=0;r<e.length;)(o=e.charCodeAt(r))<128?(t+=String.fromCharCode(o),r++):o>191&&o<224?(n=e.charCodeAt(r+1),t+=String.fromCharCode((31&o)<<6|63&n),r+=2):(n=e.charCodeAt(r+1),i=e.charCodeAt(r+2),t+=String.fromCharCode((15&o)<<12|(63&n)<<6|63&i),r+=3);return t};}}})); 
    } (webtools_min));

    var webtools_minExports = webtools_min.exports;

    function fixed(n, f) {
        if (f === void 0) { f = 2; }
        n = Number(n), f = Number(f);
        var str = String(Math.random()).split('.')[1], one = "", res = "";
        if (n === 1) {
            one = str.slice(0, 1);
            str = str.slice(1);
        }
        else {
            var match = str.match(new RegExp("([1-9]\\d{".concat(n - 1, "})(\\d*)")));
            if (match !== null) {
                one = match[1];
                str = match[2];
            }
        }
        res = f === 0 ? one : (one + "." + str.slice(0, f));
        return res;
    }
    function int(n) {
        n = Number(n);
        var str = String(Math.random()).split('.')[1];
        var match = str.match(new RegExp("[1-9]\\d{".concat(n - 1, "}"))) || ["0"];
        var res = parseInt(match[0]);
        return res;
    }
    var id = webtools_minExports.unid;
    function img(width, height, color) {
        if (width === void 0) { width = 512; }
        if (height === void 0) { height = 512; }
        if (!document)
            throw "Function img is only supported in the browser environment";
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var rgb = color ? webtools_minExports.colorRGB(color) : [Math.random() * 256, Math.random() * 256, Math.random() * 256];
        var _a = __read(rgb, 3), r = _a[0], g = _a[1], b = _a[2];
        canvas.width = width;
        canvas.height = height;
        /* 纵奇 */
        if (!ctx)
            throw "Canvas creation failed";
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
        for (var i = wi; i <= wi * 3; i = i + 2 * wi) {
            ctx.rect(i, 0, wi, height);
        }
        ctx.fill();
        /* 横奇 */
        ctx.beginPath();
        ctx.fillStyle = "rgba(".concat(r, ",").concat(g, ",").concat(b, ",0.4)");
        for (var i = 0; i <= hi * 4; i = i + 2 * hi) {
            ctx.rect(0, i, width, hi);
        }
        ctx.fill();
        /* 横偶 */
        ctx.beginPath();
        ctx.fillStyle = "rgba(".concat(r, ",").concat(g, ",").concat(b, ",0.2)");
        for (var i = hi; i <= hi * 3; i = i + 2 * hi) {
            ctx.rect(0, i, width, hi);
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
    var serveConfig = {
        wait: 500
    };
    function serve(obj) {
        var wait = serveConfig.wait;
        var fetchCopy = window.fetch;
        window.fetch = function () {
            console.log("arguments", arguments);
            var url = arguments[0];
            var options = (arguments[1] || { method: "get", body: null });
            var method = options.method, body = options.body;
            var pathname = url.split('?')[0];
            var params = webtools_minExports.getQuery(url);
            method = method.toUpperCase();
            var _loop_1 = function (i) {
                var item = obj[i];
                item.type = (item.type || 'get').toUpperCase();
                if (i === pathname && method === item.type) {
                    if (body) {
                        try {
                            body = JSON.parse(body);
                        }
                        catch (err) {
                            body = webtools_minExports.getQuery(body);
                        }
                    }
                    var res_1 = item.response({
                        params: params,
                        type: method,
                        url: pathname,
                        data: body
                    });
                    var response_1 = {
                        ok: true, status: 200, statusText: "OK",
                        url: url,
                        type: "basic", redirected: false, headers: new Headers(),
                        text: function () {
                            return new Promise(function (resolve) {
                                resolve(res_1);
                            });
                        },
                        json: function () {
                            return new Promise(function (resolve) {
                                resolve(res_1);
                            });
                        },
                        clone: function () {
                            return __assign({}, response_1);
                        }
                    };
                    return { value: new Promise(function (resolve) {
                            setTimeout(function () {
                                resolve(response_1);
                            }, (wait || 0));
                        }) };
                }
            };
            for (var i in obj) {
                var state_1 = _loop_1(i);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return fetchCopy.apply(void 0, __spreadArray([], __read(arguments), false));
        };
        XMLHttpRequest.prototype.serviceOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function () {
            var _a = __read(arguments, 2), type = _a[0], url = _a[1];
            var pathname = url.split('?')[0];
            var params = webtools_minExports.getQuery(url);
            type = type.toUpperCase();
            for (var i in obj) {
                var item = obj[i];
                item.type = (item.type || 'get').toUpperCase();
                if (i === pathname && type === item.type) {
                    Object.defineProperty(this, '__SIMULATE_SERVICE_OBJECT__', {
                        configurable: true,
                        value: {
                            isService: true,
                            itemFunc: item.response,
                            type: type,
                            pathname: pathname,
                            params: params
                        }
                    });
                    break;
                }
            }
            this.serviceOpen.apply(this, __spreadArray([], __read(arguments), false));
        };
        XMLHttpRequest.prototype.serviceSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function () {
            var _this = this;
            var simulateServiceObject = this["__SIMULATE_SERVICE_OBJECT__"];
            if (simulateServiceObject) {
                var obj = arguments[0];
                var params = simulateServiceObject.params, pathname = simulateServiceObject.pathname, type = simulateServiceObject.type, itemFunc = simulateServiceObject.itemFunc;
                if (obj) {
                    try {
                        obj = JSON.parse(obj);
                    }
                    catch (err) {
                        obj = webtools_minExports.getQuery(obj);
                    }
                }
                var response = itemFunc({
                    params: params,
                    type: type,
                    url: pathname,
                    data: obj
                });
                Object.defineProperty(this, 'responseText', { configurable: true, value: response });
                Object.defineProperty(this, 'responseXML', { configurable: true, value: response });
                Object.defineProperty(this, 'response', { configurable: true, value: response });
                Object.defineProperty(this, 'status', { configurable: true, value: 200 });
                Object.defineProperty(this, 'statusText', { configurable: true, value: "OK" });
                setTimeout(function () {
                    _this.dispatchEvent(new Event('load'));
                }, (wait || 0));
            }
            else {
                this.serviceSend.apply(this, __spreadArray([], __read(arguments), false));
            }
        };
    }
    serve.getConfig = function () {
        return __assign({}, serveConfig);
    };
    serve.setConfig = function (obj) {
        Object.assign(serveConfig, obj);
    };

    exports.fixed = fixed;
    exports.id = id;
    exports.img = img;
    exports.int = int;
    exports.serve = serve;

}));
