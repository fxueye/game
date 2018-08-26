class MailData {
	private _uid:number;
	private _title:string;
	private _id:number;
	private _status:number;
	private _icon:string;
	private _bgIcon:string = "common_icon_tx_png";
	private _items:Array<ItemData> = [];
	private _createTime:number;
	private _fromName:string;
	private _content:string;
	private _params:Array<string> = [];
	private _iconScale:number;
	public constructor() {
	}
	public get UID():number{
		return this._uid;
	}
	public get Id():number{
		return this._id;
	}
	public set Id(val:number){
		this._id = val;
	}
	public get Title():string{
		return this._title;
	}
	public set Title(val:string){
		this._title = val;
	}
	public get Content():string{
		return this._content;
	}
	public set Content(val:string){
		this._content = val;
	}
	public get FromName():string{
		return this._fromName;
	}
	public set FromName(val:string){
		this._fromName = val;
	}
	public get Status():number{
		return this._status;
	}
	public set Status(val:number){
		this._status = val;
	}
	public get BgIcon():string{
		return this._bgIcon;
	}
	public get Icon():string{
		return this._icon;
	}
	public get IconScale():number{
		return this._iconScale;
	}
	public set IconScale(val:number){
		this._iconScale;
	}
	public get Slave():string{
		return StringUtils.format("包含{0}个附件",this._items.length);
	}
	public get Items():Array<ItemData>{
		return this._items;
	}
	public get CreateTimeStr():string{
		return DateUtil.DateFormat(DateUtil.Timestamp2Date( this._createTime));
	}
	public get MailConfig():MailConfig{
		if(MailConfig.Dic.containsKey(this.Id)){
			return MailConfig.Dic.get(this.Id);
		}
		return null;
	}
	// public Parse(mailWarp:Protocols.MailWrap){
	// 	this._uid = mailWarp.uid;
	// 	this._id = mailWarp.id
	// 	this._title = mailWarp.title;
	// 	this._status = mailWarp.status;
	// 	this._createTime = mailWarp.createTime;
	// 	this._fromName = mailWarp.fromName;
	// 	this._content = mailWarp.content;

	// 	var len =  mailWarp.items.length;
	// 	if(len > 0){
	// 		for(var i = 0; i < len ; i++){
	// 			var itemWrap = mailWarp.items[i];
	// 			var itemData = new ItemData(itemWrap.uid,itemWrap.id,itemWrap.count);
	// 			this._items.push(itemData);
	// 		}
	// 	}
	// 	var len = mailWarp.params.length;
	// 	if(len > 0){
	// 		for(var i = 0; i <  len; i++){
	// 			this._params.push(mailWarp.params[i]);
	// 		}
	// 	}
	// 	if(this.MailConfig != null){
	// 		this._title = ConfigUtils.GetText(this.MailConfig.SubjectText);
	// 		this._content = ConfigUtils.GetText(this.MailConfig.ContentText);
	// 		this._fromName = ConfigUtils.GetText(this.MailConfig.SenderText);
	// 		var len = this.MailConfig.RewardItemIds.length;
	// 		var countLen = this.MailConfig.RewardNum.length;
			
	// 		if(len  > 0 && countLen == len){
	// 			for(var i =0 ;  i <  len; i++){
	// 				var item = new ItemData(0,this.MailConfig.RewardItemIds[i],this.MailConfig.RewardNum[i]);
	// 				this._items.push(item);
	// 			}
	// 		}
	// 		if(this.MailConfig.Icon){
	// 			var itemConfig = ItemConfig.Dic.get(this.MailConfig.Icon);
	// 			this._icon = itemConfig.Icon;
	// 			this._iconScale = itemConfig.IconScale;
	// 			this._bgIcon = itemConfig.Iconframe;
	// 		}
	// 	}

	// }
}