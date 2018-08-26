var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneMgr = (function () {
    function SceneMgr() {
        this._scenes = {};
    }
    SceneMgr.prototype.register = function (key, scene) {
        this._scenes[key] = scene;
    };
    SceneMgr.prototype.runScene = function (key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var nowScene = this._scenes[key];
        if (nowScene == null) {
            Logger.log(key + "scene not find!");
            return;
        }
        var oldScene = this._scenes[this._currScene];
        if (oldScene) {
            oldScene.onExit();
        }
        nowScene.onEnter.apply(nowScene, param);
        this._currScene = key;
    };
    SceneMgr.prototype.getCurrSceneKey = function () {
        return this._currScene;
    };
    SceneMgr.prototype.getCurrScene = function () {
        var scene = this._scenes[this._currScene];
        return scene;
    };
    SceneMgr.prototype.clear = function () {
        var nowScene = this._scenes[this._currScene];
        if (nowScene) {
            nowScene.onExit();
            this._currScene = null;
        }
        // this._scenes = {};
    };
    SceneMgr.prototype.onResize = function () {
        if (this.getCurrScene() != null) {
            this.getCurrScene().onResize();
        }
    };
    return SceneMgr;
}());
__reflect(SceneMgr.prototype, "SceneMgr");
//# sourceMappingURL=SceneMgr.js.map