var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ItemID = (function () {
    function ItemID() {
    }
    ItemID.DIAMOND = 1;
    ItemID.MONEY = 2;
    ItemID.EXP = 3;
    return ItemID;
}());
__reflect(ItemID.prototype, "ItemID");
var ItemType = (function () {
    function ItemType() {
    }
    ItemType.CURRENCY = 0;
    ItemType.DATA = 1;
    ItemType.PEOPS = 2;
    ItemType.SUIT = 3;
    ItemType.ASSETS = 4;
    return ItemType;
}());
__reflect(ItemType.prototype, "ItemType");
var AddType = (function () {
    function AddType() {
    }
    AddType.OVERLAY = 1;
    AddType.UNOVERLAY = 2;
    return AddType;
}());
__reflect(AddType.prototype, "AddType");
var ItemData = (function () {
    function ItemData(uid, id, count) {
        if (count === void 0) { count = 1; }
        this._uid = uid;
        this._id = id;
        this._count = count;
    }
    Object.defineProperty(ItemData.prototype, "UID", {
        get: function () {
            return this._uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemData.prototype, "ID", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemData.prototype, "Count", {
        get: function () {
            return this._count;
        },
        set: function (value) {
            this._count = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemData.prototype, "ItemConfig", {
        get: function () {
            var itemConfig = ItemConfig.Dic.get(this._id);
            if (itemConfig == null) {
                console.error("not find ItemConfig id:" + this._id);
            }
            return itemConfig;
        },
        enumerable: true,
        configurable: true
    });
    return ItemData;
}());
__reflect(ItemData.prototype, "ItemData");
//# sourceMappingURL=ItemData.js.map