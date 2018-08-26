var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseScene = (function () {
    function BaseScene() {
        this._layers = new Array();
    }
    BaseScene.prototype.onEnter = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseScene.prototype.onExit = function () {
        this.removeAllLayer();
    };
    BaseScene.prototype.addLayer = function (layer) {
        if (layer instanceof BaseSprite) {
            App.Instance.GameStage.addChild(layer);
            this._layers.push(layer);
        }
        else if (layer instanceof BaseLayer) {
            App.Instance.UIStage.addChild(layer);
            this._layers.push(layer);
        }
    };
    BaseScene.prototype.addLayerAt = function (layer, index) {
        if (layer instanceof BaseSprite) {
            App.Instance.Stage.addChildAt(layer, index);
            this._layers.push(layer);
        }
        else if (layer instanceof BaseLayer) {
            App.Instance.UIStage.addChildAt(layer, index);
            this._layers.push(layer);
        }
    };
    BaseScene.prototype.removeLayer = function (layer) {
        if (layer instanceof BaseSprite) {
            App.Instance.Stage.removeChild(layer);
            this._layers.splice(this._layers.indexOf(layer), 1);
        }
        else if (layer instanceof BaseLayer) {
            App.Instance.UIStage.removeChild(layer);
            this._layers.splice(this._layers.indexOf(layer), 1);
        }
    };
    BaseScene.prototype.layerRemoveAllChild = function (layer) {
        if (layer instanceof BaseSprite) {
            layer.removeChildren();
        }
        else if (layer instanceof BaseLayer) {
            layer.removeChildren();
        }
    };
    BaseScene.prototype.removeAllLayer = function () {
        while (this._layers.length) {
            var layer = this._layers[0];
            this.layerRemoveAllChild(layer);
            this.removeLayer(layer);
        }
    };
    BaseScene.prototype.onResize = function () {
    };
    return BaseScene;
}());
__reflect(BaseScene.prototype, "BaseScene");
//# sourceMappingURL=BaseScene.js.map