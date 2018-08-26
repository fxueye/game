var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PropertyConfig = (function () {
    function PropertyConfig() {
        this.Deviation = new Array();
        this.Location = new Array();
    }
    Object.defineProperty(PropertyConfig, "Dic", {
        get: function () {
            return PropertyConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyConfig, "Arr", {
        get: function () {
            return PropertyConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    PropertyConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                PropertyConfig._arr.push(config);
                PropertyConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("PropertyConfig loader fail!");
        }
    };
    PropertyConfig._dic = new Dictionary();
    PropertyConfig._arr = new Array();
    return PropertyConfig;
}());
__reflect(PropertyConfig.prototype, "PropertyConfig");
//# sourceMappingURL=PropertyConfig.js.map