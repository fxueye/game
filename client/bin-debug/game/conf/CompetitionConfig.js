var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CompetitionConfig = (function () {
    function CompetitionConfig() {
        this.DataPosition = new Array();
        this.BetIds = new Array();
        this.IntervalIds = new Array();
        this.Location = new Array();
    }
    Object.defineProperty(CompetitionConfig, "Dic", {
        get: function () {
            return CompetitionConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompetitionConfig, "Arr", {
        get: function () {
            return CompetitionConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    CompetitionConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                CompetitionConfig._arr.push(config);
                CompetitionConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("CompetitionConfig loader fail!");
        }
    };
    CompetitionConfig._dic = new Dictionary();
    CompetitionConfig._arr = new Array();
    return CompetitionConfig;
}());
__reflect(CompetitionConfig.prototype, "CompetitionConfig");
//# sourceMappingURL=CompetitionConfig.js.map