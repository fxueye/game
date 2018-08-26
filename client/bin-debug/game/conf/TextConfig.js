var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TextConfig = (function () {
    function TextConfig() {
    }
    Object.defineProperty(TextConfig, "Dic", {
        get: function () {
            return TextConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextConfig, "Arr", {
        get: function () {
            return TextConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    TextConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                TextConfig._arr.push(config);
                TextConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("TextConfig loader fail!");
        }
    };
    TextConfig._dic = new Dictionary();
    TextConfig._arr = new Array();
    return TextConfig;
}());
__reflect(TextConfig.prototype, "TextConfig");
//# sourceMappingURL=TextConfig.js.map