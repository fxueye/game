var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EventMgr = (function () {
    function EventMgr() {
        this._dict = {};
        this._eventDispatcher = new egret.EventDispatcher();
    }
    EventMgr.prototype.clear = function () {
        this._dict = {};
    };
    EventMgr.prototype.removeAll = function (thisObject, useCapture) {
        var keys = Object.keys(this._dict);
        for (var i = 0; i < keys.length; i++) {
            var type = keys[i];
            var arr = this._dict[type];
            for (var j = arr.length - 1; j >= 0; j--) {
                if (arr[j][1] == thisObject) {
                    this._eventDispatcher.removeEventListener(type, arr[j][0], thisObject, useCapture);
                    arr.splice(j, 1);
                }
            }
            if (arr.length == 0) {
                this._dict[type] = null;
                delete this._dict[type];
            }
        }
    };
    EventMgr.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority) {
        var arr = this._dict[type];
        if (arr == null) {
            arr = new Array();
            this._dict[type] = arr;
        }
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var data = arr_1[_i];
            if (data[0] == listener && data[1] == thisObject) {
                return;
            }
        }
        arr.push([listener, thisObject]);
        this._eventDispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
    };
    EventMgr.prototype.once = function (type, listener, thisObject, useCapture, priority) {
        this._eventDispatcher.once(type, listener, thisObject, useCapture, priority);
    };
    EventMgr.prototype.removeEventListener = function (type, listener, thisObject, useCapture) {
        var arr = this._dict[type];
        if (arr == null) {
            return;
        }
        var len = arr.length;
        for (var i = len - 1; i >= 0; i--) {
            if (arr[i][0] == listener && arr[i][1] == thisObject) {
                arr.splice(i, 1);
                break;
            }
        }
        if (arr.length == 0) {
            this._dict[type] = null;
            delete this._dict[type];
        }
        this._eventDispatcher.removeEventListener(type, listener, thisObject, useCapture);
    };
    EventMgr.prototype.hasEventListener = function (type) {
        return this._eventDispatcher.hasEventListener(type);
    };
    EventMgr.prototype.dispatchEvent = function (event) {
        return this._eventDispatcher.dispatchEvent(event);
    };
    EventMgr.prototype.dispatchEventWith = function (type, bubbles, data, cancelable) {
        return this._eventDispatcher.dispatchEventWith(type, bubbles, data, cancelable);
    };
    EventMgr.prototype.willTrigger = function (type) {
        return this._eventDispatcher.willTrigger(type);
    };
    return EventMgr;
}());
__reflect(EventMgr.prototype, "EventMgr", ["egret.IEventDispatcher"]);
//# sourceMappingURL=EventMgr.js.map