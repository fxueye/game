var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Toast = (function () {
    function Toast() {
        this._content = null;
        this._delay = 1000;
        this.init();
    }
    Toast.prototype.init = function () {
        this._toastContainer = new egret.DisplayObjectContainer();
        this._img = new eui.Image();
        var texture = RES.getRes("common_bg_hd2_png");
        // RES.getResByUrl("resource/assets/common/common_bg_hd2.png",function(texture:egret.Texture):void{
        this._img.texture = texture;
        this._img.scale9Grid = new egret.Rectangle(8, 7, 14, 13);
        // this._toastContainer.addChild(this._img);
        // },this,RES.ResourceItem.TYPE_IMAGE);
        this._textfield = new egret.TextField();
        this._textfield.multiline = true;
        this._textfield.size = 20;
        this._textfield.textColor = 0xFFFFFF;
        this._textfield.textAlign = egret.HorizontalAlign.CENTER;
        this._textfield.fontFamily = "SimHei";
        this._timer = new egret.Timer(Toast.SHORT);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onDelay, this);
    };
    Toast.makeToast = function (msg, delay) {
        if (delay === void 0) { delay = 500; }
        var toast = new Toast();
        toast.msg = msg;
        toast.timer.delay = delay;
        return toast;
    };
    Object.defineProperty(Toast.prototype, "timer", {
        get: function () {
            return this._timer;
        },
        enumerable: true,
        configurable: true
    });
    Toast.prototype.onDelay = function (evt) {
        this._timer.stop();
        this.hide();
    };
    Object.defineProperty(Toast.prototype, "msg", {
        set: function (value) {
            this._msg = value;
            this._textfield.text = this._msg;
            this._toastContainer.width = this._textfield.width + 40;
            this._toastContainer.height = this._textfield.height + 20;
            this._toastContainer.x = App.Instance.Width / 2 - this._toastContainer.width / 2;
            this._toastContainer.y = App.Instance.Height / 2 - this._toastContainer.height / 2;
            this._img.width = this._toastContainer.width;
            this._img.height = this._toastContainer.height;
            this._textfield.x = this._toastContainer.width / 2 - this._textfield.width / 2;
            this._textfield.y = this._toastContainer.height / 2 - this._textfield.height / 2;
            this._toastContainer.addChild(this._img);
            this._toastContainer.addChild(this._textfield);
        },
        enumerable: true,
        configurable: true
    });
    Toast.prototype.show = function () {
        App.Instance.LayerMgr.UITips.addChild(this._toastContainer);
        this._toastContainer.alpha = 0;
        egret.Tween.get(this._toastContainer).to({ alpha: 1 }, 300, egret.Ease.backOut);
        this._timer.start();
    };
    Toast.prototype.hide = function () {
        egret.Tween.get(this._toastContainer).to({ alpha: 0 }, 300, egret.Ease.cubicIn);
        App.Instance.LayerMgr.UITips.removeChild(this._toastContainer);
    };
    Toast.SHORT = 500;
    Toast.LONG = 1500;
    return Toast;
}());
__reflect(Toast.prototype, "Toast");
//# sourceMappingURL=Toast.js.map