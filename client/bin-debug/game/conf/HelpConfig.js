var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HelpConfig = (function () {
    function HelpConfig() {
    }
    Object.defineProperty(HelpConfig, "Dic", {
        get: function () {
            return HelpConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelpConfig, "Arr", {
        get: function () {
            return HelpConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    HelpConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                HelpConfig._arr.push(config);
                HelpConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("HelpConfig loader fail!");
        }
    };
    HelpConfig._dic = new Dictionary();
    HelpConfig._arr = new Array();
    return HelpConfig;
}());
__reflect(HelpConfig.prototype, "HelpConfig");
//# sourceMappingURL=HelpConfig.js.map