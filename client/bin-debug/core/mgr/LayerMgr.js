var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LayerMgr = (function () {
    function LayerMgr() {
        this._gameBg = new BaseSprite();
        this._gameMain = new BaseSprite();
        this._uiMain = new BaseLayer();
        this._uiPopup = new BaseLayer();
        this._uiMessage = new BaseLayer();
        this._uiTips = new BaseLayer();
    }
    Object.defineProperty(LayerMgr.prototype, "GameBg", {
        get: function () {
            return this._gameBg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerMgr.prototype, "GameMain", {
        get: function () {
            return this._gameMain;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerMgr.prototype, "UIMain", {
        get: function () {
            return this._uiMain;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerMgr.prototype, "UIPopup", {
        get: function () {
            return this._uiPopup;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerMgr.prototype, "UIMessage", {
        get: function () {
            return this._uiMessage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerMgr.prototype, "UITips", {
        get: function () {
            return this._uiTips;
        },
        enumerable: true,
        configurable: true
    });
    return LayerMgr;
}());
__reflect(LayerMgr.prototype, "LayerMgr");
//# sourceMappingURL=LayerMgr.js.map