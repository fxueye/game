var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ErrorCode = (function () {
    function ErrorCode() {
    }
    ErrorCode.TIMEOUT = -1;
    ErrorCode.SUCCESS = 1;
    ErrorCode.NOT_ENOUGH = 10001;
    ErrorCode.Codes = {
        0x00001001: ErrorCode.NOT_ENOUGH
    };
    return ErrorCode;
}());
__reflect(ErrorCode.prototype, "ErrorCode");
//# sourceMappingURL=ErrorCode.js.map