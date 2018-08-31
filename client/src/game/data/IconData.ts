class IconData {
	private _urlIcon:string;
	private _icon:string;
	private _bgIcon:string = "common_icon_tx_png";
	private _itemId:number;
	private _count:number;
	private _scale:number;
	protected _name:string;
	public constructor() {
	}
	public set ItemId(id:number){
		this.Icon = "";
		this._itemId = id;
	}
	public set BgIcon(value:string){
		this._bgIcon = value;
	}
	public get BgIcon():string{
		if(this._itemId >= 0){
			let itemConfig = ItemConfig.Dic.get(this._itemId);
			return itemConfig.Iconframe;
		}
		return this._bgIcon;
	}
	public get Count():number{
		return this._count;
	}
	public set Count(val:number){
		this._count = val;
	}
	
	public set Icon(value:string){
		this._icon = value;
	}
	public set UrlIcon(val:string){
		this._urlIcon = val;
	}
	public get UrlIcon():string{
		return this._urlIcon;
	}
	public set Scale(val:number){
		this._scale = val;
	}
	public set Name(val:string){
		this._name = val;
	}
	public get Name():string{
		return this._name;
	}

	public get Scale():number{
		if(this._itemId >= 0){
			let itemConfig = ItemConfig.Dic.get(this._itemId);
			return itemConfig.IconScale;
		}
		return this._scale;
	}

	public get Icon():string{
		if(this._itemId >= 0){
			let itemConfig = ItemConfig.Dic.get(this._itemId);
			return itemConfig.Icon;
		}
		return this._icon;
	}
}