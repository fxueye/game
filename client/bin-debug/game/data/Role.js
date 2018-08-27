var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Role = (function () {
    function Role() {
        this._icon = ""; //头像
        this._items = new Array();
        this._itemsId2ItemDic = new Dictionary();
        this._itemsUid2ItemDic = new Dictionary();
        this._typeIdDic = new Dictionary();
        this._typeUidDic = new Dictionary();
        this._level = 0;
        this._vipLevel = 0;
        this._mood = "这家伙很懒!";
        this._sign = new SignData();
        this._mails = new Array();
    }
    Object.defineProperty(Role.prototype, "Sign", {
        get: function () {
            return this._sign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "ID", {
        get: function () {
            return this._uid;
        },
        set: function (val) {
            this._uid = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "Name", {
        get: function () {
            if (DeviceUtils.IsWeixin()) {
                this._name = App.Instance.Account.NickName;
            }
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "Mood", {
        get: function () {
            return this._mood;
        },
        set: function (value) {
            this._mood = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "Exp", {
        get: function () {
            return this._itemsId2ItemDic.get(ItemID.EXP).Count;
        },
        set: function (value) {
            var item = this._itemsId2ItemDic.get(ItemID.EXP);
            if (item == null) {
                item = new ItemData(ItemID.EXP, value);
                this.addItem(item);
            }
            item.Count = value;
            this.calcLevel();
        },
        enumerable: true,
        configurable: true
    });
    Role.prototype.calcLevel = function () {
        for (var i = 0; i < LevelConfig.Arr.length; i++) {
            var levelConfig = LevelConfig.Arr[i];
            if (this.Exp < levelConfig.Exp) {
                this._level = levelConfig.Id - 1;
                this.calcProgress();
                return;
            }
        }
    };
    Role.prototype.calcProgress = function () {
        var levelConfig = LevelConfig.Dic.get(this.Level);
        var nextLeveConfig = LevelConfig.Dic.get(this.Level + 1);
        var count = nextLeveConfig.Exp - levelConfig.Exp;
        var curr = count - (nextLeveConfig.Exp - this.Exp);
        this._progress = curr / count * 100;
    };
    Object.defineProperty(Role.prototype, "Level", {
        get: function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "Progress", {
        get: function () {
            return this._progress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "VipLevel", {
        get: function () {
            return this._vipLevel;
        },
        set: function (value) {
            // var item =  this._itemsDic.get(ItemID.VIP_LEVEL);
            // if(item == null){
            // 	item = new Item(ItemID.VIP_LEVEL);
            // }
            // item.Count = value;
            this._vipLevel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "Title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "Diamond", {
        get: function () {
            return this._itemsId2ItemDic.get(ItemID.DIAMOND).Count;
        },
        set: function (value) {
            var item = this._itemsId2ItemDic.get(ItemID.DIAMOND);
            if (item == null) {
                item = new ItemData(ItemID.DIAMOND, value);
                this.addItem(item);
            }
            item.Count = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "Money", {
        get: function () {
            return this._itemsId2ItemDic.get(ItemID.MONEY).Count;
        },
        set: function (value) {
            var item = this._itemsId2ItemDic.get(ItemID.MONEY);
            if (item == null) {
                item = new ItemData(ItemID.MONEY, value);
                this.addItem(item);
            }
            item.Count = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "AssetValue", {
        get: function () {
            var assetValue = 0;
            // Logger.log("start---------------------------------")
            for (var _i = 0, _a = this._itemsUid2ItemDic.values; _i < _a.length; _i++) {
                var item = _a[_i];
                // Logger.log("item id:" + item.ID + " cout:" + item.Count + "  price:" + item.ItemConfig.WorthPrice);
                assetValue += item.Count * item.ItemConfig.WorthPrice;
            }
            // Logger.log("end---------------------------------")
            return assetValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "Icon", {
        get: function () {
            if (DeviceUtils.IsWeixin()) {
                this._icon = App.Instance.Account.AvatarUrl;
            }
            return this._icon;
        },
        set: function (value) {
            this._icon = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "Items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "ItemDic", {
        get: function () {
            return this._itemsId2ItemDic;
        },
        enumerable: true,
        configurable: true
    });
    Role.prototype.getItemByUID = function (uid) {
        return this._itemsUid2ItemDic[uid];
    };
    Role.prototype.getItemCount = function (id) {
        var items = this.getItemByID(id);
        if (items.length == 1) {
            return items[0].Count;
        }
        else {
            return items.length;
        }
    };
    Role.prototype.getItemByID = function (id) {
        var config = ItemConfig.Dic.get(id);
        var ret = new Array();
        if (config.AddType == AddType.OVERLAY) {
            ret.push(this._itemsId2ItemDic.get(config.Id));
        }
        else if (config.AddType == AddType.UNOVERLAY) {
            for (var i = 0, len = this._itemsUid2ItemDic.values.length; i < len; i++) {
                var itemData = this._itemsUid2ItemDic.values[i];
                if (itemData.ID == id) {
                    ret.push(itemData);
                }
            }
        }
        return ret;
    };
    Role.prototype.getItemByType = function (type, addType) {
        if (addType === void 0) { addType = AddType.OVERLAY; }
        var dic = this._typeIdDic.get(type);
        if (addType == AddType.UNOVERLAY) {
            dic = this._typeUidDic.get(type);
        }
        return dic == null ? new Dictionary() : dic;
    };
    Role.prototype.costItem = function (item) {
        if (item.ItemConfig.AddType == AddType.OVERLAY && this._itemsId2ItemDic.containsKey(item.ID)) {
            var nowItem = this._itemsId2ItemDic.get(item.ID);
            nowItem.Count -= item.Count;
        }
        else if (item.ItemConfig.AddType == AddType.UNOVERLAY) {
            if (this._itemsUid2ItemDic.containsKey(item.UID)) {
                var nowItem = this._itemsUid2ItemDic.get(item.UID);
                nowItem.Count = 0;
            }
        }
    };
    Role.prototype.addItem = function (item, calc) {
        if (calc === void 0) { calc = false; }
        if (item.ItemConfig.AddType == AddType.OVERLAY && this._itemsId2ItemDic.containsKey(item.ID)) {
            var nowItem = this._itemsId2ItemDic.get(item.ID);
            nowItem.Count += item.Count;
        }
        else if (item.ItemConfig.AddType == AddType.OVERLAY) {
            this._itemsId2ItemDic.add(item.ID, item);
            this._itemsUid2ItemDic.add(item.UID, item);
            this._items.push(item);
        }
        else if (item.ItemConfig.AddType == AddType.UNOVERLAY) {
            this._itemsUid2ItemDic.add(item.UID, item);
            this._items.push(item);
        }
        else {
            this._itemsUid2ItemDic.add(item.UID, item);
            this._items.push(item);
        }
        if (this._typeIdDic.containsKey(item.ItemConfig.ItemType)) {
            var dic = this._typeIdDic.get(item.ItemConfig.ItemType);
            if (dic.containsKey(item.ID) && item.ItemConfig.AddType == AddType.UNOVERLAY) {
                //不叠加数量永远是1
                // var temp =  dic.get(item.ID);
                // temp.Count += item.Count;
            }
            else {
                dic.add(item.ID, item);
            }
        }
        else {
            var dic = new Dictionary();
            dic.add(item.ID, item);
            this._typeIdDic.add(item.ItemConfig.ItemType, dic);
        }
        if (this._typeUidDic.containsKey(item.ItemConfig.ItemType)) {
            var dic = this._typeUidDic.get(item.ItemConfig.ItemType);
            if (!dic.containsKey(item.UID) && item.UID > 0) {
                dic.add(item.UID, item);
            }
        }
        else {
            var dic = new Dictionary();
            dic.add(item.UID, item);
            this._typeUidDic.add(item.ItemConfig.ItemType, dic);
        }
        if (calc) {
            this.calc(item);
        }
    };
    Role.prototype.calc = function (item) {
        switch (item.ID) {
            case ItemID.EXP:
                this.calcLevel();
        }
    };
    Role.prototype.addMail = function (mail) {
        this._mails.push(mail);
    };
    Role.prototype.getMailByUid = function (uid) {
        for (var _i = 0, _a = this._mails; _i < _a.length; _i++) {
            var mail = _a[_i];
            if (mail.UID == uid) {
                return mail;
            }
        }
        return null;
    };
    Role.prototype.delMail = function (mail) {
        var index = this._mails.indexOf(mail);
        if (index >= 0)
            this._mails.splice(index, 1);
    };
    Role.prototype.getMails = function () {
        return this._mails;
    };
    Object.defineProperty(Role.prototype, "SecName", {
        get: function () {
            var key = this._uid + "_secName";
            var name = egret.localStorage.getItem(key);
            if (name) {
                this._secName = name;
            }
            else {
                this._secName = RoleInitConfig.Dic.get(1).Name;
            }
            return this._secName;
        },
        set: function (val) {
            this._secName = val;
            var key = this._uid + "_secName";
            egret.localStorage.setItem(key, val);
        },
        enumerable: true,
        configurable: true
    });
    return Role;
}());
__reflect(Role.prototype, "Role");
//# sourceMappingURL=Role.js.map