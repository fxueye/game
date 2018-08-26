class BtnMenuItem extends eui.Button{
    public imgBg:eui.Image;
    public imgIcon:eui.Image;
    public constructor(){
        super();
        this.skinName = "skin.BtnMenuItem";
        this.imgIcon.addEventListener(egret.Event.COMPLETE,this.changeImgIcon,this);
    }
    private changeImgIcon():void{
        this.imgIcon.width = this.imgIcon.texture.textureWidth;
        this.imgIcon.height = this.imgIcon.texture.textureHeight;
    }

}