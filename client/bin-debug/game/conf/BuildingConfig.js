var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BuildingConfig = (function () {
    function BuildingConfig() {
        this.NameLocation = new Array();
        this.Location = new Array();
    }
    Object.defineProperty(BuildingConfig, "Dic", {
        get: function () {
            return BuildingConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildingConfig, "Arr", {
        get: function () {
            return BuildingConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    BuildingConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                BuildingConfig._arr.push(config);
                BuildingConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("BuildingConfig loader fail!");
        }
    };
    BuildingConfig._dic = new Dictionary();
    BuildingConfig._arr = new Array();
    return BuildingConfig;
}());
__reflect(BuildingConfig.prototype, "BuildingConfig");
//# sourceMappingURL=BuildingConfig.js.map