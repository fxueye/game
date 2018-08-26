class SignData {
	private _lastSignTime:number;
	private _signId:number;
	public constructor() {
		this._signId = 0;
		this._lastSignTime = 0;
	}
	public get SignId():number{
		return this._signId;
	}
	public get LastSignTime():number{
		return this._lastSignTime;
	}
	public get SignEd(){
		if(this._lastSignTime == 0){
			return false;
		}
		var time = DateUtil.Timestamp2Date(this._lastSignTime);
		if(DateUtil.IsToady(time)){
			return true;
		}
		return false;
	}
	// public Parse(signWrap:Protocols.SignWrap):void{
	// 	this._signId = signWrap.id;
	// 	this._lastSignTime = signWrap.lastSignTime;
	// }
}