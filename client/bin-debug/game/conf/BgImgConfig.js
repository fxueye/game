var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BgImgConfig = (function () {
    function BgImgConfig() {
        this.Location = new Array();
    }
    Object.defineProperty(BgImgConfig, "Dic", {
        get: function () {
            return BgImgConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BgImgConfig, "Arr", {
        get: function () {
            return BgImgConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    BgImgConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                BgImgConfig._arr.push(config);
                BgImgConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("BgImgConfig loader fail!");
        }
    };
    BgImgConfig._dic = new Dictionary();
    BgImgConfig._arr = new Array();
    return BgImgConfig;
}());
__reflect(BgImgConfig.prototype, "BgImgConfig");
//# sourceMappingURL=BgImgConfig.js.map