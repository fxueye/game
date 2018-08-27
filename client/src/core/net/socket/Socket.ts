class Socket {
	private _socket:egret.WebSocket;
	private _host:string;
	private _port:number;
	private _isConnecting:boolean;
	private _type:string;
	private _reconnectCount:number = 0;
    private _connectFlag:boolean;
	private _needReconnect:boolean = false;
    private _maxReconnectCount = 10;
	private _hander:ISocketHander = null;
	private _name:string = "";

	public constructor(name:string = "") {
		this._name = name;
	}
	public init(host:string,port:number,type?:string):void{
		this._host = host;
		this._port = port;
		if(type != "")
			this._type = type;
		
	}
	public RegHander(hander:ISocketHander){
		this._hander = hander;
	}
	public Receive(buffer:egret.ByteArray){
		this._socket.readBytes(buffer);
	}
	public get isConnecting():boolean{
		return this._isConnecting;
	}
	public disconnect() {
		this.disCurrentConnect();
	}
	public connect():void{
		if(DeviceUtils.IsHtml5()){
			if(!window["WebSocket"]){
				console.error("not support WebSocket! ")
				return;
			}
		}
		this._socket = new egret.WebSocket();
		this._socket.type = this._type;
		Logger.log("WebSocket:" + this._host+":"+this._port);
		this.addEvents();
		this._socket.connect(this._host,this._port);
		
	}
	public Send(msg:egret.ByteArray):void{
		this._socket.writeBytes(msg, 0, msg.length);
	}
	
	private addEvents() {
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onRecv, this);
        this._socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
        this._socket.addEventListener(egret.Event.CLOSE, this.onDisConnect, this);
        this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
    }
    private removeEvents():void {
        this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onRecv, this);
        this._socket.removeEventListener(egret.Event.CONNECT, this.onConnect, this);
        this._socket.removeEventListener(egret.Event.CLOSE, this.onDisConnect, this);
        this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
    }
	private onRecv(e:egret.Event):void {
		// var msg = this._socket.readUTF();
		// Logger.log(msg);
		if(this._hander != null)
			this._hander.OnRecv();
    }
	private onConnect():void {
		Logger.log("WebSocket: onConnect");
        this._reconnectCount = 0;
        this._isConnecting = true;

        if (this._connectFlag && this._needReconnect) {
            	if(this._hander != null)
					this._hander.OnReconnect();
        } else {
				if(this._hander != null)
					this._hander.OnConnect();
        }

        this._connectFlag = true;
    }
    private onDisConnect():void {
        this._isConnecting = false;
		this._needReconnect = true;
        if (this._needReconnect) {
            this.reconnect();
        } else {
			if(this._hander != null)
				this._hander.OnDisconnect();
        }
		this.removeEvents();
    }
	public reconnect():void {
        this.disCurrentConnect();
        this._reconnectCount++;
        if (this._reconnectCount < this._maxReconnectCount) {
            this.connect();
        } else {
			this._needReconnect = false;
            this._reconnectCount = 0;
            if (this._connectFlag) {
              	if(this._hander != null){
				  	this._hander.OnDisconnect();
					this._hander.OnNetError();
				}
            } else {
				if(this._hander != null){
					this._hander.OnNoConnect();
					this._hander.OnNetError();
				}
            }
        }
    }
	private onError():void {
		Logger.log("Hello onError()");
        if (this._needReconnect) {
            this.reconnect();
        } else {
			if(this._hander != null)
				this._hander.OnError();
        }
        this._isConnecting = false;
    }

	private disCurrentConnect(){
        this.removeEvents();
        this._socket.close();
        this._socket = null;
        this._isConnecting = false;
    }
}
