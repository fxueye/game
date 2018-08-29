var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ClientCmds = (function () {
    function ClientCmds(rpc) {
        this._rpc = rpc;
    }
    ClientCmds.prototype.HeartBeat = function (cmd) {
        console.log("opcode:" + cmd.Opcode);
        // this._rpc.Send(0);
    };
    return ClientCmds;
}());
__reflect(ClientCmds.prototype, "ClientCmds", ["IClientCmds"]);
//# sourceMappingURL=ClientCmds.js.map