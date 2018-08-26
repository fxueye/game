var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ArrayUtils = (function () {
    function ArrayUtils() {
    }
    ArrayUtils.isInArray = function (arr, value) {
        if (arr.indexOf && typeof (arr.indexOf) == 'function') {
            var index = arr.indexOf(value);
            if (index >= 0) {
                return true;
            }
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                if (value === arr[i]) {
                    return true;
                }
            }
            return false;
        }
    };
    //重复
    ArrayUtils.isRepeat = function (arr) {
        var hash = {};
        for (var i in arr) {
            if (hash[i]) {
                return true;
            }
            hash[i] = true;
        }
        return false;
    };
    ArrayUtils.intersect = function (uniquelize) {
        var arr = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arr[_i - 1] = arguments[_i];
        }
        var result = [];
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            if (uniquelize)
                arr[i] = ArrayUtils.uniquelize(arr[i]);
            for (var j = 0; j < arr[i].length; j++) {
                var str = arr[i][j];
                if (!obj[str]) {
                    obj[str] = 1;
                }
                else {
                    obj[str]++;
                    if (obj[str] == arr.length) {
                        result.push(str);
                    }
                }
            }
        }
        return result;
    };
    ArrayUtils.uniquelize = function (arr) {
        var tmp = {};
        var ret = [];
        for (var i = 0; i < arr.length; i++) {
            if (!tmp[arr[i]]) {
                tmp[arr[i]] = 1;
                ret.push(arr[i]);
            }
        }
        return ret;
    };
    return ArrayUtils;
}());
__reflect(ArrayUtils.prototype, "ArrayUtils");
//# sourceMappingURL=ArrayUtils.js.map