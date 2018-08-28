var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Net;
(function (Net) {
    var Simple;
    (function (Simple) {
        var BitConverter = (function () {
            function BitConverter() {
            }
            BitConverter.GetBytes = function (a, b, c) {
                if ((typeof a === "number") && (typeof b === "number")) {
                    if (c) {
                        var ba = new ArrayBuffer(b / 8);
                        var dv = new DataView(ba);
                        if (b == 32) {
                            dv.setFloat32(0, a);
                        }
                        else if (b == 64) {
                            dv.setFloat64(0, a);
                        }
                        return new Uint8Array(ba);
                    }
                    else {
                        var ba = new ArrayBuffer(b / 8);
                        var dv = new DataView(ba);
                        if (b == 8) {
                            dv.setUint8(0, a);
                        }
                        else if (b == 16) {
                            dv.setUint16(0, a);
                        }
                        else if (b == 32) {
                            dv.setUint32(0, a);
                        }
                        else if (b == 64) {
                            BitConverter.setInt64(a, dv, 0);
                        }
                        return new Uint8Array(ba);
                    }
                }
                else if ((typeof a === "boolean")) {
                    var ba = new ArrayBuffer(1);
                    var dv = new DataView(ba);
                    dv.setUint8(0, a ? 1 : 0);
                    return new Uint8Array(ba);
                }
                else if ((typeof a === "string")) {
                    var ub = BitConverter.encodeUTF8(a);
                    return ub;
                }
            };
            BitConverter.getInt64 = function (v, pos) {
                var offset = pos;
                var b = [];
                var ret = 0;
                for (var i = 0; i < 8; ++i)
                    b[i] = v.getUint8(offset++);
                var s = b[0] & 0x80;
                var d = 1;
                for (var i = 0; i < 8; ++i) {
                    var v_1 = b[7 - i];
                    ret += (s ? (v_1 ^ 0xff) : v_1) * d;
                    d *= 256;
                }
                return s ? -1 - ret : ret;
            };
            /**
             * -2^53 < v < 2^53
             */
            BitConverter.setInt64 = function (v, dv, pos) {
                var b = [];
                var s = v < 0;
                if (s)
                    v = -1 - v;
                for (var i = 0; i < 8; ++i) {
                    var m = v % 256;
                    v = (v - m) / 256;
                    b[7 - i] = s ? (m ^ 0xff) : m;
                }
                for (var i = 0; i < b.length; ++i)
                    dv.setUint8(pos++, b[i]);
            };
            BitConverter.ToString = function (b, pos, length) {
                var bytes = new Uint8Array(b, pos, length);
                return BitConverter.decodeUTF8(bytes);
            };
            BitConverter.ToNumber = function (b, pos, t, f) {
                if (t === void 0) { t = 32; }
                if (f === void 0) { f = false; }
                var v = new DataView(b);
                var val = 0;
                if (f) {
                    if (t == 32) {
                        val = v.getFloat32(pos);
                    }
                    else if (t == 64) {
                        val = v.getFloat64(pos);
                    }
                }
                else {
                    if (t == 8) {
                        val = v.getUint8(pos);
                    }
                    else if (t == 16) {
                        val = v.getUint16(pos);
                    }
                    else if (t == 32) {
                        val = v.getUint32(pos);
                    }
                    else if (t == 64) {
                        val = BitConverter.getInt64(v, pos);
                    }
                }
                return val;
            };
            BitConverter.ToDouble = function (b, pos) {
                return BitConverter.ToNumber(b, pos, 64, true);
            };
            BitConverter.ToFloat32 = function (b, pos) {
                return BitConverter.ToNumber(b, pos, 32, true);
            };
            BitConverter.ToFloat64 = function (b, pos) {
                return BitConverter.ToNumber(b, pos, 64, true);
            };
            BitConverter.ToInt16 = function (b, pos) {
                return BitConverter.ToNumber(b, pos, 16, false);
            };
            BitConverter.ToInt32 = function (b, pos) {
                return BitConverter.ToNumber(b, pos, 32, false);
            };
            BitConverter.ToInt64 = function (b, pos) {
                return BitConverter.ToNumber(b, pos, 64, false);
            };
            BitConverter.ToBoolean = function (b, pos) {
                var v = new DataView(b);
                var val = v.getUint8(pos) == 1 ? true : false;
                return val;
            };
            BitConverter.ToByte = function (b, pos) {
                var v = new DataView(b);
                var val = v.getUint8(pos);
                return val;
            };
            /**
                * UTF-8 Encoding/Decoding
                */
            BitConverter.encodeUTF8 = function (str) {
                var pos = 0;
                var codePoints = BitConverter.stringToCodePoints(str);
                var outputBytes = [];
                while (codePoints.length > pos) {
                    var code_point = codePoints[pos++];
                    if (BitConverter.inRange(code_point, 0xD800, 0xDFFF)) {
                        BitConverter.encoderError(code_point);
                    }
                    else if (BitConverter.inRange(code_point, 0x0000, 0x007f)) {
                        outputBytes.push(code_point);
                    }
                    else {
                        var count = void 0, offset = void 0;
                        if (BitConverter.inRange(code_point, 0x0080, 0x07FF)) {
                            count = 1;
                            offset = 0xC0;
                        }
                        else if (BitConverter.inRange(code_point, 0x0800, 0xFFFF)) {
                            count = 2;
                            offset = 0xE0;
                        }
                        else if (BitConverter.inRange(code_point, 0x10000, 0x10FFFF)) {
                            count = 3;
                            offset = 0xF0;
                        }
                        outputBytes.push(BitConverter.div(code_point, Math.pow(64, count)) + offset);
                        while (count > 0) {
                            var temp = BitConverter.div(code_point, Math.pow(64, count - 1));
                            outputBytes.push(0x80 + (temp % 64));
                            count -= 1;
                        }
                    }
                }
                return new Uint8Array(outputBytes);
            };
            /**
                *
                * @param data
                * @returns
                */
            BitConverter.decodeUTF8 = function (data) {
                var fatal = false;
                var pos = 0;
                var result = "";
                var code_point;
                var utf8_code_point = 0;
                var utf8_bytes_needed = 0;
                var utf8_bytes_seen = 0;
                var utf8_lower_boundary = 0;
                while (data.length > pos) {
                    var _byte = data[pos++];
                    if (_byte == BitConverter.EOF_byte) {
                        if (utf8_bytes_needed != 0) {
                            code_point = BitConverter.decoderError(fatal);
                        }
                        else {
                            code_point = BitConverter.EOF_code_point;
                        }
                    }
                    else {
                        if (utf8_bytes_needed == 0) {
                            if (BitConverter.inRange(_byte, 0x00, 0x7F)) {
                                code_point = _byte;
                            }
                            else {
                                if (BitConverter.inRange(_byte, 0xC2, 0xDF)) {
                                    utf8_bytes_needed = 1;
                                    utf8_lower_boundary = 0x80;
                                    utf8_code_point = _byte - 0xC0;
                                }
                                else if (BitConverter.inRange(_byte, 0xE0, 0xEF)) {
                                    utf8_bytes_needed = 2;
                                    utf8_lower_boundary = 0x800;
                                    utf8_code_point = _byte - 0xE0;
                                }
                                else if (BitConverter.inRange(_byte, 0xF0, 0xF4)) {
                                    utf8_bytes_needed = 3;
                                    utf8_lower_boundary = 0x10000;
                                    utf8_code_point = _byte - 0xF0;
                                }
                                else {
                                    BitConverter.decoderError(fatal);
                                }
                                utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
                                code_point = null;
                            }
                        }
                        else if (!BitConverter.inRange(_byte, 0x80, 0xBF)) {
                            utf8_code_point = 0;
                            utf8_bytes_needed = 0;
                            utf8_bytes_seen = 0;
                            utf8_lower_boundary = 0;
                            pos--;
                            code_point = BitConverter.decoderError(fatal, _byte);
                        }
                        else {
                            utf8_bytes_seen += 1;
                            utf8_code_point = utf8_code_point + (_byte - 0x80) * Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);
                            if (utf8_bytes_seen !== utf8_bytes_needed) {
                                code_point = null;
                            }
                            else {
                                var cp = utf8_code_point;
                                var lower_boundary = utf8_lower_boundary;
                                utf8_code_point = 0;
                                utf8_bytes_needed = 0;
                                utf8_bytes_seen = 0;
                                utf8_lower_boundary = 0;
                                if (BitConverter.inRange(cp, lower_boundary, 0x10FFFF) && !BitConverter.inRange(cp, 0xD800, 0xDFFF)) {
                                    code_point = cp;
                                }
                                else {
                                    code_point = BitConverter.decoderError(fatal, _byte);
                                }
                            }
                        }
                    }
                    //Decode string
                    if (code_point !== null && code_point !== BitConverter.EOF_code_point) {
                        if (code_point <= 0xFFFF) {
                            if (code_point > 0)
                                result += String.fromCharCode(code_point);
                        }
                        else {
                            code_point -= 0x10000;
                            result += String.fromCharCode(0xD800 + ((code_point >> 10) & 0x3ff));
                            result += String.fromCharCode(0xDC00 + (code_point & 0x3ff));
                        }
                    }
                }
                return result;
            };
            BitConverter.decoderError = function (fatal, opt_code_point) {
                if (fatal) {
                    console.error(1027);
                }
                return opt_code_point || 0xFFFD;
            };
            BitConverter.encoderError = function (code_point) {
                console.error(1027, code_point);
            };
            /**
                *
                * @param string
                */
            BitConverter.stringToCodePoints = function (string) {
                /** @type {Array.<number>} */
                var cps = [];
                // Based on http://www.w3.org/TR/WebIDL/#idl-DOMString
                var i = 0, n = string.length;
                while (i < string.length) {
                    var c = string.charCodeAt(i);
                    if (!BitConverter.inRange(c, 0xD800, 0xDFFF)) {
                        cps.push(c);
                    }
                    else if (BitConverter.inRange(c, 0xDC00, 0xDFFF)) {
                        cps.push(0xFFFD);
                    }
                    else {
                        if (i == n - 1) {
                            cps.push(0xFFFD);
                        }
                        else {
                            var d = string.charCodeAt(i + 1);
                            if (BitConverter.inRange(d, 0xDC00, 0xDFFF)) {
                                var a = c & 0x3FF;
                                var b = d & 0x3FF;
                                i += 1;
                                cps.push(0x10000 + (a << 10) + b);
                            }
                            else {
                                cps.push(0xFFFD);
                            }
                        }
                    }
                    i += 1;
                }
                return cps;
            };
            /**
                *
                * @param a
                * @param min
                * @param max
                */
            BitConverter.inRange = function (a, min, max) {
                return min <= a && a <= max;
            };
            /**
                *
                * @param n
                * @param d
                */
            BitConverter.div = function (n, d) {
                return Math.floor(n / d);
            };
            BitConverter.EOF_byte = -1;
            BitConverter.EOF_code_point = -1;
            return BitConverter;
        }());
        Simple.BitConverter = BitConverter;
        __reflect(BitConverter.prototype, "Net.Simple.BitConverter");
    })(Simple = Net.Simple || (Net.Simple = {}));
})(Net || (Net = {}));
//# sourceMappingURL=BitConverter.js.map