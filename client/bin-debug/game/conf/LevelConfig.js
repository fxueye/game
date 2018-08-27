var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LevelConfig = (function () {
    function LevelConfig() {
    }
    Object.defineProperty(LevelConfig, "Dic", {
        get: function () {
            return LevelConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LevelConfig, "Arr", {
        get: function () {
            return LevelConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    LevelConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                LevelConfig._arr.push(config);
                LevelConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("LevelConfig loader fail!");
        }
    };
    LevelConfig._dic = new Dictionary();
    LevelConfig._arr = new Array();
    return LevelConfig;
}());
__reflect(LevelConfig.prototype, "LevelConfig");
//# sourceMappingURL=LevelConfig.js.map