var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var BgSound = (function (_super) {
    __extends(BgSound, _super);
    function BgSound() {
        var _this = _super.call(this) || this;
        _this._currBg = "";
        return _this;
    }
    BgSound.prototype.stop = function () {
        if (this._currSoundChannel) {
            this._currSoundChannel.stop();
        }
        this._currSoundChannel = null;
        this._currSound = null;
        this._currBg = "";
    };
    BgSound.prototype.play = function (name, loop) {
        if (this._currBg == name) {
            return;
        }
        this.stop();
        this._currBg = name;
        this._isLoop = loop;
        var sound = this.getSound(name);
        if (sound) {
            this.playSound(sound);
        }
    };
    BgSound.prototype.playSound = function (sound) {
        this._currSound = sound;
        var times = this._isLoop ? 0 : 1;
        this._currSoundChannel = this._currSound.play(0, times);
        this._currSoundChannel.volume = this._volume;
    };
    BgSound.prototype.loadedPlay = function (key) {
        if (this._currBg == key) {
            this.playSound(RES.getRes(key));
        }
    };
    BgSound.prototype.setVolume = function (volume) {
        this._volume = volume;
        if (this._currSoundChannel) {
            this._currSoundChannel.volume = this._volume;
        }
    };
    return BgSound;
}(BaseSound));
__reflect(BgSound.prototype, "BgSound");
//# sourceMappingURL=BgSound.js.map