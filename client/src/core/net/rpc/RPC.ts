


class RPC implements ISocketHander {

	public static readonly SOCK_CONNECTED:string = "rpc_socket_connected";
	public static readonly SOCK_CONNECT_FAILED:string = "rpc_socket_connectfailed";
	public static readonly SOCK_CONNECT_BROKEN:string = "rpc_socket_broken";
	public static readonly SOCK_CLOSE:string = "rpc_socket_close";
	public static readonly SOCK_TIMEOUT:string = "rpc_socket_timeout";
	public static readonly SOCK_NETWORK_ERROR:string = "rpc_socket_network_error";

	private _socket:Socket = null;
	private _buffer:egret.ByteArray = null;

	private _dataOffset:number = 0;
	private _dataReadHeader:boolean = true;
	
	private _sendbuffer:egret.ByteArray = null;
	private _handleshake:boolean = false;
	private _crykey:string = "";

	private _remoteFuncPool:Dictionary<any> = null;

	private _checkTimer:egret.Timer = null;

	private _sendPool:Array<any> = null;

	public constructor() {

		this._sendbuffer = new egret.ByteArray();
		this._buffer = new egret.ByteArray();

		this._remoteFuncPool = new Dictionary<any>();
		this._socket = new Socket();
		this._sendPool = new Array<any>();
		this._checkTimer = new egret.Timer(3000);
		this._checkTimer.addEventListener(egret.TimerEvent.TIMER, this.checkRequestTimeout, this);
		this._checkTimer.start();
		
	}

	public RegisterRemoteFunction(id:number, func:Function,obj:any)
	{
		if(!this._remoteFuncPool.containsKey(id))
		{
			this._remoteFuncPool.add(id, {func:func,obj:obj});
		}
	}




	// public Send(){
	// 	let msg:egret.ByteArray = new egret.ByteArray();
	// 	msg.writeShort(1);
	// 	this._socket.Send(msg);
	// }
	public Connect(ip:string,port:number){
		App.Instance.EasyLoading.showLoading();
		this._socket.init(ip,port,egret.WebSocket.TYPE_BINARY);
		this._socket.RegHander(this);
		this._socket.connect();
	}
	OnConnect(){
		Logger.log("OnConnect");
		App.Instance.EasyLoading.hideLoading();
		
	}


	public get Socket():Socket{
		return this._socket;
	}
    OnReconnect(){
		App.Instance.EasyLoading.showLoading();
		Logger.log("OnReconnect");
		// App.Instance.ViewMgr.closeAll();
        // App.Instance.ViewMgr.push(ModuleConst.LOADING,false,true);
	}
   	OnDisconnect(){
		App.Instance.EasyLoading.hideLoading();
		App.Instance.EventMgr.dispatchEventWith(RPC.SOCK_CONNECT_FAILED);
	}
	OnNoConnect(){
		App.Instance.EasyLoading.hideLoading();
	}
    OnRecv(){
		App.Instance.EasyLoading.hideLoading();
		Logger.log("recv");
		this._buffer.position = 0;
		this._socket.Receive(this._buffer);
	
		this._buffer.clear();
	}

	OnSend(){

	}

    OnError(){
		App.Instance.EasyLoading.hideLoading();
		App.Instance.EventMgr.dispatchEventWith(RPC.SOCK_CONNECT_BROKEN);
	}
	OnNetError(){
		App.Instance.EasyLoading.hideLoading();
		App.Instance.EventMgr.dispatchEventWith(RPC.SOCK_NETWORK_ERROR);
		// Toast.makeToast("连接服务器超时!请稍后重试!")
	}

	checkRequestTimeout(evt:egret.TimerEvent):void {
	
	}

	
}