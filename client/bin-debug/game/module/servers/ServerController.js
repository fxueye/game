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
var ServerController = (function (_super) {
    __extends(ServerController, _super);
    function ServerController() {
        var _this = _super.call(this) || this;
        _this._serverView = new ServerView(_this, App.Instance.LayerMgr.UIPopup);
        App.Instance.ViewMgr.register(ModuleConst.SERVERLIST, _this._serverView);
        return _this;
    }
    return ServerController;
}(BaseController));
__reflect(ServerController.prototype, "ServerController");
//# sourceMappingURL=ServerController.js.map