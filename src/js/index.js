(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@xlou/webtools", "clear-ajax"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.server = exports.img = exports.id = exports.int = exports.fixed = void 0;
    const webtools_1 = require("@xlou/webtools");
    const clear_ajax_1 = require("clear-ajax");
    function fixed(n, f = 2) {
        n = Number(n), f = Number(f);
        var str = String(Math.random()).split('.')[1];
        var one = "";
        var res = "";
        if (n === 1) {
            one = str.slice(0, 1);
            str = str.slice(1);
        }
        else {
            var match = str.match(new RegExp(`([1-9]\\d{${n - 1}})(\\d*)`));
            if (match !== null) {
                one = match[1];
                str = match[2];
            }
        }
        if (f === 0) {
            res = one;
        }
        else {
            res = one + "." + str.slice(0, f);
        }
        return res;
    }
    exports.fixed = fixed;
    function int(n) {
        n = Number(n);
        var str = String(Math.random()).split('.')[1];
        var res = parseInt(str.match(new RegExp(`[1-9]\\d{${n - 1}}`))[0]);
        return res;
    }
    exports.int = int;
    exports.id = webtools_1.unid;
    function img(width = 512, height = 512, color) {
        if (!document)
            throw "Function img is only supported in the browser environment";
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var rgb = color ? (0, webtools_1.colorRGB)(color) : [Math.random() * 256, Math.random() * 256, Math.random() * 256];
        var [r, g, b] = rgb;
        canvas.width = width;
        canvas.height = height;
        /* 纵奇 */
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},0.2)`;
        var wi = width / 5;
        var hi = height / 5;
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
          ctx.fillStyle="#fff"
          ctx.font=`bold ${0.17*width}px 'Source Han Sans CN'`
          var str=String(Math.random()).split('.')[1]
          var res=parseInt(str.match(new RegExp(`[1-9]\\d{7}`))[0])
          ctx.fillText(res,0.12*width,0.5*height+0.06*width)
        */
        return canvas.toDataURL();
    }
    exports.img = img;
    const serverConfig = {
        wait: 500
    };
    function server(obj) {
        const { wait } = serverConfig;
        XMLHttpRequest.prototype.serviceOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function () {
            var [type, url] = arguments;
            var pathname = url.split('?')[0];
            var params = (0, webtools_1.getQuery)(url);
            type = type.toUpperCase();
            for (let i in obj) {
                let item = obj[i];
                item.type = item.type.toUpperCase();
                if (i === pathname && type === item.type) {
                    Object.defineProperty(this, '_servicestoreobject', {
                        configurable: true,
                        value: {
                            isService: true,
                            itemFunc: item.method,
                            type, pathname, params
                        }
                    });
                }
            }
            this.serviceOpen(...arguments);
        };
        XMLHttpRequest.prototype.serviceSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function () {
            if (this._servicestoreobject) {
                var obj = arguments[0];
                var { params, pathname, type, itemFunc } = this._servicestoreobject;
                if (obj) {
                    try {
                        obj = JSON.parse(obj);
                    }
                    catch (err) {
                        obj = (0, webtools_1.getQuery)(obj);
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
                if (wait) {
                    setTimeout(() => {
                        this.dispatchEvent(new Event('load'));
                    }, wait);
                }
                else {
                    this.dispatchEvent(new Event('load'));
                }
            }
            else {
                this.serviceSend(...arguments);
            }
        };
    }
    exports.server = server;
    server.getConfig = function () {
        return { ...serverConfig };
    };
    server.setConfig = function (obj) {
        Object.assign(serverConfig, obj);
    };
    if (window)
        window.simulate = { fixed, int, id: exports.id, img, server };
    server({
        "/server/getdata": {
            type: 'post',
            method: ({ params }) => {
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
    })
        .then(res => {
        console.log(res);
    });
});
