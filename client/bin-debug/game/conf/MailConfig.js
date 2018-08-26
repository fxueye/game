var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MailConfig = (function () {
    function MailConfig() {
        this.RewardItemIds = new Array();
        this.RewardNum = new Array();
    }
    Object.defineProperty(MailConfig, "Dic", {
        get: function () {
            return MailConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailConfig, "Arr", {
        get: function () {
            return MailConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    MailConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                MailConfig._arr.push(config);
                MailConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("MailConfig loader fail!");
        }
    };
    MailConfig._dic = new Dictionary();
    MailConfig._arr = new Array();
    return MailConfig;
}());
__reflect(MailConfig.prototype, "MailConfig");
//# sourceMappingURL=MailConfig.js.map