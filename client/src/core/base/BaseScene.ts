class BaseScene{
    private _layers:Array<egret.DisplayObjectContainer>;
    public constructor(){
        this._layers = new Array<egret.DisplayObjectContainer>();
    }
    public onEnter(...param:any[]):void{
        
    }
    public onExit():void{
        this.removeAllLayer();
    }

    public addLayer(layer:egret.DisplayObjectContainer):void{
        if(layer instanceof BaseSprite){
            App.Instance.GameStage.addChild(layer);
            this._layers.push(layer);
        }else if(layer instanceof BaseLayer){
            App.Instance.UIStage.addChild(layer);
            this._layers.push(layer);
        }
    }
    public addLayerAt(layer:egret.DisplayObjectContainer,index:number):void{
        if(layer instanceof BaseSprite){
            App.Instance.Stage.addChildAt(layer,index);
            this._layers.push(layer);
        }else if(layer instanceof BaseLayer){
            App.Instance.UIStage.addChildAt(layer,index);
            this._layers.push(layer);
        }
    }
    public removeLayer(layer :  egret.DisplayObjectContainer): void{
        if(layer instanceof BaseSprite){
            App.Instance.Stage.removeChild(layer);
            this._layers.splice(this._layers.indexOf(layer),1);
        }else if(layer instanceof BaseLayer){
            App.Instance.UIStage.removeChild(layer);
            this._layers.splice(this._layers.indexOf(layer),1);
        }
    }
    public layerRemoveAllChild(layer : egret.DisplayObjectContainer) : void{
        if(layer instanceof BaseSprite){
            layer.removeChildren();
        }else if(layer instanceof BaseLayer){
            (<BaseLayer> layer).removeChildren();
        }
    }
    public removeAllLayer():void{
        while(this._layers.length){
            let layer: egret.DisplayObjectContainer = this._layers[0];
            this.layerRemoveAllChild(layer);
            this.removeLayer(layer);
        }
    }
    public onResize():void{
    }

}