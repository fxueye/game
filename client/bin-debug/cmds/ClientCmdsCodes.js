var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ClientCmdsCodes = (function () {
    function ClientCmdsCodes() {
    }
    ClientCmdsCodes.HEART_BEAT = 0; // 心跳
    ClientCmdsCodes.LOGIN_SUCCESS = 1; // 登录成功
    ClientCmdsCodes.LOGIN_FAILED = 2; // 登录失败（1 用户不存在，2  密码错误， 3 禁止登陆）
    return ClientCmdsCodes;
}());
__reflect(ClientCmdsCodes.prototype, "ClientCmdsCodes");
//# sourceMappingURL=ClientCmdsCodes.js.map