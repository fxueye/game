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
var ItemDataWrap = (function (_super) {
    __extends(ItemDataWrap, _super);
    function ItemDataWrap() {
        return _super.call(this) || this;
    }
    ItemDataWrap.prototype.Decode = function (pck) {
        this.ItemID = pck.GetInt();
        this.Count = pck.GetInt();
        this.LastUpdateTime = pck.GetLong();
        return this;
    };
    ItemDataWrap.prototype.Encode = function (pck) {
        pck.PutInt(this.ItemID);
        pck.PutInt(this.Count);
        pck.PutLong(this.LastUpdateTime);
    };
    return ItemDataWrap;
}(Net.Simple.IWrapper));
__reflect(ItemDataWrap.prototype, "ItemDataWrap");
//# sourceMappingURL=ItemDataWrap.js.map