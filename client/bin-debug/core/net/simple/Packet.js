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
                if (bytes) {
                    this.buffer = bytes;
                    this.size = bytes.byteLength;
                }
                else {
                    this.buffer = new Uint8Array(len);
                }
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
                return this.buffer;
            };
            Packet.prototype.PutBytes = function (bytes) {
                this.EnsureCapacity(bytes.byteLength);
                this.buffer.set(bytes, this.pos);
                this.pos += bytes.byteLength;
                if (this.size < this.pos)
                    this.size = this.pos;
            };
            Packet.prototype.GetBytes = function (dest, start, length) {
                if (!dest) {
                    return;
                }
                dest.set(this.buffer.subarray(this.pos, this.pos + length), start);
                this.pos += length;
            };
            Packet.prototype.PutBool = function (value) {
                this.EnsureCapacity(1);
                var src = Simple.BitConverter.GetBytes(value);
                // Packet.CopyBuffer(src,0,this.buffer,this.pos,src.byteLength);
                this.buffer.set(src, this.pos);
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
                this.buffer.set(src, this.pos);
                this.pos += src.byteLength;
                if (this.size < this.pos)
                    this.size = this.pos;
            };
            Packet.prototype.GetShort = function () {
                var rst = Simple.BitConverter.ToInt16(this.buffer, this.pos);
                this.pos += 2;
                return rst;
            };
            Packet.prototype.PutInt = function (val) {
                this.EnsureCapacity(4);
                var src = Simple.BitConverter.GetBytes(val, 32);
                this.buffer.set(src, this.pos);
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
                var src = Simple.BitConverter.GetBytes(val);
                this.buffer.set(src, this.pos);
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
                this.buffer.set(src, this.pos);
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
                this.buffer.set(src, this.pos);
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
                var newBuffer = new Uint8Array(newCapacity);
                newBuffer.set(this.buffer, 0);
                this.buffer = newBuffer;
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