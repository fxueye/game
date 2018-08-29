var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Socket = (function () {
    function Socket(name) {
        if (name === void 0) { name = ""; }
        this._reconnectCount = 0;
        this._needReconnect = false;
        this._maxReconnectCount = 10;
        this._hander = null;
        this._name = "";
        this._name = name;
    }
    Socket.prototype.init = function (host, port, type) {
        this._host = host;
        this._port = port;
        if (type && type != "")
            this._type = type;
        else
            this._type = egret.WebSocket.TYPE_BINARY;
    };
    Socket.prototype.RegHander = function (hander) {
        this._hander = hander;
    };
    Socket.prototype.Receive = function (buffer) {
        this._socket.readBytes(buffer);
    };
    Object.defineProperty(Socket.prototype, "isConnecting", {
        get: function () {
            return this._isConnecting;
        },
        enumerable: true,
        configurable: true
    });
    Socket.prototype.disconnect = function () {
        this.disCurrentConnect();
    };
    Socket.prototype.connect = function () {
        if (DeviceUtils.IsHtml5()) {
            if (!window["WebSocket"]) {
                console.error("not support WebSocket! ");
                return;
            }
        }
        this._socket = new egret.WebSocket();
        this._socket.type = this._type;
        Logger.log("WebSocket:" + this._host + ":" + this._port);
        this.addEvents();
        this._socket.connect(this._host, this._port);
    };
    Socket.prototype.Send = function (msg, size) {
        if (size > 0) {
            this._socket.writeBytes(msg, 0, size);
        }
        else {
            this._socket.writeBytes(msg, 0, msg.length);
        }
    };
    Socket.prototype.addEvents = function () {
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onRecv, this);
        this._socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
        this._socket.addEventListener(egret.Event.CLOSE, this.onDisConnect, this);
        this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
    };
    Socket.prototype.removeEvents = function () {
        if (this._socket) {
            this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onRecv, this);
            this._socket.removeEventListener(egret.Event.CONNECT, this.onConnect, this);
            this._socket.removeEventListener(egret.Event.CLOSE, this.onDisConnect, this);
            this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
        }
        else {
            console.error("socket is null");
        }
    };
    Socket.prototype.onRecv = function (e) {
        // var msg = this._socket.readUTF();
        // Logger.log(msg);
        if (this._hander != null)
            this._hander.OnRecv();
    };
    Socket.prototype.onConnect = function () {
        Logger.log("WebSocket: onConnect");
        this._reconnectCount = 0;
        this._isConnecting = true;
        if (this._connectFlag && this._needReconnect) {
            if (this._hander != null)
                this._hander.OnReconnect();
        }
        else {
            if (this._hander != null)
                this._hander.OnConnect();
        }
        this._connectFlag = true;
    };
    Socket.prototype.onDisConnect = function () {
        this._isConnecting = false;
        this._needReconnect = true;
        if (this._needReconnect) {
            this.reconnect();
        }
        else {
            if (this._hander != null)
                this._hander.OnDisconnect();
        }
        this.removeEvents();
    };
    Socket.prototype.reconnect = function () {
        this.disCurrentConnect();
        this._reconnectCount++;
        if (this._reconnectCount < this._maxReconnectCount) {
            this.connect();
        }
        else {
            this._needReconnect = false;
            this._reconnectCount = 0;
            if (this._connectFlag) {
                if (this._hander != null) {
                    this._hander.OnDisconnect();
                    this._hander.OnNetError();
                }
            }
            else {
                if (this._hander != null) {
                    this._hander.OnNoConnect();
                    this._hander.OnNetError();
                }
            }
        }
    };
    Socket.prototype.onError = function () {
        Logger.log("Hello onError()");
        if (this._needReconnect) {
            this.reconnect();
        }
        else {
            if (this._hander != null)
                this._hander.OnError();
        }
        this._isConnecting = false;
    };
    Socket.prototype.disCurrentConnect = function () {
        this.removeEvents();
        if (this._socket) {
            this._socket.close();
        }
        this._socket = null;
        this._isConnecting = false;
    };
    return Socket;
}());
__reflect(Socket.prototype, "Socket");
//# sourceMappingURL=Socket.js.map