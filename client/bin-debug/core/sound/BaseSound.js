var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseSound = (function () {
    function BaseSound() {
        this._cache = {};
        this._loadingCache = new Array();
        App.Instance.TimerMgr.startTimer(1 * 60 * 1000, 0, this.dealSoundTimer, this);
    }
    BaseSound.prototype.dealSoundTimer = function () {
        var currtime = egret.getTimer();
        var keys = Object.keys(this._cache);
        for (var i; i < keys.length; i++) {
            var key = keys[i];
            if (!this.checkCanClear(key)) {
                continue;
            }
            if (currtime - this._cache[key] >= BaseSound.CLEAR_TIME) {
                delete this._cache[key];
                RES.destroyRes(key);
            }
        }
    };
    BaseSound.prototype.getSound = function (key) {
        var sound = RES.getRes(key);
        if (sound) {
            if (this._cache[key]) {
                this._cache[key] = egret.getTimer();
            }
            return sound;
        }
        else {
            if (this._loadingCache.indexOf(key) != -1) {
                return null;
            }
            this._loadingCache.push(key);
            RES.getResAsync(key, this.onSoundLoad, this);
        }
    };
    BaseSound.prototype.onSoundLoad = function (data, key) {
        var index = this._loadingCache.indexOf(key);
        if (index != -1) {
            this._loadingCache.splice(index, 1);
            this._cache[key] = egret.getTimer();
            this.loadedPlay(key);
        }
    };
    BaseSound.prototype.loadedPlay = function (key) {
    };
    BaseSound.prototype.checkCanClear = function (key) {
        return true;
    };
    BaseSound.CLEAR_TIME = 3 * 60 * 1000;
    return BaseSound;
}());
__reflect(BaseSound.prototype, "BaseSound");
//# sourceMappingURL=BaseSound.js.map