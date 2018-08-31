var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// prng4.js - uses Arcfour as a PRNG
function Arcfour() {
    this.i = 0;
    this.j = 0;
    this.S = new Array();
}
// Initialize arcfour context from key, an array of ints, each from [0..255]
function ARC4init(key) {
    var i, j, t;
    for (i = 0; i < 256; ++i)
        this.S[i] = i;
    j = 0;
    for (i = 0; i < 256; ++i) {
        j = (j + this.S[i] + key[i % key.length]) & 255;
        t = this.S[i];
        this.S[i] = this.S[j];
        this.S[j] = t;
    }
    this.i = 0;
    this.j = 0;
}
function ARC4next() {
    var t;
    this.i = (this.i + 1) & 255;
    this.j = (this.j + this.S[this.i]) & 255;
    t = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = t;
    return this.S[(t + this.S[this.i]) & 255];
}
Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;
// Plug in your RNG constructor here
function prng_newstate() {
    return new Arcfour();
}
// Pool size must be a multiple of 4 and greater than 32.
// An array of bytes the size of the pool will be passed to init()
var rng_psize = 256;
// ASN.1 JavaScript decoder
// Copyright (c) 2008-2014 Lapo Luchini <lapo@lapo.it>
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
/*global oids */
var crylib;
(function (crylib) {
    var ellipsis = "\u2026";
    var reTimeS = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
    var reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
    function stringCut(str, len) {
        if (str.length > len) {
            str = str.substring(0, len) + ellipsis;
        }
        return str;
    }
    var Stream = (function () {
        function Stream(enc, pos) {
            this.hexDigits = "0123456789ABCDEF";
            if (enc instanceof Stream) {
                this.enc = enc.enc;
                this.pos = enc.pos;
            }
            else {
                // enc should be an array or a binary string
                this.enc = enc;
                this.pos = pos;
            }
        }
        Stream.prototype.get = function (pos) {
            if (pos === undefined) {
                pos = this.pos++;
            }
            if (pos >= this.enc.length) {
                throw new Error("Requesting byte offset " + pos + " on a stream of length " + this.enc.length);
            }
            return ("string" === typeof this.enc) ? this.enc.charCodeAt(pos) : this.enc[pos];
        };
        Stream.prototype.hexByte = function (b) {
            return this.hexDigits.charAt((b >> 4) & 0xF) + this.hexDigits.charAt(b & 0xF);
        };
        Stream.prototype.hexDump = function (start, end, raw) {
            var s = "";
            for (var i = start; i < end; ++i) {
                s += this.hexByte(this.get(i));
                if (raw !== true) {
                    switch (i & 0xF) {
                        case 0x7:
                            s += "  ";
                            break;
                        case 0xF:
                            s += "\n";
                            break;
                        default:
                            s += " ";
                    }
                }
            }
            return s;
        };
        Stream.prototype.isASCII = function (start, end) {
            for (var i = start; i < end; ++i) {
                var c = this.get(i);
                if (c < 32 || c > 176) {
                    return false;
                }
            }
            return true;
        };
        Stream.prototype.parseStringISO = function (start, end) {
            var s = "";
            for (var i = start; i < end; ++i) {
                s += String.fromCharCode(this.get(i));
            }
            return s;
        };
        Stream.prototype.parseStringUTF = function (start, end) {
            var s = "";
            for (var i = start; i < end;) {
                var c = this.get(i++);
                if (c < 128) {
                    s += String.fromCharCode(c);
                }
                else if ((c > 191) && (c < 224)) {
                    s += String.fromCharCode(((c & 0x1F) << 6) | (this.get(i++) & 0x3F));
                }
                else {
                    s += String.fromCharCode(((c & 0x0F) << 12) | ((this.get(i++) & 0x3F) << 6) | (this.get(i++) & 0x3F));
                }
            }
            return s;
        };
        Stream.prototype.parseStringBMP = function (start, end) {
            var str = "";
            var hi;
            var lo;
            for (var i = start; i < end;) {
                hi = this.get(i++);
                lo = this.get(i++);
                str += String.fromCharCode((hi << 8) | lo);
            }
            return str;
        };
        Stream.prototype.parseTime = function (start, end, shortYear) {
            var s = this.parseStringISO(start, end);
            var m = (shortYear ? reTimeS : reTimeL).exec(s);
            if (!m) {
                return "Unrecognized time: " + s;
            }
            if (shortYear) {
                // to avoid querying the timer, use the fixed range [1970, 2069]
                // it will conform with ITU X.400 [-10, +40] sliding window until 2030
                var y = m[1];
                m[1] = +m[1];
                y += (+y < 70) ? 2000 : 1900;
                m[1] = y;
            }
            s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
            if (m[5]) {
                s += ":" + m[5];
                if (m[6]) {
                    s += ":" + m[6];
                    if (m[7]) {
                        s += "." + m[7];
                    }
                }
            }
            if (m[8]) {
                s += " UTC";
                if (m[8] != "Z") {
                    s += m[8];
                    if (m[9]) {
                        s += ":" + m[9];
                    }
                }
            }
            return s;
        };
        Stream.prototype.parseInteger = function (start, end) {
            var v = this.get(start);
            var neg = (v > 127);
            var pad = neg ? 255 : 0;
            var len;
            var s = "";
            // skip unuseful bits (not allowed in DER)
            while (v == pad && ++start < end) {
                v = this.get(start);
            }
            len = end - start;
            if (len === 0) {
                return neg ? -1 : 0;
            }
            // show bit length of huge integers
            if (len > 4) {
                s = v;
                len <<= 3;
                while (((+s ^ pad) & 0x80) == 0) {
                    s = +s << 1;
                    --len;
                }
                s = "(" + len + " bit)\n";
            }
            // decode the integer
            if (neg) {
                v = v - 256;
            }
            var n = new crylib.Int10(v);
            for (var i = start + 1; i < end; ++i) {
                n.mulAdd(256, this.get(i));
            }
            return s + n.toString();
        };
        Stream.prototype.parseBitString = function (start, end, maxLength) {
            var unusedBit = this.get(start);
            var lenBit = ((end - start - 1) << 3) - unusedBit;
            var intro = "(" + lenBit + " bit)\n";
            var s = "";
            for (var i = start + 1; i < end; ++i) {
                var b = this.get(i);
                var skip = (i == end - 1) ? unusedBit : 0;
                for (var j = 7; j >= skip; --j) {
                    s += (b >> j) & 1 ? "1" : "0";
                }
                if (s.length > maxLength) {
                    return intro + stringCut(s, maxLength);
                }
            }
            return intro + s;
        };
        Stream.prototype.parseOctetString = function (start, end, maxLength) {
            if (this.isASCII(start, end)) {
                return stringCut(this.parseStringISO(start, end), maxLength);
            }
            var len = end - start;
            var s = "(" + len + " byte)\n";
            maxLength /= 2; // we work in bytes
            if (len > maxLength) {
                end = start + maxLength;
            }
            for (var i = start; i < end; ++i) {
                s += this.hexByte(this.get(i));
            }
            if (len > maxLength) {
                s += ellipsis;
            }
            return s;
        };
        Stream.prototype.parseOID = function (start, end, maxLength) {
            var s = "";
            var n = new crylib.Int10();
            var bits = 0;
            for (var i = start; i < end; ++i) {
                var v = this.get(i);
                n.mulAdd(128, v & 0x7F);
                bits += 7;
                if (!(v & 0x80)) {
                    if (s === "") {
                        n = n.simplify();
                        if (n instanceof crylib.Int10) {
                            n.sub(80);
                            s = "2." + n.toString();
                        }
                        else {
                            var m = n < 80 ? n < 40 ? 0 : 1 : 2;
                            s = m + "." + (n - m * 40);
                        }
                    }
                    else {
                        s += "." + n.toString();
                    }
                    if (s.length > maxLength) {
                        return stringCut(s, maxLength);
                    }
                    n = new crylib.Int10();
                    bits = 0;
                }
            }
            if (bits > 0) {
                s += ".incomplete";
            }
            return s;
        };
        return Stream;
    }());
    __reflect(Stream.prototype, "Stream");
    var ASN1 = (function () {
        function ASN1(stream, header, length, tag, sub) {
            if (!(tag instanceof ASN1Tag)) {
                throw new Error("Invalid tag value.");
            }
            this.stream = stream;
            this.header = header;
            this.length = length;
            this.tag = tag;
            this.sub = sub;
        }
        ASN1.prototype.typeName = function () {
            switch (this.tag.tagClass) {
                case 0:// universal
                    switch (this.tag.tagNumber) {
                        case 0x00:
                            return "EOC";
                        case 0x01:
                            return "BOOLEAN";
                        case 0x02:
                            return "INTEGER";
                        case 0x03:
                            return "BIT_STRING";
                        case 0x04:
                            return "OCTET_STRING";
                        case 0x05:
                            return "NULL";
                        case 0x06:
                            return "OBJECT_IDENTIFIER";
                        case 0x07:
                            return "ObjectDescriptor";
                        case 0x08:
                            return "EXTERNAL";
                        case 0x09:
                            return "REAL";
                        case 0x0A:
                            return "ENUMERATED";
                        case 0x0B:
                            return "EMBEDDED_PDV";
                        case 0x0C:
                            return "UTF8String";
                        case 0x10:
                            return "SEQUENCE";
                        case 0x11:
                            return "SET";
                        case 0x12:
                            return "NumericString";
                        case 0x13:
                            return "PrintableString"; // ASCII subset
                        case 0x14:
                            return "TeletexString"; // aka T61String
                        case 0x15:
                            return "VideotexString";
                        case 0x16:
                            return "IA5String"; // ASCII
                        case 0x17:
                            return "UTCTime";
                        case 0x18:
                            return "GeneralizedTime";
                        case 0x19:
                            return "GraphicString";
                        case 0x1A:
                            return "VisibleString"; // ASCII subset
                        case 0x1B:
                            return "GeneralString";
                        case 0x1C:
                            return "UniversalString";
                        case 0x1E:
                            return "BMPString";
                    }
                    return "Universal_" + this.tag.tagNumber.toString();
                case 1:
                    return "Application_" + this.tag.tagNumber.toString();
                case 2:
                    return "[" + this.tag.tagNumber.toString() + "]"; // Context
                case 3:
                    return "Private_" + this.tag.tagNumber.toString();
            }
        };
        ASN1.prototype.content = function (maxLength) {
            if (this.tag === undefined) {
                return null;
            }
            if (maxLength === undefined) {
                maxLength = Infinity;
            }
            var content = this.posContent();
            var len = Math.abs(this.length);
            if (!this.tag.isUniversal()) {
                if (this.sub !== null) {
                    return "(" + this.sub.length + " elem)";
                }
                return this.stream.parseOctetString(content, content + len, maxLength);
            }
            switch (this.tag.tagNumber) {
                case 0x01:// BOOLEAN
                    return (this.stream.get(content) === 0) ? "false" : "true";
                case 0x02:// INTEGER
                    return this.stream.parseInteger(content, content + len);
                case 0x03:// BIT_STRING
                    return this.sub ? "(" + this.sub.length + " elem)" :
                        this.stream.parseBitString(content, content + len, maxLength);
                case 0x04:// OCTET_STRING
                    return this.sub ? "(" + this.sub.length + " elem)" :
                        this.stream.parseOctetString(content, content + len, maxLength);
                // case 0x05: // NULL
                case 0x06:// OBJECT_IDENTIFIER
                    return this.stream.parseOID(content, content + len, maxLength);
                // case 0x07: // ObjectDescriptor
                // case 0x08: // EXTERNAL
                // case 0x09: // REAL
                // case 0x0A: // ENUMERATED
                // case 0x0B: // EMBEDDED_PDV
                case 0x10: // SEQUENCE
                case 0x11:// SET
                    if (this.sub !== null) {
                        return "(" + this.sub.length + " elem)";
                    }
                    else {
                        return "(no elem)";
                    }
                case 0x0C:// UTF8String
                    return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);
                case 0x12: // NumericString
                case 0x13: // PrintableString
                case 0x14: // TeletexString
                case 0x15: // VideotexString
                case 0x16: // IA5String
                // case 0x19: // GraphicString
                case 0x1A:// VisibleString
                    // case 0x1B: // GeneralString
                    // case 0x1C: // UniversalString
                    return stringCut(this.stream.parseStringISO(content, content + len), maxLength);
                case 0x1E:// BMPString
                    return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);
                case 0x17: // UTCTime
                case 0x18:// GeneralizedTime
                    return this.stream.parseTime(content, content + len, (this.tag.tagNumber == 0x17));
            }
            return null;
        };
        ASN1.prototype.toString = function () {
            return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + ((this.sub === null) ? "null" : this.sub.length) + "]";
        };
        ASN1.prototype.toPrettyString = function (indent) {
            if (indent === undefined) {
                indent = "";
            }
            var s = indent + this.typeName() + " @" + this.stream.pos;
            if (this.length >= 0) {
                s += "+";
            }
            s += this.length;
            if (this.tag.tagConstructed) {
                s += " (constructed)";
            }
            else if ((this.tag.isUniversal() && ((this.tag.tagNumber == 0x03) || (this.tag.tagNumber == 0x04))) && (this.sub !== null)) {
                s += " (encapsulates)";
            }
            s += "\n";
            if (this.sub !== null) {
                indent += "  ";
                for (var i = 0, max = this.sub.length; i < max; ++i) {
                    s += this.sub[i].toPrettyString(indent);
                }
            }
            return s;
        };
        ASN1.prototype.posStart = function () {
            return this.stream.pos;
        };
        ASN1.prototype.posContent = function () {
            return this.stream.pos + this.header;
        };
        ASN1.prototype.posEnd = function () {
            return this.stream.pos + this.header + Math.abs(this.length);
        };
        ASN1.prototype.toHexString = function () {
            return this.stream.hexDump(this.posStart(), this.posEnd(), true);
        };
        ASN1.decodeLength = function (stream) {
            var buf = stream.get();
            var len = buf & 0x7F;
            if (len == buf) {
                return len;
            }
            // no reason to use Int10, as it would be a huge buffer anyways
            if (len > 6) {
                throw new Error("Length over 48 bits not supported at position " + (stream.pos - 1));
            }
            if (len === 0) {
                return null;
            } // undefined
            buf = 0;
            for (var i = 0; i < len; ++i) {
                buf = (buf * 256) + stream.get();
            }
            return buf;
        };
        /**
         * Retrieve the hexadecimal value (as a string) of the current ASN.1 element
         * @returns {string}
         * @public
         */
        ASN1.prototype.getHexStringValue = function () {
            var hexString = this.toHexString();
            var offset = this.header * 2;
            var length = this.length * 2;
            return hexString.substr(offset, length);
        };
        ASN1.decode_stream = function (str) {
            var stream;
            if (!(str instanceof Stream)) {
                stream = new Stream(str, 0);
            }
            else {
                stream = str;
            }
            var streamStart = new Stream(stream);
            var tag = new ASN1Tag(stream);
            var len = ASN1.decodeLength(stream);
            var start = stream.pos;
            var header = start - streamStart.pos;
            var sub = null;
            var getSub = function () {
                var ret = [];
                if (len !== null) {
                    // definite length
                    var end = start + len;
                    while (stream.pos < end) {
                        ret[ret.length] = ASN1.decode_stream(stream);
                    }
                    if (stream.pos != end) {
                        throw new Error("Content size is not correct for container starting at offset " + start);
                    }
                }
                else {
                    // undefined length
                    try {
                        for (;;) {
                            var s = ASN1.decode_stream(stream);
                            if (s.tag.isEOC()) {
                                break;
                            }
                            ret[ret.length] = s;
                        }
                        len = start - stream.pos; // undefined lengths are represented as negative values
                    }
                    catch (e) {
                        throw new Error("Exception while decoding undefined length content: " + e);
                    }
                }
                return ret;
            };
            if (tag.tagConstructed) {
                // must have valid content
                sub = getSub();
            }
            else if (tag.isUniversal() && ((tag.tagNumber == 0x03) || (tag.tagNumber == 0x04))) {
                // sometimes BitString and OctetString are used to encapsulate ASN.1
                try {
                    if (tag.tagNumber == 0x03) {
                        if (stream.get() != 0) {
                            throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                        }
                    }
                    sub = getSub();
                    for (var i = 0; i < sub.length; ++i) {
                        if (sub[i].tag.isEOC()) {
                            throw new Error("EOC is not supposed to be actual content.");
                        }
                    }
                }
                catch (e) {
                    // but silently ignore when they don't
                    sub = null;
                }
            }
            if (sub === null) {
                if (len === null) {
                    throw new Error("We can't skip over an invalid tag with undefined length at offset " + start);
                }
                stream.pos = start + Math.abs(len);
            }
            return new ASN1(streamStart, header, len, tag, sub);
        };
        ASN1.decode = function (str) {
            var stream;
            if (!(str instanceof Stream)) {
                stream = new Stream(str, 0);
            }
            else {
                stream = str;
            }
            var streamStart = new Stream(stream);
            var tag = new ASN1Tag(stream);
            var len = ASN1.decodeLength(stream);
            var start = stream.pos;
            var header = start - streamStart.pos;
            var sub = null;
            var getSub = function () {
                var ret = [];
                if (len !== null) {
                    // definite length
                    var end = start + len;
                    while (stream.pos < end) {
                        ret[ret.length] = ASN1.decode_stream(stream);
                    }
                    if (stream.pos != end) {
                        throw new Error("Content size is not correct for container starting at offset " + start);
                    }
                }
                else {
                    // undefined length
                    try {
                        for (;;) {
                            var s = ASN1.decode_stream(stream);
                            if (s.tag.isEOC()) {
                                break;
                            }
                            ret[ret.length] = s;
                        }
                        len = start - stream.pos; // undefined lengths are represented as negative values
                    }
                    catch (e) {
                        throw new Error("Exception while decoding undefined length content: " + e);
                    }
                }
                return ret;
            };
            if (tag.tagConstructed) {
                // must have valid content
                sub = getSub();
            }
            else if (tag.isUniversal() && ((tag.tagNumber == 0x03) || (tag.tagNumber == 0x04))) {
                // sometimes BitString and OctetString are used to encapsulate ASN.1
                try {
                    if (tag.tagNumber == 0x03) {
                        if (stream.get() != 0) {
                            throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                        }
                    }
                    sub = getSub();
                    for (var i = 0; i < sub.length; ++i) {
                        if (sub[i].tag.isEOC()) {
                            throw new Error("EOC is not supposed to be actual content.");
                        }
                    }
                }
                catch (e) {
                    // but silently ignore when they don't
                    sub = null;
                }
            }
            if (sub === null) {
                if (len === null) {
                    throw new Error("We can't skip over an invalid tag with undefined length at offset " + start);
                }
                stream.pos = start + Math.abs(len);
            }
            return new ASN1(streamStart, header, len, tag, sub);
        };
        return ASN1;
    }());
    crylib.ASN1 = ASN1;
    __reflect(ASN1.prototype, "crylib.ASN1");
    var ASN1Tag = (function () {
        function ASN1Tag(stream) {
            var buf = stream.get();
            this.tagClass = buf >> 6;
            this.tagConstructed = ((buf & 0x20) !== 0);
            this.tagNumber = buf & 0x1F;
            if (this.tagNumber == 0x1F) {
                var n = new crylib.Int10();
                do {
                    buf = stream.get();
                    n.mulAdd(128, buf & 0x7F);
                } while (buf & 0x80);
                this.tagNumber = n.simplify();
            }
        }
        ASN1Tag.prototype.isUniversal = function () {
            return this.tagClass === 0x00;
        };
        ASN1Tag.prototype.isEOC = function () {
            return this.tagClass === 0x00 && this.tagNumber === 0x00;
        };
        return ASN1Tag;
    }());
    __reflect(ASN1Tag.prototype, "ASN1Tag");
})(crylib || (crylib = {}));
// Base64 JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
var crylib;
(function (crylib) {
    var base64_decoder;
    crylib.Base64 = {
        decode: function (a) {
            var i;
            if (base64_decoder === undefined) {
                var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                var ignore = "= \f\n\r\t\u00A0\u2028\u2029";
                base64_decoder = Object.create(null);
                for (i = 0; i < 64; ++i) {
                    base64_decoder[b64.charAt(i)] = i;
                }
                for (i = 0; i < ignore.length; ++i) {
                    base64_decoder[ignore.charAt(i)] = -1;
                }
            }
            var out = [];
            var bits = 0;
            var char_count = 0;
            for (i = 0; i < a.length; ++i) {
                var c = a.charAt(i);
                if (c == "=") {
                    break;
                }
                c = base64_decoder[c];
                if (c == -1) {
                    continue;
                }
                if (c === undefined) {
                    throw new Error("Illegal character at offset " + i);
                }
                bits |= c;
                if (++char_count >= 4) {
                    out[out.length] = (bits >> 16);
                    out[out.length] = (bits >> 8) & 0xFF;
                    out[out.length] = bits & 0xFF;
                    bits = 0;
                    char_count = 0;
                }
                else {
                    bits <<= 6;
                }
            }
            switch (char_count) {
                case 1:
                    throw new Error("Base64 encoding incomplete: at least 2 bits missing");
                case 2:
                    out[out.length] = (bits >> 10);
                    break;
                case 3:
                    out[out.length] = (bits >> 16);
                    out[out.length] = (bits >> 8) & 0xFF;
                    break;
            }
            return out;
        },
        re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
        unarmor: function (a) {
            var m = crylib.Base64.re.exec(a);
            if (m) {
                if (m[1]) {
                    a = m[1];
                }
                else if (m[2]) {
                    a = m[2];
                }
                else {
                    throw new Error("RegExp out of sync");
                }
            }
            return crylib.Base64.decode(a);
        }
    };
})(crylib || (crylib = {}));
// Hex JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
var crylib;
(function (crylib) {
    var decoder;
    crylib.Hex = {
        decode: function (a) {
            var i;
            if (decoder === undefined) {
                var hex = "0123456789ABCDEF";
                var ignore = " \f\n\r\t\u00A0\u2028\u2029";
                decoder = {};
                for (i = 0; i < 16; ++i) {
                    decoder[hex.charAt(i)] = i;
                }
                hex = hex.toLowerCase();
                for (i = 10; i < 16; ++i) {
                    decoder[hex.charAt(i)] = i;
                }
                for (i = 0; i < ignore.length; ++i) {
                    decoder[ignore.charAt(i)] = -1;
                }
            }
            var out = [];
            var bits = 0;
            var char_count = 0;
            for (i = 0; i < a.length; ++i) {
                var c = a.charAt(i);
                if (c == "=") {
                    break;
                }
                c = decoder[c];
                if (c == -1) {
                    continue;
                }
                if (c === undefined) {
                    throw new Error("Illegal character at offset " + i);
                }
                bits |= c;
                if (++char_count >= 2) {
                    out[out.length] = bits;
                    bits = 0;
                    char_count = 0;
                }
                else {
                    bits <<= 4;
                }
            }
            if (char_count) {
                throw new Error("Hex encoding incomplete: 4 bits missing");
            }
            return out;
        }
    };
})(crylib || (crylib = {})); //end of namespace crylib
// Big integer base-10 printing library
// Copyright (c) 2014 Lapo Luchini <lapo@lapo.it>
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
var crylib;
(function (crylib) {
    var max = 10000000000000; // biggest integer that can still fit 2^53 when multiplied by 256
    var Int10 = (function () {
        function Int10(value) {
            this.buf = [+value || 0];
        }
        Int10.prototype.mulAdd = function (m, c) {
            // assert(m <= 256)
            var b = this.buf;
            var l = b.length;
            var i;
            var t;
            for (i = 0; i < l; ++i) {
                t = b[i] * m + c;
                if (t < max) {
                    c = 0;
                }
                else {
                    c = 0 | (t / max);
                    t -= c * max;
                }
                b[i] = t;
            }
            if (c > 0) {
                b[i] = c;
            }
        };
        Int10.prototype.sub = function (c) {
            // assert(m <= 256)
            var b = this.buf;
            var l = b.length;
            var i;
            var t;
            for (i = 0; i < l; ++i) {
                t = b[i] - c;
                if (t < 0) {
                    t += max;
                    c = 1;
                }
                else {
                    c = 0;
                }
                b[i] = t;
            }
            while (b[b.length - 1] === 0) {
                b.pop();
            }
        };
        Int10.prototype.toString = function (base) {
            if ((base || 10) != 10) {
                throw new Error("only base 10 is supported");
            }
            var b = this.buf;
            var s = b[b.length - 1].toString();
            for (var i = b.length - 2; i >= 0; --i) {
                s += (max + b[i]).toString().substring(1);
            }
            return s;
        };
        Int10.prototype.valueOf = function () {
            var b = this.buf;
            var v = 0;
            for (var i = b.length - 1; i >= 0; --i) {
                v = v * max + b[i];
            }
            return v;
        };
        Int10.prototype.simplify = function () {
            var b = this.buf;
            return (b.length == 1) ? b[0] : this;
        };
        return Int10;
    }());
    crylib.Int10 = Int10;
    __reflect(Int10.prototype, "crylib.Int10");
})(crylib || (crylib = {}));
// Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.
// Basic JavaScript BN library - subset useful for RSA encryption.
// Bits per digit
var dbits;
// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary & 0xffffff) == 0xefcafe);
// (public) Constructor
function BigInteger(a, b, c) {
    if (a != null)
        if ("number" == typeof a)
            this.fromNumber(a, b, c);
        else if (b == null && "string" != typeof a)
            this.fromString(a, 256);
        else
            this.fromString(a, b);
}
// return new, unset BigInteger
function nbi() { return new BigInteger(null); }
// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.
// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i, x, w, j, c, n) {
    while (--n >= 0) {
        var v = x * this[i++] + w[j] + c;
        c = Math.floor(v / 0x4000000);
        w[j++] = v & 0x3ffffff;
    }
    return c;
}
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i, x, w, j, c, n) {
    var xl = x & 0x7fff, xh = x >> 15;
    while (--n >= 0) {
        var l = this[i] & 0x7fff;
        var h = this[i++] >> 15;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
        c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
        w[j++] = l & 0x3fffffff;
    }
    return c;
}
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i, x, w, j, c, n) {
    var xl = x & 0x3fff, xh = x >> 14;
    while (--n >= 0) {
        var l = this[i] & 0x3fff;
        var h = this[i++] >> 14;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
        c = (l >> 28) + (m >> 14) + xh * h;
        w[j++] = l & 0xfffffff;
    }
    return c;
}
// if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
//   BigInteger.prototype.am = am2;
//   dbits = 30;
// }
// else if(j_lm && (navigator.appName != "Netscape")) {
//   BigInteger.prototype.am = am1;
//   dbits = 26;
// }
// else { // Mozilla/Netscape seems to prefer am3
//! only use this mode. change by Penny
BigInteger.prototype.am = am3;
dbits = 28;
// }
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1 << dbits) - 1);
BigInteger.prototype.DV = (1 << dbits);
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
// Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv)
    BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv)
    BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv)
    BI_RC[rr++] = vv;
function int2char(n) { return BI_RM.charAt(n); }
function intAt(s, i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c == null) ? -1 : c;
}
// (protected) copy this to r
function bnpCopyTo(r) {
    for (var i = this.t - 1; i >= 0; --i)
        r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
}
// (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x) {
    this.t = 1;
    this.s = (x < 0) ? -1 : 0;
    if (x > 0)
        this[0] = x;
    else if (x < -1)
        this[0] = x + this.DV;
    else
        this.t = 0;
}
// return bigint initialized to value
function nbv(i) { var r = nbi(); r.fromInt(i); return r; }
// (protected) set from string and radix
function bnpFromString(s, b) {
    var k;
    if (b == 16)
        k = 4;
    else if (b == 8)
        k = 3;
    else if (b == 256)
        k = 8; // byte array
    else if (b == 2)
        k = 1;
    else if (b == 32)
        k = 5;
    else if (b == 4)
        k = 2;
    else {
        this.fromRadix(s, b);
        return;
    }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while (--i >= 0) {
        var x = (k == 8) ? s[i] & 0xff : intAt(s, i);
        if (x < 0) {
            if (s.charAt(i) == "-")
                mi = true;
            continue;
        }
        mi = false;
        if (sh == 0)
            this[this.t++] = x;
        else if (sh + k > this.DB) {
            this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
            this[this.t++] = (x >> (this.DB - sh));
        }
        else
            this[this.t - 1] |= x << sh;
        sh += k;
        if (sh >= this.DB)
            sh -= this.DB;
    }
    if (k == 8 && (s[0] & 0x80) != 0) {
        this.s = -1;
        if (sh > 0)
            this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
    }
    this.clamp();
    if (mi)
        BigInteger.ZERO.subTo(this, this);
}
// (protected) clamp off excess high words
function bnpClamp() {
    var c = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == c)
        --this.t;
}
// (public) convert to bigendian byte array
function bnToByteArray() {
    var i = this.t, r = new Array();
    r[0] = this.s;
    var p = this.DB - (i * this.DB) % 8, d, k = 0;
    if (i-- > 0) {
        if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p)
            r[k++] = d | (this.s << (this.DB - p));
        while (i >= 0) {
            if (p < 8) {
                d = (this[i] & ((1 << p) - 1)) << (8 - p);
                d |= this[--i] >> (p += this.DB - 8);
            }
            else {
                d = (this[i] >> (p -= 8)) & 0xff;
                if (p <= 0) {
                    p += this.DB;
                    --i;
                }
            }
            if ((d & 0x80) != 0)
                d |= -256;
            //! remove by penny.
            // if(k == 0 && (this.s&0x80) != (d&0x80) && this.s != 0) ++k;
            if (k > 0 || d != this.s)
                r[k++] = d;
        }
    }
    return r;
}
// (public) return string representation in given radix
function bnToString(b) {
    if (this.s < 0)
        return "-" + this.negate().toString(b);
    var k;
    if (b == 16)
        k = 4;
    else if (b == 8)
        k = 3;
    else if (b == 2)
        k = 1;
    else if (b == 32)
        k = 5;
    else if (b == 4)
        k = 2;
    else
        return this.toRadix(b);
    var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
    var p = this.DB - (i * this.DB) % k;
    if (i-- > 0) {
        if (p < this.DB && (d = this[i] >> p) > 0) {
            m = true;
            r = int2char(d);
        }
        while (i >= 0) {
            if (p < k) {
                d = (this[i] & ((1 << p) - 1)) << (k - p);
                d |= this[--i] >> (p += this.DB - k);
            }
            else {
                d = (this[i] >> (p -= k)) & km;
                if (p <= 0) {
                    p += this.DB;
                    --i;
                }
            }
            if (d > 0)
                m = true;
            if (m)
                r += int2char(d);
        }
    }
    return m ? r : "0";
}
// (public) -this
function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this, r); return r; }
// (public) |this|
function bnAbs() { return (this.s < 0) ? this.negate() : this; }
// (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a) {
    var r = this.s - a.s;
    if (r != 0)
        return r;
    var i = this.t;
    r = i - a.t;
    if (r != 0)
        return (this.s < 0) ? -r : r;
    while (--i >= 0)
        if ((r = this[i] - a[i]) != 0)
            return r;
    return 0;
}
// returns bit length of the integer x
function nbits(x) {
    var r = 1, t;
    if ((t = x >>> 16) != 0) {
        x = t;
        r += 16;
    }
    if ((t = x >> 8) != 0) {
        x = t;
        r += 8;
    }
    if ((t = x >> 4) != 0) {
        x = t;
        r += 4;
    }
    if ((t = x >> 2) != 0) {
        x = t;
        r += 2;
    }
    if ((t = x >> 1) != 0) {
        x = t;
        r += 1;
    }
    return r;
}
// (public) return the number of bits in "this"
function bnBitLength() {
    if (this.t <= 0)
        return 0;
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
}
// (protected) r = this << n*DB
function bnpDLShiftTo(n, r) {
    var i;
    for (i = this.t - 1; i >= 0; --i)
        r[i + n] = this[i];
    for (i = n - 1; i >= 0; --i)
        r[i] = 0;
    r.t = this.t + n;
    r.s = this.s;
}
// (protected) r = this >> n*DB
function bnpDRShiftTo(n, r) {
    for (var i = n; i < this.t; ++i)
        r[i - n] = this[i];
    r.t = Math.max(this.t - n, 0);
    r.s = this.s;
}
// (protected) r = this << n
function bnpLShiftTo(n, r) {
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << cbs) - 1;
    var ds = Math.floor(n / this.DB), c = (this.s << bs) & this.DM, i;
    for (i = this.t - 1; i >= 0; --i) {
        r[i + ds + 1] = (this[i] >> cbs) | c;
        c = (this[i] & bm) << bs;
    }
    for (i = ds - 1; i >= 0; --i)
        r[i] = 0;
    r[ds] = c;
    r.t = this.t + ds + 1;
    r.s = this.s;
    r.clamp();
}
// (protected) r = this >> n
function bnpRShiftTo(n, r) {
    r.s = this.s;
    var ds = Math.floor(n / this.DB);
    if (ds >= this.t) {
        r.t = 0;
        return;
    }
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << bs) - 1;
    r[0] = this[ds] >> bs;
    for (var i = ds + 1; i < this.t; ++i) {
        r[i - ds - 1] |= (this[i] & bm) << cbs;
        r[i - ds] = this[i] >> bs;
    }
    if (bs > 0)
        r[this.t - ds - 1] |= (this.s & bm) << cbs;
    r.t = this.t - ds;
    r.clamp();
}
// (protected) r = this - a
function bnpSubTo(a, r) {
    var i = 0, c = 0, m = Math.min(a.t, this.t);
    while (i < m) {
        c += this[i] - a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
    }
    if (a.t < this.t) {
        c -= a.s;
        while (i < this.t) {
            c += this[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
        }
        c += this.s;
    }
    else {
        c += this.s;
        while (i < a.t) {
            c -= a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
        }
        c -= a.s;
    }
    r.s = (c < 0) ? -1 : 0;
    if (c < -1)
        r[i++] = this.DV + c;
    else if (c > 0)
        r[i++] = c;
    r.t = i;
    r.clamp();
}
// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a, r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i + y.t;
    while (--i >= 0)
        r[i] = 0;
    for (i = 0; i < y.t; ++i)
        r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
    r.s = 0;
    r.clamp();
    if (this.s != a.s)
        BigInteger.ZERO.subTo(r, r);
}
// (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2 * x.t;
    while (--i >= 0)
        r[i] = 0;
    for (i = 0; i < x.t - 1; ++i) {
        var c = x.am(i, x[i], r, 2 * i, 0, 1);
        if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
            r[i + x.t] -= x.DV;
            r[i + x.t + 1] = 1;
        }
    }
    if (r.t > 0)
        r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
    r.s = 0;
    r.clamp();
}
// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m, q, r) {
    var pm = m.abs();
    if (pm.t <= 0)
        return;
    var pt = this.abs();
    if (pt.t < pm.t) {
        if (q != null)
            q.fromInt(0);
        if (r != null)
            this.copyTo(r);
        return;
    }
    if (r == null)
        r = nbi();
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
    if (nsh > 0) {
        pm.lShiftTo(nsh, y);
        pt.lShiftTo(nsh, r);
    }
    else {
        pm.copyTo(y);
        pt.copyTo(r);
    }
    var ys = y.t;
    var y0 = y[ys - 1];
    if (y0 == 0)
        return;
    var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
    var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
    var i = r.t, j = i - ys, t = (q == null) ? nbi() : q;
    y.dlShiftTo(j, t);
    if (r.compareTo(t) >= 0) {
        r[r.t++] = 1;
        r.subTo(t, r);
    }
    BigInteger.ONE.dlShiftTo(ys, t);
    t.subTo(y, y); // "negative" y so we can replace sub with am later
    while (y.t < ys)
        y[y.t++] = 0;
    while (--j >= 0) {
        // Estimate quotient digit
        var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
        if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
            y.dlShiftTo(j, t);
            r.subTo(t, r);
            while (r[i] < --qd)
                r.subTo(t, r);
        }
    }
    if (q != null) {
        r.drShiftTo(ys, q);
        if (ts != ms)
            BigInteger.ZERO.subTo(q, q);
    }
    r.t = ys;
    r.clamp();
    if (nsh > 0)
        r.rShiftTo(nsh, r); // Denormalize remainder
    if (ts < 0)
        BigInteger.ZERO.subTo(r, r);
}
// (public) this mod a
function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a, null, r);
    if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
        a.subTo(r, r);
    return r;
}
// Modular reduction using "classic" algorithm
function Classic(m) { this.m = m; }
function cConvert(x) {
    if (x.s < 0 || x.compareTo(this.m) >= 0)
        return x.mod(this.m);
    else
        return x;
}
function cRevert(x) { return x; }
function cReduce(x) { x.divRemTo(this.m, null, x); }
function cMulTo(x, y, r) { x.multiplyTo(y, r); this.reduce(r); }
function cSqrTo(x, r) { x.squareTo(r); this.reduce(r); }
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;
// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit() {
    if (this.t < 1)
        return 0;
    var x = this[0];
    if ((x & 1) == 0)
        return 0;
    var y = x & 3; // y == 1/x mod 2^2
    y = (y * (2 - (x & 0xf) * y)) & 0xf; // y == 1/x mod 2^4
    y = (y * (2 - (x & 0xff) * y)) & 0xff; // y == 1/x mod 2^8
    y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff; // y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y * (2 - x * y % this.DV)) % this.DV; // y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y > 0) ? this.DV - y : -y;
}
// Montgomery reduction
function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp & 0x7fff;
    this.mph = this.mp >> 15;
    this.um = (1 << (m.DB - 15)) - 1;
    this.mt2 = 2 * m.t;
}
// xR mod m
function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t, r);
    r.divRemTo(this.m, null, r);
    if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
        this.m.subTo(r, r);
    return r;
}
// x/R mod m
function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
}
// x = x/R mod m (HAC 14.32)
function montReduce(x) {
    while (x.t <= this.mt2)
        x[x.t++] = 0;
    for (var i = 0; i < this.m.t; ++i) {
        // faster way of calculating u0 = x[i]*mp mod DV
        var j = x[i] & 0x7fff;
        var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
        // use am to combine the multiply-shift-add into one call
        j = i + this.m.t;
        x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
        // propagate carry
        while (x[j] >= x.DV) {
            x[j] -= x.DV;
            x[++j]++;
        }
    }
    x.clamp();
    x.drShiftTo(this.m.t, x);
    if (x.compareTo(this.m) >= 0)
        x.subTo(this.m, x);
}
// r = "x^2/R mod m"; x != r
function montSqrTo(x, r) { x.squareTo(r); this.reduce(r); }
// r = "xy/R mod m"; x,y != r
function montMulTo(x, y, r) { x.multiplyTo(y, r); this.reduce(r); }
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;
// (protected) true iff this is even
function bnpIsEven() { return ((this.t > 0) ? (this[0] & 1) : this.s) == 0; }
// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e, z) {
    if (e > 0xffffffff || e < 1)
        return BigInteger.ONE;
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e) - 1;
    g.copyTo(r);
    while (--i >= 0) {
        z.sqrTo(r, r2);
        if ((e & (1 << i)) > 0)
            z.mulTo(r2, g, r);
        else {
            var t = r;
            r = r2;
            r2 = t;
        }
    }
    return z.revert(r);
}
// (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e, m) {
    var z;
    if (e < 256 || m.isEven())
        z = new Classic(m);
    else
        z = new Montgomery(m);
    return this.exp(e, z);
}
// protected
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
// public
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
// Random number generator - requires a PRNG backend, e.g. prng4.js
// For best results, put code like
// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
// in your main HTML document.
var rng_state;
var rng_pool;
var rng_pptr;
// Mix in a 32-bit integer into the pool
function rng_seed_int(x) {
    rng_pool[rng_pptr++] ^= x & 255;
    rng_pool[rng_pptr++] ^= (x >> 8) & 255;
    rng_pool[rng_pptr++] ^= (x >> 16) & 255;
    rng_pool[rng_pptr++] ^= (x >> 24) & 255;
    if (rng_pptr >= rng_psize)
        rng_pptr -= rng_psize;
}
// Mix in the current time (w/milliseconds) into the pool
function rng_seed_time() {
    rng_seed_int(new Date().getTime());
}
// Initialize the pool with junk if needed.
if (rng_pool == null) {
    rng_pool = new Array();
    rng_pptr = 0;
    var t;
    if (window.crypto && window.crypto.getRandomValues) {
        // Use webcrypto if available
        var ua = new Uint8Array(32);
        window.crypto.getRandomValues(ua);
        for (t = 0; t < 32; ++t)
            rng_pool[rng_pptr++] = ua[t];
    }
    if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
        // Extract entropy (256 bits) from NS4 RNG if available
        var z = window.crypto.random(32);
        for (t = 0; t < z.length; ++t)
            rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
    }
    while (rng_pptr < rng_psize) {
        t = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = t >>> 8;
        rng_pool[rng_pptr++] = t & 255;
    }
    rng_pptr = 0;
    rng_seed_time();
    //rng_seed_int(window.screenX);
    //rng_seed_int(window.screenY);
}
function rng_get_byte() {
    if (rng_state == null) {
        rng_seed_time();
        rng_state = prng_newstate();
        rng_state.init(rng_pool);
        for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
            rng_pool[rng_pptr] = 0;
        rng_pptr = 0;
        //rng_pool = null;
    }
    // TODO: allow reseeding after first request
    return rng_state.next();
}
function rng_get_bytes(ba) {
    var i;
    for (i = 0; i < ba.length; ++i)
        ba[i] = rng_get_byte();
}
function SecureRandom() { }
SecureRandom.prototype.nextBytes = rng_get_bytes;
// Depends on jsbn.js and rng.js
// Version 1.1: support utf-8 encoding in pkcs1pad2
// convert a (hex) string to a bignum object
function parseBigInt(str, r) {
    return new BigInteger(str, r);
}
function linebrk(s, n) {
    var ret = "";
    var i = 0;
    while (i + n < s.length) {
        ret += s.substring(i, i + n) + "\n";
        i += n;
    }
    return ret + s.substring(i, s.length);
}
function byte2Hex(b) {
    return int2char((b >> 4) & 0xf) + int2char(b & 0xf);
    // if(b < 0x10)
    //   return "0" + b.toString(16);
    // else
    //   return b.toString(16);
}
function toHexString(b) {
    var ret = "";
    var i = 0;
    while (i < b.length) {
        ret += byte2Hex(b[i]);
        i++;
    }
    return ret;
}
//! s is a array, type 2
function pkcs1pack2(s, n) {
    if (n < s.length + 11) {
        alert("Message too long for RSA");
        return null;
    }
    var ba = new Array();
    var i = s.length - 1;
    while (i >= 0 && n > 0) {
        ba[--n] = s[i--];
    }
    ba[--n] = 0;
    var rng = new SecureRandom();
    var x = new Array();
    while (n > 2) {
        x[0] = 0;
        while (x[0] == 0)
            rng.nextBytes(x);
        ba[--n] = x[0];
    }
    ba[--n] = 2;
    ba[--n] = 0;
    return new BigInteger(ba);
}
//! s is a array type 1
function pkcs1unpack1(d, n) {
    var b = d.toByteArray();
    var i = 0;
    while (i < b.length && b[i] == 0)
        ++i;
    if (b.length - i != n - 1 || b[i] != 1)
        return null;
    ++i;
    while (b[i] != 0)
        if (++i >= b.length)
            return null;
    var ret = new Array();
    while (++i < b.length) {
        var c = b[i] & 255;
        ret[ret.length] = c;
    }
    return ret;
}
// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2(s, n) {
    if (n < s.length + 11) {
        alert("Message too long for RSA");
        return null;
    }
    var ba = new Array();
    var i = s.length - 1;
    while (i >= 0 && n > 0) {
        var c = s.charCodeAt(i--);
        if (c < 128) {
            ba[--n] = c;
        }
        else if ((c > 127) && (c < 2048)) {
            ba[--n] = (c & 63) | 128;
            ba[--n] = (c >> 6) | 192;
        }
        else {
            ba[--n] = (c & 63) | 128;
            ba[--n] = ((c >> 6) & 63) | 128;
            ba[--n] = (c >> 12) | 224;
        }
    }
    ba[--n] = 0;
    var rng = new SecureRandom();
    var x = new Array();
    while (n > 2) {
        x[0] = 0;
        while (x[0] == 0)
            rng.nextBytes(x);
        ba[--n] = x[0];
    }
    ba[--n] = 2;
    ba[--n] = 0;
    return new BigInteger(ba);
}
// Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext
function pkcs1unpad2(d, n) {
    var b = d.toByteArray();
    var i = 0;
    while (i < b.length && b[i] == 0)
        ++i;
    if (b.length - i != n - 1 || b[i] != 2)
        return null;
    ++i;
    while (b[i] != 0)
        if (++i >= b.length)
            return null;
    var ret = "";
    while (++i < b.length) {
        var c = b[i] & 255;
        if (c < 128) {
            ret += String.fromCharCode(c);
        }
        else if ((c > 191) && (c < 224)) {
            ret += String.fromCharCode(((c & 31) << 6) | (b[i + 1] & 63));
            ++i;
        }
        else {
            ret += String.fromCharCode(((c & 15) << 12) | ((b[i + 1] & 63) << 6) | (b[i + 2] & 63));
            i += 2;
        }
    }
    return ret;
}
// "empty" RSA key constructor
function RSAKey() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null;
}
// Set the public key fields N and e from hex strings
function RSASetPublic(N, E) {
    if (N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = parseBigInt(N, 16);
        this.e = parseInt(E, 16);
    }
    else
        alert("Invalid RSA public key");
}
// Perform raw public operation on "x": return x^e (mod n)
function RSADoPublic(x) {
    return x.modPowInt(this.e, this.n);
}
// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
// function RSAEncrypt(text) {
//   var m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
//   if(m == null) return null;
//   var c = this.doPublic(m);
//   if(c == null) return null;
//   var h = c.toString(16);
//   if((h.length & 1) == 0) return h; else return "0" + h;
// }
//! buff is a Array, must be int8array or uint8array
// for rsa 1024, buff length less then 117
function RSAEncrypt(buff) {
    var m = pkcs1pack2(buff, (this.n.bitLength() + 7) >> 3);
    if (m == null)
        return null;
    var c = this.doPublic(m);
    if (c == null)
        return null;
    var b = c.toByteArray();
    return b;
}
//! descript cipher buff encript by private key.
// return an array() object
function RSADecrypt(buff) {
    var c = parseBigInt(toHexString(buff), 16);
    var m = this.doPublic(c);
    if (m == null)
        return null;
    return pkcs1unpack1(m, (this.n.bitLength() + 7) >> 3);
}
function RSAByteLength() {
    return (this.n.bitLength() + 7) >> 3;
}
// protected
RSAKey.prototype.doPublic = RSADoPublic;
// public
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
RSAKey.prototype.decrypt = RSADecrypt;
RSAKey.prototype.byteLength = RSAByteLength;
// import {ASN1} from "../libs/asn1/asn1";
// import {Base64} from "../libs/asn1/Base64";
// import {Hex} from "../libs/asn1/Hex";
// import {RSAKey} from "../libs/jsbn/rsa";
// import {BitInteger} from "../libs/jsbn/jsbn";
var crylib;
(function (crylib) {
    var s_rt = "10110111101101011011011110101101";
    var crypto = (function () {
        function crypto() {
        }
        crypto.getInstance = function () {
            if (this.s_instance == null) {
                this.s_instance = new crypto();
            }
            return this.s_instance;
        };
        crypto.prototype.init = function (pem) {
            this.m_rsa = new RSAKey();
            if (pem != null)
                this.parseKey(pem);
        };
        crypto.prototype.parseKey = function (pem) {
            try {
                var modulus = 0;
                var public_exponent = 0;
                var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
                var der = reHex.test(pem) ? crylib.Hex.decode(pem) : crylib.Base64.unarmor(pem);
                var asn1 = crylib.ASN1.decode(der);
                // Fixes a bug with OpenSSL 1.0+ private keys
                if (asn1.sub.length === 3) {
                    asn1 = asn1.sub[2].sub[0];
                }
                if (asn1.sub.length === 2) {
                    // Parse the public key.
                    var bit_string = asn1.sub[1];
                    var sequence = bit_string.sub[0];
                    modulus = sequence.sub[0].getHexStringValue();
                    var public_exponent_1 = sequence.sub[1].getHexStringValue();
                    this.m_rsa.setPublic(modulus, public_exponent_1);
                }
                else {
                    return false;
                }
                return true;
            }
            catch (ex) {
                return false;
            }
        };
        crypto.prototype.rsaEncrypt = function (m, begin, length) {
            var leftLength = length;
            var trunk_size = this.m_rsa.byteLength() - 11;
            var c = [];
            while (leftLength > 0) {
                var mlen = leftLength > trunk_size ? trunk_size : leftLength;
                var mbuf = new Uint8Array(m, begin + length - leftLength, mlen);
                var cbuf = this.m_rsa.encrypt(mbuf);
                if (cbuf != null) {
                    for (var i = 0; i < cbuf.length; ++i)
                        c[c.length] = cbuf[i];
                }
                leftLength -= mlen;
            }
            return c;
        };
        crypto.prototype.rsaDecrypt = function (c, begin, length) {
            var leftLength = length;
            var trunk_size = this.m_rsa.byteLength();
            var m = [];
            while (leftLength > 0) {
                var clen = leftLength > trunk_size ? trunk_size : leftLength;
                var cbuf = new Int8Array(c, begin + length - leftLength, clen);
                var mbuf = this.m_rsa.decrypt(cbuf);
                if (mbuf != null) {
                    for (var i = 0; i < mbuf.length; ++i)
                        m[m.length] = mbuf[i];
                }
                leftLength -= clen;
            }
            return m;
        };
        crypto.s_instance = null;
        return crypto;
    }());
    crylib.crypto = crypto;
    __reflect(crypto.prototype, "crylib.crypto");
})(crylib || (crylib = {}));
