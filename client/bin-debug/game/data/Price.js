var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Price = (function () {
    function Price() {
        this._num = 0;
        this._price = 0;
        this._second = 0;
    }
    Object.defineProperty(Price.prototype, "Price", {
        get: function () {
            return this._price;
        },
        set: function (val) {
            this._price = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Price.prototype, "Second", {
        get: function () {
            return this._second;
        },
        set: function (val) {
            this._second = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Price.prototype, "Num", {
        get: function () {
            return this._num;
        },
        set: function (val) {
            this._num = val;
        },
        enumerable: true,
        configurable: true
    });
    return Price;
}());
__reflect(Price.prototype, "Price");
//# sourceMappingURL=Price.js.map