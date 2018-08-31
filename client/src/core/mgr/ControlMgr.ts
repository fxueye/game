class ControlMgr{
    private _modules:any;
    public constructor(){
        this._modules = {}
    }
    public clear():void{
        this._modules = {}
    }

    public register(key:number,control:BaseController):void{
        if(this.isExists(key)){
            return;
        }
        this._modules[key] = control;
    }
    public unregister(key:number):void{
        if(!this.isExists(key)){
            return;
        }
        this._modules[key] = null;
        delete this._modules[key];
    }
    public getControl<T>(key:number):T{
        return <T>this._modules[key];
    }
    public getModel(key:number):BaseModel{
        let control:BaseController = this._modules[key];
        if(control){
            return control.getModel();
        }
        return null;
    }
    public isExists(key:number):boolean {
        return this._modules[key] != null;
    }
}