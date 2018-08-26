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
var ReNameView = (function (_super) {
    __extends(ReNameView, _super);
    function ReNameView(controller, parent) {
        var _this = _super.call(this, controller, parent) || this;
        _this.skinName = "skin.RandNameSkin";
        var resource = [];
        _this.setResources(resource);
        return _this;
    }
    ReNameView.prototype.initCompoments = function () {
        _super.prototype.initCompoments.call(this);
        this.imgMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaskClick, this);
        this.btnChange.visible = false;
        this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickChange, this);
        this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.labTitle.text = "录入名称";
    };
    ReNameView.prototype.initData = function () {
        this.refresh();
    };
    ReNameView.prototype.refresh = function () {
        this.ettName.text = App.Instance.Account.CurrRole.SecName;
    };
    ReNameView.prototype.onClick = function (evt) {
        var target = evt.currentTarget;
        if (this.btnConfirm.hashCode == target.hashCode) {
            var text = this.ettName.text;
            App.Instance.Account.CurrRole.SecName = text;
            App.Instance.ViewMgr.pop(true, false);
            this.Controller.dispatchEventWith(GameDataEvent.DATA_REFRESH);
        }
    };
    ReNameView.prototype.onClickChange = function () {
        this.ettName.text = GameUtils.RandName();
    };
    ReNameView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        EffectUtils.OpenEffect(this.gpCenter, EffectType.Slight);
        this.refresh();
        _super.prototype.open.apply(this, param);
    };
    ReNameView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.close.apply(this, param);
    };
    ReNameView.prototype.onMaskClick = function (evt) {
        App.Instance.ViewMgr.pop(true, false);
    };
    return ReNameView;
}(BaseUIView));
__reflect(ReNameView.prototype, "ReNameView");
//# sourceMappingURL=ReNameView.js.map