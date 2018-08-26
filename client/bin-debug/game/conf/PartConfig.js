var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PartConfig = (function () {
    function PartConfig() {
        this.ArmName = new Array();
        this.TexName = new Array();
        this.Slots = new Array();
        this.MeSlots = new Array();
        this.Deviation = new Array();
    }
    Object.defineProperty(PartConfig, "Dic", {
        get: function () {
            return PartConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PartConfig, "Arr", {
        get: function () {
            return PartConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    PartConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                PartConfig._arr.push(config);
                PartConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("PartConfig loader fail!");
        }
    };
    PartConfig._dic = new Dictionary();
    PartConfig._arr = new Array();
    return PartConfig;
}());
__reflect(PartConfig.prototype, "PartConfig");
//# sourceMappingURL=PartConfig.js.map