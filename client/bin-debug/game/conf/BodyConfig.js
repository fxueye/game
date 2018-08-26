var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BodyConfig = (function () {
    function BodyConfig() {
        this.Slots = new Array();
    }
    Object.defineProperty(BodyConfig, "Dic", {
        get: function () {
            return BodyConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BodyConfig, "Arr", {
        get: function () {
            return BodyConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    BodyConfig.parse = function (json) {
        for (var i = 0; i < json.length; i++) {
            var config = json[i];
            BodyConfig._arr.push(config);
            BodyConfig._dic.add(config.Id, config);
        }
    };
    BodyConfig._dic = new Dictionary();
    BodyConfig._arr = new Array();
    return BodyConfig;
}());
__reflect(BodyConfig.prototype, "BodyConfig");
//# sourceMappingURL=BodyConfig.js.map