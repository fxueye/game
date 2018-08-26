class BgSound extends BaseSound{
    private _currBg:string;
    private _currSound:egret.Sound;
    private _currSoundChannel:egret.SoundChannel;
    private _volume:number;
    private _isLoop:boolean;

    public constructor(){
        super();
        this._currBg = "";
    }
    public stop():void{
        if(this._currSoundChannel){
            this._currSoundChannel.stop();
        }
        this._currSoundChannel = null;
        this._currSound = null;
        this._currBg = "";
    }
    public play(name:string,loop?:boolean):void{
        if(this._currBg == name){
            return;
        }
        this.stop();
        this._currBg = name;
        this._isLoop = loop;
        let sound:egret.Sound = this.getSound(name);
        if(sound){
            this.playSound(sound);
        }

    }
    private playSound(sound:egret.Sound):void{
        this._currSound = sound;
        let times = this._isLoop ? 0:1;
        this._currSoundChannel = this._currSound.play(0,times);
        this._currSoundChannel.volume = this._volume;
    }
    protected loadedPlay(key:string):void{
        if(this._currBg == key){
            this.playSound(RES.getRes(key));
        }
    }
    public setVolume(volume:number):void{
        this._volume = volume;
        if(this._currSoundChannel){
            this._currSoundChannel.volume = this._volume;
        }
    }
}