var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TipConfig = (function () {
    function TipConfig() {
    }
    Object.defineProperty(TipConfig, "Dic", {
        get: function () {
            return TipConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TipConfig, "Arr", {
        get: function () {
            return TipConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    TipConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                TipConfig._arr.push(config);
                TipConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("TipConfig loader fail!");
        }
    };
    TipConfig._dic = new Dictionary();
    TipConfig._arr = new Array();
    return TipConfig;
}());
__reflect(TipConfig.prototype, "TipConfig");
//# sourceMappingURL=TipConfig.js.map