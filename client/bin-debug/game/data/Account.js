var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Account = (function () {
    function Account() {
        this._openSound = true;
        this._bgSoundVolume = 50;
        this._effectSoundVolume = 50;
        this._dubSoundVolume = 50;
        this._roomId = 1;
        this._competitionId = 1;
        this._betId = 1;
        this._roles = new Array();
        this._roleDic = new Dictionary();
    }
    Object.defineProperty(Account.prototype, "UID", {
        get: function () {
            return this._uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "OpendId", {
        get: function () {
            return this._openId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "Token", {
        get: function () {
            return this._token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "Platform", {
        get: function () {
            return this._platform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "CurrRoleId", {
        get: function () {
            return this._currRoleId;
        },
        set: function (value) {
            this._currRoleId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "AvatarUrl", {
        get: function () {
            return this._avatarUrl;
        },
        set: function (val) {
            this._avatarUrl = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "NickName", {
        get: function () {
            return this._nickName;
        },
        set: function (val) {
            this._nickName = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "CurrRole", {
        get: function () {
            var role = null;
            if (this._currRoleId != null) {
                role = this._roleDic.get(this._currRoleId);
            }
            return role;
        },
        enumerable: true,
        configurable: true
    });
    Account.prototype.GetRole = function (roleId) {
        var role = this._roleDic.get(roleId);
        if (role == null) {
            console.error("role" + roleId);
        }
        return role;
    };
    Account.prototype.AddRole = function (role) {
        this._roles.push(role);
        this._roleDic.add(role.ID, role);
        this._currRoleId = role.ID;
    };
    Object.defineProperty(Account.prototype, "OpenSound", {
        get: function () {
            var itemString = this._uid + "_openSound";
            var value = egret.localStorage.getItem(itemString);
            if (value) {
                if (value == "0") {
                    this._openSound = false;
                }
                else {
                    this._openSound = true;
                }
            }
            return this._openSound;
        },
        set: function (value) {
            this._openSound = value;
            var itemString = this._uid + "_openSound";
            var val = value ? 1 : 0;
            egret.localStorage.setItem(itemString, val + "");
            App.Instance.SoundMgr.setBgOn(this._openSound);
            App.Instance.SoundMgr.setEffectOn(this._openSound);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "BgSoundVolume", {
        get: function () {
            var itemString = this._uid + "_bgSoundVolume";
            var value = egret.localStorage.getItem(itemString);
            if (value) {
                this._bgSoundVolume = parseInt(value);
            }
            return this._bgSoundVolume;
        },
        set: function (value) {
            this._bgSoundVolume = value;
            var itemString = this._uid + "_bgSoundVolume";
            egret.localStorage.setItem(itemString, this._bgSoundVolume + "");
            App.Instance.SoundMgr.setBgVolume(this._bgSoundVolume / 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "EffectSoundVolume", {
        get: function () {
            var itemString = this._uid + "_effectSoundVolume";
            var value = egret.localStorage.getItem(itemString);
            if (value) {
                this._effectSoundVolume = parseInt(value);
            }
            return this._effectSoundVolume;
        },
        set: function (value) {
            this._effectSoundVolume = value;
            var itemString = this._uid + "_effectSoundVolume";
            egret.localStorage.setItem(itemString, this._effectSoundVolume + "");
            App.Instance.SoundMgr.setEffectVolume(this._effectSoundVolume / 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "DubSoundVolume", {
        get: function () {
            var itemString = this._uid + "_dubSoundVolume";
            var value = egret.localStorage.getItem(itemString);
            if (value) {
                this._dubSoundVolume = parseInt(value);
            }
            return this._dubSoundVolume;
        },
        set: function (value) {
            this._dubSoundVolume = value;
            var itemString = this._uid + "_dubSoundVolume";
            egret.localStorage.setItem(itemString, this._dubSoundVolume + "");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "RoomId", {
        get: function () {
            var roomIdKey = this._uid + "_roomId";
            var value = egret.localStorage.getItem(roomIdKey);
            if (value) {
                this._roomId = parseInt(value);
            }
            return this._roomId;
        },
        set: function (value) {
            this._roomId = value;
            var roomIdKey = this._uid + "_roomId";
            egret.localStorage.setItem(roomIdKey, this._roomId + "");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "CompetitionId", {
        get: function () {
            var competitionIdKey = this._uid + "_competitionId";
            var value = egret.localStorage.getItem(competitionIdKey);
            if (value) {
                this._competitionId = parseInt(value);
            }
            return this._competitionId;
        },
        set: function (value) {
            this._competitionId = value;
            var competitionIdKey = this._uid + "_competitionId";
            egret.localStorage.setItem(competitionIdKey, this._competitionId + "");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "BetId", {
        get: function () {
            var betIdKey = this._uid + "_betId";
            var value = egret.localStorage.getItem(betIdKey);
            if (value) {
                this._betId = parseInt(value);
            }
            return this._betId;
        },
        set: function (val) {
            this._betId = val;
            var betIdKey = this._uid + "_betId";
            egret.localStorage.setItem(betIdKey, this._betId + "");
        },
        enumerable: true,
        configurable: true
    });
    return Account;
}());
__reflect(Account.prototype, "Account");
//# sourceMappingURL=Account.js.map