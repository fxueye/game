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
var RandNameController = (function (_super) {
    __extends(RandNameController, _super);
    function RandNameController() {
        var _this = _super.call(this) || this;
        _this._randNameView = new RandNameView(_this, App.Instance.LayerMgr.UIPopup);
        App.Instance.ViewMgr.register(ModuleConst.RANDNAME, _this._randNameView);
        return _this;
    }
    return RandNameController;
}(BaseController));
__reflect(RandNameController.prototype, "RandNameController");
//# sourceMappingURL=RandNameController.js.map