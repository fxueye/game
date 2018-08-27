var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConst;
(function (GameConst) {
    GameConst[GameConst["DefaultSuit"] = 1] = "DefaultSuit";
    GameConst[GameConst["EmptySuit"] = 2] = "EmptySuit"; //清空服装
})(GameConst || (GameConst = {}));
var GameDataEvent = (function () {
    function GameDataEvent() {
    }
    GameDataEvent.DATA_REFRESH = "GameDataRefresh";
    return GameDataEvent;
}());
__reflect(GameDataEvent.prototype, "GameDataEvent");
var GameSound = (function () {
    function GameSound() {
    }
    GameSound.BUTTON_1 = 101;
    GameSound.NEW_PRICE = 201;
    GameSound.BET_PRICE = 202;
    GameSound.AREA_PRICE = 203;
    GameSound.UP_AND_DOWN = 204;
    return GameSound;
}());
__reflect(GameSound.prototype, "GameSound");
var ExchangeConst = (function () {
    function ExchangeConst() {
    }
    ExchangeConst.M2D = 1;
    ExchangeConst.D2M = 2;
    return ExchangeConst;
}());
__reflect(ExchangeConst.prototype, "ExchangeConst");
var MailConst = (function () {
    function MailConst() {
    }
    MailConst.GAME_MAIL_STATUS_UNREADED_UNRECEIVED = 0;
    MailConst.GAME_MAIL_STATUS_READED_UNRECEIVED = 1;
    MailConst.GAME_MAIL_STATUS_READED_RECEIVED = 2;
    MailConst.GAME_MAIL_STATUS_DELETE = 3;
    return MailConst;
}());
__reflect(MailConst.prototype, "MailConst");
var RoomType;
(function (RoomType) {
    RoomType[RoomType["NORMAL"] = 1] = "NORMAL";
    RoomType[RoomType["COST"] = 2] = "COST"; //自定义场
})(RoomType || (RoomType = {}));
var BetType;
(function (BetType) {
    BetType[BetType["INTERVAL_1"] = 1] = "INTERVAL_1";
    BetType[BetType["INTERVAL_2"] = 2] = "INTERVAL_2";
    BetType[BetType["INTERVAL_3"] = 3] = "INTERVAL_3";
    BetType[BetType["INTERVAL_4"] = 4] = "INTERVAL_4";
    BetType[BetType["UP"] = 5] = "UP";
    BetType[BetType["DOWN"] = 6] = "DOWN"; //跌	   小于开始价
})(BetType || (BetType = {}));
var WeixinCosnt = (function () {
    function WeixinCosnt() {
    }
    WeixinCosnt.WX_HEADER_CODE = 'X-WX-Code';
    WeixinCosnt.WX_HEADER_ENCRYPTED_DATA = 'X-WX-Encrypted-Data';
    WeixinCosnt.WX_HEADER_IV = 'X-WX-IV';
    WeixinCosnt.WX_HEADER_ID = 'X-WX-Id';
    WeixinCosnt.WX_HEADER_SKEY = 'X-WX-Skey';
    return WeixinCosnt;
}());
__reflect(WeixinCosnt.prototype, "WeixinCosnt");
//# sourceMappingURL=GameConst.js.map