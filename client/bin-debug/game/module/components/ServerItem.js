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
var ServerItem = (function (_super) {
    __extends(ServerItem, _super);
    function ServerItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "skin.Server";
        return _this;
    }
    ServerItem.prototype.dataChanged = function () {
        this.labServerName.text = this.data.SocketIp + ":" + this.data.SocketPort;
    };
    return ServerItem;
}(eui.ItemRenderer));
__reflect(ServerItem.prototype, "ServerItem");
//# sourceMappingURL=ServerItem.js.map