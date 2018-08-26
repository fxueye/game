class BaseController{
    private _model:BaseModel;
    
    public constructor(){
    }
    public addListener(type:string,listener:Function,obj?:any){
        if(!obj){
            obj = this;
        }
        App.Instance.EventMgr.addEventListener(type,listener,obj);
    }
    public removeAll(obj?:any){
        if(!obj){
            obj = this;
        }
        App.Instance.EventMgr.removeAll(obj);
    }
    public dispatchEventWith(type:string,data?:any){
        App.Instance.EventMgr.dispatchEventWith(type,false,data);
    }
    public setModel(model:BaseModel){
        this._model = model;
    }
    public getModel():BaseModel{
        return this._model;
    }
}