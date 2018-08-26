class SimpleRPC implements ISocketHander {

     public static readonly RECV_BUFF_SIZE:number = 1024 * 1024;
     public static readonly SEND_BUFF_SIZE:number = 1024 * 1024;
     public static readonly HEART_BEAT_INTERVAL:number = 20;
     public static readonly CONNECTION_TIMEOUT:number = 30;

     private _name:string;
     private _ip:string;
     private _port:number;
     private _socket:Socket = null;
     private _sendSize:number = 0;
     private _recvSize:number = 0;
     private _encryptKey:egret.ByteArray = null;
     private _sendBuffer:egret.ByteArray = null;
     private _recvBuffer:egret.ByteArray = null;
     private _heartBeatSendTime:number = -1;
     private _heartBeatRecvTime:number = -1;
     private _heartBeatDelay:number = -1;
     private _sendQueue:Array<any>;
     private _recvQueue:Array<any>;
     

     public constructor() {

     }
     OnConnect(){

     }
     OnReconnect(){

     }
     OnDisconnect(){

     }
    OnNoConnect(){

     }
     OnRecv(){

     }
     OnSend(){

     }
     OnError(){

     }
     OnNetError(){

     }
}