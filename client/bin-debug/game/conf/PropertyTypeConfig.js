var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PropertyTypeConfig = (function () {
    function PropertyTypeConfig() {
    }
    Object.defineProperty(PropertyTypeConfig, "Dic", {
        get: function () {
            return PropertyTypeConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyTypeConfig, "Arr", {
        get: function () {
            return PropertyTypeConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    PropertyTypeConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                PropertyTypeConfig._arr.push(config);
                PropertyTypeConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("PropertyTypeConfig loader fail!");
        }
    };
    PropertyTypeConfig._dic = new Dictionary();
    PropertyTypeConfig._arr = new Array();
    return PropertyTypeConfig;
}());
__reflect(PropertyTypeConfig.prototype, "PropertyTypeConfig");
//# sourceMappingURL=PropertyTypeConfig.js.map