var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ControlMgr = (function () {
    function ControlMgr() {
        this._modules = {};
    }
    ControlMgr.prototype.clear = function () {
        this._modules = {};
    };
    ControlMgr.prototype.register = function (key, control) {
        if (this.isExists(key)) {
            return;
        }
        this._modules[key] = control;
    };
    ControlMgr.prototype.unregister = function (key) {
        if (!this.isExists(key)) {
            return;
        }
        this._modules[key] = null;
        delete this._modules[key];
    };
    ControlMgr.prototype.getControl = function (key) {
        return this._modules[key];
    };
    ControlMgr.prototype.getModel = function (key) {
        var control = this._modules[key];
        if (control) {
            return control.getModel();
        }
        return null;
    };
    ControlMgr.prototype.isExists = function (key) {
        return this._modules[key] != null;
    };
    return ControlMgr;
}());
__reflect(ControlMgr.prototype, "ControlMgr");
//# sourceMappingURL=ControlMgr.js.map