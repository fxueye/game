class BaseSound{
    private _cache:any;
    private _loadingCache:Array<string>;
    public static CLEAR_TIME:number = 3 * 60 * 1000;

    public constructor(){
        this._cache = {}
        this._loadingCache = new Array<string>();
        App.Instance.TimerMgr.startTimer(1 * 60 * 1000,0,this.dealSoundTimer,this);
    }
    private dealSoundTimer():void{
        let currtime:number = egret.getTimer();
        let keys = Object.keys(this._cache);
        for(var i:number;i < keys.length;i++){
            let key = keys[i];
            if(!this.checkCanClear(key)){
                continue;
            }
            if(currtime - this._cache[key] >= BaseSound.CLEAR_TIME){
                delete this._cache[key];
                RES.destroyRes(key);
            }
        }
    }
    public getSound(key:string):egret.Sound{
        let sound:egret.Sound = RES.getRes(key);
        if(sound){
            if(this._cache[key]){
                this._cache[key] = egret.getTimer();
            }
            return sound;
        }else{
            if(this._loadingCache.indexOf(key) != -1){
                return null;
            }
            this._loadingCache.push(key);
            RES.getResAsync(key,this.onSoundLoad,this);
        }
    }
    private onSoundLoad(data:any,key:string):void{
        let index:number = this._loadingCache.indexOf(key);
        if(index != -1){
            this._loadingCache.splice(index,1);
            this._cache[key] = egret.getTimer();
            this.loadedPlay(key);
        }
    }
    protected loadedPlay(key:string):void {

    }

    protected checkCanClear(key:string):boolean{
        return true;
    }
}