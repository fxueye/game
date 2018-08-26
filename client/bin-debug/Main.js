//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        App.Instance.fullScreenAdaptation(1280, 720, this.onResized);
        this.runGame().catch(function (e) {
            Logger.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //开启文理跨域
                        egret.ImageLoader.crossOrigin = "anonymous";
                        App.Instance.Version = Game.VERSION;
                        App.Instance.Key = Game.KEY;
                        return [4 /*yield*/, this.loadResource()
                            // App.Instance.init();
                        ];
                    case 1:
                        _a.sent();
                        // App.Instance.init();
                        this.initScene();
                        this.initModule();
                        // const userInfo = await platform.getUserInfo();
                        App.Instance.init();
                        App.Instance.SceneMgr.runScene(SceneConst.GAME);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resPath, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        resPath = "";
                        if (DeviceUtils.IsHtml5() && !DeviceUtils.IsPc()) {
                            resPath = Game.CDN_RES_PATH;
                            App.Instance.RES.addConfig("resource/default.res.json" + "?v=" + App.Instance.Version, "resource/");
                            App.Instance.RES.addConfig(resPath + "resource/resource.ui.res.json" + "?v=" + App.Instance.Version, resPath + "resource/");
                            App.Instance.RES.addConfig(resPath + "resource/resource.sound.res.json" + "?v=" + App.Instance.Version, resPath + "resource/");
                            App.Instance.RES.addConfig(resPath + "resource/resource.conf.res.json" + "?v=" + App.Instance.Version, resPath + "resource/");
                            App.Instance.RES.addConfig(resPath + "resource/resource.dragon.res.json" + "?v=" + App.Instance.Version, resPath + "resource/");
                            App.Instance.RES.addConfig(resPath + "resource/resource.mc.res.json" + "?v=" + App.Instance.Version, resPath + "resource/");
                            App.Instance.RES.addConfig(resPath + "resource/resource.particle.res.json" + "?v=" + App.Instance.Version, resPath + "resource/");
                        }
                        else if (DeviceUtils.IsWeixin()) {
                            resPath = Game.CDN_RES_PATH;
                            App.Instance.RES.addConfig(StringUtils.format("resource/default.res.{0}.json", App.Instance.Version), "resource/");
                            App.Instance.RES.addConfig(resPath + StringUtils.format("resource/resource.ui.res.{0}.json", App.Instance.Version), resPath + "resource/");
                            App.Instance.RES.addConfig(resPath + StringUtils.format("resource/resource.sound.res.{0}.json", App.Instance.Version), resPath + "resource/");
                            App.Instance.RES.addConfig(resPath + StringUtils.format("resource/resource.conf.res.{0}.json", App.Instance.Version), resPath + "resource/");
                            App.Instance.RES.addConfig(resPath + StringUtils.format("resource/resource.dragon.res.{0}.json", App.Instance.Version), resPath + "resource/");
                            App.Instance.RES.addConfig(resPath + StringUtils.format("resource/resource.mc.res.{0}.json", App.Instance.Version), resPath + "resource/");
                            App.Instance.RES.addConfig(resPath + StringUtils.format("resource/resource.particle.res.{0}.json", App.Instance.Version), resPath + "resource/");
                        }
                        else {
                            App.Instance.RES.addConfig("resource/default.res.json", "resource/");
                            App.Instance.RES.addConfig(resPath + "resource/resource.ui.res.json", resPath + "resource/");
                            App.Instance.RES.addConfig(resPath + "resource/resource.sound.res.json", resPath + "resource/");
                            App.Instance.RES.addConfig(resPath + "resource/resource.conf.res.json", resPath + "resource/");
                            App.Instance.RES.addConfig(resPath + "resource/resource.dragon.res.json", resPath + "resource/");
                            App.Instance.RES.addConfig(resPath + "resource/resource.mc.res.json", resPath + "resource/");
                            App.Instance.RES.addConfig(resPath + "resource/resource.particle.res.json", resPath + "resource/");
                        }
                        return [4 /*yield*/, App.Instance.RES.asyncLoadConfig()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, App.Instance.RES.asyncLoadGroup("loading")];
                    case 3:
                        _a.sent();
                        App.Instance.EasyLoading.showLoading();
                        return [4 /*yield*/, App.Instance.RES.asyncLoadGroup("preload_config")];
                    case 4:
                        _a.sent();
                        App.Instance.ConfLoader.load();
                        App.Instance.EasyLoading.hideLoading();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    Main.prototype.initScene = function () {
        // App.Instance.SceneMgr.register(SceneConst.LOADING,new LoadingScene());
        App.Instance.SceneMgr.register(SceneConst.GAME, new GameScene());
    };
    Main.prototype.initModule = function () {
        App.Instance.ControlMgr.register(ModuleConst.LOADING, new LoadingController());
        App.Instance.ControlMgr.register(ModuleConst.SETTING, new SettingControler());
        App.Instance.ControlMgr.register(ModuleConst.RANDNAME, new RandNameController());
        App.Instance.ControlMgr.register(ModuleConst.SERVERLIST, new ServerController());
    };
    Main.prototype.onResized = function () {
        App.Instance.SceneMgr.onResize();
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map