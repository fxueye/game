var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SlotsConfig = (function () {
    function SlotsConfig() {
        this.BeforeSlot = new Array();
    }
    Object.defineProperty(SlotsConfig, "Dic", {
        get: function () {
            return SlotsConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotsConfig, "Arr", {
        get: function () {
            return SlotsConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    SlotsConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                SlotsConfig._arr.push(config);
                SlotsConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("SlotsConfig loader fail!");
        }
    };
    SlotsConfig._dic = new Dictionary();
    SlotsConfig._arr = new Array();
    return SlotsConfig;
}());
__reflect(SlotsConfig.prototype, "SlotsConfig");
//# sourceMappingURL=SlotsConfig.js.map