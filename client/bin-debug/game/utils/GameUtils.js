var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameUtils = (function () {
    function GameUtils() {
    }
    GameUtils.PageConfigBeforOpen = function (pageId, type) {
        var time = new Date();
        var conf = ConfigUtils.GetPageByPageIdAndType(pageId, type);
        if (conf == null) {
            console.error("PageConfig not find pageId：" + pageId + " type:" + type);
            return;
        }
        if (conf.Bg > 0) {
            var gameScene = App.Instance.SceneMgr.getCurrScene();
            gameScene.setBg(conf.Bg);
        }
        if (conf.Body > 0) {
        }
    };
    GameUtils.play = function (id) {
        var conf = SoundCongfig.Dic.get(id);
        if (conf.Type == 1) {
            App.Instance.SoundMgr.playBg(conf.Name, true);
        }
        else if (conf.Type == 2) {
            App.Instance.SoundMgr.playEffect(conf.Name);
        }
    };
    GameUtils.PaseNum = function (num, fixed) {
        if (fixed === void 0) { fixed = 0; }
        var str;
        if (num > 99999999) {
            var b = Math.floor(num / 100000000);
            var t = (num - b * 100000000) / 10000;
            str = StringUtils.format(ConfigUtils.GetText(11), b) + StringUtils.format(ConfigUtils.GetText(10), t.toFixed(fixed));
        }
        else if (num > 99999) {
            var v = num / 10000;
            str = StringUtils.format(ConfigUtils.GetText(10), v.toFixed(fixed));
        }
        else {
            str = num;
        }
        return str;
    };
    GameUtils.RandName = function () {
        return RandomName.Dic.getRandomData().PlayerName;
        // var index = Math.floor(Math.random() * RandomName.Arr.length);
        // return RandomName.Arr[index].PlayerName;
    };
    return GameUtils;
}());
__reflect(GameUtils.prototype, "GameUtils");
//# sourceMappingURL=GameUtils.js.map