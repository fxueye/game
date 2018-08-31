namespace Net.Simple{
   export class SimpleRPC implements ISocketHander {

        public static readonly RECV_BUFF_SIZE:number = 1024 * 1024;
        public static readonly SEND_BUFF_SIZE:number = 1024 * 1024;
        public static readonly HEART_BEAT_INTERVAL:number = 20;
        public static readonly CONNECTION_TIMEOUT:number = 30;

        private _name:string;
        private _ip:string;
        private _port:number;
        private _socketConn:Socket = null;
        private _sendSize:number = 0;
        private _recvSize:number = 0;
        private _encryptKey:string = null;
        
        private _sendBuffer:Uint8Array = null;
        private _recvBuffer:egret.ByteArray = null;

        private _heartBeatSendTime:number = -1;
        private _heartBeatRecvTime:number = -1;
        private _heartBeatDelay:number = -1;
        private _sendQueue:Array<Packet>;
        private _recvQueue:Array<Packet>;
        private _lastRequest:Request;
        private _seqID:number;
        private _invoker:IInvoker;
        private _obj:any;
        private _onConnect:Function;
        private _onDisconnect:Function;
        public constructor(name:string = "") {
            this._name = name;
        }
        public get Name():string{
            return this._name;
        }
        public get IP():string{
            return this._ip;
        }
        public get Port():number{
            return this._port;
        }
        public get DelayTime():number{
            return this._heartBeatDelay;
        }
        public get Invoker():IInvoker{
            return this._invoker;
        }
        public get IsConnected():boolean{
            if(this._socketConn == null){
                return false;
            }
            if(!this._socketConn.isConnecting){
                return false;
            }
            return true;
        }
        public Init(invoker:IInvoker,encryptKey:string = null):void{
            this._socketConn = new Socket(this._name);
            this._socketConn.RegHander(this);
            this._sendBuffer = new Uint8Array(SimpleRPC.SEND_BUFF_SIZE);
            this._recvBuffer = new egret.ByteArray();
            

            this._seqID = 0;
            this._sendQueue = new Array<Packet>();
            this._recvQueue = new Array<Packet>();
            this._invoker = invoker;
            this._encryptKey = encryptKey;
        }
        public Connect(ip:string,port:number){
            this._ip  = ip;
            this._port = port;
            this._lastRequest = null;
            this._socketConn.init(this._ip,this._port);
            this._socketConn.connect()

        }
        public Reconnect(lastRecall:boolean){
            if(!lastRecall)
                this._lastRequest = null;
            this._socketConn.reconnect();
        }
        public TryConnectCall(ip:string,port:number,onConnect:Function = null,onDisconnect:Function = null,obj:any=null){
            this.Disconnect();
            if(this._onConnect != null){
                this._onConnect = onConnect;
            }
            if(this._onDisconnect != null){
                this._onDisconnect = onDisconnect;
            }
            this.Connect(ip,port);
        }
        public Disconnect(){
            this._socketConn.disconnect();
            this._sendQueue.length = 0;
            this._recvQueue.length = 0;
            this._heartBeatSendTime = -1;
            this._heartBeatRecvTime = -1;
            this._heartBeatDelay = -1;
            this._ip = "";
            this._port = 0;
        }
        public Call(opcode:number, ... params:any[]):boolean{
            if(!this.IsConnected){
                this.Disconnect();
                return false;
            }
            if(this._lastRequest != null){
                console.error("last request is waiting for callback, opcode=" + opcode);
                return false;
            }
            var seqID = this.increaseSeqID();
            params.unshift(opcode);
            params.unshift(seqID);
            var pack = PackUtil.CreatePacket.apply(PackUtil,params);
            this.SendPacket(pack);
            var req = new Request(seqID,opcode,pack);
            this._lastRequest = req;
            return true;
        }
        public Send(opcode:number,... params:any[]){
            if(!this.IsConnected){
                this.Disconnect();
                return false;
            }
            params.unshift(opcode);
            params.unshift(0);
            var pack:Packet = PackUtil.CreatePacket.apply(PackUtil,params);
            this.SendPacket(pack);
        }
        public SendPacket(pack:Packet){
             if(!this.IsConnected){
                this.Disconnect();
                return false;
            }
            pack.Rewind();
            this._sendQueue.push(pack);
        }

        public increaseSeqID():number
        {
            if(this._seqID >= 32767){
                this._seqID = 0;
            }
            this._seqID++;
            return this._seqID;
        }


        private update(){
            this.ProcessMsg();
            this.OnSend();
        }

        private CheckHeartBeat(){
            //websocket 有自己的心跳检查

        } 
        private ProcessMsg(){
            while(this._recvQueue.length > 0){
                var pack = this._recvQueue.pop();
                if(pack == null) continue;
                try{   
                    var seqID = pack.GetShort();
                    var opcode = pack.GetShort();
                    if(seqID > 0 && this._lastRequest != null && this._lastRequest.SeqID == seqID){
                        var cmd = new Command(seqID,opcode,pack);
                        this._lastRequest.Call(cmd);
                        this._lastRequest = null;
                    }
                    var cmd = new Command(seqID,opcode,pack);
                    this._invoker.Invoke(cmd);

                }catch(e){
                    console.error(e);
                }
            }
        }
        OnConnect(){
            console.log("onConnect");
            this._lastRequest = null;
            if(this._onConnect != null){
                this._onConnect.call(this._obj);
            }
            App.Instance.TimerMgr.startTimer(200,0,this.update,this);
        }
        OnReconnect(){

        }
        OnDisconnect(){
            if(this._onDisconnect != null){
                this._onDisconnect.call(this._obj);
            }
        }
        OnNoConnect(){

        }
        OnRecv(){
            if(this.IsConnected){
                this._socketConn.Receive(this._recvBuffer);
            
                this._recvSize += this._recvBuffer.bytes.byteLength;
                while(this._recvSize > 0){
                    if(this._recvSize < 4) break;
                    var len = BitConverter.ToInt32(this._recvBuffer.bytes,0);

                    if( len > SimpleRPC.RECV_BUFF_SIZE || len< 0){
                        throw new Error("too huge package on receive, len=" + len);
                    }
                    if(this._recvSize < len + 4) break;
                    var data:Uint8Array = null;
                    if(this._encryptKey != null){
                        //TODO 解密
                    }else{
                        data = new Uint8Array(len);
                        data.set(this._recvBuffer.bytes.subarray(4,len + 4),0);

                    }
                    var pack = new Packet(data);
                    this._recvQueue.push(pack);
                    this._recvSize -= len + 4;
                    if(this._recvSize > 0)
                        this._recvBuffer.bytes.set(this._recvBuffer.bytes.subarray(len+4,this._recvSize),0);

                }
            }



        }
        OnSend(){
            if(this.IsConnected){
                while(this._sendQueue.length > 0){
                    var pack = this._sendQueue.pop();
                    if(this._encryptKey != null){
                        //TODO加密
                    }
                    if(pack.Size + this._sendSize > SimpleRPC.SEND_BUFF_SIZE){
                        break;
                    }
                    var len = pack.Size;
                    var blen = BitConverter.GetBytes(len,32);
                   
                    this._sendBuffer.set(blen,this._sendSize);
                    // Packet.CopyBuffer(BitConverter.GetBytes(len,32),0,this._eSendBuffer.buffer,this._sendSize,4);

                    pack.Rewind();
                    pack.GetBytes(this._sendBuffer,this._sendSize + blen.byteLength ,len);
                    this._sendSize += len + 4;
                }
                if(this._sendSize > 0){
                    var sendBuffer = new egret.ByteArray(this._sendBuffer);
                    this._socketConn.Send(sendBuffer,this._sendSize);
                    this._sendSize = 0;
                }
            }
           
        }
        OnError(){

        }
        OnNetError(){

        }
    }
}