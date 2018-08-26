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
var RandNameView = (function (_super) {
    __extends(RandNameView, _super);
    function RandNameView(controller, parent) {
        var _this = _super.call(this, controller, parent) || this;
        _this.skinName = "skin.RandNameSkin";
        var resource = [];
        _this.setResources(resource);
        return _this;
    }
    RandNameView.prototype.initCompoments = function () {
        _super.prototype.initCompoments.call(this);
        this.imgMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaskClick, this);
        this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickChange, this);
        this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    RandNameView.prototype.initData = function () {
        this.refresh();
    };
    RandNameView.prototype.refresh = function () {
        if (App.Instance.Account.CurrRole.Name == "") {
            this.ettName.text = GameUtils.RandName();
        }
        else {
            this.ettName.text = App.Instance.Account.CurrRole.Name;
        }
    };
    RandNameView.prototype.onClick = function (evt) {
        var target = evt.currentTarget;
        if (this.btnConfirm.hashCode == target.hashCode) {
            var text = this.ettName.text;
            if (text != "") {
                // Commder.Instance.reName(text);
            }
        }
    };
    RandNameView.prototype.onClickChange = function () {
        this.ettName.text = GameUtils.RandName();
    };
    RandNameView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        EffectUtils.OpenEffect(this.gpCenter, EffectType.Slight);
        this.refresh();
        _super.prototype.open.apply(this, param);
    };
    RandNameView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.close.apply(this, param);
    };
    RandNameView.prototype.onMaskClick = function (evt) {
        if (App.Instance.Account.CurrRole.Name != "")
            App.Instance.ViewMgr.pop(true, false);
    };
    return RandNameView;
}(BaseUIView));
__reflect(RandNameView.prototype, "RandNameView");
//# sourceMappingURL=RandNameView.js.map