var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseController = (function () {
    function BaseController() {
    }
    BaseController.prototype.addListener = function (type, listener, obj) {
        if (!obj) {
            obj = this;
        }
        App.Instance.EventMgr.addEventListener(type, listener, obj);
    };
    BaseController.prototype.removeAll = function (obj) {
        if (!obj) {
            obj = this;
        }
        App.Instance.EventMgr.removeAll(obj);
    };
    BaseController.prototype.dispatchEventWith = function (type, data) {
        App.Instance.EventMgr.dispatchEventWith(type, false, data);
    };
    BaseController.prototype.setModel = function (model) {
        this._model = model;
    };
    BaseController.prototype.getModel = function () {
        return this._model;
    };
    return BaseController;
}());
__reflect(BaseController.prototype, "BaseController");
//# sourceMappingURL=BaseController.js.map