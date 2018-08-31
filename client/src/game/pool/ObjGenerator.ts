class ObjGenerator {
	private _dis:IDistributor = null;
	public constructor(val:IDistributor) {
		this._dis = val;
	}
	public getObj(type:number):IObject{
		let obj:IObject = this._dis.get(type);
		if(obj == null){
			obj = this.createObj(type);
			this._dis.add(obj);
			obj.reset();
		}
		return obj;
	}
	private createObj(type:number):IObject{
		switch(type){
			case ObjectType.MOVIECLIP:
				return new MovieClip();
		}
	}
}