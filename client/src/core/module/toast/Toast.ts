class Toast{
    public static readonly SHORT = 500;
    public static readonly LONG = 1500;
    private _msg:string;
    private _content:egret.Sprite = null;
    private _toastContainer:egret.DisplayObjectContainer;
    private _textfield:egret.TextField;
    private _img:eui.Image;
    private _timer:egret.Timer;
    private _delay:number = 1000;
    public constructor(){
        this.init();
    }
    
    private init():void{
        this._toastContainer = new egret.DisplayObjectContainer();
        this._img = new eui.Image();
        let texture:egret.Texture = RES.getRes("common_bg_hd2_png");
        // RES.getResByUrl("resource/assets/common/common_bg_hd2.png",function(texture:egret.Texture):void{
        this._img.texture = texture;
        this._img.scale9Grid = new egret.Rectangle(8,7,14,13);
        // this._toastContainer.addChild(this._img);
        // },this,RES.ResourceItem.TYPE_IMAGE);
        
        this._textfield = new egret.TextField();
        this._textfield.multiline = true;
        this._textfield.size = 20;
        this._textfield.textColor = 0xFFFFFF;
        this._textfield.textAlign = egret.HorizontalAlign.CENTER;
        this._textfield.fontFamily = "SimHei";
        this._timer = new egret.Timer(Toast.SHORT);
        this._timer.addEventListener(egret.TimerEvent.TIMER,this.onDelay,this);
        
    }
    public static makeToast(msg:string,delay:number = 500):Toast{
        var toast = new Toast();
        toast.msg = msg;
        toast.timer.delay = delay;
        return toast;
    }
    public get timer():egret.Timer{
        return this._timer;
    }
    private onDelay(evt:egret.TimerEvent){
        this._timer.stop();
        this.hide();
    }
    public set msg(value:string){
        this._msg = value;
        this._textfield.text = this._msg;
        this._toastContainer.width = this._textfield.width + 40;
        this._toastContainer.height = this._textfield.height + 20;
        this._toastContainer.x = App.Instance.Width / 2 - this._toastContainer.width / 2;
        this._toastContainer.y = App.Instance.Height / 2 - this._toastContainer.height / 2;
        this._img.width = this._toastContainer.width;
        this._img.height = this._toastContainer.height;
        this._textfield.x = this._toastContainer.width / 2 - this._textfield.width / 2;
        this._textfield.y = this._toastContainer.height / 2 - this._textfield.height / 2;
        this._toastContainer.addChild(this._img);
        this._toastContainer.addChild(this._textfield);
    }
    public show(){
        App.Instance.LayerMgr.UITips.addChild(this._toastContainer);
        this._toastContainer.alpha = 0;
        egret.Tween.get(this._toastContainer).to({alpha:1},300,egret.Ease.backOut);
        this._timer.start();
    }
    public hide(){
        egret.Tween.get(this._toastContainer).to({alpha:0},300,egret.Ease.cubicIn);
        App.Instance.LayerMgr.UITips.removeChild(this._toastContainer);
    }

}