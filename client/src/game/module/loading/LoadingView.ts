class LoadingView extends BaseUIView {
	public progressBar:eui.ProgressBar;
	public txtLoading:eui.Label;
	public btnStartGame:eui.Button;
	public gpProgresss:eui.Group;
	private _http:Http;
	
	public constructor(controller:BaseController,parent:eui.Group) {
		super(controller,parent);
		this.skinName = "skin.LoadingSkin"
		let resource:string[] = ["loading"];
		this.setResources(resource);
	}
	public initCompoments():void{
		super.initCompoments();
		this.progressBar.maximum = 100;
		this.progressBar.minimum = 0;
		this.btnStartGame.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
		this._http = new Http();
		
	}
	public open(...param:any[]){
		if(param.length > 0){
			var relogin = param[0];
			if(relogin){
				if(DeviceUtils.IsWeixin()){
					this.loginWeixin(true).catch(e => {
						Logger.log(e);
					});
					this.btnStartGame.visible = false;
				}else{
					this.btnStartGame.visible = true;
				}
			
			}
		}
		App.Instance.EventMgr.addEventListener(RPC.SOCK_NETWORK_ERROR,this.onNetError,this);
		super.open.apply(this,param);
	}
	public close(...param:any[]){
		App.Instance.EventMgr.removeEventListener(RPC.SOCK_NETWORK_ERROR,this.onNetError,this);
		super.close.apply(this,param);
	}
	
	public setProgress(current:number,total:number):void{
		this.txtLoading.text =StringUtils.format(Game.LOADING_TIP,current,total);
		this.progressBar.value = (current/total) * 100;
		if(current/total == 1){
			this.gpProgresss.visible = false;
			if(DeviceUtils.IsWeixin()){
				this.loginWeixin(false).catch(e => {
						Logger.log(e);
					});
				this.btnStartGame.visible = false;
			}else{
				this.btnStartGame.visible = true;
			}
		}else{
			this.gpProgresss.visible = true;
			this.btnStartGame.visible = false;
		}
	}
	private onNetError(){
		if(this.isShow()){
			if(DeviceUtils.IsWeixin()){
				this.loginWeixin(true).catch(e => {
						Logger.log(e);
				});
				this.btnStartGame.visible = false;
			}else{
				this.btnStartGame.visible = true;
			}
		}

	}
	private onClick(evt:egret.TouchEvent){
		var target = evt.target;
		if(target.hashCode == this.btnStartGame.hashCode){
			App.Instance.ViewMgr.push(ModuleConst.SERVERLIST,true);
		}
	}
	 private async loginWeixin(btn:boolean){
		 	let loginInfo = null;
			if(btn){
				loginInfo = await platform.createLoginButton();
			}else{
				loginInfo = await platform.login();
			}
			if(loginInfo.result == -2){
				loginInfo = await platform.createLoginButton();
			}
			if(loginInfo.result == 1){
				var userInfo = loginInfo.userInfo;
				var code = loginInfo.code
				var encryptedData = loginInfo.encryptedData;
				var iv = loginInfo.iv;
				var headers = new Dictionary<string>();
				headers.add(WeixinCosnt.WX_HEADER_CODE,code);
				headers.add(WeixinCosnt.WX_HEADER_ENCRYPTED_DATA,encryptedData);
				headers.add(WeixinCosnt.WX_HEADER_IV,iv);
				this._http.setHeaders(headers);
				this._http.Get(Game.WEI_API+"/weapp/login",null,(code,data)=>{
					var jsonData = JSON.parse(data);
					// console.log("jsonData:" + data);
					if(jsonData.code == 0){
						var openId = jsonData.data.userinfo.openId;
						console.log('openId:' + openId);
						let config:AppConfig = AppConfig.Dic.get(1);
						App.Instance.RPC.Connect(config.SocketIp,config.SocketPort);
						
					}else{
						Dialog.makeDialog(Game.TIP_TITLE,Game.LOGIN_FAILED,true).open();
					}

					
				},this);

			}else{
				Dialog.makeDialog(Game.TIP_TITLE,Game.LOGIN_FAILED,true);
			}
			
			
			// App.Instance.ViewMgr.push(ModuleConst.HOME,true);
	 } 
}