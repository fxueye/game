class GameScene extends BaseScene{
    private _groupName:string = "preload";
    private _subGroups:Array<string> = ["loading","common","bg","people","particle","mc"];
    private _inited:boolean = false;
    private _bglayers:Array<egret.Sprite>;
    private _resources:string[] = null;
    private _bgId:number = 0;
    private _stageModel:string;
    private _imgDic:Dictionary<egret.Bitmap>;
    
    public constructor(){
        super();
    }

    public onEnter():void{
        super.onEnter();
        if(!this._inited){
            this.init();
            return;
        }
        this._stageModel = App.Instance.Stage.scaleMode;
    }
    private init(){
        this.addLayer(App.Instance.LayerMgr.GameBg);
        this.addLayer(App.Instance.LayerMgr.GameMain);
        this.addLayer(App.Instance.LayerMgr.UIMain);
        this.addLayer(App.Instance.LayerMgr.UIPopup);
        this.addLayer(App.Instance.LayerMgr.UIMessage);
        this.addLayer(App.Instance.LayerMgr.UITips);   
        this._bglayers = new Array<egret.Sprite>();
        this._bglayers.push(new egret.Sprite());
        App.Instance.ViewMgr.push(ModuleConst.LOADING);
        App.Instance.RES.loadGroups(this._groupName,this._subGroups,this.onResourceLoadComplete,this.onResourceLoadProgress,this);
    }
    
    public setBg(id:number){
        // if(this._bgId == id)
        //     return;
        this._imgDic = new Dictionary<egret.Bitmap>();
        this._bgId = id;
        var bgconf = BgConfig.Dic.get(id);
        this.initBgLayer(bgconf.Imgs.length);
        if(bgconf.BgMusic > 0){
            GameUtils.play(bgconf.BgMusic);
        }
        for(var i = 0; i < bgconf.Imgs.length;i++){
            var imgConf = BgImgConfig.Dic.get(bgconf.Imgs[i]);
             var layer = this.getBgLayer(i);
             if(layer){
                 var img = new egret.Bitmap();
                 if(imgConf.Location.length >= 2){
                    img.x = imgConf.Location[0];
                    img.y = imgConf.Location[1];
                 }
                 img.texture = RES.getRes(imgConf.Name);
                 layer.addChild(img);
             }else{
                 console.error("bg layer error:" + i);
             }
        }
        if(bgconf.Particle.length > 0){
            for(var i = 0,length = bgconf.Particle.length; i < length; i++){
                ParticleUtils.addParticle(this.getTopBgLayer(),bgconf.Particle[i]);
            }
        }
        this.showModel();
    }
    public initBgLayer(num:number){
        for(var i = this._bglayers.length ; i < num ; i++){
            this._bglayers.push(new egret.Sprite());
        }
        for(var layer of this._bglayers){
            layer.removeChildren();
            var index =  App.Instance.LayerMgr.GameBg.getChildIndex(layer);
            if(index != -1){
                App.Instance.LayerMgr.GameBg.removeChild(layer);
            }
            App.Instance.LayerMgr.GameBg.addChild(layer);
        }
    }
    public getBgLayer(num:number){
        if(this._bglayers.length - 1 >= num){
            return this._bglayers[num];
        }
        return null;
    }
    public getTopBgLayer(){
        var len = this._bglayers.length;
        return this._bglayers[len - 1];
    }
    public addImg(name:string,x:number = 0,y:number = 0,clear:boolean = false){
        var bgConf = BgConfig.Dic.get(this._bgId);
        var layer = this.getBgLayer(bgConf.Floor);
        var newName = name+x+"_"+y;
        if(clear){
            for(var ch of this._imgDic.values){
                layer.removeChild(ch);
            }
            this._imgDic = null;
        }
        if(this._imgDic == null)
            this._imgDic = new Dictionary<egret.Bitmap>();
        if(this._imgDic.keys.indexOf(newName) == -1 ){
            var img =  new egret.Bitmap();
            img.texture =  RES.getRes(name);
            img.x = x;
            img.y = y;
            layer.addChild(img);
            this._imgDic.add(newName,img);
        }
    }
    private onResourceLoadComplete():void{
        this._inited = true;
        // App.Instance.ViewMgr.pop(true,false);
        this.onEnter();
    }
    private onResourceLoadProgress(itemsLoaded:number, itemsTotal:number):void{
        App.Instance.ControlMgr.getControl<LoadingController>(ModuleConst.LOADING).setProgress(itemsLoaded,itemsTotal);
    }

    public onExit():void{
        this._bgId = 0;
        super.onExit();
    }
    public onResize():void{
        this.showModel();
        super.onResize();
    }
    public showModel(){
        if(this._bgId != 0){
            var bgconf = BgConfig.Dic.get(this._bgId);
             if(bgconf.Type == 0){
                // App.Instance.Stage.scaleMode = this._stageModel;
                // this._bg.fillMode = egret.BitmapFillMode.SCALE;
                
                // this._bg.width = App.Instance.Width;
                // this._bg.height = App.Instance.Height;
             }else if(bgconf.Type == 1){
                // App.Instance.Stage.scaleMode = egret.StageScaleMode.FIXED_WIDE;
                // App.Instance.Stage.scaleMode = this._stageModel;
                // this._bg.fillMode = egret.BitmapFillMode.SCALE;
                // this._bg.width = App.Instance.Width;
                // this._bg.height = App.Instance.Height;
                // this._bg.width = this._bg.texture.textureWidth;
                // this._bg.height = this._bg.texture.textureHeight;
             }
        }
    }
}