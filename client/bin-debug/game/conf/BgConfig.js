var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BgConfig = (function () {
    function BgConfig() {
        this.Imgs = new Array();
        this.Particle = new Array();
    }
    Object.defineProperty(BgConfig, "Dic", {
        get: function () {
            return BgConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BgConfig, "Arr", {
        get: function () {
            return BgConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    BgConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                BgConfig._arr.push(config);
                BgConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("BgConfig loader fail!");
        }
    };
    BgConfig._dic = new Dictionary();
    BgConfig._arr = new Array();
    return BgConfig;
}());
__reflect(BgConfig.prototype, "BgConfig");
//# sourceMappingURL=BgConfig.js.map