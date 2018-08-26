var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ToastUtils = (function () {
    function ToastUtils() {
    }
    ToastUtils.Error = function (code) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var textId = ErrorCode.Codes[code];
        if (textId) {
            args.unshift(ConfigUtils.GetText(ErrorCode.Codes[code]));
        }
        else {
            args.unshift("error code:" + code);
        }
        var formatStr = StringUtils.format.apply(StringUtils, args);
        Toast.makeToast(formatStr, 800).show();
    };
    ToastUtils.LocalError = function (code) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (code) {
            args.unshift(ConfigUtils.GetText(code));
        }
        else {
            args.unshift("error code:" + code);
        }
        var formatStr = StringUtils.format.apply(StringUtils, args);
        Toast.makeToast(formatStr, 800).show();
    };
    return ToastUtils;
}());
__reflect(ToastUtils.prototype, "ToastUtils");
//# sourceMappingURL=ToastUtils.js.map