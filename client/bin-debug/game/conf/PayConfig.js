var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PayConfig = (function () {
    function PayConfig() {
    }
    Object.defineProperty(PayConfig, "Dic", {
        get: function () {
            return PayConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PayConfig, "Arr", {
        get: function () {
            return PayConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    PayConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                PayConfig._arr.push(config);
                PayConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("PayConfig loader fail!");
        }
    };
    PayConfig._dic = new Dictionary();
    PayConfig._arr = new Array();
    return PayConfig;
}());
__reflect(PayConfig.prototype, "PayConfig");
//# sourceMappingURL=PayConfig.js.map