var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PageConfig = (function () {
    function PageConfig() {
        this.Location = new Array();
    }
    Object.defineProperty(PageConfig, "Dic", {
        get: function () {
            return PageConfig._dic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageConfig, "Arr", {
        get: function () {
            return PageConfig._arr;
        },
        enumerable: true,
        configurable: true
    });
    PageConfig.parse = function (json) {
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                var config = json[i];
                PageConfig._arr.push(config);
                PageConfig._dic.add(config.Id, config);
            }
        }
        else {
            console.error("PageConfig loader fail!");
        }
    };
    PageConfig._dic = new Dictionary();
    PageConfig._arr = new Array();
    return PageConfig;
}());
__reflect(PageConfig.prototype, "PageConfig");
//# sourceMappingURL=PageConfig.js.map