var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseProxy = (function () {
    function BaseProxy(controller) {
        this._controller = controller;
    }
    return BaseProxy;
}());
__reflect(BaseProxy.prototype, "BaseProxy");
//# sourceMappingURL=BaseProxy.js.map