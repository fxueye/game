var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App = (function () {
    function App() {
        if (this._gameStage == null) {
            this._gameStage = new eui.UILayer();
            this._gameStage.percentWidth = 100;
            this._gameStage.percentHeight = 100;
            this._gameStage.touchEnabled = false;
            this.Stage.addChild(this._gameStage);
        }
        if (this._uiStage == null) {
            this._uiStage = new eui.UILayer();
            this._uiStage.percentWidth = 100;
            this._uiStage.percentHeight = 100;
            this._uiStage.touchEnabled = false;
            this.Stage.addChild(this._uiStage);
        }
    }
    Object.defineProperty(App, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new App();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.init = function () {
        //初始化操作
        if (!this._rpc)
            this._rpc = new RPC();
        this.EventMgr.addEventListener(RPC.SOCK_NETWORK_ERROR, this.onNetError, this);
        egret.lifecycle.onPause = this.onPause;
        egret.lifecycle.onResume = this.onResume;
        App.Instance.SrvDate.StartTime();
        if (!DeviceUtils.IsPc()) {
            Logger.LEVEL = LogLevel.OFF;
        }
    };
    App.prototype.onNetError = function () {
        Dialog.makeDialog("提示", "与服务器断开连接!", false, this, function () {
            //TODO 重启重新连接socket 操作
            App.Instance.RPC.Socket.disconnect();
            App.Instance.ViewMgr.closeAll();
            App.Instance.ViewMgr.push(ModuleConst.LOADING, false, true);
        }).open();
    };
    App.prototype.onPause = function () {
        Logger.log("app onPause");
        // egret.ticker.pause(); // 关闭渲染与心跳
        App.Instance.ViewMgr.onPause();
    };
    App.prototype.onResume = function () {
        Logger.log("app onResume");
        // egret.ticker.resume(); // 打开渲染与心跳
        App.Instance.ViewMgr.onResume();
    };
    Object.defineProperty(App.prototype, "Version", {
        get: function () {
            return this._version;
        },
        set: function (val) {
            this._version = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Key", {
        get: function () {
            return this._key;
        },
        set: function (val) {
            this._key = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "SrvDate", {
        get: function () {
            if (!this._srvDate) {
                this._srvDate = new SrvDate();
            }
            return this._srvDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Server", {
        get: function () {
            return this._server;
        },
        set: function (val) {
            this._server = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "RPC", {
        get: function () {
            if (!this._rpc) {
                this._rpc = new RPC();
            }
            return this._rpc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Account", {
        get: function () {
            return this._account;
        },
        set: function (val) {
            this._account = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "EventMgr", {
        get: function () {
            if (!this._eventMgr) {
                this._eventMgr = new EventMgr();
            }
            return this._eventMgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "ViewMgr", {
        get: function () {
            if (!this._viewMgr) {
                this._viewMgr = new ViewMgr();
            }
            return this._viewMgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "LayerMgr", {
        get: function () {
            if (!this._layerMgr) {
                this._layerMgr = new LayerMgr();
            }
            return this._layerMgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "RES", {
        get: function () {
            if (!this._res) {
                this._res = new ResLoader();
            }
            return this._res;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "SceneMgr", {
        get: function () {
            if (!this._sceneMgr) {
                this._sceneMgr = new SceneMgr();
            }
            return this._sceneMgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "TimerMgr", {
        get: function () {
            if (!this._timerMgr) {
                this._timerMgr = new TimerMgr();
            }
            return this._timerMgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "ConfLoader", {
        get: function () {
            if (!this._confLoader) {
                this._confLoader = new ConfLoader();
            }
            return this._confLoader;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "ControlMgr", {
        get: function () {
            if (!this._controlMgr) {
                this._controlMgr = new ControlMgr();
            }
            return this._controlMgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "EasyLoading", {
        get: function () {
            if (!this._easyloading) {
                this._easyloading = new EasyLoading();
            }
            return this._easyloading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "SoundMgr", {
        get: function () {
            if (!this._soundMgr) {
                this._soundMgr = new SoundMgr();
            }
            return this._soundMgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "GameStage", {
        get: function () {
            return this._gameStage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "UIStage", {
        get: function () {
            return this._uiStage;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.setScaleMode = function (value) {
        this.Stage.scaleMode = value;
    };
    App.prototype.setFrameRate = function (value) {
        this.Stage.frameRate = value;
    };
    App.prototype.setMaxTouches = function (value) {
        this.Stage.maxTouches = value;
    };
    App.prototype.setTouchChildren = function (value) {
        this.Stage.touchChildren = value;
    };
    Object.defineProperty(App.prototype, "Height", {
        get: function () {
            return this.Stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Width", {
        get: function () {
            return this.Stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Stage", {
        get: function () {
            return egret.MainContext.instance.stage;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.fullScreenAdaptation = function (designWidth, designHeight, resizeCallback) {
        this._designWidth = designWidth;
        this._designHeight = designHeight;
        this._resizeCallback = resizeCallback;
        this.stageOnResize();
    };
    App.prototype.stageOnResize = function () {
        this.Stage.removeEventListener(egret.Event.RESIZE, this.stageOnResize, this);
        var designWidth = this._designWidth;
        var designHeight = this._designHeight;
        var clientWidth = window.innerWidth;
        var clientHeight = window.innerHeight;
        var a = clientWidth / clientHeight;
        var b = designWidth / designHeight;
        var c = a / b;
        // if(a > b){
        //     designWidth = Math.floor(designWidth * c);
        //     designHeight = Math.floor(designHeight * c);
        // }
        //TODO 全屏适配  最后在考虑 由于小程序不支持showall模式
        this.Stage.setContentSize(designWidth, designHeight);
        if (this._resizeCallback) {
            this._resizeCallback();
        }
        this.Stage.addEventListener(egret.Event.RESIZE, this.stageOnResize, this);
    };
    return App;
}());
__reflect(App.prototype, "App");
//# sourceMappingURL=App.js.map