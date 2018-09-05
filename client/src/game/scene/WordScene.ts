class WordScene extends BaseScene{
    private _groupName:string = "preload";
    private _subGroups:Array<string> = ["loading","common","bg","people","particle","mc"];
    private _inited:boolean = false;
    private _wordLayer:BaseSprite;
    private _leftBtn:eui.Button;
    private _rightBtn:eui.Button;
    private _lastPoint:egret.Point;
    public constructor(){
        super();
    }

    public onEnter():void{
        super.onEnter();
        if(!this._inited){
            this.init();
            return;
        }
        this.initWord();
    }
    private init(){
        this.addLayer(App.Instance.LayerMgr.GameBg);
        this.addLayer(App.Instance.LayerMgr.GameMain);
        this.addLayer(App.Instance.LayerMgr.UIMain);
        this.addLayer(App.Instance.LayerMgr.UIPopup);
        this.addLayer(App.Instance.LayerMgr.UIMessage);
        this.addLayer(App.Instance.LayerMgr.UITips);   
        
        App.Instance.ViewMgr.push(ModuleConst.LOADING);
        App.Instance.RES.loadGroups(this._groupName,this._subGroups,this.onResourceLoadComplete,this.onResourceLoadProgress,this);
    }
    private onClick(evt:egret.TouchEvent){
        var target = evt.target;
        if(target.hashCode == this._leftBtn.hashCode)
            this._wordLayer.x -= 100;
        else    
            this._wordLayer.x += 100;
    }
    private initWord(){
        console.log(App.Instance.Width);
        console.log(App.Instance.Height);
        this._leftBtn = new eui.Button();
        this._leftBtn.x = 100;
        this._leftBtn.y = 100;
        this._leftBtn.label = "<";
        this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
        App.Instance.LayerMgr.UIMain.addChild(this._leftBtn);
        this._rightBtn= new eui.Button();
        this._rightBtn.x = 1080;
        this._rightBtn.y = 100;
        this._rightBtn.label = ">"
        this._rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
        App.Instance.LayerMgr.UIMain.addChild(this._rightBtn);

        this._wordLayer = new BaseSprite();
        this._wordLayer.width = App.Instance.Width * 2;
        this._wordLayer.height = App.Instance.Height;
        this.addLayer(this._wordLayer);
        var img =  new egret.Bitmap();
        img.texture =  RES.getRes("bg_zhanshi_di_jpg");
        img.x = 0;
        img.y = 0;
        this._wordLayer.addChild(img);
        var img2 =  new egret.Bitmap();
        img2.texture =  RES.getRes("club_bg_jpg");
        img2.x = 0 + img.width;
        img2.y = 0;
        this._wordLayer.addChild(img2);

        App.Instance.Stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
		App.Instance.Stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onTouchCancel,this);
		App.Instance.Stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
		App.Instance.Stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        
    }
    private moveWord(x:number=0,y:number = 0){
        if(x != 0){
            var nx = this._wordLayer.x -= x;
            if(nx >0){
                nx = 0;
            }
            if(nx < 0){
                nx = Math.max(nx,-(this._wordLayer.width - App.Instance.Width));
            }
            this._wordLayer.x = nx;
        }
        if(y != 0){
            this._wordLayer.y -= y;
        }
    }
    private onTouchBegin(evt:egret.TouchEvent){
        console.log("begin x:"+evt.stageX + " y:"+evt.stageY);
        this._lastPoint = new egret.Point(evt.stageX,evt.stageY);
    }
    
    private onTouchCancel(evt:egret.TouchEvent){
        console.log("cancel x:"+evt.stageX + " y:"+evt.stageY);
    }
    private onTouchEnd(evt:egret.TouchEvent){
        console.log("end x:"+evt.stageX + " y:"+evt.stageY);
    }
    private onTouchMove(evt:egret.TouchEvent){
        console.log("move x:"+evt.stageX + " y:"+evt.stageY);
        
        if(this._lastPoint){
            var dis = this._lastPoint.x - evt.stageX;
            if(Math.abs(dis) > 1){
                this.moveWord(dis);
                this._lastPoint = new egret.Point(evt.stageX,evt.stageY);
            }
        }
    }
    private onResourceLoadComplete():void{
        this._inited = true;
        App.Instance.ViewMgr.pop(true,false);
        
        this.onEnter();
    }
    private onResourceLoadProgress(itemsLoaded:number, itemsTotal:number):void{
        App.Instance.ControlMgr.getControl<LoadingController>(ModuleConst.LOADING).setProgress(itemsLoaded,itemsTotal);
    }

    public onExit():void{
        super.onExit();
    }
    public onResize():void{
        super.onResize();
    }
    
}