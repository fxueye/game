class SoundMgr{
    private _effectSound:EffectSound;
    private _bg:BgSound;
    private _effectOn:boolean;
    private _bgOn:boolean;
    private _currBg:string;
    private _bgVolume:number;
    private _effectVolume:number;
    public constructor(){
        this._bgOn = true;
        this._effectOn = true;
        this._bgVolume = 0.5;
        this._effectVolume = 0.5;
        this._bg = new BgSound();
        this._bg.setVolume(this._bgVolume);
        this._effectSound = new EffectSound();
        this._effectSound.setVolume(this._effectVolume);
    }
    public playEffect(name:string):void{
        if(!this._effectOn){
            return;
        }
        this._effectSound.play(name);
    }
    public playBg(name:string , loop?:boolean){
        this._currBg = name;
        if(!this._bgOn){
            return;
        }
        this._bg.play(this._currBg,loop)
    }
    public stopBg():void{
        this._bg.stop();
    }
    public setBgVolume(volume:number):void{
        volume = Math.min(volume,1);
        volume = Math.max(volume,0);
        this._bgVolume = volume;
        this._bg.setVolume(this._bgVolume);
    }

    public setEffectVolume(volume:number):void{
        volume = Math.min(volume,1);
        volume = Math.max(volume,0);
        this._effectVolume = volume;
        this._effectSound.setVolume(this._effectVolume);
    }

    public setEffectOn(isOn:boolean):void{
        this._effectOn = isOn;
    }
    public setBgOn(isOn:boolean):void{
        this._bgOn = isOn;
        if(!this._bgOn){
            this._bg.stop();
        }else{
            if(this._currBg){
                this.playBg(this._currBg,true);
            }
        }
    }

}