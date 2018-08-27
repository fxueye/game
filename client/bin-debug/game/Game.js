var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Game = (function () {
    function Game() {
    }
    Game.VERSION = "1.0.7";
    Game.KEY = "roddstaufihgemei";
    Game.CDN_RES_PATH = "http://192.168.1.143/";
    Game.WEI_API = "https://vswgvupn.qcloud.la";
    Game.LOADING_TIP = "资源加载中...{0}/{1}";
    Game.TIP_TITLE = "提示";
    Game.LOGIN_FAILED = "登录失败请检查网络!";
    return Game;
}());
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map