class ServerView extends BaseUIView {
	public imgMask:eui.Image;
	public gpCenter:eui.Group;
	public listServer:eui.List;
	public btnSelectServer:eui.Button;
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
		this.btnSelectServer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSelectServer,this);

        var openId = egret.localStorage.getItem("jrdh_openid");
        if(!openId){
            openId = Math.floor(Math.random() * 1000000000) + "";
            egret.localStorage.setItem("jrdh_openid",openId);
		}
		this.elabOpenId.text = openId;
		
        // Commder.Instance.login(loginInfo.openId,loginInfo.token,loginInfo.platform);
	}

	private onSelectServer(){
		GameUtils.play(GameSound.BUTTON_1);
		var index = this.listServer.selectedIndex;
		if(index < 0){
			Toast.makeToast("请选择服务器!").show();
			return;
		}
		App.Instance.Server = this._serverData.source[index].Id;
		let config:AppConfig = AppConfig.Dic.get(App.Instance.Server);
        App.Instance.RPC.Connect(config.SocketIp,config.SocketPort);
		egret.localStorage.setItem("jrdh_openid",this.elabOpenId.text);
		var a = ["你好！","abcd","##"];
		for(var k of a){
			var bs = Net.Simple.BitConverter.GetBytes(k);
			var st = Net.Simple.BitConverter.ToString(bs,0,bs.byteLength);
			console.log("st:"+st);
		}
		
		console.log("####" + (typeof a) );
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