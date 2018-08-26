var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Distributor = (function () {
    function Distributor() {
        this._userdPool = null;
        this._idlePool = null;
        this._userdPool = {};
        this._idlePool = {};
    }
    Distributor.prototype.distribution = function (val) {
        if (val.isIdle) {
            this._idlePool[val.hashc] = val;
            delete this._userdPool[val.hashc];
        }
        else {
            this._userdPool[val.hashc] = val;
            delete this._idlePool[val.hashc];
        }
    };
    Distributor.prototype.add = function (val) {
        val.setProtocol(this);
        if (val.isIdle) {
            this._idlePool[val.hashc] = val;
        }
        else {
            this._userdPool[val.hashc] = val;
        }
    };
    Distributor.prototype.get = function (type) {
        var obj = null;
        for (var key in this._idlePool) {
            obj = this._idlePool[key];
            if (obj.type == type) {
                obj.reset();
                return obj;
            }
        }
        return null;
    };
    Distributor.prototype.clear = function () {
        var obj = null;
        for (var key in this._idlePool) {
            obj = this._idlePool[key];
            obj.del();
        }
        this._idlePool = null;
        this._idlePool = {};
    };
    return Distributor;
}());
__reflect(Distributor.prototype, "Distributor", ["IDistributor"]);
//# sourceMappingURL=Distributor .js.map