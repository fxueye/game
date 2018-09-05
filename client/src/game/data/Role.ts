class Role {
	private _uid:number;
	private _name:string;			//用户名
	private _mood:string;			//心情
	private _level:number;			//等级
	private _vipLevel:number;		//vip等级
	private _title:string;			//称号
	private _icon:string="";			//头像
	private _progress:number;		//升级进度

	private _secName:string; //秘书名称不存储服务器

	private _sign:SignData;
	private _items:Array<ItemData>;
	private _mails:Array<MailData>;
	private _itemsUid2ItemDic:Dictionary<ItemData>;
	private _itemsId2ItemDic:Dictionary<ItemData>;
	private _typeIdDic:Dictionary<Dictionary<ItemData>>;//类型累加数量
	private _typeUidDic:Dictionary<Dictionary<ItemData>>;


	public constructor() {
		this._items = new Array<ItemData>();
		this._itemsId2ItemDic = new Dictionary<ItemData>();
		this._itemsUid2ItemDic = new Dictionary<ItemData>();
		this._typeIdDic = new Dictionary<Dictionary<ItemData>>();
		this._typeUidDic = new Dictionary<Dictionary<ItemData>>();
		this._level = 0;
		this._vipLevel = 0;
		this._mood = "这家伙很懒!";
		this._sign = new SignData();
		this._mails = new Array<MailData>();
	}
	public get Sign():SignData{
		return this._sign;
	}
	public get ID():number{
		return this._uid;
	}
	public set ID(val:number){
		this._uid = val;
	}
	public set Name(value:string){
		this._name = value;
	}
	public get Name():string{
		if(DeviceUtils.IsWeixin()){
			this._name = App.Instance.Account.NickName;
		}
		return this._name;
	}
	public get Mood():string{
		return this._mood;
	}
	public set Mood(value:string){
		this._mood = value;
	}

	public set Exp(value:number){
		var item = this._itemsId2ItemDic.get(ItemID.EXP);
		if(item == null){
			item = new ItemData(ItemID.EXP,value);
			this.addItem(item);
		}
		item.Count = value;
		this.calcLevel();
	}
	private calcLevel():void{
		for(var i = 0; i < LevelConfig.Arr.length; i++){
			var levelConfig = LevelConfig.Arr[i];
			if(this.Exp < levelConfig.Exp){
				this._level = levelConfig.Id - 1;
				this.calcProgress();
				return;
			}
		}
	}
	private calcProgress():void{
		var levelConfig = LevelConfig.Dic.get(this.Level);
		var nextLeveConfig = LevelConfig.Dic.get(this.Level + 1);
		var count =nextLeveConfig.Exp - levelConfig.Exp;
		var curr = count - (nextLeveConfig.Exp - this.Exp);
		this._progress = curr/count * 100;
	}
	public get Exp():number{
		return this._itemsId2ItemDic.get(ItemID.EXP).Count;
	}
	public get Level():number{		
		return this._level;
	}
	public get Progress():number{
		return this._progress;
	}
	public set VipLevel(value:number){
		// var item =  this._itemsDic.get(ItemID.VIP_LEVEL);
		// if(item == null){
		// 	item = new Item(ItemID.VIP_LEVEL);
		// }
		// item.Count = value;
		this._vipLevel = value;
	}
	public get VipLevel():number{
		return this._vipLevel;
	}
	public set Title(value:string){
		this._title = value;
	}
	public get Title():string{
		return this._title;
	}
	public set Diamond(value:number){
		var item =  this._itemsId2ItemDic.get(ItemID.DIAMOND);
		if(item == null){
			item = new ItemData(ItemID.DIAMOND,value);
			this.addItem(item);
		}
		item.Count = value;
	} 
	public get Diamond():number{
		return this._itemsId2ItemDic.get(ItemID.DIAMOND).Count;
	}
	public set Money(value:number){
		var item =  this._itemsId2ItemDic.get(ItemID.MONEY);
		if(item == null){
			item = new ItemData(ItemID.MONEY,value);
			this.addItem(item);
		}
		item.Count = value;
	}
	public get AssetValue():number{
		var assetValue = 0;
		// Logger.log("start---------------------------------")
		for(var item of this._itemsUid2ItemDic.values){
			// Logger.log("item id:" + item.ID + " cout:" + item.Count + "  price:" + item.ItemConfig.WorthPrice);
			// assetValue+= item.Count * item.ItemConfig.WorthPrice;
		}
		// Logger.log("end---------------------------------")
		return assetValue;
	}
	public get Money():number{
		return this._itemsId2ItemDic.get(ItemID.MONEY).Count;
	}
	public set Icon(value:string){
		this._icon = value;
	}
	public get Icon():string{
		if(DeviceUtils.IsWeixin()){
			this._icon = App.Instance.Account.AvatarUrl;
		}
		return this._icon;
	}
	public get Items():Array<ItemData>{
		return this._items;
	}
	public get ItemDic():Dictionary<ItemData>{
		return this._itemsId2ItemDic;
	}
	public getItemByUID(uid:number){
		return this._itemsUid2ItemDic[uid];
	}
	public getItemCount(id:number):number{
		var items = this.getItemByID(id);
		if(items.length == 1){
			return items[0].Count;
		}else{
			return items.length;
		}
	} 
	public getItemByID(id:number):Array<ItemData>{
		var config = ItemConfig.Dic.get(id);
		var ret = new Array<ItemData>();
		if(config.AddType == AddType.OVERLAY){
			ret.push(this._itemsId2ItemDic.get(config.Id));
		}else if(config.AddType == AddType.UNOVERLAY){
			for(var i = 0 , len = this._itemsUid2ItemDic.values.length; i < len; i++){
				var itemData = this._itemsUid2ItemDic.values[i];
				if(itemData.ID == id){
					ret.push(itemData);
				}
			}
		}
		return ret;
	}

	public getItemByType(type:number,addType:number = AddType.OVERLAY):Dictionary<ItemData>{
		var dic = this._typeIdDic.get(type);
		if(addType == AddType.UNOVERLAY){
			dic = this._typeUidDic.get(type);
		}
		return dic == null ? new Dictionary<ItemData>() : dic; 
	}
	public costItem(item:ItemData){
		if(item.ItemConfig.AddType == AddType.OVERLAY && this._itemsId2ItemDic.containsKey(item.ID)){
			var nowItem = this._itemsId2ItemDic.get(item.ID);
			nowItem.Count -= item.Count;
		}else if(item.ItemConfig.AddType == AddType.UNOVERLAY){
			if(this._itemsUid2ItemDic.containsKey(item.UID)){
				var nowItem = this._itemsUid2ItemDic.get(item.UID);
				nowItem.Count = 0;
			}
		}
	}

	public addItem(item:ItemData,calc:boolean = false){
		if(item.ItemConfig.AddType == AddType.OVERLAY && this._itemsId2ItemDic.containsKey(item.ID)){
			var nowItem = this._itemsId2ItemDic.get(item.ID);
			nowItem.Count += item.Count;
		}else if(item.ItemConfig.AddType == AddType.OVERLAY){
			this._itemsId2ItemDic.add(item.ID,item);
			this._itemsUid2ItemDic.add(item.UID,item);
			this._items.push(item);
		}else if(item.ItemConfig.AddType == AddType.UNOVERLAY){
			this._itemsUid2ItemDic.add(item.UID,item);
			this._items.push(item);
		}else{
			this._itemsUid2ItemDic.add(item.UID,item);
			this._items.push(item);
		}
		if(this._typeIdDic.containsKey(item.ItemConfig.ItemType)){
			var dic = this._typeIdDic.get(item.ItemConfig.ItemType);
			if(dic.containsKey(item.ID) && item.ItemConfig.AddType == AddType.UNOVERLAY){
				//不叠加数量永远是1
				// var temp =  dic.get(item.ID);
				// temp.Count += item.Count;
			}else{
				dic.add(item.ID,item);
			}
		}else{
			var dic = new Dictionary<ItemData>();
			dic.add(item.ID,item);
			this._typeIdDic.add(item.ItemConfig.ItemType,dic);
		}
		if(this._typeUidDic.containsKey(item.ItemConfig.ItemType)){
			var dic = this._typeUidDic.get(item.ItemConfig.ItemType);
			if(!dic.containsKey(item.UID) && item.UID　> 0){
				dic.add(item.UID,item);
			}
		}else{
			var dic = new Dictionary<ItemData>();
			dic.add(item.UID,item);
			this._typeUidDic.add(item.ItemConfig.ItemType,dic);
		}
		if(calc){
			this.calc(item);
		}
	}
	private calc(item:ItemData){
		switch(item.ID){
			case ItemID.EXP:
				this.calcLevel();
		}
	}
	public addMail(mail:MailData){
		this._mails.push(mail);
	}
	public getMailByUid(uid:number){
		for(var mail of this._mails){
			if(mail.UID ==  uid){
				return mail;
			}
		}
		return null;
	}
	public delMail(mail:MailData){
		var index = this._mails.indexOf(mail);
		if(index >= 0)
			this._mails.splice(index,1);
	}
	public getMails(){
		return this._mails;
	}
	
	public get SecName():string{
		var key = this._uid+"_secName";
		var name =  egret.localStorage.getItem(key)
		if(name){
			this._secName = name;
		}else{
			this._secName = RoleInitConfig.Dic.get(1).Name;
		}
		return this._secName;
	}
	public set SecName(val:string){
		this._secName = val;
		var key = this._uid+"_secName";
		egret.localStorage.setItem(key,val);
	}

	// public Parse(roleWrap:Protocols.RoleWrap):void{
	// 	this._uid = roleWrap.uid;
	// 	this._name = roleWrap.name;
	// 	this._mood = roleWrap.mood;
	// 	this._title = roleWrap.title;
	// 	var itemLen = roleWrap.items.length;
	// 	if(itemLen > 0){
	// 		for(var i = 0 ; i <  itemLen; i++){
	// 			var itemWrap = roleWrap.items[i];
	// 			var item = new ItemData(itemWrap.uid,itemWrap.id,itemWrap.count);
	// 			this.addItem(item);
	// 		}
	// 	}
	// 	var sign = roleWrap.sign;
	// 	if(sign){
	// 		this._sign.Parse(sign);
	// 	}
	// 	var body = roleWrap.body;
	// 	if(body){
	// 		this._body.Parse(body);
	// 	}
	// }

}