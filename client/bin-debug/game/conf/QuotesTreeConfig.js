var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var QuotesTreeConfig = (function () {
    function QuotesTreeConfig() {
    }
    Object.defineProperty(QuotesTreeConfig, "Dic", {
        get: function () {
            return QuotesTreeConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotesTreeConfig, "Arr", {
        get: function () {
            return QuotesTreeConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    QuotesTreeConfig.parse = function (json) {
        for (var i = 0; i < json.length; i++) {
            var config = json[i];
            QuotesTreeConfig._arr.push(config);
            QuotesTreeConfig._dic.add(config.Id, config);
        }
    };
    QuotesTreeConfig._dic = new Dictionary();
    QuotesTreeConfig._arr = new Array();
    return QuotesTreeConfig;
}());
__reflect(QuotesTreeConfig.prototype, "QuotesTreeConfig");
//# sourceMappingURL=QuotesTreeConfig.js.map