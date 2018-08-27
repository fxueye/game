var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Http = (function () {
    function Http() {
        this._request = new egret.HttpRequest();
        this._headers = new Dictionary();
        this._responseType = egret.HttpResponseType.TEXT;
        this._request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this._request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        this._request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        this._request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    }
    Http.prototype.setHeaders = function (headers) {
        if (headers.length > 0) {
            this._headers = headers;
        }
    };
    Http.prototype.setResponseType = function (type) {
        if (type) {
            this._responseType = type;
        }
    };
    Http.prototype.setProgress = function (progress, obj) {
        this._progress = progress;
        this._obj = obj;
    };
    Http.prototype.Get = function (url, params, callBack, obj) {
        App.Instance.EasyLoading.showLoading();
        this._callback = callBack;
        this._obj = obj;
        var paramstr = "?";
        if (params && params.length > 0) {
            paramstr += this.getParamsStr(params);
        }
        else {
            paramstr = "";
        }
        this._httpMethod = egret.HttpMethod.GET;
        this._request.open(url + paramstr, egret.HttpMethod.GET);
        if (this._headers.length > 0) {
            for (var _i = 0, _a = this._headers.keys; _i < _a.length; _i++) {
                var k = _a[_i];
                var value = this._headers.get(k);
                this._request.setRequestHeader(k, value);
            }
        }
        if (this._responseType)
            this._request.responseType = this._responseType;
        this._request.send();
    };
    Http.prototype.Post = function (url, params, callBack, obj) {
        this._callback = callBack;
        this._obj = obj;
        var paramstr = "";
        if (params.length > 0) {
            paramstr += this.getParamsStr(params);
        }
        this._httpMethod = egret.HttpMethod.POST;
        this._request.open(url, egret.HttpMethod.POST);
        if (this._headers.length > 0) {
            for (var _i = 0, _a = this._headers.keys; _i < _a.length; _i++) {
                var k = _a[_i];
                var value = this._headers.get(k);
                this._request.setRequestHeader(k, value);
            }
        }
        if (this._responseType)
            this._request.responseType = this._responseType;
        this._request.send(paramstr);
    };
    Http.prototype.getParamsStr = function (params, sort) {
        if (sort === void 0) { sort = false; }
        var retstr = "";
        if (params.length > 0) {
            var keys = params.keys;
            if (sort) {
                keys = keys.sort();
            }
            for (var i = 0, len = keys.length; i < len; i++) {
                var k = keys[i];
                var v = params.get(k);
                if (i < len - 1) {
                    retstr += k + "=" + v + "&";
                }
                else {
                    retstr += k + "=" + v;
                }
            }
        }
        return retstr;
    };
    Http.prototype.onGetComplete = function (event) {
        App.Instance.EasyLoading.hideLoading();
        var request = event.currentTarget;
        if (this._callback && this._obj) {
            this._callback.call(this._obj, Http.OK, request.response);
        }
    };
    Http.prototype.onGetIOError = function (event) {
        App.Instance.EasyLoading.hideLoading();
        console.error(StringUtils.format("{0} error:{1}", this._httpMethod, event));
        var request = event.currentTarget;
        if (this._callback && this._obj) {
            this._callback.call(this._obj, Http.NOTOK, null);
        }
    };
    Http.prototype.onGetProgress = function (event) {
        var progress = (event.bytesLoaded / event.bytesTotal);
        if (this._progress && this._obj) {
            this._progress.call(this._obj, progress);
        }
    };
    Http.OK = 200;
    Http.NOTOK = -1;
    return Http;
}());
__reflect(Http.prototype, "Http");
//# sourceMappingURL=http.js.map