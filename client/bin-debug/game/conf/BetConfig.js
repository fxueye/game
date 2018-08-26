var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BetConfig = (function () {
    function BetConfig() {
    }
    Object.defineProperty(BetConfig, "Dic", {
        get: function () {
            return BetConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BetConfig, "Arr", {
        get: function () {
            return BetConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    BetConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                BetConfig._arr.push(config);
                BetConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("BetConfig loader fail!");
        }
    };
    BetConfig._dic = new Dictionary();
    BetConfig._arr = new Array();
    return BetConfig;
}());
__reflect(BetConfig.prototype, "BetConfig");
//# sourceMappingURL=BetConfig.js.map