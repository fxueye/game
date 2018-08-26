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
var BtnMenuItem = (function (_super) {
    __extends(BtnMenuItem, _super);
    function BtnMenuItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "skin.BtnMenuItem";
        _this.imgIcon.addEventListener(egret.Event.COMPLETE, _this.changeImgIcon, _this);
        return _this;
    }
    BtnMenuItem.prototype.changeImgIcon = function () {
        this.imgIcon.width = this.imgIcon.texture.textureWidth;
        this.imgIcon.height = this.imgIcon.texture.textureHeight;
    };
    return BtnMenuItem;
}(eui.Button));
__reflect(BtnMenuItem.prototype, "BtnMenuItem");
//# sourceMappingURL=BtnMenuItem.js.map