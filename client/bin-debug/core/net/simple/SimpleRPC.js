var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Net;
(function (Net) {
    var Simple;
    (function (Simple) {
        var SimpleRPC = (function () {
            function SimpleRPC(name) {
                if (name === void 0) { name = ""; }
                this._socketConn = null;
                this._sendSize = 0;
                this._recvSize = 0;
                this._encryptKey = null;
                this._sendBuffer = null;
                this._recvBuffer = null;
                this._heartBeatSendTime = -1;
                this._heartBeatRecvTime = -1;
                this._heartBeatDelay = -1;
                this._name = name;
            }
            Object.defineProperty(SimpleRPC.prototype, "Name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SimpleRPC.prototype, "IP", {
                get: function () {
                    return this._ip;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SimpleRPC.prototype, "Port", {
                get: function () {
                    return this._port;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SimpleRPC.prototype, "DelayTime", {
                get: function () {
                    return this._heartBeatDelay;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SimpleRPC.prototype, "Invoker", {
                get: function () {
                    return this._invoker;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SimpleRPC.prototype, "IsConnected", {
                get: function () {
                    if (this._socketConn == null) {
                        return false;
                    }
                    if (!this._socketConn.isConnecting) {
                        return false;
                    }
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            SimpleRPC.prototype.Init = function (invoker, encryptKey) {
                if (encryptKey === void 0) { encryptKey = null; }
                this._socketConn = new Socket(this._name);
                this._socketConn.RegHander(this);
                this._sendBuffer = new Uint8Array(SimpleRPC.SEND_BUFF_SIZE);
                this._recvBuffer = new egret.ByteArray();
                this._seqID = 0;
                this._sendQueue = new Array();
                this._recvQueue = new Array();
                this._invoker = invoker;
                this._encryptKey = encryptKey;
            };
            SimpleRPC.prototype.Connect = function (ip, port) {
                this._ip = ip;
                this._port = port;
                this._lastRequest = null;
                this._socketConn.init(this._ip, this._port);
                this._socketConn.connect();
            };
            SimpleRPC.prototype.Reconnect = function (lastRecall) {
                if (!lastRecall)
                    this._lastRequest = null;
                this._socketConn.reconnect();
            };
            SimpleRPC.prototype.TryConnectCall = function (ip, port, onConnect, onDisconnect, obj) {
                if (onConnect === void 0) { onConnect = null; }
                if (onDisconnect === void 0) { onDisconnect = null; }
                if (obj === void 0) { obj = null; }
                this.Disconnect();
                if (this._onConnect != null) {
                    this._onConnect = onConnect;
                }
                if (this._onDisconnect != null) {
                    this._onDisconnect = onDisconnect;
                }
                this.Connect(ip, port);
            };
            SimpleRPC.prototype.Disconnect = function () {
                this._socketConn.disconnect();
                this._sendQueue.length = 0;
                this._recvQueue.length = 0;
                this._heartBeatSendTime = -1;
                this._heartBeatRecvTime = -1;
                this._heartBeatDelay = -1;
                this._ip = "";
                this._port = 0;
            };
            SimpleRPC.prototype.Call = function (opcode) {
                var params = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    params[_i - 1] = arguments[_i];
                }
                if (!this.IsConnected) {
                    this.Disconnect();
                    return false;
                }
                if (this._lastRequest != null) {
                    console.error("last request is waiting for callback, opcode=" + opcode);
                    return false;
                }
                var seqID = this.increaseSeqID();
                params.unshift(opcode);
                params.unshift(seqID);
                var pack = Simple.PackUtil.CreatePacket.apply(Simple.PackUtil, params);
                this.SendPacket(pack);
                var req = new Simple.Request(seqID, opcode, pack);
                this._lastRequest = req;
                return true;
            };
            SimpleRPC.prototype.Send = function (opcode) {
                var params = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    params[_i - 1] = arguments[_i];
                }
                if (!this.IsConnected) {
                    this.Disconnect();
                    return false;
                }
                params.unshift(opcode);
                params.unshift(0);
                var pack = Simple.PackUtil.CreatePacket.apply(Simple.PackUtil, params);
                this.SendPacket(pack);
            };
            SimpleRPC.prototype.SendPacket = function (pack) {
                if (!this.IsConnected) {
                    this.Disconnect();
                    return false;
                }
                pack.Rewind();
                this._sendQueue.push(pack);
            };
            SimpleRPC.prototype.increaseSeqID = function () {
                if (this._seqID >= 32767) {
                    this._seqID = 0;
                }
                this._seqID++;
                return this._seqID;
            };
            SimpleRPC.prototype.update = function () {
                this.ProcessMsg();
                this.OnSend();
            };
            SimpleRPC.prototype.CheckHeartBeat = function () {
                //websocket 有自己的心跳检查
            };
            SimpleRPC.prototype.ProcessMsg = function () {
                while (this._recvQueue.length > 0) {
                    var pack = this._recvQueue.pop();
                    if (pack == null)
                        continue;
                    try {
                        var seqID = pack.GetShort();
                        var opcode = pack.GetShort();
                        if (seqID > 0 && this._lastRequest != null && this._lastRequest.SeqID == seqID) {
                            var cmd = new Simple.Command(seqID, opcode, pack);
                            this._lastRequest.Call(cmd);
                            this._lastRequest = null;
                        }
                        var cmd = new Simple.Command(seqID, opcode, pack);
                        this._invoker.Invoke(cmd);
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            };
            SimpleRPC.prototype.OnConnect = function () {
                console.log("onConnect");
                this._lastRequest = null;
                if (this._onConnect != null) {
                    this._onConnect.call(this._obj);
                }
                App.Instance.TimerMgr.startTimer(200, 0, this.update, this);
            };
            SimpleRPC.prototype.OnReconnect = function () {
            };
            SimpleRPC.prototype.OnDisconnect = function () {
                if (this._onDisconnect != null) {
                    this._onDisconnect.call(this._obj);
                }
            };
            SimpleRPC.prototype.OnNoConnect = function () {
            };
            SimpleRPC.prototype.OnRecv = function () {
                if (this.IsConnected) {
                    this._socketConn.Receive(this._recvBuffer);
                    this._recvSize += this._recvBuffer.bytes.byteLength;
                    while (this._recvSize > 0) {
                        if (this._recvSize < 4)
                            break;
                        var len = Simple.BitConverter.ToInt32(this._recvBuffer.bytes, 0);
                        if (len > SimpleRPC.RECV_BUFF_SIZE || len < 0) {
                            throw new Error("too huge package on receive, len=" + len);
                        }
                        if (this._recvSize < len + 4)
                            break;
                        var data = null;
                        if (this._encryptKey != null) {
                            //TODO 解密
                        }
                        else {
                            data = new Uint8Array(len);
                            data.set(this._recvBuffer.bytes.subarray(4, len + 4), 0);
                        }
                        var pack = new Simple.Packet(data);
                        this._recvQueue.push(pack);
                        this._recvSize -= len + 4;
                        if (this._recvSize > 0)
                            this._recvBuffer.bytes.set(this._recvBuffer.bytes.subarray(len + 4, this._recvSize), 0);
                    }
                }
            };
            SimpleRPC.prototype.OnSend = function () {
                if (this.IsConnected) {
                    while (this._sendQueue.length > 0) {
                        var pack = this._sendQueue.pop();
                        if (this._encryptKey != null) {
                            //TODO加密
                        }
                        if (pack.Size + this._sendSize > SimpleRPC.SEND_BUFF_SIZE) {
                            break;
                        }
                        var len = pack.Size;
                        var blen = Simple.BitConverter.GetBytes(len, 32);
                        this._sendBuffer.set(blen, this._sendSize);
                        // Packet.CopyBuffer(BitConverter.GetBytes(len,32),0,this._eSendBuffer.buffer,this._sendSize,4);
                        pack.Rewind();
                        pack.GetBytes(this._sendBuffer, this._sendSize + blen.byteLength, len);
                        this._sendSize += len + 4;
                    }
                    if (this._sendSize > 0) {
                        var sendBuffer = new egret.ByteArray(this._sendBuffer);
                        this._socketConn.Send(sendBuffer, this._sendSize);
                        this._sendSize = 0;
                    }
                }
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
        Simple.SimpleRPC = SimpleRPC;
        __reflect(SimpleRPC.prototype, "Net.Simple.SimpleRPC", ["ISocketHander"]);
    })(Simple = Net.Simple || (Net.Simple = {}));
})(Net || (Net = {}));
//# sourceMappingURL=SimpleRPC.js.map