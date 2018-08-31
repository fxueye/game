enum GameConst {
	DefaultSuit = 1, 
	EmptySuit = 2 //清空服装
}
class GameDataEvent{
	public static readonly DATA_REFRESH = "GameDataRefresh";
}
class GameSound{
	public static readonly BUTTON_1 = 101;
	public static readonly NEW_PRICE = 201;
	public static readonly BET_PRICE = 202;
	public static readonly AREA_PRICE = 203;
	public static readonly UP_AND_DOWN = 204;
}
class ExchangeConst{
	public static readonly M2D = 1;
	public static readonly D2M = 2;
}
class MailConst{
	public static readonly GAME_MAIL_STATUS_UNREADED_UNRECEIVED = 0;
	public static readonly GAME_MAIL_STATUS_READED_UNRECEIVED = 1;
	public static readonly GAME_MAIL_STATUS_READED_RECEIVED = 2;
	public static readonly GAME_MAIL_STATUS_DELETE = 3;
}
enum RoomType{
	NORMAL = 1, //标准场
	COST = 2 //自定义场
}
enum BetType{
	INTERVAL_1 = 1, //区间1 大于高价
	INTERVAL_2 = 2, //区间2 小于高价大于开始价格
	INTERVAL_3 = 3, //区间3 小于开始价格大于低价
	INTERVAL_4 = 4, //区间4 小于低价
	UP = 5, 		//涨    大于开始价
	DOWN = 6		//跌	   小于开始价
}
class WeixinCosnt{
	public static readonly WX_HEADER_CODE= 'X-WX-Code';
    public static readonly WX_HEADER_ENCRYPTED_DATA= 'X-WX-Encrypted-Data';
    public static readonly WX_HEADER_IV= 'X-WX-IV';
    public static readonly WX_HEADER_ID= 'X-WX-Id';
    public static readonly WX_HEADER_SKEY= 'X-WX-Skey';
}