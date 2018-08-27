var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Net;
(function (Net) {
    var Simple;
    (function (Simple) {
        var Request = (function () {
            function Request(seqID, opcode, pack) {
                this._pack = pack;
                this._seqID = seqID;
                this._opcode = opcode;
            }
            Object.defineProperty(Request.prototype, "SeqID", {
                get: function () {
                    return this._seqID;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Request.prototype, "Opcode", {
                get: function () {
                    return this._opcode;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Request.prototype, "Pack", {
                get: function () {
                    return this._pack;
                },
                enumerable: true,
                configurable: true
            });
            return Request;
        }());
        Simple.Request = Request;
        __reflect(Request.prototype, "Net.Simple.Request");
    })(Simple = Net.Simple || (Net.Simple = {}));
})(Net || (Net = {}));
//# sourceMappingURL=Request.js.map