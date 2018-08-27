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
var Dialog = (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        var _this = _super.call(this) || this;
        _this._resources = null;
        _this._cancel = null;
        _this._comfirm = null;
        _this._obj = null;
        _this._canCancel = true;
        _this.skinName = "skin.DialogSkin";
        _this._resources = ["setting"];
        _this._parent = App.Instance.LayerMgr.UIPopup;
        return _this;
    }
    Dialog.prototype.initCompoments = function () {
        this._isInit = true;
        this.imgMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaskClick, this);
        this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnComfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnCancel.visible = false;
        this.btnComfirm.visible = false;
    };
    Dialog.prototype.isInit = function () {
        return this._isInit;
    };
    Dialog.prototype.isShow = function () {
        return this.stage != null && this.visible;
    };
    Dialog.prototype.refresh = function () {
        if (this.isInit()) {
            this.labTitle.text = this._title;
            this.labMsg.text = this._msg;
            if (this._obj == null || this._cancel == null) {
                this.btnComfirm.x = this.btnComfirm.parent.width / 2;
                this.btnComfirm.visible = true;
            }
            if (this._obj != null && this._cancel != null && this._comfirm == null) {
                this.btnCancel.x = this.btnCancel.parent.width / 2;
                this.btnCancel.visible = true;
            }
        }
    };
    Dialog.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.isShow()) {
            this.setVisible(true);
            return this;
        }
        if (this.isInit()) {
            this.setVisible(true);
            this.addToParent();
        }
        else {
            App.Instance.EasyLoading.showLoading();
            this.loadResource(function () {
                this.setVisible(false);
                this.addToParent();
            }.bind(this), function () {
                this.initCompoments();
                this.setVisible(true);
                EffectUtils.OpenEffect(this.gpCenter, EffectType.Slight);
                this.refresh();
                App.Instance.EasyLoading.hideLoading();
            }.bind(this));
        }
        return this;
    };
    Dialog.prototype.loadResource = function (loadComplete, initComplete) {
        if (this._resources && this._resources.length > 0) {
            App.Instance.RES.loadResource(this._resources, [], loadComplete, null, this);
            this.once(eui.UIEvent.CREATION_COMPLETE, initComplete, this);
        }
        else {
            loadComplete();
            initComplete();
        }
    };
    Dialog.prototype.addToParent = function () {
        this._parent.addChild(this);
    };
    Dialog.prototype.removeFromParent = function () {
        this.parent.removeChild(this);
    };
    Dialog.prototype.setVisible = function (value) {
        this.visible = value;
    };
    Dialog.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (!this.isShow()) {
            return;
        }
        this.setVisible(false);
        this.removeFromParent();
    };
    Dialog.prototype.onMaskClick = function (evt) {
        if (this._canCancel) {
            this.close();
        }
    };
    Dialog.prototype.onClick = function (evt) {
        var target = evt.target;
        if (target.hashCode == this.btnCancel.hashCode) {
            if (this._cancel != null) {
                this._cancel.call(this._obj);
            }
            this.close();
        }
        else if (target.hashCode == this.btnComfirm.hashCode) {
            if (this._comfirm != null) {
                this._comfirm.call(this._obj);
            }
            this.close();
        }
    };
    Object.defineProperty(Dialog.prototype, "Titile", {
        set: function (val) {
            this._title = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dialog.prototype, "Msg", {
        set: function (val) {
            this._msg = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dialog.prototype, "CanCancel", {
        set: function (val) {
            this._canCancel = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dialog.prototype, "Obj", {
        set: function (val) {
            this._obj = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dialog.prototype, "Cancel", {
        set: function (val) {
            this.btnCancel.visible = true;
            this._cancel = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dialog.prototype, "ComFirm", {
        set: function (val) {
            this.btnComfirm.visible = true;
            this._comfirm = val;
        },
        enumerable: true,
        configurable: true
    });
    Dialog.makeDialog = function (title, msg, cancel, obj, comfirmFunc, cancelFunc) {
        if (cancel === void 0) { cancel = true; }
        if (obj === void 0) { obj = null; }
        if (comfirmFunc === void 0) { comfirmFunc = null; }
        if (cancelFunc === void 0) { cancelFunc = null; }
        var d = new Dialog();
        d.Titile = title;
        d.Msg = msg;
        d.CanCancel = cancel;
        if (obj != null) {
            d.Obj = obj;
            if (cancelFunc != null) {
                d.Cancel = cancelFunc;
            }
            if (comfirmFunc != null) {
                d.ComFirm = comfirmFunc;
            }
        }
        return d;
    };
    return Dialog;
}(eui.Component));
__reflect(Dialog.prototype, "Dialog");
//# sourceMappingURL=Dialog.js.map