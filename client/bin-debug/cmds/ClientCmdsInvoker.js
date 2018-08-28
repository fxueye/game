var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ClientCmdsInvoker = (function () {
    function ClientCmdsInvoker(cmds) {
        this._cmds = null;
        this._onCmdInvoked = null;
        this._obj = null;
        this._cmds = cmds;
    }
    ClientCmdsInvoker.prototype.SetOnCmdInvoked = function (func, obj) {
        this._onCmdInvoked = func;
        this._obj = obj;
    };
    ClientCmdsInvoker.prototype.Invoke = function (cmd) {
        var pack = cmd.Pack;
        switch (cmd.Opcode) {
            case ClientCmdsCodes.HEART_BEAT:
                this._cmds.HeartBeat(cmd);
                break;
        }
        if (this._onCmdInvoked != null && this._obj != null) {
            this._onCmdInvoked.call(this._obj, cmd.Opcode);
        }
    };
    return ClientCmdsInvoker;
}());
__reflect(ClientCmdsInvoker.prototype, "ClientCmdsInvoker", ["Net.Simple.IInvoker"]);
//# sourceMappingURL=ClientCmdsInvoker.js.map