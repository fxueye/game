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
var DropDwonList = (function (_super) {
    __extends(DropDwonList, _super);
    function DropDwonList() {
        var _this = _super.call(this) || this;
        _this._isShow = false;
        _this._selectIndex = 0;
        return _this;
    }
    DropDwonList.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //列表上面的遮罩
        var spMask = new egret.Shape();
        spMask.graphics.beginFill(0x000000);
        spMask.graphics.drawRect(0, 0, this.gpList.width, this.gpList.height);
        spMask.graphics.endFill();
        this.addChild(spMask);
        this._spMask = spMask;
        this.gpList.mask = spMask;
        this._spMask.y = this.Btn.height;
        this.gpList.y = -this.gpList.height;
        this.Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeListType, this);
        this._data = new eui.ArrayCollection();
        this.ddlList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick, this);
        this.ddlList.dataProvider = this._data;
    };
    Object.defineProperty(DropDwonList.prototype, "dataProvider", {
        set: function (data) {
            this._data.source = data;
            this._data.refresh();
            if (this._data.length < 3) {
                this.gpList.height = this.gpList.height * (this._data.length / 3);
            }
            this.Btn.label = data[0].Name;
        },
        enumerable: true,
        configurable: true
    });
    DropDwonList.prototype.AddListener = function (onClick, obj) {
        this._itemOnClick = onClick;
        this._obj = obj;
    };
    Object.defineProperty(DropDwonList.prototype, "SelectIndex", {
        get: function () {
            return this._selectIndex;
        },
        set: function (val) {
            this._selectIndex = val;
            this.ddlList.selectedIndex = val;
            this.Btn.label = this._data.source[val].Name;
            // this._data.refresh();
        },
        enumerable: true,
        configurable: true
    });
    DropDwonList.prototype.onClick = function (evt) {
        this.Btn.label = evt.item.Name;
        this.changeListType();
        this._selectIndex = evt.itemIndex;
        if (this._itemOnClick != null && this._obj) {
            this._itemOnClick.call(this._obj, evt);
            // this._itemOnClick(evt);
        }
    };
    DropDwonList.prototype.changeListType = function () {
        if (!this._isShow) {
            egret.Tween.get(this.gpList).to({ y: this.Btn.height }, 300);
            this._isShow = true;
        }
        else {
            egret.Tween.get(this.gpList).to({ y: -this.gpList.height }, 300);
            this._isShow = false;
        }
    };
    return DropDwonList;
}(eui.Component));
__reflect(DropDwonList.prototype, "DropDwonList");
//# sourceMappingURL=DropDownList.js.map