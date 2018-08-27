var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ItemConfig = (function () {
    function ItemConfig() {
    }
    Object.defineProperty(ItemConfig, "Dic", {
        get: function () {
            return ItemConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemConfig, "Arr", {
        get: function () {
            return ItemConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    ItemConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                ItemConfig._arr.push(config);
                ItemConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("ItemConfig loader fail!");
        }
    };
    ItemConfig._dic = new Dictionary();
    ItemConfig._arr = new Array();
    return ItemConfig;
}());
__reflect(ItemConfig.prototype, "ItemConfig");
//# sourceMappingURL=ItemConfig.js.map