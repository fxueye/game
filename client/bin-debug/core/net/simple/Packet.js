var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Packet = (function () {
    function Packet(bytes, length, index) {
        if (index === void 0) { index = 0; }
        if (length > Packet.PACKET_MAX_LEN) {
            throw new Error("init len is larger than max length: " + Packet.PACKET_MAX_LEN);
        }
        if (index < 0 || index >= length) {
            throw new Error("invalid index of bytes, index: " + index);
        }
        this.pos = index;
        this.size = length;
        this.buffer = new ArrayBuffer(length);
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
        // let src = 
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
__reflect(Packet.prototype, "Packet");
//# sourceMappingURL=Packet.js.map