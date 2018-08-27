var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SuitConfig = (function () {
    function SuitConfig() {
        this.Parts = new Array();
    }
    Object.defineProperty(SuitConfig, "Dic", {
        get: function () {
            return SuitConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuitConfig, "Arr", {
        get: function () {
            return SuitConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    SuitConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                SuitConfig._arr.push(config);
                SuitConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("SuitConfig loader fail!");
        }
    };
    SuitConfig._dic = new Dictionary();
    SuitConfig._arr = new Array();
    return SuitConfig;
}());
__reflect(SuitConfig.prototype, "SuitConfig");
//# sourceMappingURL=SuitConfig.js.map