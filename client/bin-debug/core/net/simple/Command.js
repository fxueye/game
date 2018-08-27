var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Net;
(function (Net) {
    var Simple;
    (function (Simple) {
        var Command = (function () {
            function Command(seqID, opcode, pack) {
                this._pack = pack;
                this._seqID = seqID;
                this._opcode = opcode;
            }
            Object.defineProperty(Command.prototype, "SeqID", {
                get: function () {
                    return this._seqID;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Command.prototype, "Opcode", {
                get: function () {
                    return this._opcode;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Command.prototype, "Pack", {
                get: function () {
                    return this._pack;
                },
                enumerable: true,
                configurable: true
            });
            return Command;
        }());
        Simple.Command = Command;
        __reflect(Command.prototype, "Net.Simple.Command");
    })(Simple = Net.Simple || (Net.Simple = {}));
})(Net || (Net = {}));
//# sourceMappingURL=Command.js.map