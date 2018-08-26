var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MoveClipConfig = (function () {
    function MoveClipConfig() {
        this.Location = new Array();
        this.Scale = new Array();
    }
    Object.defineProperty(MoveClipConfig, "Dic", {
        get: function () {
            return MoveClipConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveClipConfig, "Arr", {
        get: function () {
            return MoveClipConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    MoveClipConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                MoveClipConfig._arr.push(config);
                MoveClipConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("MoveClipConfig loader fail!");
        }
    };
    MoveClipConfig._dic = new Dictionary();
    MoveClipConfig._arr = new Array();
    return MoveClipConfig;
}());
__reflect(MoveClipConfig.prototype, "MoveClipConfig");
//# sourceMappingURL=MoveClipConfig.js.map