var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RandomName = (function () {
    function RandomName() {
    }
    Object.defineProperty(RandomName, "Dic", {
        get: function () {
            return RandomName._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RandomName, "Arr", {
        get: function () {
            return RandomName._arr;
        },
        enumerable: true,
        configurable: true
    });
    RandomName.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                RandomName._arr.push(config);
                RandomName._dic.add(config.Id, config);
            }
        }
        else {
            console.error("RandomName loader fail!");
        }
    };
    RandomName._dic = new Dictionary();
    RandomName._arr = new Array();
    return RandomName;
}());
__reflect(RandomName.prototype, "RandomName");
//# sourceMappingURL=RandomName.js.map