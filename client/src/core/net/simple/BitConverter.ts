namespace Net.Simple{
   export class BitConverter{
        private static littleEndian = true;
        public constructor(){
        }
        public static GetBytes(val:Long):Uint8Array;
        public static GetBytes(val:string):Uint8Array;
        public static GetBytes(val:boolean):Uint8Array;
        public static GetBytes(val:number,t:number):Uint8Array;
        public static GetBytes(val:number,t:number,f:boolean):Uint8Array;

        public static GetBytes(a:any,b?:any,c?:any):Uint8Array{
            if(Long.isLong(a)){
                return BitConverter.Long2Bytes(a,BitConverter.littleEndian);
            }else if((typeof a === "number") && (typeof b === "number")){
                if(c){
                    var ba = new ArrayBuffer(b / 8);
                    var dv = new DataView(ba);
                    if(b == 32){
                        dv.setFloat32(0,a,BitConverter.littleEndian);
                    }else if(b == 64){
                        dv.setFloat64(0,a,BitConverter.littleEndian);
                    }
                    return new Uint8Array(ba);
                }else{
                    var ba = new ArrayBuffer(b / 8);
                    var dv = new DataView(ba);
                    if(b == 8){
                        dv.setUint8(0,a);
                    }else if(b == 16){
                        dv.setUint16(0,a,BitConverter.littleEndian);
                    }else if(b == 32){
                        dv.setUint32(0,a,BitConverter.littleEndian);
                    }
                    return new Uint8Array(ba);
                }
            }else if((typeof a === "boolean")){
                var ba = new ArrayBuffer(1);
                var dv = new DataView(ba);
                dv.setUint8(0,a ? 1 : 0);
                return new Uint8Array(ba);
            }else if((typeof a === "string")){
                var ub =  BitConverter.encodeUTF8(a);
                return ub;
            }
        }

        
        public static Long2Bytes(val:Long,littleEndian:boolean = false):Uint8Array {
            var n = val.toBytes(littleEndian);
            var len = n.length
            var b = new Uint8Array(8);
            for(var i = 0; i< len ; i++){
                b[i] = n[i];
            }
            return b;
        }

        public static ToString(b:Uint8Array,pos:number,length:number):string{
            let bytes = b.subarray(pos, pos + length);
            return BitConverter.decodeUTF8(bytes);
        }
        public static ToNumber(b:Uint8Array,pos:number,t:number = 32,f:boolean = false):number{
            var v = new DataView(b.buffer);
            var val = 0;
            if(f){
                if(t == 32){
                    val = v.getFloat32(pos,BitConverter.littleEndian);
                }else if(t == 64){
                    val = v.getFloat64(pos,BitConverter.littleEndian);
                }
            }else{
                if(t == 8){
                    val = v.getUint8(pos);
                }else if(t == 16){
                    val = v.getUint16(pos,BitConverter.littleEndian);
                }else if(t == 32){
                    val = v.getUint32(pos,BitConverter.littleEndian);
                }
            }
            return val;
        }
        public static ToDouble(b:Uint8Array,pos:number):number{
            return BitConverter.ToNumber(b,pos,64,true);
        }
        public static ToFloat32(b:Uint8Array,pos:number):number{
            return BitConverter.ToNumber(b,pos,32,true);
        }
        public static ToFloat64(b:Uint8Array,pos:number):number{
            return BitConverter.ToNumber(b,pos,64,true);
        }
        public static ToInt16(b:Uint8Array,pos:number):number{
            return BitConverter.ToNumber(b,pos,16,false);
        }
        public static ToInt32(b:Uint8Array,pos:number):number{
            return BitConverter.ToNumber(b,pos,32,false);
        }
        public static ToInt64(b:Uint8Array,pos:number):Long{
            return BitConverter.ToLong(b,pos);
        }
        public static ToLong(b:Uint8Array,pos:number):Long{
            var bytes = b.subarray(pos,pos + 8);
            var n = [];
            for(var i = 0, len = bytes.length ; i < len; i++){
                n[i] = bytes[i];
            }
            return Long.fromBytes(n,true,BitConverter.littleEndian);
        }
        public static ToBoolean(b:Uint8Array,pos:number):boolean{
            var v = new DataView(b.buffer);
            var val =  v.getUint8(pos) == 1 ? true : false;
            return val;
        }
        public static ToByte(b:Uint8Array,pos:number):number {
            var v = new DataView(b.buffer);
            var val = v.getUint8(pos);
            return val;
        }
    /**
        * UTF-8 Encoding/Decoding
        */
    public static encodeUTF8(str: string): Uint8Array {
        let pos: number = 0;
        let codePoints = BitConverter.stringToCodePoints(str);
        let outputBytes = [];

        while (codePoints.length > pos) {
            let code_point: number = codePoints[pos++];

            if (BitConverter.inRange(code_point, 0xD800, 0xDFFF)) {
                BitConverter.encoderError(code_point);
            }
            else if (BitConverter.inRange(code_point, 0x0000, 0x007f)) {
                outputBytes.push(code_point);
            } else {
                let count, offset;
                if (BitConverter.inRange(code_point, 0x0080, 0x07FF)) {
                    count = 1;
                    offset = 0xC0;
                } else if (BitConverter.inRange(code_point, 0x0800, 0xFFFF)) {
                    count = 2;
                    offset = 0xE0;
                } else if (BitConverter.inRange(code_point, 0x10000, 0x10FFFF)) {
                    count = 3;
                    offset = 0xF0;
                }

                outputBytes.push(BitConverter.div(code_point, Math.pow(64, count)) + offset);

                while (count > 0) {
                    let temp = BitConverter.div(code_point, Math.pow(64, count - 1));
                    outputBytes.push(0x80 + (temp % 64));
                    count -= 1;
                }
            }
        }
        return new Uint8Array(outputBytes);
    }

    /**
        *
        * @param data
        * @returns
        */
    public static decodeUTF8(data: Uint8Array): string {
        let fatal: boolean = false;
        let pos: number = 0;
        let result: string = "";
        let code_point: number;
        let utf8_code_point = 0;
        let utf8_bytes_needed = 0;
        let utf8_bytes_seen = 0;
        let utf8_lower_boundary = 0;

        while (data.length > pos) {

            let _byte = data[pos++];

            if (_byte == BitConverter.EOF_byte) {
                if (utf8_bytes_needed != 0) {
                    code_point = BitConverter.decoderError(fatal);
                } else {
                    code_point = BitConverter.EOF_code_point;
                }
            } else {

                if (utf8_bytes_needed == 0) {
                    if (BitConverter.inRange(_byte, 0x00, 0x7F)) {
                        code_point = _byte;
                    } else {
                        if (BitConverter.inRange(_byte, 0xC2, 0xDF)) {
                            utf8_bytes_needed = 1;
                            utf8_lower_boundary = 0x80;
                            utf8_code_point = _byte - 0xC0;
                        } else if (BitConverter.inRange(_byte, 0xE0, 0xEF)) {
                            utf8_bytes_needed = 2;
                            utf8_lower_boundary = 0x800;
                            utf8_code_point = _byte - 0xE0;
                        } else if (BitConverter.inRange(_byte, 0xF0, 0xF4)) {
                            utf8_bytes_needed = 3;
                            utf8_lower_boundary = 0x10000;
                            utf8_code_point = _byte - 0xF0;
                        } else {
                            BitConverter.decoderError(fatal);
                        }
                        utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
                        code_point = null;
                    }
                } else if (!BitConverter.inRange(_byte, 0x80, 0xBF)) {
                    utf8_code_point = 0;
                    utf8_bytes_needed = 0;
                    utf8_bytes_seen = 0;
                    utf8_lower_boundary = 0;
                    pos--;
                    code_point = BitConverter.decoderError(fatal, _byte);
                } else {

                    utf8_bytes_seen += 1;
                    utf8_code_point = utf8_code_point + (_byte - 0x80) * Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);

                    if (utf8_bytes_seen !== utf8_bytes_needed) {
                        code_point = null;
                    } else {

                        let cp = utf8_code_point;
                        let lower_boundary = utf8_lower_boundary;
                        utf8_code_point = 0;
                        utf8_bytes_needed = 0;
                        utf8_bytes_seen = 0;
                        utf8_lower_boundary = 0;
                        if (BitConverter.inRange(cp, lower_boundary, 0x10FFFF) && !BitConverter.inRange(cp, 0xD800, 0xDFFF)) {
                            code_point = cp;
                        } else {
                            code_point = BitConverter.decoderError(fatal, _byte);
                        }
                    }

                }
            }
            //Decode string
            if (code_point !== null && code_point !== BitConverter.EOF_code_point) {
                if (code_point <= 0xFFFF) {
                    if (code_point > 0) result += String.fromCharCode(code_point);
                } else {
                    code_point -= 0x10000;
                    result += String.fromCharCode(0xD800 + ((code_point >> 10) & 0x3ff));
                    result += String.fromCharCode(0xDC00 + (code_point & 0x3ff));
                }
            }
        }
        return result;
    }
    public static decoderError(fatal, opt_code_point?): number {
        if (fatal) {
            console.error(1027);
        }
        return opt_code_point || 0xFFFD;
    }
    public static encoderError(code_point) {
        console.error(1027,code_point);
    }
    public static EOF_byte: number = -1;

    public static EOF_code_point: number = -1;
    /**
        *
        * @param string
        */
    public static stringToCodePoints(string) {
        /** @type {Array.<number>} */
        let cps = [];
        // Based on http://www.w3.org/TR/WebIDL/#idl-DOMString
        let i = 0, n = string.length;
        while (i < string.length) {
            let c = string.charCodeAt(i);
            if (!BitConverter.inRange(c, 0xD800, 0xDFFF)) {
                cps.push(c);
            } else if (BitConverter.inRange(c, 0xDC00, 0xDFFF)) {
                cps.push(0xFFFD);
            } else { // (inRange(c, 0xD800, 0xDBFF))
                if (i == n - 1) {
                    cps.push(0xFFFD);
                } else {
                    let d = string.charCodeAt(i + 1);
                    if (BitConverter.inRange(d, 0xDC00, 0xDFFF)) {
                        let a = c & 0x3FF;
                        let b = d & 0x3FF;
                        i += 1;
                        cps.push(0x10000 + (a << 10) + b);
                    } else {
                        cps.push(0xFFFD);
                    }
                }
            }
            i += 1;
        }
        return cps;
    }

    /**
        *
        * @param a
        * @param min
        * @param max
        */
    public static inRange(a, min, max) {
        return min <= a && a <= max;
    }
    /**
        *
        * @param n
        * @param d
        */
    public static div(n, d) {
        return Math.floor(n / d);
    }
    }
}