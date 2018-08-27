var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ConfigUtils = (function () {
    function ConfigUtils() {
    }
    ConfigUtils.GetPartType = function () {
        var dic = new Dictionary();
        for (var i = 0; i < PartTypeConfig.Arr.length; i++) {
            var typeConf = PartTypeConfig.Arr[i];
            var arr = dic.get(typeConf.Parent);
            if (arr != null) {
                arr.push(typeConf);
            }
            else {
                arr = new Array();
                arr.push(typeConf);
                dic.add(typeConf.Parent, arr);
            }
        }
        return dic;
    };
    ConfigUtils.GetProType = function () {
        var dic = new Dictionary();
        for (var i = 0; i < PropertyTypeConfig.Arr.length; i++) {
            var typeConf = PropertyTypeConfig.Arr[i];
            var arr = dic.get(typeConf.Parent);
            if (arr != null) {
                arr.push(typeConf);
            }
            else {
                arr = new Array();
                arr.push(typeConf);
                dic.add(typeConf.Parent, arr);
            }
        }
        return dic;
    };
    ConfigUtils.GetText = function (id) {
        return TextConfig.Dic.get(id).Text.replace(/\\n/g, "\n");
    };
    ConfigUtils.GetPartByType = function (type, show) {
        var items = new Array();
        var s = show ? 0 : 1;
        for (var _i = 0, _a = PartConfig.Arr; _i < _a.length; _i++) {
            var conf = _a[_i];
            if (conf.Type == type && conf.Show != s) {
                items.push(conf);
            }
        }
        return items;
    };
    ConfigUtils.GetSlotByName = function (name) {
        for (var _i = 0, _a = SlotsConfig.Arr; _i < _a.length; _i++) {
            var conf = _a[_i];
            if (conf.Name == name) {
                return conf;
            }
        }
        return null;
    };
    ConfigUtils.GetPageByPageIdAndType = function (pageId, type) {
        for (var _i = 0, _a = PageConfig.Arr; _i < _a.length; _i++) {
            var conf = _a[_i];
            if (conf.PageId == pageId && conf.Type == type) {
                return conf;
            }
        }
        return null;
    };
    return ConfigUtils;
}());
__reflect(ConfigUtils.prototype, "ConfigUtils");
//# sourceMappingURL=ConfigUtils.js.map