var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MovieClipUtils = (function () {
    function MovieClipUtils() {
    }
    MovieClipUtils.removeMc = function (obj, mc) {
        if (obj.getChildIndex(mc) == -1) {
            return;
        }
        obj.removeChild(mc);
    };
    MovieClipUtils.createAddMc = function (obj, id, tempSave) {
        if (tempSave === void 0) { tempSave = true; }
        Logger.log("length:" + MovieClipUtils.mcTempList.length);
        var mcConf = MoveClipConfig.Dic.get(id);
        if (mcConf == null) {
            console.error("MoveClipConfig is not find id:" + id);
            return;
        }
        var data = RES.getRes(mcConf.Config);
        var txtr = RES.getRes(mcConf.Texture);
        MovieClipUtils.mcFactory.mcDataSet = data;
        MovieClipUtils.mcFactory.texture = txtr;
        var mvData = MovieClipUtils.mcFactory.generateMovieClipData(mcConf.Name);
        if (mcConf.FrameRate >= 0) {
            mvData.frameRate = mcConf.FrameRate;
        }
        var mc = new egret.MovieClip(mvData);
        if (tempSave) {
            MovieClipUtils.mcTempList.push(mc);
        }
        if (mcConf.Scale.length >= 2) {
            mc.scaleX = mcConf.Scale[0];
            mc.scaleY = mcConf.Scale[1];
        }
        obj.addChild(mc);
        mc.x = obj.width / 2;
        mc.y = obj.height / 2;
        mc.gotoAndPlay(mcConf.Play, mcConf.Times);
        return mc;
    };
    MovieClipUtils.clearTemp = function () {
        for (var i = 0, length = MovieClipUtils.mcTempList.length; i < length; i++) {
            var mc = MovieClipUtils.mcTempList[i];
            mc.parent.removeChild(mc);
            mc = null;
        }
        MovieClipUtils.mcTempList = null;
        MovieClipUtils.mcTempList = new Array();
    };
    MovieClipUtils.addMc = function (obj, id) {
        var mcConf = MoveClipConfig.Dic.get(id);
        if (mcConf == null) {
            console.error("MoveClipConfig is not find id:" + id);
            return;
        }
        var mc = MovieClipUtils.mcList.get(id);
        if (mc == null) {
            var data = RES.getRes(mcConf.Config);
            var txtr = RES.getRes(mcConf.Texture);
            MovieClipUtils.mcFactory.mcDataSet = data;
            MovieClipUtils.mcFactory.texture = txtr;
            var mvData = MovieClipUtils.mcFactory.generateMovieClipData(mcConf.Name);
            if (mcConf.FrameRate >= 0) {
                mvData.frameRate = mcConf.FrameRate;
            }
            mc = new egret.MovieClip(mvData);
            MovieClipUtils.mcList.add(id, mc);
            if (mcConf.Scale.length >= 2) {
                mc.scaleX = mcConf.Scale[0];
                mc.scaleY = mcConf.Scale[1];
            }
        }
        obj.addChild(mc);
        mc.x = obj.width / 2;
        mc.y = obj.height / 2;
        // if(mcConf.Location.length >= 2){
        // 	mc.x = mcConf.Location[0];
        // 	mc.y = mcConf.Location[1];
        // }
        // mc.play();
        mc.gotoAndPlay(mcConf.Play, mcConf.Times);
        return mc;
    };
    //优化方向对象池
    MovieClipUtils.mcFactory = new egret.MovieClipDataFactory();
    MovieClipUtils.mcList = new Dictionary();
    MovieClipUtils.mcTempList = new Array();
    return MovieClipUtils;
}());
__reflect(MovieClipUtils.prototype, "MovieClipUtils");
//# sourceMappingURL=MoveClipUtils.js.map