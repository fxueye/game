var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EasyLoading = (function () {
    function EasyLoading() {
        this._content = null;
        this._speed = 20;
        this.init();
    }
    EasyLoading.prototype.init = function () {
        this._timer = new egret.Timer(100);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
        this._content = new egret.Sprite();
        this._content.graphics.beginFill(0x000000, 0.2);
        this._content.graphics.drawRect(0, 0, App.Instance.Width, App.Instance.Height);
        this._content.graphics.endFill();
        this._content.touchEnabled = true;
        this._progress = new eui.Label();
        this._uiImageContainer = new egret.DisplayObjectContainer();
        this._uiImageContainer.x = this._content.width / 2;
        this._uiImageContainer.y = this._content.height / 2;
        this._content.addChild(this._uiImageContainer);
        this._progress.y = this._content.height / 2;
        this._progress.size = 13;
        this.resetProcgress();
        this._content.addChild(this._progress);
        var texture = RES.getRes("load_png");
        // RES.getResByUrl("resource/assets/loading.png",function(texture:egret.Texture):void{
        var img = new egret.Bitmap();
        img.texture = texture;
        img.x = -img.width / 2;
        img.y = -img.height / 2;
        this._uiImageContainer.addChild(img);
        // },this,RES.ResourceItem.TYPE_IMAGE);
    };
    EasyLoading.prototype.showLoading = function () {
        this.resetProcgress();
        App.Instance.Stage.addChild(this._content);
        // App.Instance.TimerMgr.startFarme(1,0,this.update,this);
        this._timer.start();
    };
    EasyLoading.prototype.hideLoading = function () {
        if (this._content && this._content.parent) {
            App.Instance.Stage.removeChild(this._content);
            this._uiImageContainer.rotation = 0;
        }
        this._timer.stop();
        // App.Instance.TimerMgr.remove(this.update,this);
    };
    EasyLoading.prototype.update = function (evt) {
        this._uiImageContainer.rotation += this._speed;
    };
    EasyLoading.prototype.setProgress = function (current, total) {
        this._progress.text = StringUtils.format("{0}/{1}", current, total);
        this._progress.x = this._content.width / 2 - this._progress.width / 2;
    };
    EasyLoading.prototype.resetProcgress = function () {
        this._progress.text = "loading...";
        this._progress.x = this._content.width / 2 - this._progress.width / 2;
    };
    return EasyLoading;
}());
__reflect(EasyLoading.prototype, "EasyLoading");
//# sourceMappingURL=EasyLoading.js.map