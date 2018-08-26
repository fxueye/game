var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SignData = (function () {
    function SignData() {
        this._signId = 0;
        this._lastSignTime = 0;
    }
    Object.defineProperty(SignData.prototype, "SignId", {
        get: function () {
            return this._signId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignData.prototype, "LastSignTime", {
        get: function () {
            return this._lastSignTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignData.prototype, "SignEd", {
        get: function () {
            if (this._lastSignTime == 0) {
                return false;
            }
            var time = DateUtil.Timestamp2Date(this._lastSignTime);
            if (DateUtil.IsToady(time)) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return SignData;
}());
__reflect(SignData.prototype, "SignData");
//# sourceMappingURL=SignData.js.map