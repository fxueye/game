var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MailData = (function () {
    function MailData() {
        this._bgIcon = "common_icon_tx_png";
        this._items = [];
        this._params = [];
    }
    Object.defineProperty(MailData.prototype, "UID", {
        get: function () {
            return this._uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailData.prototype, "Id", {
        get: function () {
            return this._id;
        },
        set: function (val) {
            this._id = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailData.prototype, "Title", {
        get: function () {
            return this._title;
        },
        set: function (val) {
            this._title = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailData.prototype, "Content", {
        get: function () {
            return this._content;
        },
        set: function (val) {
            this._content = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailData.prototype, "FromName", {
        get: function () {
            return this._fromName;
        },
        set: function (val) {
            this._fromName = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailData.prototype, "Status", {
        get: function () {
            return this._status;
        },
        set: function (val) {
            this._status = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailData.prototype, "BgIcon", {
        get: function () {
            return this._bgIcon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailData.prototype, "Icon", {
        get: function () {
            return this._icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailData.prototype, "IconScale", {
        get: function () {
            return this._iconScale;
        },
        set: function (val) {
            this._iconScale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailData.prototype, "Slave", {
        get: function () {
            return StringUtils.format("包含{0}个附件", this._items.length);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailData.prototype, "Items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailData.prototype, "CreateTimeStr", {
        get: function () {
            return DateUtil.DateFormat(DateUtil.Timestamp2Date(this._createTime));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailData.prototype, "MailConfig", {
        get: function () {
            if (MailConfig.Dic.containsKey(this.Id)) {
                return MailConfig.Dic.get(this.Id);
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return MailData;
}());
__reflect(MailData.prototype, "MailData");
//# sourceMappingURL=MailData.js.map