var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ViewMgr = (function () {
    function ViewMgr() {
        this._views = {};
        this._opens = [];
    }
    ViewMgr.prototype.register = function (key, view) {
        if (view == null) {
            return;
        }
        if (this._views[key]) {
            return;
        }
        this._views[key] = view;
    };
    ViewMgr.prototype.unregister = function (key) {
        if (!this._views[key]) {
            return;
        }
        this._views[key] = null;
        delete this._views[key];
    };
    ViewMgr.prototype.getView = function (key) {
        return this._views[key];
    };
    ViewMgr.prototype.destroy = function (key, newView) {
        if (newView === void 0) { newView = null; }
        var oldView = this.getView(key);
        if (oldView) {
            this.unregister(key);
            oldView.destroy();
            oldView = null;
        }
        if (newView)
            this.register(key, newView);
    };
    ViewMgr.prototype.open = function (key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var view = this.getView(key);
        if (view == null) {
            console.error("view_" + key + " not find!");
            return;
        }
        if (view.isShow()) {
            // view.open.apply(view,param);
            view.setVisible(true);
            return view;
        }
        if (view.isInit()) {
            view.setVisible(true);
            view.addToParent();
            view.open.apply(view, param);
        }
        else {
            App.Instance.EasyLoading.showLoading();
            view.loadResource(function () {
                view.setVisible(false);
                view.addToParent();
            }.bind(this), function () {
                view.initCompoments();
                view.initData();
                view.open.apply(view, param);
                view.setVisible(true);
                view.afterOpen.apply(view);
                App.Instance.EasyLoading.hideLoading();
            }.bind(this));
        }
        return view;
    };
    ViewMgr.prototype.push = function (key, closeLast) {
        if (closeLast === void 0) { closeLast = true; }
        var param = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            param[_i - 2] = arguments[_i];
        }
        var index = this._opens.indexOf(key);
        if (index > -1) {
            return;
        }
        var lastKey = this._opens[this._opens.length - 1];
        if (lastKey && closeLast)
            this.close(lastKey);
        var params = [];
        params.push(key);
        params.push.apply(params, param);
        this.open.apply(this, params);
        this._opens.push(key);
    };
    ViewMgr.prototype.pop = function (openLast, effec) {
        if (openLast === void 0) { openLast = true; }
        if (effec === void 0) { effec = true; }
        if (effec) {
            EffectUtils.MovieEffect(5);
        }
        var key = this._opens.pop();
        if (key)
            this.close(key);
        var lastKey = this._opens[this._opens.length - 1];
        if (lastKey && openLast)
            this.open(lastKey);
    };
    ViewMgr.prototype.close = function (key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (!this.isShow(key)) {
            return;
        }
        var view = this.getView(key);
        if (view == null) {
            return;
        }
        view.setVisible(false);
        view.removeFromParent();
        view.close.apply(view, param);
    };
    ViewMgr.prototype.closeAll = function () {
        for (var i = this._opens.length - 1; i >= 0; i--) {
            var key = this._opens.pop();
            if (key)
                this.close(key);
        }
    };
    ViewMgr.prototype.closeView = function (view) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var keys = Object.keys(this._views);
        for (var i = 0; i < keys.length - 1; i++) {
            var key = parseInt(keys[i]);
            if (this._views[key] == view) {
                this.close(key, param);
                return;
            }
        }
    };
    ViewMgr.prototype.isShow = function (key) {
        var view = this.getView(key);
        return view.isShow();
    };
    ViewMgr.prototype.onPause = function () {
        for (var _i = 0, _a = this._opens; _i < _a.length; _i++) {
            var id = _a[_i];
            var view = this.getView(id);
            if (view) {
                view.onPause();
            }
        }
    };
    ViewMgr.prototype.onResume = function () {
        for (var _i = 0, _a = this._opens; _i < _a.length; _i++) {
            var id = _a[_i];
            var view = this.getView(id);
            if (view) {
                view.onResume();
            }
        }
    };
    return ViewMgr;
}());
__reflect(ViewMgr.prototype, "ViewMgr");
//# sourceMappingURL=ViewMgr.js.map