var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundCongfig = (function () {
    function SoundCongfig() {
    }
    Object.defineProperty(SoundCongfig, "Dic", {
        get: function () {
            return SoundCongfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundCongfig, "Arr", {
        get: function () {
            return SoundCongfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    SoundCongfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                SoundCongfig._arr.push(config);
                SoundCongfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("SoundCongfig loader fail!");
        }
    };
    SoundCongfig._dic = new Dictionary();
    SoundCongfig._arr = new Array();
    return SoundCongfig;
}());
__reflect(SoundCongfig.prototype, "SoundCongfig");
//# sourceMappingURL=SoundCongfig.js.map