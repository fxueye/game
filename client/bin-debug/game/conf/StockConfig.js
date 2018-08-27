var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StockConfig = (function () {
    function StockConfig() {
    }
    Object.defineProperty(StockConfig, "Dic", {
        get: function () {
            return StockConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StockConfig, "Arr", {
        get: function () {
            return StockConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    StockConfig.parse = function (json) {
        for (var i = 0; i < json.length; i++) {
            var config = json[i];
            StockConfig._arr.push(config);
            StockConfig._dic.add(config.Id, config);
        }
    };
    StockConfig._dic = new Dictionary();
    StockConfig._arr = new Array();
    return StockConfig;
}());
__reflect(StockConfig.prototype, "StockConfig");
//# sourceMappingURL=StockConfig.js.map