var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundMgr = (function () {
    function SoundMgr() {
        this._bgOn = true;
        this._effectOn = true;
        this._bgVolume = 0.5;
        this._effectVolume = 0.5;
        this._bg = new BgSound();
        this._bg.setVolume(this._bgVolume);
        this._effectSound = new EffectSound();
        this._effectSound.setVolume(this._effectVolume);
    }
    SoundMgr.prototype.playEffect = function (name) {
        if (!this._effectOn) {
            return;
        }
        this._effectSound.play(name);
    };
    SoundMgr.prototype.playBg = function (name, loop) {
        this._currBg = name;
        if (!this._bgOn) {
            return;
        }
        this._bg.play(this._currBg, loop);
    };
    SoundMgr.prototype.stopBg = function () {
        this._bg.stop();
    };
    SoundMgr.prototype.setBgVolume = function (volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this._bgVolume = volume;
        this._bg.setVolume(this._bgVolume);
    };
    SoundMgr.prototype.setEffectVolume = function (volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this._effectVolume = volume;
        this._effectSound.setVolume(this._effectVolume);
    };
    SoundMgr.prototype.setEffectOn = function (isOn) {
        this._effectOn = isOn;
    };
    SoundMgr.prototype.setBgOn = function (isOn) {
        this._bgOn = isOn;
        if (!this._bgOn) {
            this._bg.stop();
        }
        else {
            if (this._currBg) {
                this.playBg(this._currBg, true);
            }
        }
    };
    return SoundMgr;
}());
__reflect(SoundMgr.prototype, "SoundMgr");
//# sourceMappingURL=SoundMgr.js.map