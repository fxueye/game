var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ParticleConfig = (function () {
    function ParticleConfig() {
        this.Location = new Array();
        this.Scale = new Array();
    }
    Object.defineProperty(ParticleConfig, "Dic", {
        get: function () {
            return ParticleConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleConfig, "Arr", {
        get: function () {
            return ParticleConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    ParticleConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                ParticleConfig._arr.push(config);
                ParticleConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("ParticleConfig loader fail!");
        }
    };
    ParticleConfig._dic = new Dictionary();
    ParticleConfig._arr = new Array();
    return ParticleConfig;
}());
__reflect(ParticleConfig.prototype, "ParticleConfig");
//# sourceMappingURL=ParticleConfig.js.map