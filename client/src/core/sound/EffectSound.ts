class EffectSound extends BaseSound{
    private _volume:number;
    public constructor(){
        super();
    }
    public play(name:string):void{
        let sound:egret.Sound = this.getSound(name);
        if(sound){
            this.playSound(sound);
        }
    }
    private playSound(sound:egret.Sound):void{
        let channel:egret.SoundChannel = sound.play(0,1);
        channel.volume = this._volume;
    }
    public setVolume(volume:number):void{
        this._volume = volume;
    }
    protected loadedPlay(key:string):void{
        this.playSound(RES.getRes(key));
    }
}