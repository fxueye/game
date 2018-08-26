var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MovieClip = (function (_super) {
    __extends(MovieClip, _super);
    function MovieClip(movieClipData) {
        var _this = _super.call(this, movieClipData) || this;
        _this._dis = null;
        _this._isIdle = false;
        _this._type = ObjectType.MOVIECLIP;
        return _this;
    }
    Object.defineProperty(MovieClip.prototype, "hashc", {
        get: function () {
            return this.hashCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClip.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClip.prototype, "isIdle", {
        get: function () {
            return this._isIdle;
        },
        enumerable: true,
        configurable: true
    });
    MovieClip.prototype.dispose = function () {
        this._isIdle = true;
        this._dis.distribution(this);
    };
    MovieClip.prototype.del = function () {
        this.dispose();
        this._dis = null;
    };
    MovieClip.prototype.reset = function () {
        this._isIdle = false;
        this._dis.distribution(this);
    };
    MovieClip.prototype.setProtocol = function (val) {
        this._dis = val;
    };
    return MovieClip;
}(egret.MovieClip));
__reflect(MovieClip.prototype, "MovieClip", ["IObject"]);
//# sourceMappingURL=MovieClip.js.map