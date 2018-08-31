class Icon extends eui.ItemRenderer{
    public imgIcon:eui.Image;
    public imgBg:eui.Image;
    public labCount:eui.Label;
    public labName:eui.Label;
    private _addEventListener:boolean = false;
    public constructor(){
        super();
        this.skinName = "skin.IconSkin";
    }
    public setData(val:any){
        this.data = val;
        this.dataChanged();
    }
    public refresh(){
        this.dataChanged();
    }
    protected dataChanged(): void{
        if(!this._addEventListener){
            this.imgIcon.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
            this._addEventListener = true;
        }
        if(this.data){
            if(this.data.BgIcon == "")
                this.imgBg.source = "common_icon_tx_png";
            if(this.data.Count > 0 ){
                this.labCount.text = GameUtils.PaseNum(this.data.Count);
                this.labCount.visible = true;
            }
            if(this.data.UrlIcon != null){
                RES.getResByUrl(this.data.UrlIcon ,this.getResComplete,this,"image");
            }
            if(this.data.Scale){
                this.imgIcon.scaleX = this.data.Scale;
                this.imgIcon.scaleY = this.data.Scale;
            }
            if(this.data.Name){
                this.labName.visible = true;
                this.labName.text = this.data.Name;
            }
            if(this.data.Icon){
                this.imgIcon.source = this.data.Icon;
            }
            
        }else{
            this.imgIcon.source = "common_icon_nan_png";
            this.imgBg.source = "common_icon_tx_png";
        }
    }
	protected createChildren():void {
        super.createChildren();
    }
    private getResComplete(data:any):void{  
        this.imgIcon.texture = data;
    }
    private onComplete(evt:egret.Event){
        var img = <eui.Image>evt.target;
        if(img){
            img.width = img.texture.textureWidth;
            img.height = img.texture.textureHeight;
            
            // this.imgIcon.width = img.width;
            // this.imgIcon.height = img.height;
            // if(this.data.Scale){
            //     this.imgIcon.scaleX = this.data.Scale;
            //     this.imgIcon.scaleY = this.data.Scale;
            // }
        }
    }
}