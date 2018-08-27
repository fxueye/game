var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoomConfig = (function () {
    function RoomConfig() {
        this.CompetitionIds = new Array();
    }
    Object.defineProperty(RoomConfig, "Dic", {
        get: function () {
            return RoomConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomConfig, "Arr", {
        get: function () {
            return RoomConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    RoomConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                RoomConfig._arr.push(config);
                RoomConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("RoomConfig loader fail!");
        }
    };
    RoomConfig._dic = new Dictionary();
    RoomConfig._arr = new Array();
    return RoomConfig;
}());
__reflect(RoomConfig.prototype, "RoomConfig");
//# sourceMappingURL=RoomConfig.js.map