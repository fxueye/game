class MovieClip extends egret.MovieClip implements IObject {
	private _type :number;
	private _dis:IDistributor = null;
	private _isIdle:boolean = false;
	public constructor(movieClipData?: egret.MovieClipData) {
		super(movieClipData);
		this._type = ObjectType.MOVIECLIP;
	}
	get hashc():number{
		return this.hashCode;
	}
	get type():number{
		return this._type;
	}
	get isIdle():boolean{
		return this._isIdle;
	}
	dispose():void{
		this._isIdle = true;
		this._dis.distribution(this);
	}
    del():void{
		this.dispose();
		this._dis = null;
	}
    reset():void{
		this._isIdle = false;
		this._dis.distribution(this);
	}
    setProtocol( val:IDistributor ):void{
		this._dis = val;
	}

}