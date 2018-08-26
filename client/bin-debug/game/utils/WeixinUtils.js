var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WeixinUtils = (function () {
    function WeixinUtils() {
    }
    WeixinUtils.open = function (key, width, height, itemHeight, itemPadding) {
        var platform = window.platform;
        platform.openDataContext.postMessage({
            rankWidth: width,
            rankHeight: height,
            itemHeight: itemHeight,
            itemPadding: itemPadding,
            key: key,
            command: "open"
        });
    };
    WeixinUtils.close = function () {
        var platform = window.platform;
        platform.openDataContext.postMessage({
            command: "close"
        });
    };
    WeixinUtils.move = function (dis) {
        var platform = window.platform;
        platform.openDataContext.postMessage({
            dis: dis,
            command: "move"
        });
    };
    WeixinUtils.updateRank = function (type, score, updateTime) {
        var platform = window.platform;
        var data = { wxgame: { score: score, update_time: updateTime } };
        var kvdata = { key: type + "", value: JSON.stringify(data) };
        platform.openDataContext.postMessage({
            kvdata: kvdata,
            command: "updateRank"
        });
    };
    return WeixinUtils;
}());
__reflect(WeixinUtils.prototype, "WeixinUtils");
//# sourceMappingURL=WeixinUtils.js.map