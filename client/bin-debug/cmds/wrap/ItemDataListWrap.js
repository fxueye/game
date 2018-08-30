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
var ItemDataListWrap = (function (_super) {
    __extends(ItemDataListWrap, _super);
    function ItemDataListWrap() {
        return _super.call(this) || this;
    }
    ItemDataListWrap.prototype.Decode = function (pck) {
        this.ItemList = new Array();
        for (var i = 0, len = this.ItemList.length; i < len; i++) {
            this.ItemList[i] = new ItemDataWrap();
            this.ItemList[i].Decode(pck);
        }
        return this;
    };
    ItemDataListWrap.prototype.Encode = function (pck) {
        if (this.ItemList == null)
            pck.PutShort(0);
        else {
            pck.PutShort(this.ItemList.length);
            for (var i = 0, len = this.ItemList.length; i < len; i++) {
                this.ItemList[i].Encode(pck);
            }
        }
    };
    return ItemDataListWrap;
}(Net.Simple.IWrapper));
__reflect(ItemDataListWrap.prototype, "ItemDataListWrap");
//# sourceMappingURL=ItemDataListWrap.js.map