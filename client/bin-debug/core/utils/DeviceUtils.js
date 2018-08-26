var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DeviceUtils = (function () {
    function DeviceUtils() {
    }
    DeviceUtils.IsHtml5 = function () {
        return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
    };
    DeviceUtils.IsWeixin = function () {
        return egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME;
    };
    DeviceUtils.IsNative = function () {
        return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
    };
    DeviceUtils.IsMobile = function () {
        return egret.Capabilities.isMobile;
    };
    DeviceUtils.IsPc = function () {
        return !egret.Capabilities.isMobile;
    };
    return DeviceUtils;
}());
__reflect(DeviceUtils.prototype, "DeviceUtils");
//# sourceMappingURL=DeviceUtils.js.map