var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BdConfig = (function () {
    function BdConfig() {
        this.Slots = new Array();
    }
    Object.defineProperty(BdConfig, "Dic", {
        get: function () {
            return BdConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BdConfig, "Arr", {
        get: function () {
            return BdConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    BdConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                BdConfig._arr.push(config);
                BdConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("BdConfig loader fail!");
        }
    };
    BdConfig._dic = new Dictionary();
    BdConfig._arr = new Array();
    return BdConfig;
}());
__reflect(BdConfig.prototype, "BdConfig");
//# sourceMappingURL=BdConfig.js.map