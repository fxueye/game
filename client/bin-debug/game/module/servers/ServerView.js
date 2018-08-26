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
var ServerView = (function (_super) {
    __extends(ServerView, _super);
    function ServerView(controller, parent) {
        var _this = _super.call(this, controller, parent) || this;
        _this.skinName = "skin.ServerSkin";
        var resource = ['preload'];
        _this.setResources(resource);
        return _this;
    }
    ServerView.prototype.initCompoments = function () {
        _super.prototype.initCompoments.call(this);
        this.imgMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMask, this);
        this._serverData = new eui.ArrayCollection();
        this.listServer.dataProvider = this._serverData;
        this.listServer.useVirtualLayout = true;
        this.listServer.itemRenderer = ServerItem;
        this.btnSelectServer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectServer, this);
        var openId = egret.localStorage.getItem("jrdh_openid");
        if (!openId) {
            openId = Math.floor(Math.random() * 1000000000) + "";
            egret.localStorage.setItem("jrdh_openid", openId);
        }
        this.elabOpenId.text = openId;
        // Commder.Instance.login(loginInfo.openId,loginInfo.token,loginInfo.platform);
    };
    ServerView.prototype.onSelectServer = function () {
        GameUtils.play(GameSound.BUTTON_1);
        var index = this.listServer.selectedIndex;
        if (index < 0) {
            Toast.makeToast("请选择服务器!").show();
            return;
        }
        App.Instance.Server = this._serverData.source[index].Id;
        var config = AppConfig.Dic.get(App.Instance.Server);
        App.Instance.RPC.Connect(config.SocketIp, config.SocketPort);
        egret.localStorage.setItem("jrdh_openid", this.elabOpenId.text);
        var a = ["你好！", "abcd", "##"];
        for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
            var k = a_1[_i];
            var bs = BitConverter.GetBytes(k);
            var st = BitConverter.ToString(bs, 0, bs.byteLength);
            console.log("st:" + st);
        }
        console.log("####" + (typeof a));
        // Commder.Instance.login(this.elabOpenId.text,"","");
    };
    ServerView.prototype.initData = function () {
        this.refresh();
    };
    ServerView.prototype.refresh = function () {
        this._serverData.source = AppConfig.Arr;
        this._serverData.refresh();
    };
    ServerView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        GameUtils.PageConfigBeforOpen(ModuleConst.SERVERLIST, 1);
        EffectUtils.OpenEffect(this.gpCenter, EffectType.Slight);
        _super.prototype.open.apply(this, param);
    };
    ServerView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.close.apply(this, param);
    };
    ServerView.prototype.onClickMask = function (evt) {
        // App.Instance.ViewMgr.pop(true,false);
    };
    return ServerView;
}(BaseUIView));
__reflect(ServerView.prototype, "ServerView");
//# sourceMappingURL=ServerView.js.map