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
var Icon = (function (_super) {
    __extends(Icon, _super);
    function Icon() {
        var _this = _super.call(this) || this;
        _this._addEventListener = false;
        _this.skinName = "skin.IconSkin";
        return _this;
    }
    Icon.prototype.setData = function (val) {
        this.data = val;
        this.dataChanged();
    };
    Icon.prototype.refresh = function () {
        this.dataChanged();
    };
    Icon.prototype.dataChanged = function () {
        if (!this._addEventListener) {
            this.imgIcon.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
            this._addEventListener = true;
        }
        if (this.data) {
            if (this.data.BgIcon == "")
                this.imgBg.source = "common_icon_tx_png";
            if (this.data.Count > 0) {
                this.labCount.text = GameUtils.PaseNum(this.data.Count);
                this.labCount.visible = true;
            }
            if (this.data.UrlIcon != null) {
                RES.getResByUrl(this.data.UrlIcon, this.getResComplete, this, "image");
            }
            if (this.data.Scale) {
                this.imgIcon.scaleX = this.data.Scale;
                this.imgIcon.scaleY = this.data.Scale;
            }
            if (this.data.Name) {
                this.labName.visible = true;
                this.labName.text = this.data.Name;
            }
            if (this.data.Icon) {
                this.imgIcon.source = this.data.Icon;
            }
        }
        else {
            this.imgIcon.source = "common_icon_nan_png";
            this.imgBg.source = "common_icon_tx_png";
        }
    };
    Icon.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    Icon.prototype.getResComplete = function (data) {
        this.imgIcon.texture = data;
    };
    Icon.prototype.onComplete = function (evt) {
        var img = evt.target;
        if (img) {
            img.width = img.texture.textureWidth;
            img.height = img.texture.textureHeight;
            // this.imgIcon.width = img.width;
            // this.imgIcon.height = img.height;
            // if(this.data.Scale){
            //     this.imgIcon.scaleX = this.data.Scale;
            //     this.imgIcon.scaleY = this.data.Scale;
            // }
        }
    };
    return Icon;
}(eui.ItemRenderer));
__reflect(Icon.prototype, "Icon");
//# sourceMappingURL=Icon.js.map