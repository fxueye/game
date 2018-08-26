var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ALL"] = 0] = "ALL";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    LogLevel[LogLevel["LOG"] = 5] = "LOG";
    LogLevel[LogLevel["OFF"] = 6] = "OFF";
})(LogLevel || (LogLevel = {}));
var Logger = (function () {
    function Logger() {
    }
    Logger.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (Logger.LEVEL < LogLevel.ERROR && Logger.LEVEL != LogLevel.OFF) {
            if (message) {
                optionalParams.unshift(message);
            }
            console.error.apply(console, optionalParams);
        }
    };
    Logger.log = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (Logger.LEVEL < LogLevel.LOG && Logger.LEVEL != LogLevel.OFF) {
            if (message) {
                optionalParams.unshift(message);
            }
            console.log.apply(console, optionalParams);
        }
    };
    Logger.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (Logger.LEVEL < LogLevel.INFO && Logger.LEVEL != LogLevel.OFF) {
            if (message) {
                optionalParams.unshift(message);
            }
            console.info.apply(console, optionalParams);
        }
    };
    Logger.debug = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (Logger.LEVEL < LogLevel.DEBUG && Logger.LEVEL != LogLevel.OFF) {
            if (message) {
                optionalParams.unshift(message);
            }
            console.debug.apply(console, optionalParams);
        }
    };
    Logger.LEVEL = LogLevel.ALL;
    return Logger;
}());
__reflect(Logger.prototype, "Logger");
//# sourceMappingURL=Logger.js.map