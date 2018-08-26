var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ShopConfig = (function () {
    function ShopConfig() {
        this.Location = new Array();
    }
    Object.defineProperty(ShopConfig, "Dic", {
        get: function () {
            return ShopConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShopConfig, "Arr", {
        get: function () {
            return ShopConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    ShopConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                ShopConfig._arr.push(config);
                ShopConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("ShopConfig loader fail!");
        }
    };
    ShopConfig._dic = new Dictionary();
    ShopConfig._arr = new Array();
    return ShopConfig;
}());
__reflect(ShopConfig.prototype, "ShopConfig");
//# sourceMappingURL=ShopConfig.js.map