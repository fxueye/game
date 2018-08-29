class ServerView extends BaseUIView {
	public imgMask:eui.Image;
	public gpCenter:eui.Group;
	public listServer:eui.List;
	public btnSelectServer:eui.Button;
	public btnSend:eui.Button;
	public elabOpenId:eui.EditableText;
	
	private _serverData:eui.ArrayCollection;
	private _loginInfo:any;

	public constructor(controller:BaseController,parent:egret.DisplayObjectContainer) {
		super(controller,parent);
		this.skinName = "skin.ServerSkin";
		let resource:string[] = ['preload'];
		this.setResources(resource);
	}
	public initCompoments():void{
		super.initCompoments();
		this.imgMask.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickMask,this);
		this._serverData = new eui.ArrayCollection();
		this.listServer.dataProvider =  this._serverData;
		this.listServer.useVirtualLayout = true;
		this.listServer.itemRenderer = ServerItem;
		this.btnSelectServer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
		this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);

        var openId = egret.localStorage.getItem("jrdh_openid");
        if(!openId){
            openId = Math.floor(Math.random() * 1000000000) + "";
            egret.localStorage.setItem("jrdh_openid",openId);
		}
		this.elabOpenId.text = openId;
		
        // Commder.Instance.login(loginInfo.openId,loginInfo.token,loginInfo.platform);
	}

	private onClick(evt:egret.TouchEvent){
		GameUtils.play(GameSound.BUTTON_1);
		if(evt.target.hashCode == this.btnSelectServer.hashCode){
			var index = this.listServer.selectedIndex;
			if(index < 0){
				Toast.makeToast("请选择服务器!").show();
				return;
			}
			App.Instance.Server = this._serverData.source[index].Id;
			let config:AppConfig = AppConfig.Dic.get(App.Instance.Server);
			App.Instance.RPC.Connect(config.SocketIp,config.SocketPort);
			
			// egret.localStorage.setItem("jrdh_openid",this.elabOpenId.text);
			// var a = ["你好！","abcd","##"];
			// for(var k of a){
			// 	var bs = Net.Simple.BitConverter.GetBytes(k);
			// 	var st = Net.Simple.BitConverter.ToString(bs,0,bs.byteLength);
			// 	console.log("st:"+st);
			// }
		}else if(evt.target.hashCode == this.btnSend.hashCode){

			// App.Instance.RPC.SendPacket()
			App.Instance.RPC.Send(0,"你好!");
			console.log(new Long(123).toString());
			// var sock:egret.WebSocket = new egret.WebSocket();
			// sock.type = egret.WebSocket.TYPE_BINARY;
			// sock.addEventListener( egret.ProgressEvent.SOCKET_DATA, (evt:egret.Event)=>{
			// 	var byte:egret.ByteArray = new egret.ByteArray();
			// 	sock.readBytes(byte);
			// 	console.log("收到数据：" + byte.readInt());
			// 	console.log("收到数据：" + byte.readBoolean());
			// }, this );
			// sock.addEventListener( egret.Event.CONNECT, ()=>{
			// 	for(var i = 0; i < 10; i++){
			// 		var byte:egret.ByteArray = new egret.ByteArray();
			// 		byte.writeInt(1);
			// 		byte.writeBoolean(false);
			// 		for(var i = 0; i < 10 ; i++){
			// 			sock.writeBytes(byte,0,byte.bytesAvailable);
			// 		}
			// 	}
					
			// }, this );
			// sock.connect("192.168.1.188", 8001);
		}
		
		// Commder.Instance.login(this.elabOpenId.text,"","");
		
	
	}


	public initData():void{
        this.refresh();
    }
    protected refresh():void{
		this._serverData.source = AppConfig.Arr;
		this._serverData.refresh();
    }
	public open(...param:any[]):void{
		GameUtils.PageConfigBeforOpen(ModuleConst.SERVERLIST,1);
		EffectUtils.OpenEffect(this.gpCenter,EffectType.Slight);
		super.open.apply(this,param);
	}
	public close(...param:any[]):void{
	 	super.close.apply(this,param);
	}
	private onClickMask(evt:egret.TouchEvent){
		// App.Instance.ViewMgr.pop(true,false);
	}
}