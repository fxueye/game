var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleInitConfig = (function () {
    function RoleInitConfig() {
        this.Cloth = new Array();
        this.ItemIds = new Array();
    }
    Object.defineProperty(RoleInitConfig, "Dic", {
        get: function () {
            return RoleInitConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleInitConfig, "Arr", {
        get: function () {
            return RoleInitConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    RoleInitConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                RoleInitConfig._arr.push(config);
                RoleInitConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("RoleInitConfig loader fail!");
        }
    };
    RoleInitConfig._dic = new Dictionary();
    RoleInitConfig._arr = new Array();
    return RoleInitConfig;
}());
__reflect(RoleInitConfig.prototype, "RoleInitConfig");
//# sourceMappingURL=RoleInitConfig.js.map