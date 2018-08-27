var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RPC = (function () {
    function RPC() {
        this._socket = null;
        this._buffer = null;
        this._dataOffset = 0;
        this._dataReadHeader = true;
        this._sendbuffer = null;
        this._handleshake = false;
        this._crykey = "";
        this._remoteFuncPool = null;
        this._checkTimer = null;
        this._sendPool = null;
        this._sendbuffer = new egret.ByteArray();
        this._buffer = new egret.ByteArray();
        this._remoteFuncPool = new Dictionary();
        this._socket = new Socket();
        this._sendPool = new Array();
        this._checkTimer = new egret.Timer(3000);
        this._checkTimer.addEventListener(egret.TimerEvent.TIMER, this.checkRequestTimeout, this);
        this._checkTimer.start();
    }
    RPC.prototype.RegisterRemoteFunction = function (id, func, obj) {
        if (!this._remoteFuncPool.containsKey(id)) {
            this._remoteFuncPool.add(id, { func: func, obj: obj });
        }
    };
    // public Send(){
    // 	let msg:egret.ByteArray = new egret.ByteArray();
    // 	msg.writeShort(1);
    // 	this._socket.Send(msg);
    // }
    RPC.prototype.Connect = function (ip, port) {
        App.Instance.EasyLoading.showLoading();
        this._socket.init(ip, port, egret.WebSocket.TYPE_BINARY);
        this._socket.RegHander(this);
        this._socket.connect();
    };
    RPC.prototype.OnConnect = function () {
        Logger.log("OnConnect");
        App.Instance.EasyLoading.hideLoading();
    };
    Object.defineProperty(RPC.prototype, "Socket", {
        get: function () {
            return this._socket;
        },
        enumerable: true,
        configurable: true
    });
    RPC.prototype.OnReconnect = function () {
        App.Instance.EasyLoading.showLoading();
        Logger.log("OnReconnect");
        // App.Instance.ViewMgr.closeAll();
        // App.Instance.ViewMgr.push(ModuleConst.LOADING,false,true);
    };
    RPC.prototype.OnDisconnect = function () {
        App.Instance.EasyLoading.hideLoading();
        App.Instance.EventMgr.dispatchEventWith(RPC.SOCK_CONNECT_FAILED);
    };
    RPC.prototype.OnNoConnect = function () {
        App.Instance.EasyLoading.hideLoading();
    };
    RPC.prototype.OnRecv = function () {
        App.Instance.EasyLoading.hideLoading();
        Logger.log("recv");
        this._buffer.position = 0;
        this._socket.Receive(this._buffer);
        this._buffer.clear();
    };
    RPC.prototype.OnSend = function () {
    };
    RPC.prototype.OnError = function () {
        App.Instance.EasyLoading.hideLoading();
        App.Instance.EventMgr.dispatchEventWith(RPC.SOCK_CONNECT_BROKEN);
    };
    RPC.prototype.OnNetError = function () {
        App.Instance.EasyLoading.hideLoading();
        App.Instance.EventMgr.dispatchEventWith(RPC.SOCK_NETWORK_ERROR);
        // Toast.makeToast("连接服务器超时!请稍后重试!")
    };
    RPC.prototype.checkRequestTimeout = function (evt) {
    };
    RPC.SOCK_CONNECTED = "rpc_socket_connected";
    RPC.SOCK_CONNECT_FAILED = "rpc_socket_connectfailed";
    RPC.SOCK_CONNECT_BROKEN = "rpc_socket_broken";
    RPC.SOCK_CLOSE = "rpc_socket_close";
    RPC.SOCK_TIMEOUT = "rpc_socket_timeout";
    RPC.SOCK_NETWORK_ERROR = "rpc_socket_network_error";
    return RPC;
}());
__reflect(RPC.prototype, "RPC", ["ISocketHander"]);
//# sourceMappingURL=RPC.js.map