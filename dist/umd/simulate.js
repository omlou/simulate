(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Simulate = factory());
})(this, (function () { 'use strict';

    function o(e=window.location.href){let t={},r=e.indexOf("?");if(-1===r)return t;let o=e.indexOf("#");(-1===o||r>o)&&(o=void 0);let n=e.slice(r+1,o);if(""===n)return t;let i=n.split("&");for(let e of i){if(!e)continue;let r=e.split("=");t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]||"");}return t}function u(e){let t=e.toLowerCase(),r=[];if(/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)){if(4===t.length){let e="#";for(let r=1;r<4;r+=1)e+=t.slice(r,r+1).concat(t.slice(r,r+1));t=e;}for(let e=1;e<7;e+=2)r.push(parseInt("0x"+t.slice(e,e+2)));return r}if(/^(rgb\(|RGB\()[\s\S]+\)/.test(t))return r=t.replace(/( |\(|\)|rgb|RGB)+/g,"").split(","),r.map(Number)}

    function fixed(n, f = 2) {
        n = Number(n), f = Number(f);
        let str = String(Math.random()).split('.')[1], one = "", res = "";
        if (n === 1) {
            one = str.slice(0, 1);
            str = str.slice(1);
        }
        else {
            let match = str.match(new RegExp(`([1-9]\\d{${n - 1}})(\\d*)`));
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
        let str = String(Math.random()).split('.')[1];
        let match = str.match(new RegExp(`[1-9]\\d{${n - 1}}`)) || ["0"];
        let res = parseInt(match[0]);
        return res;
    }
    function img(width = 512, height = 512, color) {
        if (!document)
            throw "Function img is only supported in the browser environment";
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let rgb = color ? u(color) : [Math.random() * 256, Math.random() * 256, Math.random() * 256];
        let [r, g, b] = rgb;
        canvas.width = width;
        canvas.height = height;
        /* 纵奇 */
        if (!ctx)
            throw "Canvas creation failed";
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},0.2)`;
        let wi = width / 5;
        let hi = height / 5;
        for (let i = 0; i <= wi * 4; i = i + 2 * wi) {
            ctx.rect(i, 0, wi, height);
        }
        ctx.fill();
        /* 纵偶 */
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},0.4)`;
        for (let i = wi; i <= wi * 3; i = i + 2 * wi) {
            ctx.rect(i, 0, wi, height);
        }
        ctx.fill();
        /* 横奇 */
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},0.4)`;
        for (let i = 0; i <= hi * 4; i = i + 2 * hi) {
            ctx.rect(0, i, width, hi);
        }
        ctx.fill();
        /* 横偶 */
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},0.2)`;
        for (let i = hi; i <= hi * 3; i = i + 2 * hi) {
            ctx.rect(0, i, width, hi);
        }
        ctx.fill();
        /*
          ctx.beginPath() // 画文字
          ctx.fillStyle = "#fff"
          ctx.font = `bold ${0.17*width}px 'Source Han Sans CN'`
          let str = String(Math.random()).split('.')[1]
          let res = parseInt(str.match(new RegExp(`[1-9]\\d{7}`))[0])
          ctx.fillText(res, 0.12 * width, 0.5 * height + 0.06 * width)
        */
        return canvas.toDataURL();
    }
    const serveConfig = {
        wait: 500
    };
    function serve(obj) {
        const { wait } = serveConfig;
        let fetchCopy = window.fetch;
        window.fetch = function () {
            let url = arguments[0];
            let options = (arguments[1] || { method: "get", body: null });
            let { method, body } = options;
            let pathname = url.split('?')[0];
            let params = o(url);
            method = method.toUpperCase();
            for (let i in obj) {
                let item = obj[i];
                item.type = (item.type || 'get').toUpperCase();
                if (i === pathname && method === item.type) {
                    if (body) {
                        try {
                            body = JSON.parse(body);
                        }
                        catch (err) {
                            body = o(body);
                        }
                    }
                    let res = item.response({
                        params,
                        type: method,
                        url: pathname,
                        data: body
                    });
                    let response = {
                        ok: true, status: 200, statusText: "OK", url, type: "basic", redirected: false, headers: new Headers(),
                        text() {
                            return new Promise((resolve) => {
                                resolve(res);
                            });
                        },
                        json() {
                            return new Promise((resolve) => {
                                resolve(res);
                            });
                        },
                        clone() {
                            return { ...response };
                        }
                    };
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(response);
                        }, (wait || 0));
                    });
                }
            }
            return fetchCopy(...arguments);
        };
        XMLHttpRequest.prototype.serviceOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function () {
            var [type, url] = arguments;
            var pathname = url.split('?')[0];
            var params = o(url);
            type = type.toUpperCase();
            for (let i in obj) {
                let item = obj[i];
                item.type = (item.type || 'get').toUpperCase();
                if (i === pathname && type === item.type) {
                    Object.defineProperty(this, '__SIMULATE_SERVICE_OBJECT__', {
                        configurable: true,
                        value: {
                            isService: true,
                            itemFunc: item.response,
                            type, pathname, params
                        }
                    });
                    break;
                }
            }
            this.serviceOpen(...arguments);
        };
        XMLHttpRequest.prototype.serviceSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function () {
            let simulateServiceObject = this["__SIMULATE_SERVICE_OBJECT__"];
            if (simulateServiceObject) {
                var obj = arguments[0];
                var { params, pathname, type, itemFunc } = simulateServiceObject;
                if (obj) {
                    try {
                        obj = JSON.parse(obj);
                    }
                    catch (err) {
                        obj = o(obj);
                    }
                }
                var response = itemFunc({
                    params, type,
                    url: pathname,
                    data: obj
                });
                Object.defineProperty(this, 'responseText', { configurable: true, value: response });
                Object.defineProperty(this, 'responseXML', { configurable: true, value: response });
                Object.defineProperty(this, 'response', { configurable: true, value: response });
                Object.defineProperty(this, 'status', { configurable: true, value: 200 });
                Object.defineProperty(this, 'statusText', { configurable: true, value: "OK" });
                setTimeout(() => {
                    this.dispatchEvent(new Event('load'));
                }, (wait || 0));
            }
            else {
                this.serviceSend(...arguments);
            }
        };
    }
    serve.getConfig = function () {
        return { ...serveConfig };
    };
    serve.setConfig = function (obj) {
        Object.assign(serveConfig, obj);
    };

    Object.assign(serve, { fixed, int, img });

    return serve;

}));
