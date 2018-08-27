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
var SettingControler = (function (_super) {
    __extends(SettingControler, _super);
    function SettingControler() {
        var _this = _super.call(this) || this;
        _this._settingView = new SettingView(_this, App.Instance.LayerMgr.UIPopup);
        App.Instance.ViewMgr.register(ModuleConst.SETTING, _this._settingView);
        return _this;
    }
    return SettingControler;
}(BaseController));
__reflect(SettingControler.prototype, "SettingControler");
//# sourceMappingURL=SettingControler.js.map