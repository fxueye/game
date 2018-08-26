var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SimpleRPC = (function () {
    function SimpleRPC() {
        this._socket = null;
        this._sendSize = 0;
        this._recvSize = 0;
        this._encryptKey = null;
        this._sendBuffer = null;
        this._recvBuffer = null;
        this._heartBeatSendTime = -1;
        this._heartBeatRecvTime = -1;
        this._heartBeatDelay = -1;
    }
    SimpleRPC.prototype.OnConnect = function () {
    };
    SimpleRPC.prototype.OnReconnect = function () {
    };
    SimpleRPC.prototype.OnDisconnect = function () {
    };
    SimpleRPC.prototype.OnNoConnect = function () {
    };
    SimpleRPC.prototype.OnRecv = function () {
    };
    SimpleRPC.prototype.OnSend = function () {
    };
    SimpleRPC.prototype.OnError = function () {
    };
    SimpleRPC.prototype.OnNetError = function () {
    };
    SimpleRPC.RECV_BUFF_SIZE = 1024 * 1024;
    SimpleRPC.SEND_BUFF_SIZE = 1024 * 1024;
    SimpleRPC.HEART_BEAT_INTERVAL = 20;
    SimpleRPC.CONNECTION_TIMEOUT = 30;
    return SimpleRPC;
}());
__reflect(SimpleRPC.prototype, "SimpleRPC", ["ISocketHander"]);
//# sourceMappingURL=SimpleRPC.js.map