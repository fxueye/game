var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EffectType;
(function (EffectType) {
    EffectType[EffectType["None"] = 0] = "None";
    EffectType[EffectType["Slight"] = 1] = "Slight";
    EffectType[EffectType["Violent"] = 2] = "Violent";
    EffectType[EffectType["LeftRigt"] = 3] = "LeftRigt";
    EffectType[EffectType["RightLeft"] = 4] = "RightLeft";
    EffectType[EffectType["UpDown"] = 5] = "UpDown";
    EffectType[EffectType["DownUp"] = 6] = "DownUp"; //从上到下
})(EffectType || (EffectType = {}));
var EffectUtils = (function () {
    function EffectUtils() {
    }
    EffectUtils.CloseEffect = function (obj, type) {
        switch (type) {
            case EffectType.Slight:
                var x = obj.scaleX;
                var y = obj.scaleY;
                egret.Tween.get(obj).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 600, egret.Ease.backIn).call(function () {
                    obj.scaleX = x;
                    obj.scaleY = y;
                });
                break;
            case EffectType.Violent:
                var x = obj.scaleX;
                var y = obj.scaleY;
                egret.Tween.get(obj).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 600, egret.Ease.elasticIn).call(function () {
                    obj.scaleX = x;
                    obj.scaleY = y;
                });
                break;
            case EffectType.LeftRigt:
                var objx = obj.x;
                var x = App.Instance.Width;
                egret.Tween.get(obj).to({ x: x }, 500, egret.Ease.cubicIn).call(function () {
                    obj.visible = false;
                    obj.x = objx;
                });
                break;
            case EffectType.RightLeft:
                var objx = obj.x;
                var x = -App.Instance.Width;
                egret.Tween.get(obj).to({ x: x }, 500, egret.Ease.cubicIn).call(function () {
                    obj.visible = false;
                    obj.x = objx;
                });
                break;
            case EffectType.UpDown:
                var objy = obj.y;
                var y = App.Instance.Height;
                egret.Tween.get(obj).to({ y: y }, 500, egret.Ease.cubicIn).call(function () {
                    obj.visible = false;
                    obj.y = objy;
                });
                break;
            case EffectType.DownUp:
                var objy = obj.y;
                var y = -App.Instance.Height;
                egret.Tween.get(obj).to({ y: y }, 500, egret.Ease.cubicIn).call(function () {
                    obj.visible = false;
                    obj.y = objy;
                });
                break;
        }
    };
    EffectUtils.OpenEffect = function (obj, type) {
        switch (type) {
            case EffectType.Slight:
                obj.alpha = 0;
                obj.scaleX = 0.5;
                obj.scaleY = 0.5;
                egret.Tween.get(obj).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, egret.Ease.backOut);
                break;
            case EffectType.Violent:
                obj.alpha = 0;
                obj.scaleX = 0.5;
                obj.scaleY = 0.5;
                egret.Tween.get(obj).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, egret.Ease.elasticOut);
                break;
            case EffectType.LeftRigt:
                obj.visible = true;
                var x = obj.x;
                obj.x = -App.Instance.Width;
                egret.Tween.get(obj).to({ x: x }, 500, egret.Ease.cubicOut);
                break;
            case EffectType.RightLeft:
                obj.visible = true;
                var x = obj.x;
                obj.x = App.Instance.Width;
                egret.Tween.get(obj).to({ x: x }, 500, egret.Ease.cubicOut);
                break;
            case EffectType.UpDown:
                obj.visible = true;
                var y = obj.y;
                obj.y = -App.Instance.Height;
                egret.Tween.get(obj).to({ y: y }, 500, egret.Ease.cubicOut);
                break;
            case EffectType.DownUp:
                obj.visible = true;
                var y = obj.y;
                obj.y = App.Instance.Height;
                egret.Tween.get(obj).to({ y: y }, 500, egret.Ease.cubicOut);
                break;
        }
    };
    //晃动
    EffectUtils.StartRock = function (obj, margin, rockTime, direction) {
        if (direction == null) {
            direction = EffectType.RightLeft;
        }
        var start = {};
        var end = {};
        if (direction == EffectType.RightLeft) {
            start = { x: obj.x - margin };
            end = { x: obj.x };
        }
        else {
            start = { y: obj.y - margin };
            end = { y: obj.y };
        }
        egret.Tween.get(obj, { loop: true }).to(start, rockTime).to(end, rockTime);
    };
    //闪烁
    EffectUtils.StartFlicker = function (obj, alphaTime) {
        obj.alpha = 1;
        egret.Tween.get(obj, { loop: true }).to({ alpha: 0 }, alphaTime).to({ alpha: 1 }, alphaTime);
    };
    EffectUtils.StopEffect = function (obj) {
        egret.Tween.removeTweens(obj);
        if (obj.alpha != 0) {
            obj.alpha = 1;
        }
    };
    EffectUtils.MovieEffect = function (type) {
        var taget = App.Instance.Stage;
        var w = App.Instance.Width;
        var h = App.Instance.Height;
        //新建一个group
        var loadTxGrp = new eui.Group();
        loadTxGrp.width = w;
        loadTxGrp.height = h;
        taget.addChild(loadTxGrp);
        //循环创建多个截图bitmap 这里num自由设置
        var tx1Number = 20;
        //每个横着的数量
        var Xnumber = 5;
        //高数量自动计算
        var Ynumber = tx1Number / Xnumber;
        var upNumber = 0;
        function onComplete(evt) {
            upNumber++;
            if (upNumber == tx1Number) {
                taget.removeChild(loadTxGrp);
            }
        }
        for (var i = 0; i < tx1Number; i++) {
            //计算每个的XY及宽高
            var _mcW = w / Xnumber;
            var _mcH = h / Ynumber;
            var _mcX = i % Xnumber * _mcW;
            var _mcY = Math.floor(i / Xnumber) * _mcH;
            var renderTexture = new egret.RenderTexture();
            var mypic = renderTexture.drawToTexture(taget, new egret.Rectangle(_mcX, _mcY, _mcW, _mcH));
            var bmp = new egret.Bitmap;
            bmp.texture = renderTexture;
            bmp.anchorOffsetX = _mcW / 2;
            bmp.anchorOffsetY = _mcH / 2;
            bmp.x = _mcX + _mcW / 2;
            bmp.y = _mcY + _mcH / 2;
            loadTxGrp.addChild(bmp);
            if (type == 5) {
                type = Math.ceil(Math.random() * 4);
            }
            //开始特效
            switch (type) {
                case 1:
                    var tw = egret.Tween.get(bmp);
                    tw.to({ scaleX: 0, scaleY: 0, alpha: 0, rotation: 359 }, 800, egret.Ease.circIn).call(onComplete, this);
                    break;
                case 2:
                    var my_x = -w;
                    if (!(i % 2)) {
                        my_x = w * 2;
                    }
                    var tw = egret.Tween.get(bmp);
                    tw.to({ x: my_x, alpha: 0 }, 800, egret.Ease.circIn).call(onComplete, this);
                    break;
                case 3:
                    var tw = egret.Tween.get(bmp);
                    tw.to({ scaleX: 0.2, scaleY: 1, alpha: 0, blurFliter: 0 }, 800, egret.Ease.backInOut).call(onComplete, this);
                    break;
                case 4:
                    var tw = egret.Tween.get(bmp);
                    tw.to({ alpha: 0 }, 900, egret.Ease.circIn).call(onComplete, this);
                    break;
                default:
                    var tw = egret.Tween.get(bmp);
                    tw.to({ scaleX: 1, scaleY: 0, alpha: 0 }, 800, egret.Ease.circIn).call(onComplete, this);
            }
        }
    };
    return EffectUtils;
}());
__reflect(EffectUtils.prototype, "EffectUtils");
//# sourceMappingURL=EffectUtils.js.map