var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DateUtil = (function () {
    function DateUtil() {
    }
    DateUtil.Format = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };
    DateUtil.LongTimeFormat = function (date) {
        return DateUtil.Format(date, "yyyy-MM-dd HH:mm:ss");
    };
    DateUtil.ShortTimeFormat = function (date) {
        return DateUtil.Format(date, "HH:mm");
    };
    DateUtil.DateFormat = function (date) {
        return DateUtil.Format(date, "yyyy/MM/dd");
    };
    DateUtil.Date2Timestamp = function (date) {
        return date.getTime() / 1000;
    };
    DateUtil.Timestamp2Date = function (time) {
        return new Date(time * 1000);
    };
    DateUtil.IsToady = function (date) {
        // var now = new Date();
        // 获取服务器时间
        var now = App.Instance.SrvDate.ServetDate;
        var a = DateUtil.Format(now, "yyyy-MM-dd");
        var b = DateUtil.Format(date, "yyyy-MM-dd");
        return a == b;
    };
    DateUtil.Timestamp = function (date) {
        if (!date) {
            // date = new Date();
            // 获取服务器时间
            date = App.Instance.SrvDate.ServetDate;
        }
        return date.getTime() / 1000;
    };
    return DateUtil;
}());
__reflect(DateUtil.prototype, "DateUtil");
//# sourceMappingURL=DateUtils.js.map