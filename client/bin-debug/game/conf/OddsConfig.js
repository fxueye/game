var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var OddsConfig = (function () {
    function OddsConfig() {
    }
    Object.defineProperty(OddsConfig, "Dic", {
        get: function () {
            return OddsConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OddsConfig, "Arr", {
        get: function () {
            return OddsConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    OddsConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                OddsConfig._arr.push(config);
                OddsConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("OddsConfig loader fail!");
        }
    };
    OddsConfig._dic = new Dictionary();
    OddsConfig._arr = new Array();
    return OddsConfig;
}());
__reflect(OddsConfig.prototype, "OddsConfig");
//# sourceMappingURL=OddsConfig.js.map