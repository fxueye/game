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
var EffectSound = (function (_super) {
    __extends(EffectSound, _super);
    function EffectSound() {
        return _super.call(this) || this;
    }
    EffectSound.prototype.play = function (name) {
        var sound = this.getSound(name);
        if (sound) {
            this.playSound(sound);
        }
    };
    EffectSound.prototype.playSound = function (sound) {
        var channel = sound.play(0, 1);
        channel.volume = this._volume;
    };
    EffectSound.prototype.setVolume = function (volume) {
        this._volume = volume;
    };
    EffectSound.prototype.loadedPlay = function (key) {
        this.playSound(RES.getRes(key));
    };
    return EffectSound;
}(BaseSound));
__reflect(EffectSound.prototype, "EffectSound");
//# sourceMappingURL=EffectSound.js.map