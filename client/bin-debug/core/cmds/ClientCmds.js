var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ClientCmds = (function () {
    function ClientCmds(rpc) {
        this._rpc = rpc;
    }
    ClientCmds.prototype.HeartBeat = function (cmd, msg) {
        console.log("opcode:" + cmd.Opcode + " msg:" + msg);
    };
    ClientCmds.prototype.LoginSuccess = function (cmd, player, reconnect, extension) {
    };
    ClientCmds.prototype.LoginFailed = function (cmd, errorCode, errMsg) {
    };
    return ClientCmds;
}());
__reflect(ClientCmds.prototype, "ClientCmds", ["IClientCmds"]);
//# sourceMappingURL=ClientCmds.js.map