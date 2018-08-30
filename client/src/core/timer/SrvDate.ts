class SrvDate {
	private _server_timestamp:number;
	public static Millisecond = 1;
	public static Second = SrvDate.Millisecond * 1000;
	public static Minute = SrvDate.Second * 60;
	public static Hour = SrvDate.Minute * 60;
	public constructor() {
	}
	public StartTime(){
		this._server_timestamp = 0;
		App.Instance.TimerMgr.startTimer(SrvDate.Second,0,this.update,this);
	}
	public set ServerTime(val:Long){
		this._server_timestamp = val.toNumber();
	}
	public get ServerTime():Long{
		if(this._server_timestamp ==  0){
			var date = new Date();
			this._server_timestamp = Math.floor(date.getTime() / 1000);
		}
		return Long.fromNumber(this._server_timestamp);
	}
	public get ServetDate():Date{
		return new Date(this.ServerTime.toNumber() * 1000);
	}
	private update(){
		this.ServerTime.add(Long.fromInt(1));
		// Logger.log("server time: " + DateUtil.LongTimeFormat(this.ServetDate));
	}
}