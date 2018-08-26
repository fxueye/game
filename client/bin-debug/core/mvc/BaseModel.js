var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseModel = (function () {
    function BaseModel(controller) {
        this._controller = controller;
        this._controller.setModel(this);
    }
    return BaseModel;
}());
__reflect(BaseModel.prototype, "BaseModel");
//# sourceMappingURL=BaseModel.js.map