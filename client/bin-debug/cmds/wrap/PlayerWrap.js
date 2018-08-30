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
var PlayerWrap = (function (_super) {
    __extends(PlayerWrap, _super);
    function PlayerWrap() {
        return _super.call(this) || this;
    }
    PlayerWrap.prototype.Decode = function (pck) {
        this.UID = pck.GetLong();
        this.GUID = pck.GetString();
        this.PID = pck.GetString();
        this.UserName = pck.GetString();
        this.LoginTime = pck.GetLong();
        this.OnlineTime = pck.GetLong();
        this.CreateTime = pck.GetLong();
        this.ServerTime = pck.GetLong();
        this.OnBattleIdx = pck.GetInt();
        this.Items = new Array();
        for (var i = 0, len = this.Items.length; i < len; i++) {
            this.Items[i] = new ItemDataWrap();
            this.Items[i].Decode(pck);
        }
        this.Icon = pck.GetInt();
        this.TutorialMask = pck.GetLong();
        return this;
    };
    PlayerWrap.prototype.Encode = function (pck) {
        pck.PutLong(this.UID);
        pck.PutString(this.GUID);
        pck.PutString(this.PID);
        pck.PutString(this.UserName);
        pck.PutLong(this.LoginTime);
        pck.PutLong(this.OnlineTime);
        pck.PutLong(this.CreateTime);
        pck.PutLong(this.ServerTime);
        pck.PutInt(this.OnBattleIdx);
        if (this.Items == null)
            pck.PutShort(0);
        else {
            pck.PutShort(this.Items.length);
            for (var i = 0, len = this.Items.length; i < len; i++) {
                this.Items[i].Encode(pck);
            }
        }
        pck.PutInt(this.Icon);
        pck.PutLong(this.TutorialMask);
    };
    return PlayerWrap;
}(Net.Simple.IWrapper));
__reflect(PlayerWrap.prototype, "PlayerWrap");
//# sourceMappingURL=PlayerWrap.js.map