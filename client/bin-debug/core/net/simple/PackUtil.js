var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Net;
(function (Net) {
    var Simple;
    (function (Simple) {
        /** number == int
         * 只支持基础类型
         */
        var PackUtil = (function () {
            function PackUtil() {
            }
            PackUtil.CreatePacket = function (seqID, opcode) {
                var params = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    params[_i - 2] = arguments[_i];
                }
                var pack = new Simple.Packet();
                pack.PutShort(seqID);
                pack.PutShort(opcode);
                var len = params.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        var p = params[i];
                        if (p == null) {
                            console.error("call server , params is null, opcode = " + opcode);
                            continue;
                        }
                        PackUtil.Pack(pack, p);
                    }
                }
                pack.Rewind();
                return pack;
            };
            PackUtil.Pack = function (pack, val) {
                var type = typeof val;
                if (type === "number") {
                    pack.PutInt(val);
                }
                else if (type === "boolean") {
                    pack.PutBool(val);
                }
                else if (type === "string") {
                    pack.PutString(val);
                }
                else if (type === "object") {
                }
            };
            PackUtil.Unpack = function (type, pack) {
                if (type === "number") {
                    return pack.GetInt();
                }
                else if (type === "boolean") {
                    return pack.GetBool();
                }
                else if (type === "string") {
                    return pack.GetString();
                }
                else if (type === "object") {
                }
            };
            return PackUtil;
        }());
        Simple.PackUtil = PackUtil;
        __reflect(PackUtil.prototype, "Net.Simple.PackUtil");
    })(Simple = Net.Simple || (Net.Simple = {}));
})(Net || (Net = {}));
//# sourceMappingURL=PackUtil.js.map