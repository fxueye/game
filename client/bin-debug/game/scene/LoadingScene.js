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
var LoadingScene = (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        var _this = _super.call(this) || this;
        _this._groupName = "preload";
        _this._subGroups = ["loading", "common", "bg", "people", "particle", "mc"];
        _this._inited = false;
        _this._resources = null;
        _this._bgId = 0;
        return _this;
    }
    LoadingScene.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        if (!this._inited) {
            this.init();
            return;
        }
        this._stageModel = App.Instance.Stage.scaleMode;
    };
    LoadingScene.prototype.init = function () {
        this.addLayer(App.Instance.LayerMgr.GameBg);
        this.addLayer(App.Instance.LayerMgr.GameMain);
        this.addLayer(App.Instance.LayerMgr.UIMain);
        this.addLayer(App.Instance.LayerMgr.UIPopup);
        this.addLayer(App.Instance.LayerMgr.UIMessage);
        this.addLayer(App.Instance.LayerMgr.UITips);
        this._bglayers = new Array();
        this._bglayers.push(new egret.Sprite());
        App.Instance.ViewMgr.push(ModuleConst.LOADING);
        App.Instance.RES.loadGroups(this._groupName, this._subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
    };
    LoadingScene.prototype.setBg = function (id) {
        // if(this._bgId == id)
        //     return;
        this._imgDic = new Dictionary();
        this._bgId = id;
        var bgconf = BgConfig.Dic.get(id);
        this.initBgLayer(bgconf.Imgs.length);
        if (bgconf.BgMusic > 0) {
            GameUtils.play(bgconf.BgMusic);
        }
        for (var i = 0; i < bgconf.Imgs.length; i++) {
            var imgConf = BgImgConfig.Dic.get(bgconf.Imgs[i]);
            var layer = this.getBgLayer(i);
            if (layer) {
                var img = new egret.Bitmap();
                if (imgConf.Location.length >= 2) {
                    img.x = imgConf.Location[0];
                    img.y = imgConf.Location[1];
                }
                img.texture = RES.getRes(imgConf.Name);
                layer.addChild(img);
            }
            else {
                console.error("bg layer error:" + i);
            }
        }
        if (bgconf.Particle.length > 0) {
            for (var i = 0, length = bgconf.Particle.length; i < length; i++) {
                ParticleUtils.addParticle(this.getTopBgLayer(), bgconf.Particle[i]);
            }
        }
        this.showModel();
    };
    LoadingScene.prototype.initBgLayer = function (num) {
        for (var i = this._bglayers.length; i < num; i++) {
            this._bglayers.push(new egret.Sprite());
        }
        for (var _i = 0, _a = this._bglayers; _i < _a.length; _i++) {
            var layer = _a[_i];
            layer.removeChildren();
            var index = App.Instance.LayerMgr.GameBg.getChildIndex(layer);
            if (index != -1) {
                App.Instance.LayerMgr.GameBg.removeChild(layer);
            }
            App.Instance.LayerMgr.GameBg.addChild(layer);
        }
    };
    LoadingScene.prototype.getBgLayer = function (num) {
        if (this._bglayers.length - 1 >= num) {
            return this._bglayers[num];
        }
        return null;
    };
    LoadingScene.prototype.getTopBgLayer = function () {
        var len = this._bglayers.length;
        return this._bglayers[len - 1];
    };
    LoadingScene.prototype.addImg = function (name, x, y, clear) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (clear === void 0) { clear = false; }
        var bgConf = BgConfig.Dic.get(this._bgId);
        var layer = this.getBgLayer(bgConf.Floor);
        var newName = name + x + "_" + y;
        if (clear) {
            for (var _i = 0, _a = this._imgDic.values; _i < _a.length; _i++) {
                var ch = _a[_i];
                layer.removeChild(ch);
            }
            this._imgDic = null;
        }
        if (this._imgDic == null)
            this._imgDic = new Dictionary();
        if (this._imgDic.keys.indexOf(newName) == -1) {
            var img = new egret.Bitmap();
            img.texture = RES.getRes(name);
            img.x = x;
            img.y = y;
            layer.addChild(img);
            this._imgDic.add(newName, img);
        }
    };
    LoadingScene.prototype.onResourceLoadComplete = function () {
        this._inited = true;
        // App.Instance.ViewMgr.pop(true,false);
        this.onEnter();
    };
    LoadingScene.prototype.onResourceLoadProgress = function (itemsLoaded, itemsTotal) {
        App.Instance.ControlMgr.getControl(ModuleConst.LOADING).setProgress(itemsLoaded, itemsTotal);
    };
    LoadingScene.prototype.onExit = function () {
        this._bgId = 0;
        _super.prototype.onExit.call(this);
    };
    LoadingScene.prototype.onResize = function () {
        this.showModel();
        _super.prototype.onResize.call(this);
    };
    LoadingScene.prototype.showModel = function () {
        if (this._bgId != 0) {
            var bgconf = BgConfig.Dic.get(this._bgId);
            if (bgconf.Type == 0) {
                // App.Instance.Stage.scaleMode = this._stageModel;
                // this._bg.fillMode = egret.BitmapFillMode.SCALE;
                // this._bg.width = App.Instance.Width;
                // this._bg.height = App.Instance.Height;
            }
            else if (bgconf.Type == 1) {
                // App.Instance.Stage.scaleMode = egret.StageScaleMode.FIXED_WIDE;
                // App.Instance.Stage.scaleMode = this._stageModel;
                // this._bg.fillMode = egret.BitmapFillMode.SCALE;
                // this._bg.width = App.Instance.Width;
                // this._bg.height = App.Instance.Height;
                // this._bg.width = this._bg.texture.textureWidth;
                // this._bg.height = this._bg.texture.textureHeight;
            }
        }
    };
    return LoadingScene;
}(BaseScene));
__reflect(LoadingScene.prototype, "LoadingScene");
//# sourceMappingURL=LoadingScene.js.map