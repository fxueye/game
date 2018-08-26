class Price {
	private _num:number;
	private _price:number;
	private _second:number;
	public constructor() {
		this._num = 0;
		this._price = 0;
		this._second = 0;
	}
	public set Price(val:number){
		this._price = val;
	}
	public get Price():number{
		return this._price;
	}
	public set Second(val:number){
		this._second = val;
	}
	public get Second():number{
		return this._second;
	}
	public get Num():number{
		return this._num;
	}
	public set Num(val:number){
		this._num = val;
	}
	// public pase(data:Protocols.PriceWrap){
	// 	this.Num = data.num;
	// 	this.Price = Number(data.price);
	// 	this.Second = data.second;
	// }
}