var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Net;
(function (Net) {
    var Simple;
    (function (Simple) {
        var Packet = (function () {
            function Packet(bytes, length, index) {
                if (index === void 0) { index = 0; }
                if (length != null && length > Packet.PACKET_MAX_LEN) {
                    throw new Error("init len is larger than max length: " + Packet.PACKET_MAX_LEN);
                }
                if ((index != null && length != null) && (index < 0 || index >= length)) {
                    throw new Error("invalid index of bytes, index: " + index);
                }
                var len = length ? length : Packet.PACKET_DEFAULT_LEN;
                this.pos = index ? index : 0;
                this.size = length ? length : 0;
                this.buffer = new ArrayBuffer(len);
            }
            Object.defineProperty(Packet.prototype, "Position", {
                get: function () {
                    return this.pos;
                },
                set: function (val) {
                    this.pos = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Packet.prototype, "Size", {
                get: function () {
                    return this.size;
                },
                set: function (val) {
                    this.size = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Packet.prototype, "Capability", {
                get: function () {
                    return this.buffer.byteLength;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Packet.prototype, "Remaining", {
                get: function () {
                    return this.size - this.pos;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Packet.prototype, "Buffer", {
                get: function () {
                    return this.buffer;
                },
                enumerable: true,
                configurable: true
            });
            Packet.prototype.Flip = function () {
                this.size = this.pos;
                this.pos = 0;
            };
            Packet.prototype.Rewind = function () {
                this.pos = 0;
            };
            Packet.prototype.Clear = function () {
                this.pos = 0;
                this.size = 0;
            };
            Packet.prototype.End = function () {
                return this.pos == this.size;
            };
            Packet.prototype.GetData = function () {
                var bytes = new ArrayBuffer(this.size);
                Packet.CopyBuffer(this.buffer, bytes, this.size);
                return bytes;
            };
            Packet.prototype.PutBytes = function (bytes) {
                this.EnsureCapacity(bytes.byteLength);
                Packet.CopyBuffer(bytes, 0, this.buffer, this.pos, bytes.byteLength);
                this.pos += bytes.byteLength;
                if (this.size < this.pos)
                    this.size = this.pos;
            };
            Packet.prototype.GetBytes = function (dest, start, length) {
                Packet.CopyBuffer(this.buffer, this.pos, dest, start, length);
                this.pos += length;
            };
            Packet.prototype.PutBool = function (value) {
                this.EnsureCapacity(1);
                var src = Simple.BitConverter.GetBytes(value);
                Packet.CopyBuffer(src, 0, this.buffer, this.pos, src.byteLength);
                this.pos += src.byteLength;
                if (this.size < this.pos)
                    this.size = this.pos;
            };
            Packet.prototype.GetBool = function () {
                var rst = Simple.BitConverter.ToBoolean(this.buffer, this.pos);
                this.pos += 1;
                return rst;
            };
            Packet.prototype.PutShort = function (val) {
                this.EnsureCapacity(2);
                var src = Simple.BitConverter.GetBytes(val, 16);
                Packet.CopyBuffer(src, 0, this.buffer, this.pos, src.byteLength);
                this.pos += src.byteLength;
                if (this.size < this.pos)
                    this.size = this.pos;
            };
            Packet.prototype.GetShort = function () {
                var rst = Simple.BitConverter.ToInt32(this.buffer, this.pos);
                this.pos += 2;
                return rst;
            };
            Packet.prototype.PutInt = function (val) {
                this.EnsureCapacity(4);
                var src = Simple.BitConverter.GetBytes(val, 32);
                Packet.CopyBuffer(src, 0, this.buffer, this.pos, src.byteLength);
                this.pos += src.byteLength;
                if (this.size < this.pos)
                    this.size = this.pos;
            };
            Packet.prototype.GetInt = function () {
                var rst = Simple.BitConverter.ToInt32(this.buffer, this.pos);
                this.pos += 4;
                return rst;
            };
            Packet.prototype.PutLong = function (val) {
                this.EnsureCapacity(8);
                var src = Simple.BitConverter.GetBytes(val, 64);
                Packet.CopyBuffer(src, 0, this.buffer, this.pos, src.byteLength);
                this.pos += src.byteLength;
                if (this.size < this.pos)
                    this.size = this.pos;
            };
            Packet.prototype.GetLong = function () {
                var rst = Simple.BitConverter.ToInt64(this.buffer, this.pos);
                this.pos += 8;
                return rst;
            };
            Packet.prototype.PutFloat = function (val) {
                this.EnsureCapacity(4);
                var src = Simple.BitConverter.GetBytes(val, 32, true);
                Packet.CopyBuffer(src, 0, this.buffer, this.pos, src.byteLength);
                this.pos += src.byteLength;
                if (this.size < this.pos)
                    this.size = this.pos;
            };
            Packet.prototype.GetFloat = function () {
                var rst = Simple.BitConverter.ToFloat32(this.buffer, this.pos);
                this.pos += 4;
                return rst;
            };
            Packet.prototype.PutDouble = function (val) {
                this.EnsureCapacity(8);
                var src = Simple.BitConverter.GetBytes(val, 32, true);
                this.pos += src.byteLength;
                if (this.size < this.pos)
                    this.size = this.pos;
            };
            Packet.prototype.GetDouble = function () {
                var rst = Simple.BitConverter.ToDouble(this.buffer, this.pos);
                this.pos += 8;
                return rst;
            };
            Packet.prototype.PutString = function (val) {
                if (val == null)
                    val = "";
                var src = Simple.BitConverter.GetBytes(val);
                var len = src.byteLength;
                this.EnsureCapacity(2 + len);
                this.PutShort(len);
                Packet.CopyBuffer(src, 0, this.buffer, this.pos, len);
                this.pos += len;
                if (this.size < this.pos)
                    this.size = this.pos;
            };
            Packet.prototype.GetString = function () {
                var len = this.GetShort();
                if (len == 0)
                    return "";
                var str = Simple.BitConverter.ToString(this.buffer, this.pos, len);
                this.pos += len;
                return str;
            };
            Packet.prototype.EnsureCapacity = function (increament) {
                if (this.Capability - this.Position >= increament) {
                    return;
                }
                var requiredCapacity = this.Position + increament;
                if (requiredCapacity > Packet.PACKET_MAX_LEN) {
                    throw new Error("required buffer is too long to pck max length: " + Packet.PACKET_MAX_LEN);
                }
                var newCapacity = requiredCapacity > this.Capability * 2 ? requiredCapacity : this.Capability * 2;
                newCapacity = requiredCapacity > Packet.PACKET_MAX_LEN ? Packet.PACKET_MAX_LEN : newCapacity;
                var newBuffer = new ArrayBuffer(newCapacity);
                Packet.CopyBuffer(this.buffer, newBuffer, this.size);
                this.buffer = newBuffer;
            };
            Packet.CopyBuffer = function (a, b, c, d, e) {
                var src = null;
                var dst = null;
                var size = null;
                var idx = null;
                var index = null;
                var len = null;
                if (a instanceof ArrayBuffer) {
                    src = a;
                }
                if (typeof b === "number") {
                    idx = b;
                }
                else if (b instanceof ArrayBuffer) {
                    dst = b;
                }
                if (c instanceof ArrayBuffer) {
                    dst = c;
                }
                else if (typeof c === "number") {
                    size = c;
                }
                if (typeof d === "number") {
                    index = d;
                }
                if (typeof e === "number") {
                    len = e;
                }
                if ((src instanceof ArrayBuffer) && (dst instanceof ArrayBuffer)) {
                    var dstArray = new Int8Array(dst);
                    var srcArray = new Int8Array(src);
                    if ((typeof size === "number")) {
                        for (var i = 0; i < size; i++) {
                            dstArray[i] = srcArray[i];
                        }
                    }
                    if ((typeof idx === "number") && (typeof index === "number") && (typeof len === "number")) {
                        var srcLen = src.byteLength;
                        var endIdx = idx + srcLen;
                        for (var i = idx; i < len; i++) {
                            if (idx < endIdx) {
                                dstArray[i] = srcArray[i];
                            }
                            else {
                                //TODO
                            }
                        }
                    }
                }
            };
            Packet.PACKET_DEFAULT_LEN = 256;
            Packet.PACKET_MAX_LEN = 1024 * 1024;
            return Packet;
        }());
        Simple.Packet = Packet;
        __reflect(Packet.prototype, "Net.Simple.Packet");
    })(Simple = Net.Simple || (Net.Simple = {}));
})(Net || (Net = {}));
//# sourceMappingURL=Packet.js.map