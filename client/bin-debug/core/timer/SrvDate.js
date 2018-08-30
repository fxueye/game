var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SrvDate = (function () {
    function SrvDate() {
    }
    SrvDate.prototype.StartTime = function () {
        this._server_timestamp = 0;
        App.Instance.TimerMgr.startTimer(SrvDate.Second, 0, this.update, this);
    };
    Object.defineProperty(SrvDate.prototype, "ServerTime", {
        get: function () {
            if (this._server_timestamp == 0) {
                var date = new Date();
                this._server_timestamp = Math.floor(date.getTime() / 1000);
            }
            return Long.fromNumber(this._server_timestamp);
        },
        set: function (val) {
            this._server_timestamp = val.toNumber();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SrvDate.prototype, "ServetDate", {
        get: function () {
            return new Date(this.ServerTime.toNumber() * 1000);
        },
        enumerable: true,
        configurable: true
    });
    SrvDate.prototype.update = function () {
        this.ServerTime.add(Long.fromInt(1));
        // Logger.log("server time: " + DateUtil.LongTimeFormat(this.ServetDate));
    };
    SrvDate.Millisecond = 1;
    SrvDate.Second = SrvDate.Millisecond * 1000;
    SrvDate.Minute = SrvDate.Second * 60;
    SrvDate.Hour = SrvDate.Minute * 60;
    return SrvDate;
}());
__reflect(SrvDate.prototype, "SrvDate");
//# sourceMappingURL=SrvDate.js.map