var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TimerMgr = (function () {
    function TimerMgr() {
        this._handlers = new Array();
        this._delHandler = new Array();
        this._currTime = 0;
        this._currFrame = 0;
        this._timeScale = 1;
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
    }
    TimerMgr.prototype.onEnterFrame = function () {
        this._currFrame++;
        this._currTime = egret.getTimer();
        for (var i = 0; i < this._handlers.length; i++) {
            var handler = this._handlers[i];
            var t = handler.useFrame ? this._currFrame : this._currTime;
            if (t >= handler.exeTime) {
                handler.method.call(handler.methodObj, (this._currTime - handler.dealTime) * this._timeScale);
                handler.dealTime = this._currTime;
                handler.exeTime += handler.delay;
                if (!handler.repeat) {
                    if (handler.repeatCount > 1) {
                        handler.repeatCount--;
                    }
                    else {
                        if (handler.completeMethod) {
                            handler.completeMethod.call(handler.complateMethodObj);
                        }
                        this._delHandler.push(handler);
                    }
                }
            }
        }
        while (this._delHandler.length) {
            var handler = this._delHandler.pop();
            this.remove(handler.method, handler.methodObj);
        }
    };
    TimerMgr.prototype.create = function (useFrame, delay, repeatCount, method, methodObj, completeMethod, complateMethodObj) {
        if (delay < 0 || repeatCount < 0 || method == null) {
            console.error("Please check delay repeatCount and method!");
            return;
        }
        this.remove(method, methodObj);
        var handler = new TimerHander();
        handler.useFrame = useFrame;
        handler.repeat = repeatCount == 0;
        handler.repeatCount = repeatCount;
        handler.delay = delay;
        handler.method = method;
        handler.methodObj = methodObj;
        handler.completeMethod = completeMethod;
        handler.complateMethodObj = complateMethodObj;
        handler.exeTime = delay + (useFrame ? this._currTime : this._currTime);
        handler.dealTime = this._currTime;
        this._handlers.push(handler);
    };
    //定时执行
    TimerMgr.prototype.startTimer = function (delay, repeatCount, method, methodObj, complateMethod, complateMethodObj) {
        if (complateMethod === void 0) { complateMethod = null; }
        if (complateMethodObj === void 0) { complateMethodObj = null; }
        this.create(false, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj);
    };
    TimerMgr.prototype.startFarme = function (delay, repeatCount, method, methodObj, complateMethod, complateMethodObj) {
        if (complateMethod === void 0) { complateMethod = null; }
        if (complateMethodObj === void 0) { complateMethodObj = null; }
        this.create(true, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj);
    };
    TimerMgr.prototype.remove = function (method, methodObj) {
        var count = this._handlers.length;
        for (var i = count - 1; i >= 0; i--) {
            var handler = this._handlers[i];
            if (handler.method == method && handler.methodObj == methodObj) {
                this._handlers[i] = null;
                this._handlers.splice(i, 1);
            }
            break;
        }
    };
    TimerMgr.prototype.removeAll = function (methodObj) {
        var count = this._handlers.length;
        for (var i = count - 1; i >= 0; i--) {
            var handler = this._handlers[i];
            if (handler.methodObj == methodObj) {
                this._handlers[i] = null;
                this._handlers.splice(i, 1);
            }
        }
    };
    Object.defineProperty(TimerMgr.prototype, "count", {
        get: function () {
            return this._handlers.length;
        },
        enumerable: true,
        configurable: true
    });
    TimerMgr.prototype.setTimeScale = function (timeScale) {
        this._timeScale = timeScale;
    };
    return TimerMgr;
}());
__reflect(TimerMgr.prototype, "TimerMgr");
var TimerHander = (function () {
    function TimerHander() {
        this.delay = 0;
        this.repeatCount = 0;
        this.exeTime = 0;
        this.dealTime = 0;
    }
    TimerHander.prototype.clear = function () {
        this.method = null;
        this.methodObj = null;
        this.completeMethod = null;
        this.complateMethodObj = null;
    };
    return TimerHander;
}());
__reflect(TimerHander.prototype, "TimerHander");
//# sourceMappingURL=TimerMgr.js.map