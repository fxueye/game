var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AppConfig = (function () {
    function AppConfig() {
    }
    Object.defineProperty(AppConfig, "Dic", {
        get: function () {
            return AppConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppConfig, "Arr", {
        get: function () {
            return AppConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    AppConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                AppConfig._arr.push(config);
                AppConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("AppConfig loader fail!");
        }
    };
    AppConfig._dic = new Dictionary();
    AppConfig._arr = new Array();
    return AppConfig;
}());
__reflect(AppConfig.prototype, "AppConfig");
//# sourceMappingURL=AppConfig.js.map