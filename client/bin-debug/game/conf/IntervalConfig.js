var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var IntervalConfig = (function () {
    function IntervalConfig() {
    }
    Object.defineProperty(IntervalConfig, "Dic", {
        get: function () {
            return IntervalConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IntervalConfig, "Arr", {
        get: function () {
            return IntervalConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    IntervalConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                IntervalConfig._arr.push(config);
                IntervalConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("IntervalConfig loader fail!");
        }
    };
    IntervalConfig._dic = new Dictionary();
    IntervalConfig._arr = new Array();
    return IntervalConfig;
}());
__reflect(IntervalConfig.prototype, "IntervalConfig");
//# sourceMappingURL=IntervalConfig.js.map