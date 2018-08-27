var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.format = function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < args.length; i++)
            str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
        return str;
    };
    StringUtils.pad = function (num, n) {
        var len = num.toString().length;
        while (len < n) {
            num = "0" + num;
            len++;
        }
        return num;
    };
    return StringUtils;
}());
__reflect(StringUtils.prototype, "StringUtils");
//# sourceMappingURL=StringUtils.js.map