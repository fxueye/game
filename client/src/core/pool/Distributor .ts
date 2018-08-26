class Distributor implements IDistributor  {
	private _userdPool:Object = null;
	private _idlePool:Object = null;
	public constructor() {
		this._userdPool = {};
		this._idlePool = {};
	}
	distribution( val:IObject ):void{
		if(val.isIdle){
			this._idlePool[val.hashc] = val;
			delete this._userdPool[val.hashc];
		}else{
			this._userdPool[val.hashc] = val;
			delete this._idlePool[val.hashc];
		}
	}
    add( val:IObject ):void{
		val.setProtocol(this);
		if(val.isIdle){
			this._idlePool[val.hashc] = val;
		}else{
			this._userdPool[val.hashc] = val;
		}
	}
    get( type:number ):IObject{
		let obj:IObject = null;
		for(var key in this._idlePool){
			obj = this._idlePool[key] as IObject;
			if(obj.type == type){
				obj.reset();
				return obj;
			}
		}
		return null;
	}
    clear():void{
		let obj:IObject = null;
		for(var key in this._idlePool){
			obj = this._idlePool[key] as IObject;
			obj.del();
		}
		this._idlePool = null;
		this._idlePool = {};
	}
	
}