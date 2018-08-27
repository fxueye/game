var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CompanyConfig = (function () {
    function CompanyConfig() {
    }
    Object.defineProperty(CompanyConfig, "Dic", {
        get: function () {
            return CompanyConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompanyConfig, "Arr", {
        get: function () {
            return CompanyConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    CompanyConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                CompanyConfig._arr.push(config);
                CompanyConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("CompanyConfig loader fail!");
        }
    };
    CompanyConfig._dic = new Dictionary();
    CompanyConfig._arr = new Array();
    return CompanyConfig;
}());
__reflect(CompanyConfig.prototype, "CompanyConfig");
//# sourceMappingURL=CompanyConfig.js.map