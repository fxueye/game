var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Net;
(function (Net) {
    var Simple;
    (function (Simple) {
        var IWrapper = (function () {
            function IWrapper() {
            }
            IWrapper.prototype.Decode = function (pck) { };
            IWrapper.prototype.Encode = function (pck) { };
            return IWrapper;
        }());
        Simple.IWrapper = IWrapper;
        __reflect(IWrapper.prototype, "Net.Simple.IWrapper");
    })(Simple = Net.Simple || (Net.Simple = {}));
})(Net || (Net = {}));
//# sourceMappingURL=IWrapper.js.map