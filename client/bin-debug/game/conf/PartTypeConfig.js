var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PartTypeConfig = (function () {
    function PartTypeConfig() {
    }
    Object.defineProperty(PartTypeConfig, "Dic", {
        get: function () {
            return PartTypeConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PartTypeConfig, "Arr", {
        get: function () {
            return PartTypeConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    PartTypeConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                PartTypeConfig._arr.push(config);
                PartTypeConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("PartTypeConfig loader fail!");
        }
    };
    PartTypeConfig._dic = new Dictionary();
    PartTypeConfig._arr = new Array();
    return PartTypeConfig;
}());
__reflect(PartTypeConfig.prototype, "PartTypeConfig");
//# sourceMappingURL=PartTypeConfig.js.map