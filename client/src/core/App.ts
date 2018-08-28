class App {
    private static _instance : App;
    private _rpc:Net.Simple.SimpleRPC;
    private _gameStage:eui.UILayer;
    private _uiStage: eui.UILayer;
    private _sceneMgr: SceneMgr;
    private _res:ResLoader;
    private _timerMgr:TimerMgr;
    private _easyloading:EasyLoading;
    private _layerMgr:LayerMgr;
    private _viewMgr:ViewMgr;
    private _controlMgr:ControlMgr;
    private _soundMgr:SoundMgr;
    private _confLoader:ConfLoader; 
    private _eventMgr:EventMgr;
    private _account:Account;
    private _server:number;
    private _srvDate:SrvDate;
    private _version:string;
    private _key:string;
    
    

    public constructor(){
        if(this._gameStage == null){
            this._gameStage = new eui.UILayer();
            this._gameStage.percentWidth = 100;
            this._gameStage.percentHeight = 100;
            this._gameStage.touchEnabled = false;
            this.Stage.addChild(this._gameStage);
        }
        if(this._uiStage == null){
            this._uiStage = new eui.UILayer();
            this._uiStage.percentWidth = 100;
            this._uiStage.percentHeight = 100;
            this._uiStage.touchEnabled = false;
            this.Stage.addChild(this._uiStage);
        }
        

    }
    public static get Instance(): App{
        if(!this._instance){
            this._instance = new App();
        }
        return this._instance;
    }
    public init() : void{
        //初始化操作
        if(!this._rpc){
            this._rpc = new Net.Simple.SimpleRPC("rpc");
            this._rpc.Init(new ClientCmdsInvoker(new ClientCmds(this._rpc)));
        }
        this.EventMgr.addEventListener(RPC.SOCK_NETWORK_ERROR,this.onNetError,this);
        egret.lifecycle.onPause = this.onPause;
        egret.lifecycle.onResume = this.onResume;
        App.Instance.SrvDate.StartTime();
        if(!DeviceUtils.IsPc()){
            Logger.LEVEL = LogLevel.OFF;
        }
    }
    private onNetError(){
         Dialog.makeDialog("提示","与服务器断开连接!",false,this,()=>{
                //TODO 重启重新连接socket 操作
                App.Instance.RPC.Reconnect(false);
                App.Instance.ViewMgr.closeAll();
                App.Instance.ViewMgr.push(ModuleConst.LOADING,false,true);
        }).open();
    }
    
    
    private onPause(){
        Logger.log("app onPause");
        // egret.ticker.pause(); // 关闭渲染与心跳
        App.Instance.ViewMgr.onPause();
    }
    private onResume(){
        Logger.log("app onResume");
        // egret.ticker.resume(); // 打开渲染与心跳
        App.Instance.ViewMgr.onResume();
    }
    public get Version():string{
        return this._version;
    }
    public set Version(val:string){
        this._version = val;
    }
    public get Key():string{
        return this._key;
    }
    public set Key(val:string){
        this._key = val;
    }
    public get SrvDate():SrvDate{
        if(!this._srvDate){
            this._srvDate = new SrvDate();
        }
        return this._srvDate;
    }

    public get Server():number{
        return this._server;
    }
    public set Server(val:number){
        this._server = val;
    }
    public get RPC():Net.Simple.SimpleRPC{
        if(!this._rpc){
            this._rpc = new Net.Simple.SimpleRPC();
            this._rpc.Init(new ClientCmdsInvoker(new ClientCmds(this._rpc)));
        }
        return this._rpc;
    }
    public get Account():Account{
        return this._account;
    }
    public set Account(val:Account){
        this._account = val;
    }

    public get EventMgr():EventMgr{
        if(!this._eventMgr){
            this._eventMgr = new EventMgr();
        }
        return this._eventMgr;
    }
    public get ViewMgr():ViewMgr{
        if(!this._viewMgr){
            this._viewMgr = new ViewMgr();
        }
        return this._viewMgr;
    }
    public get LayerMgr():LayerMgr{
        if(!this._layerMgr){
            this._layerMgr = new LayerMgr();
        }
        return this._layerMgr;
    }
    public get RES():ResLoader{
        if(!this._res){
            this._res = new ResLoader();
        }
        return this._res;
    }
    public get SceneMgr():SceneMgr{
        if(!this._sceneMgr){
            this._sceneMgr = new SceneMgr();
        }
        return this._sceneMgr;
    }
    public get TimerMgr():TimerMgr{
        if(!this._timerMgr){
            this._timerMgr = new TimerMgr();
        }
        return this._timerMgr;
    }
    public get ConfLoader():ConfLoader{
        if(!this._confLoader){
            this._confLoader = new ConfLoader();
        }
        return this._confLoader;
    }
    public get ControlMgr():ControlMgr{
        if(!this._controlMgr){
            this._controlMgr = new ControlMgr();
        }
        return this._controlMgr;
    }
    public get EasyLoading():EasyLoading{
        if(!this._easyloading){
            this._easyloading = new EasyLoading();
        }
        return this._easyloading;
    }
    public get SoundMgr():SoundMgr{
        if(!this._soundMgr){
            this._soundMgr = new SoundMgr();
        }
        return this._soundMgr;
    }
    public get GameStage():eui.UILayer{
        return this._gameStage;
    }
    public get UIStage(): eui.UILayer{
        return this._uiStage;
    }
    public setScaleMode(value: string): void{
        this.Stage.scaleMode = value;
    }
    public setFrameRate(value: number): void{
        this.Stage.frameRate = value;
    }
    public setMaxTouches(value: number): void{
        this.Stage.maxTouches = value;
    }
    public setTouchChildren(value: boolean): void{
        this.Stage.touchChildren = value;
    }
    public get Height(): number{
        return this.Stage.stageHeight;
    }
    public get Width(): number{
        return this.Stage.stageWidth;
    }
    public get Stage(): egret.Stage{
        return egret.MainContext.instance.stage;
    }
    //全屏适配
    private _designWidth: number;
    private _designHeight: number;
    private _resizeCallback: Function;
    public fullScreenAdaptation(designWidth: number,designHeight: number,resizeCallback: Function):void{
        this._designWidth = designWidth;
        this._designHeight = designHeight;
        this._resizeCallback = resizeCallback;
        this.stageOnResize();
    }
    private stageOnResize(): void{
        this.Stage.removeEventListener(egret.Event.RESIZE,this.stageOnResize,this);
        let designWidth: number = this._designWidth;
        let designHeight: number = this._designHeight;
        let clientWidth:number = window.innerWidth;
        let clientHeight:number = window.innerHeight;
        let a: number = clientWidth /  clientHeight;
        let b: number = designWidth / designHeight;
        let c: number = a / b;
        // if(a > b){
        //     designWidth = Math.floor(designWidth * c);
        //     designHeight = Math.floor(designHeight * c);
        // }
        
        //TODO 全屏适配  最后在考虑 由于小程序不支持showall模式
        this.Stage.setContentSize(designWidth,designHeight);
        if(this._resizeCallback){
            this._resizeCallback();
        }
        
        this.Stage.addEventListener(egret.Event.RESIZE,this.stageOnResize,this);
    }

}