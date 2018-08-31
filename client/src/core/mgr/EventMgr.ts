class EventMgr implements egret.IEventDispatcher {
	$hashCode: number;
	readonly hashCode: number;
	private _eventDispatcher:egret.EventDispatcher;
	private _dict:any;
	public clear(){
		this._dict = {};
	}
	public constructor() {
		this._dict = {};
		this._eventDispatcher = new egret.EventDispatcher();
	}
	public removeAll(thisObject:any, useCapture?: boolean):void{
		let keys = Object.keys(this._dict);
		for(var i:number = 0; i < keys.length; i++){
			let type = keys[i];
			let arr:Array<any> = this._dict[type];
			for(var j = arr.length - 1; j >= 0; j--){
				if(arr[j][1] == thisObject){
					this._eventDispatcher.removeEventListener(type,arr[j][0],thisObject,useCapture);
					arr.splice(j,1);
				}
			}
			if(arr.length == 0){
				this._dict[type] = null;
				delete this._dict[type];
			}
		}
	}
	public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void{
		let arr:Array<any> = this._dict[type];
		if(arr == null){
			arr = new Array<any>();
			this._dict[type] = arr;
		}
		for(var data  of arr){
			if(data[0] == listener && data[1] == thisObject){
				return;
			}
		}
		arr.push([listener,thisObject]);
		this._eventDispatcher.addEventListener(type,listener,thisObject,useCapture,priority);
	}
	public once(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void{
		this._eventDispatcher.once(type,listener,thisObject,useCapture,priority);
	}
	public removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void{
		let arr :Array<any> = this._dict[type];
		if(arr == null){
			return;
		}
		let len:number = arr.length;
		for(var i:number = len - 1 ; i >= 0; i--){
			if(arr[i][0] == listener && arr[i][1] == thisObject){
				arr.splice(i,1);
				break;
			}
		}
		if(arr.length == 0){
			this._dict[type] = null;
			delete this._dict[type];
		}
		this._eventDispatcher.removeEventListener(type,listener,thisObject,useCapture);
	}
	public hasEventListener(type: string): boolean{
		return this._eventDispatcher.hasEventListener(type);
	}
	public dispatchEvent(event: egret.Event): boolean{
		return this._eventDispatcher.dispatchEvent(event);
	}
	public dispatchEventWith(type: string, bubbles?: boolean, data?: any, cancelable?: boolean):boolean{
		return this._eventDispatcher.dispatchEventWith(type,bubbles,data,cancelable);
	}
	public willTrigger(type: string): boolean{
		return this._eventDispatcher.willTrigger(type);
	}

}