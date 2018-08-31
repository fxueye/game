interface IBaseView{
    isInit():boolean;
    isShow():boolean;
    addToParent():void;
    removeFromParent():void;
    initCompoments():void;
    initData():void;
    setVisible(value:boolean):void;
    afterOpen():void;
    open(...param:any[]):void;
    close(...param:any[]):void;
    destroy():void;
    setResources(resources:string[]):void;
    loadResource(loadComplete:Function,initComplete:Function):void;
    onPause():void;
    onResume():void;
}
class BaseSpriteView extends BaseSprite implements IBaseView{
    private _isInit:boolean;
    private _controller:BaseController;
    private _parent:egret.DisplayObjectContainer;
    private _resources:string[] = null;
    public constructor(controller:BaseController,parent:egret.DisplayObjectContainer){
        super();
        this._controller = controller;
        this._parent = parent;
        this._isInit = false;
        App.Instance.Stage.addEventListener(egret.Event.RESIZE,this.onResize,this);
    }

    public initCompoments():void{
        this._isInit = true;
    }
    protected onResize():void {

    }
    public isInit():boolean{
        return this._isInit;
    }
    public isShow():boolean{
        return this.stage != null && this.visible;
    }
    public addToParent():void{
        this._parent.addChild(this);
    }
    public removeFromParent():void{
        this.parent.removeChild(this);
    }
    public setVisible(value:boolean):void{
        this.visible = value;
    }
    public setResources(resources:string[]):void{
        this._resources = resources;
    }
    public loadResource(loadComplete:Function,initComplete:Function):void{
        if(this._resources && this._resources.length > 0){
            App.Instance.RES.loadResource(this._resources,[],loadComplete,null,this);
            this.once(eui.UIEvent.CREATION_COMPLETE,initComplete,this);
        }else{
            loadComplete();
            initComplete();
        }
    }

    public afterOpen():void{

    }
    public open(...param:any[]):void{

    }
    public close(...param:any[]):void{

    }
    public initData():void{

    }
    public destroy():void{
        this._controller = null;
        this._parent = null;
        this._resources = null;
    }
    public onPause():void{

    }
    public onResume():void{
        
    }

}
class BaseUIView extends eui.Component implements IBaseView{
    private _isInit:boolean;
    private _controller:BaseController;
    private _parent:egret.DisplayObjectContainer;
    private _resources:string[] = null;
    private _viewId:number = 0;
    public constructor(controller:BaseController,parent:egret.DisplayObjectContainer){
        super();
        this._controller = controller;
        this._parent = parent;
        this._isInit = false;
        this.percentWidth = 100;
        this.percentHeight = 100;
        App.Instance.Stage.addEventListener(egret.Event.RESIZE,this.onResize,this);
    }
    public initCompoments():void{
        this._isInit = true;
    }
    public isInit():boolean{
        return this._isInit;
    }
    public isShow():boolean{
        return this.stage != null && this.visible;
    }
    public addToParent():void{
        this._parent.addChild(this);
    }
    public removeFromParent():void{
        this.parent.removeChild(this);
    }
    public setVisible(value:boolean):void{
        this.visible = value;
    }
    public setResources(resources:string[]):void{
        this._resources = resources;
    }
    public loadResource(loadComplete:Function,initComplete:Function):void{
        if(this._resources && this._resources.length > 0){
            App.Instance.RES.loadResource(this._resources,[],loadComplete,this.onResourceLoadProgress,this);
            this.once(eui.UIEvent.CREATION_COMPLETE,initComplete,this);
        }else{
            loadComplete();
            initComplete();
        }
    }
    private onResourceLoadProgress(current:number,total:number){
        App.Instance.EasyLoading.setProgress(current,total);
    }
    protected onResize():void {

    }

    public afterOpen():void{
        
    }
    public open(...param:any[]):void{
        App.Instance.EventMgr.addEventListener(GameDataEvent.DATA_REFRESH,this.refresh,this);
    }
    public close(...param:any[]):void{
        App.Instance.EventMgr.removeEventListener(GameDataEvent.DATA_REFRESH,this.refresh,this);
    }
    public initData():void{
        
    }
    protected refresh():void{

    }
    public get Controller():BaseController{
        return this._controller;
    }
    public destroy():void{
        this._controller = null;
        this._parent = null;
        this._resources = null;
    }
    public onPause():void{

    }
    public onResume():void{
        
    }

}