var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ServerCSCmdsCodes = (function () {
    function ServerCSCmdsCodes() {
    }
    ServerCSCmdsCodes.GW_PING = 22001; // gw心跳
    ServerCSCmdsCodes.LOGINGUEST = 22004; // 登录
    return ServerCSCmdsCodes;
}());
__reflect(ServerCSCmdsCodes.prototype, "ServerCSCmdsCodes");
//# sourceMappingURL=ServerCSCmdsCodes.js.map