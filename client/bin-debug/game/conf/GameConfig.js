var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConfig = (function () {
    function GameConfig() {
    }
    Object.defineProperty(GameConfig, "Dic", {
        get: function () {
            return GameConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "Arr", {
        get: function () {
            return GameConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    GameConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                GameConfig._arr.push(config);
                GameConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("GameConfig loader fail!");
        }
    };
    GameConfig._dic = new Dictionary();
    GameConfig._arr = new Array();
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map