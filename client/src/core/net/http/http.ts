class Http {
	public static readonly OK:number = 200;
	public static readonly NOTOK:number = -1;

	private _request:egret.HttpRequest;
	private _headers:Dictionary<string>;
	private _responseType:string;
	private _callback:Function;
	private _progress:Function;
	private _obj:any;
	private _httpMethod:string;
	
	public constructor() {
		this._request = new egret.HttpRequest();
		this._headers = new Dictionary<string>();
		this._responseType = egret.HttpResponseType.TEXT;
		this._request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		this._request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
		this._request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
		this._request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
	}
	public setHeaders(headers:Dictionary<string>):void{
		if(headers.length > 0){
			this._headers = headers;
		}
	}
	public setResponseType(type:string){
		if(type){
			this._responseType = type;
		}
	}
	public setProgress(progress:Function,obj?:any){
		this._progress = progress;
		this._obj = obj;
	}

	public Get(url:string,params?:Dictionary<any>,callBack?:Function,obj?:any){
		App.Instance.EasyLoading.showLoading();
		this._callback = callBack;
		this._obj = obj;
		var paramstr = "?";
		if(params && params.length > 0){
			paramstr += this.getParamsStr(params);
		}else{
			paramstr = "";
		}
		this._httpMethod = egret.HttpMethod.GET;
		this._request.open(url + paramstr,egret.HttpMethod.GET);
		if(this._headers.length　> 0){
			for(var k of this._headers.keys){
				var value = this._headers.get(k);
				this._request.setRequestHeader(k,value);
			}
		}
		if(this._responseType)
			this._request.responseType = this._responseType;
		this._request.send();
	}
	public Post(url:string,params?:Dictionary<any>,callBack?:Function,obj?:any){
		this._callback = callBack;
		this._obj = obj;
		var paramstr = "";
		if(params.length > 0){
			paramstr += this.getParamsStr(params);
		}
		this._httpMethod = egret.HttpMethod.POST;
		this._request.open(url,egret.HttpMethod.POST);
		if(this._headers.length　> 0){
			for(var k of this._headers.keys){
				var value = this._headers.get(k);
				this._request.setRequestHeader(k,value);
			}
		}
		if(this._responseType)
			this._request.responseType = this._responseType;
		this._request.send(paramstr);
	}
	private getParamsStr(params:Dictionary<any>,sort:boolean = false):string{
		var retstr = "";
		if(params.length > 0){
			var keys = params.keys;
			if(sort){
				keys =  keys.sort();
			}
			for(var i = 0 , len = keys.length; i < len; i++){
				var k = keys[i];
				var v = params.get(k);
				if(i <  len - 1){
					retstr += k + "=" + v + "&"; 
				}else{
					retstr += k + "=" + v; 
				}
			}
		}
		return retstr;
	}
	private onGetComplete(event:egret.Event):void {
		App.Instance.EasyLoading.hideLoading();
		var request = <egret.HttpRequest>event.currentTarget;
		if(this._callback && this._obj){
			this._callback.call(this._obj,Http.OK,request.response);
		}

	}
	private onGetIOError(event:egret.IOErrorEvent):void {
		App.Instance.EasyLoading.hideLoading();
		console.error(StringUtils.format("{0} error:{1}",this._httpMethod,event));
		var request = <egret.HttpRequest>event.currentTarget;
		if(this._callback && this._obj){
			this._callback.call(this._obj,Http.NOTOK,null);
		}
	}
	private onGetProgress(event:egret.ProgressEvent):void {
		var progress = (event.bytesLoaded/event.bytesTotal);
		if(this._progress && this._obj){
			this._progress.call(this._obj,progress);
		}
	}

}