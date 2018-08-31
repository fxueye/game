class Account {
	private _uid:number;
	private _openId:string;
	private _token:string;
	private _platform:string;
	private _account:string;
	private _passwd:string;
	private _currRoleId:number;
	private _roles:Array<Role>;
	private _roleDic:Dictionary<Role>;
	private _avatarUrl:string;
	private _nickName:string;
	

	private _openSound:boolean = true;
	private _bgSoundVolume:number = 50;
	private _effectSoundVolume:number = 50;
	private _dubSoundVolume:number = 50;

	private _roomId:number = 1;
	private _competitionId:number = 1;
	private _betId:number = 1;

	public constructor() {
		this._roles = new Array<Role>();
		this._roleDic = new Dictionary<Role>();
	}
	public get UID():number{
		return this._uid;
	}
	public get OpendId():string{
		return this._openId;
	}
	public get Token():string{
		return this._token;
	}
	public get Platform():string{
		return this._platform;
	}
	public set CurrRoleId(value:number){
		this._currRoleId = value;
	}
	public get CurrRoleId():number{
		return this._currRoleId;
	}
	public set AvatarUrl(val:string){
        this._avatarUrl = val;
    }
    public get AvatarUrl(){
        return this._avatarUrl;
    }
	public set NickName(val:string){
		this._nickName = val;
	}
	public get NickName():string{
		return this._nickName;
	}
	public get CurrRole():Role{
		var role = null;
		if(this._currRoleId != null){
			role = this._roleDic.get(this._currRoleId);
		}
		return role;
	}
	public GetRole(roleId:string):Role{
		 var role =  this._roleDic.get(roleId);
		 if(role == null){
			 console.error("role" + roleId);
		 }
		return role;
	}
	public AddRole(role:Role):void{
		this._roles.push(role);
		this._roleDic.add(role.ID,role);
		this._currRoleId = role.ID;
	}

	public get OpenSound():boolean{
		var itemString = this._uid + "_openSound";
		var value = egret.localStorage.getItem(itemString);
		if(value){
			if(value == "0"){
				this._openSound = false;
			}else{
				this._openSound = true;
			}
		}
		return this._openSound;
	}
	public set OpenSound(value:boolean){
		this._openSound = value;
		var itemString = this._uid + "_openSound";
		var val = value ? 1 : 0;
		egret.localStorage.setItem(itemString,val +"");
		App.Instance.SoundMgr.setBgOn(this._openSound);
		App.Instance.SoundMgr.setEffectOn(this._openSound);
	}
	public get BgSoundVolume():number{
		var itemString = this._uid + "_bgSoundVolume";
		var value = egret.localStorage.getItem(itemString);
		if(value){
			this._bgSoundVolume = parseInt(value);
		}
		return this._bgSoundVolume;
	}
	public set BgSoundVolume(value:number){
		this._bgSoundVolume = value;
		var itemString = this._uid + "_bgSoundVolume";
		egret.localStorage.setItem(itemString,this._bgSoundVolume+"");
		App.Instance.SoundMgr.setBgVolume(this._bgSoundVolume / 100);
	}
	public get EffectSoundVolume():number{
		var itemString = this._uid + "_effectSoundVolume";
		var value = egret.localStorage.getItem(itemString);
		if(value){
			this._effectSoundVolume = parseInt(value);
		}
		return this._effectSoundVolume;
	}
	public set EffectSoundVolume(value:number){
		this._effectSoundVolume = value;
		var itemString = this._uid + "_effectSoundVolume";
		egret.localStorage.setItem(itemString,this._effectSoundVolume+"");
		App.Instance.SoundMgr.setEffectVolume(this._effectSoundVolume / 100);
	}
	public get DubSoundVolume():number{
		var itemString = this._uid + "_dubSoundVolume";
		var value = egret.localStorage.getItem(itemString);
		if(value){
			this._dubSoundVolume = parseInt(value);
		}
		return this._dubSoundVolume;
	}
	public set DubSoundVolume(value:number){
		this._dubSoundVolume = value;
		var itemString = this._uid + "_dubSoundVolume";
		egret.localStorage.setItem(itemString,this._dubSoundVolume+"");
	}
	public set RoomId(value:number){
		this._roomId = value;
		var roomIdKey = this._uid +"_roomId";
		egret.localStorage.setItem(roomIdKey,this._roomId + "");
	}
	public get RoomId():number{
		var roomIdKey = this._uid +"_roomId";
		var value =  egret.localStorage.getItem(roomIdKey);
		if(value){
			this._roomId = parseInt(value);
		}
		return this._roomId;
	}
	public set CompetitionId(value:number){
		this._competitionId = value;
		var competitionIdKey = this._uid + "_competitionId";
		egret.localStorage.setItem(competitionIdKey,this._competitionId + "");
	}
	public get CompetitionId():number{
		var competitionIdKey = this._uid + "_competitionId";
		var value = egret.localStorage.getItem(competitionIdKey);
		if(value){
			this._competitionId = parseInt(value);
		}
		return this._competitionId;
	}
	public set BetId(val:number){
		this._betId = val;
		var betIdKey = this._uid + "_betId";
		egret.localStorage.setItem(betIdKey,this._betId + "");
	}
	public get BetId():number{
		var betIdKey = this._uid + "_betId";
		var value = egret.localStorage.getItem(betIdKey);
		if(value){
			this._betId = parseInt(value);
		}
		return this._betId;
	}
	// public Parse(accountWrap:Protocols.AccountWrap):void{
	// 	this._account = accountWrap.account;
	// 	this._uid = accountWrap.uid;
	// 	this._openId = accountWrap.openId;
	// 	this._passwd = accountWrap.passwd;
	// 	this._platform = accountWrap.platform;
	// 	var roleLen = accountWrap.roles.length;
	// 	if( roleLen> 0){
	// 		for(var i = 0; i < roleLen; i++){
	// 			var roleWrap = accountWrap.roles[i];
	// 			var role = new Role();
	// 			role.Parse(roleWrap);
	// 			this.AddRole(role);
	// 		}
	// 	}
	// }
	
}