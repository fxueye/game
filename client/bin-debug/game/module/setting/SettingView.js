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
var SettingView = (function (_super) {
    __extends(SettingView, _super);
    function SettingView(controller, parent) {
        var _this = _super.call(this, controller, parent) || this;
        _this.skinName = "skin.SettingSkin";
        var resource = ["setting"];
        _this.setResources(resource);
        return _this;
    }
    SettingView.prototype.initCompoments = function () {
        _super.prototype.initCompoments.call(this);
        this.imgMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaskClick, this);
        this.tgsSound.addEventListener(egret.Event.CHANGE, this.onChange, this);
        this.hSliderBg.maximum = 100;
        this.hSliderDub.maximum = 100;
        this.hSliderGame.maximum = 100;
        this.hSliderBg.addEventListener(egret.Event.CHANGE, this.onChange, this);
        this.hSliderGame.addEventListener(egret.Event.CHANGE, this.onChange, this);
        this.hSliderDub.addEventListener(egret.Event.CHANGE, this.onChange, this);
    };
    SettingView.prototype.initData = function () {
        this.refresh();
    };
    SettingView.prototype.refresh = function () {
        this.tgsSound.selected = App.Instance.Account.OpenSound;
        this.hSliderBg.value = App.Instance.Account.BgSoundVolume;
        this.hSliderGame.value = App.Instance.Account.EffectSoundVolume;
        this.hSliderDub.value = App.Instance.Account.DubSoundVolume;
    };
    SettingView.prototype.onChange = function (evt) {
        if (this.tgsSound.hashCode == evt.currentTarget.hashCode) {
            GameUtils.play(GameSound.BUTTON_1);
            App.Instance.Account.OpenSound = this.tgsSound.selected;
        }
        else if (this.hSliderBg.hashCode == evt.currentTarget.hashCode) {
            App.Instance.Account.BgSoundVolume = this.hSliderBg.value;
        }
        else if (this.hSliderGame.hashCode == evt.currentTarget.hashCode) {
            App.Instance.Account.EffectSoundVolume = this.hSliderGame.value;
        }
        else if (this.hSliderDub.hashCode == evt.currentTarget.hashCode) {
            App.Instance.Account.DubSoundVolume = this.hSliderDub.value;
        }
    };
    SettingView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        EffectUtils.OpenEffect(this.gpCenter, EffectType.Slight);
        this.refresh();
        _super.prototype.open.apply(this, param);
    };
    SettingView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.close.apply(this, param);
    };
    SettingView.prototype.onMaskClick = function (evt) {
        App.Instance.ViewMgr.pop(true, false);
    };
    return SettingView;
}(BaseUIView));
__reflect(SettingView.prototype, "SettingView");
//# sourceMappingURL=SettingView.js.map