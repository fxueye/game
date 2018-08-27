var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SignConfig = (function () {
    function SignConfig() {
        this.Reward = new Array();
        this.Nums = new Array();
    }
    Object.defineProperty(SignConfig, "Dic", {
        get: function () {
            return SignConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignConfig, "Arr", {
        get: function () {
            return SignConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    SignConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                SignConfig._arr.push(config);
                SignConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("SignConfig loader fail!");
        }
    };
    SignConfig._dic = new Dictionary();
    SignConfig._arr = new Array();
    return SignConfig;
}());
__reflect(SignConfig.prototype, "SignConfig");
//# sourceMappingURL=SignConfig.js.map