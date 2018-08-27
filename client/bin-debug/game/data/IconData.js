var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var IconData = (function () {
    function IconData() {
        this._bgIcon = "common_icon_tx_png";
    }
    Object.defineProperty(IconData.prototype, "ItemId", {
        set: function (id) {
            this.Icon = "";
            this._itemId = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconData.prototype, "BgIcon", {
        get: function () {
            if (this._itemId >= 0) {
                var itemConfig = ItemConfig.Dic.get(this._itemId);
                return itemConfig.Iconframe;
            }
            return this._bgIcon;
        },
        set: function (value) {
            this._bgIcon = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconData.prototype, "Count", {
        get: function () {
            return this._count;
        },
        set: function (val) {
            this._count = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconData.prototype, "Icon", {
        get: function () {
            if (this._itemId >= 0) {
                var itemConfig = ItemConfig.Dic.get(this._itemId);
                return itemConfig.Icon;
            }
            return this._icon;
        },
        set: function (value) {
            this._icon = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconData.prototype, "UrlIcon", {
        get: function () {
            return this._urlIcon;
        },
        set: function (val) {
            this._urlIcon = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconData.prototype, "Scale", {
        get: function () {
            if (this._itemId >= 0) {
                var itemConfig = ItemConfig.Dic.get(this._itemId);
                return itemConfig.IconScale;
            }
            return this._scale;
        },
        set: function (val) {
            this._scale = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconData.prototype, "Name", {
        get: function () {
            return this._name;
        },
        set: function (val) {
            this._name = val;
        },
        enumerable: true,
        configurable: true
    });
    return IconData;
}());
__reflect(IconData.prototype, "IconData");
//# sourceMappingURL=IconData.js.map