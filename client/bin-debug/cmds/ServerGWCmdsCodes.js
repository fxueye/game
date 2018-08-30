var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ServerGWCmdsCodes = (function () {
    function ServerGWCmdsCodes() {
    }
    ServerGWCmdsCodes.HEART_BEAT = 0; // 心跳
    ServerGWCmdsCodes.LOGIN_GUEST = 10001; // 登录
    ServerGWCmdsCodes.LOGIN_PLATFORM = 10002; // 登录(ptID平台）
    return ServerGWCmdsCodes;
}());
__reflect(ServerGWCmdsCodes.prototype, "ServerGWCmdsCodes");
//# sourceMappingURL=ServerGWCmdsCodes.js.map