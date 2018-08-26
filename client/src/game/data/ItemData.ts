class ItemID{
	public static readonly DIAMOND = 1;
	public static readonly MONEY = 2;
	public static readonly EXP = 3;
}
class ItemType{
	public static readonly CURRENCY = 0;
	public static readonly DATA = 1;
	public static readonly PEOPS = 2;
	public static readonly SUIT = 3;
	public static readonly ASSETS = 4;
}
class AddType{
	public static readonly OVERLAY = 1;
	public static readonly UNOVERLAY = 2;
}
class ItemData {
	private _uid:number;
	private _id:number;
	private _count:number;
	public constructor(uid:number,id:number,count:number = 1) {
		this._uid = uid;
		this._id = id;
		this._count = count;
	}
	public get UID():number{
		return this._uid;
	}
	public get ID():number{
		return this._id;
	}
	public set Count(value:number){
		this._count = value;
	}
	public get Count():number{
		return this._count;
	}
	public get ItemConfig():ItemConfig{
		var itemConfig = ItemConfig.Dic.get(this._id);
		if(itemConfig == null){
			console.error("not find ItemConfig id:" + this._id);
		}
		return itemConfig;
	}
}