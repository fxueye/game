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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var LoadingView = (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView(controller, parent) {
        var _this = _super.call(this, controller, parent) || this;
        _this.skinName = "skin.LoadingSkin";
        var resource = ["loading"];
        _this.setResources(resource);
        return _this;
    }
    LoadingView.prototype.initCompoments = function () {
        _super.prototype.initCompoments.call(this);
        this.progressBar.maximum = 100;
        this.progressBar.minimum = 0;
        this.btnStartGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this._http = new Http();
    };
    LoadingView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (param.length > 0) {
            var relogin = param[0];
            if (relogin) {
                if (DeviceUtils.IsWeixin()) {
                    this.loginWeixin(true).catch(function (e) {
                        Logger.log(e);
                    });
                    this.btnStartGame.visible = false;
                }
                else {
                    this.btnStartGame.visible = true;
                }
            }
        }
        GameUtils.PageConfigBeforOpen(ModuleConst.LOADING, 1);
        App.Instance.EventMgr.addEventListener(RPC.SOCK_NETWORK_ERROR, this.onNetError, this);
        _super.prototype.open.apply(this, param);
    };
    LoadingView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        App.Instance.EventMgr.removeEventListener(RPC.SOCK_NETWORK_ERROR, this.onNetError, this);
        _super.prototype.close.apply(this, param);
    };
    LoadingView.prototype.setProgress = function (current, total) {
        this.txtLoading.text = StringUtils.format(Game.LOADING_TIP, current, total);
        this.progressBar.value = (current / total) * 100;
        if (current / total == 1) {
            this.gpProgresss.visible = false;
            if (DeviceUtils.IsWeixin()) {
                this.loginWeixin(false).catch(function (e) {
                    Logger.log(e);
                });
                this.btnStartGame.visible = false;
            }
            else {
                this.btnStartGame.visible = true;
            }
        }
        else {
            this.gpProgresss.visible = true;
            this.btnStartGame.visible = false;
        }
    };
    LoadingView.prototype.onNetError = function () {
        if (this.isShow()) {
            if (DeviceUtils.IsWeixin()) {
                this.loginWeixin(true).catch(function (e) {
                    Logger.log(e);
                });
                this.btnStartGame.visible = false;
            }
            else {
                this.btnStartGame.visible = true;
            }
        }
    };
    LoadingView.prototype.onClick = function (evt) {
        var target = evt.target;
        if (target.hashCode == this.btnStartGame.hashCode) {
            App.Instance.ViewMgr.push(ModuleConst.SERVERLIST, true);
        }
    };
    LoadingView.prototype.loginWeixin = function (btn) {
        return __awaiter(this, void 0, void 0, function () {
            var loginInfo, userInfo, code, encryptedData, iv, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loginInfo = null;
                        if (!btn) return [3 /*break*/, 2];
                        return [4 /*yield*/, platform.createLoginButton()];
                    case 1:
                        loginInfo = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, platform.login()];
                    case 3:
                        loginInfo = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(loginInfo.result == -2)) return [3 /*break*/, 6];
                        return [4 /*yield*/, platform.createLoginButton()];
                    case 5:
                        loginInfo = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (loginInfo.result == 1) {
                            userInfo = loginInfo.userInfo;
                            code = loginInfo.code;
                            encryptedData = loginInfo.encryptedData;
                            iv = loginInfo.iv;
                            headers = new Dictionary();
                            headers.add(WeixinCosnt.WX_HEADER_CODE, code);
                            headers.add(WeixinCosnt.WX_HEADER_ENCRYPTED_DATA, encryptedData);
                            headers.add(WeixinCosnt.WX_HEADER_IV, iv);
                            this._http.setHeaders(headers);
                            this._http.Get(Game.WEI_API + "/weapp/login", null, function (code, data) {
                                var jsonData = JSON.parse(data);
                                // console.log("jsonData:" + data);
                                if (jsonData.code == 0) {
                                    var openId = jsonData.data.userinfo.openId;
                                    console.log('openId:' + openId);
                                    var config = AppConfig.Dic.get(1);
                                    App.Instance.RPC.Connect(config.SocketIp, config.SocketPort);
                                }
                                else {
                                    Dialog.makeDialog(Game.TIP_TITLE, Game.LOGIN_FAILED, true).open();
                                }
                            }, this);
                        }
                        else {
                            Dialog.makeDialog(Game.TIP_TITLE, Game.LOGIN_FAILED, true);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return LoadingView;
}(BaseUIView));
__reflect(LoadingView.prototype, "LoadingView");
//# sourceMappingURL=LoadingView.js.map