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
var PlayerWrap = (function (_super) {
    __extends(PlayerWrap, _super);
    function PlayerWrap() {
        return _super.call(this) || this;
    }
    PlayerWrap.prototype.Decode = function (pck) {
        this.GUID = pck.GetString();
        this.CreateTime = pck.GetLong();
        return this;
    };
    PlayerWrap.prototype.Encode = function (pck) {
        pck.PutString(this.GUID);
        pck.PutLong(this.CreateTime);
    };
    return PlayerWrap;
}(Net.Simple.IWrapper));
__reflect(PlayerWrap.prototype, "PlayerWrap");
//# sourceMappingURL=PlayerWrap.js.map