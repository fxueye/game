var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ClientCmdsCodes = (function () {
    function ClientCmdsCodes() {
    }
    ClientCmdsCodes.HEART_BEAT = 0;
    return ClientCmdsCodes;
}());
__reflect(ClientCmdsCodes.prototype, "ClientCmdsCodes");
//# sourceMappingURL=ClientCmdsCodes.js.map