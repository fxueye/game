namespace Net.Simple{
    export class Packet{
        public static readonly PACKET_DEFAULT_LEN:number = 256;
        public static readonly PACKET_MAX_LEN:number = 1024 * 1024;
        protected buffer:Uint8Array;
        protected pos:number;
        protected size:number;
        public constructor(bytes?:Uint8Array,length?:number,index:number = 0){
            if(length != null && length > Packet.PACKET_MAX_LEN){
                throw new Error("init len is larger than max length: " + Packet.PACKET_MAX_LEN);
            }
            if((index != null && length != null) && (index < 0 || index >= length)){
                throw new Error("invalid index of bytes, index: " + index);
            }
            var len = length ? length : Packet.PACKET_DEFAULT_LEN;
            this.pos = index ? index : 0;
            this.size = length ? length : 0;
            if(bytes){
                this.buffer = bytes;
                this.size = bytes.byteLength;
            }else{
                this.buffer = new Uint8Array(len);
            }
        }

        public get Position():number{
            return this.pos;
        }
        public set Position(val:number){
            this.pos = val;
        }
        public get Size():number{
            return this.size;
        }
        public set Size(val:number){
            this.size = val;
        }
        public get Capability():number{
            return this.buffer.byteLength;
        }
        public get Remaining():number{
            return this.size - this.pos;
        }
        public get Buffer():Uint8Array{
            return this.buffer;
        }

        public Flip():void{
            this.size = this.pos;
            this.pos = 0;
        }
        public Rewind():void{
            this.pos = 0;
        }
        public Clear():void{
            this.pos = 0;
            this.size = 0;
        }
        public End():boolean{
            return this.pos == this.size;
        }
        public GetData():Uint8Array{
            return this.buffer;
        }
        public PutBytes(bytes:Uint8Array){
            this.EnsureCapacity(bytes.byteLength);
            this.buffer.set(bytes,this.pos);
            this.pos += bytes.byteLength;
            if(this.size < this.pos) this.size = this.pos;
        }
        public GetBytes(dest:Uint8Array,start:number,length:number){
            if(!dest){
                return;
            }
            dest.set(this.buffer.subarray(this.pos,this.pos + length),start);
            this.pos += length;
        }
        public PutBool(value:boolean){
            this.EnsureCapacity(1);
            var src = BitConverter.GetBytes(value);
            // Packet.CopyBuffer(src,0,this.buffer,this.pos,src.byteLength);
            this.buffer.set(src,this.pos);
            this.pos += src.byteLength;
            if(this.size < this.pos) this.size = this.pos;
        }
        public GetBool(){
            var rst = BitConverter.ToBoolean(this.buffer,this.pos);
            this.pos += 1;
            return rst;
        }
        public PutShort(val:number){
            this.EnsureCapacity(2);
            var src = BitConverter.GetBytes(val,16);
            this.buffer.set(src,this.pos);
            this.pos += src.byteLength;
            if(this.size < this.pos) this.size = this.pos;
        }
        public GetShort():number{
            var rst = BitConverter.ToInt16(this.buffer,this.pos);
            this.pos += 2;
            return rst;
        }
        public PutInt(val:number){
            this.EnsureCapacity(4);
            var src = BitConverter.GetBytes(val,32);
            this.buffer.set(src,this.pos);
            this.pos += src.byteLength;
            if(this.size < this.pos) this.size = this.pos;
        }
        public GetInt():number{
            var rst = BitConverter.ToInt32(this.buffer,this.pos);
            this.pos += 4;
            return rst;
        }
        public PutLong(val:number){
            this.EnsureCapacity(8);
            var src = BitConverter.GetBytes(val,64);
            this.buffer.set(src,this.pos);
            this.pos += src.byteLength;
            if(this.size < this.pos) this.size = this.pos;
        }
        public GetLong():number{
            var rst = BitConverter.ToInt64(this.buffer,this.pos);
            this.pos += 8;
            return rst;
        }
        public PutFloat(val:number){
            this.EnsureCapacity(4);
            var src = BitConverter.GetBytes(val,32,true);
            this.buffer.set(src,this.pos);
            this.pos += src.byteLength;
            if(this.size < this.pos) this.size = this.pos;
            
        }
        public GetFloat():number{
            var rst = BitConverter.ToFloat32(this.buffer,this.pos);
            this.pos += 4;
            return rst;
        }
        public PutDouble(val:number){
            this.EnsureCapacity(8);
            var src = BitConverter.GetBytes(val,32,true);
            this.pos += src.byteLength;
            if(this.size < this.pos) this.size = this.pos;
        }
        public GetDouble():number{
            var rst = BitConverter.ToDouble(this.buffer,this.pos);
            this.pos += 8;
            return rst;
        }
        public PutString(val:string){
            if(val == null) val= "";
            var src = BitConverter.GetBytes(val);
            var len = src.byteLength;
            this.EnsureCapacity(2 + len);
            this.PutShort(len);
            this.buffer.set(src,this.pos);
            this.pos += len;
            if(this.size < this.pos) this.size = this.pos;
        }
        public GetString():string{
            var len = this.GetShort();
            if(len == 0) return "";
            var str = BitConverter.ToString(this.buffer,this.pos,len);
            this.pos += len;
            return str;
        }
        private EnsureCapacity(increament:number):void{
            if(this.Capability - this.Position >= increament){
                return;
            }
            let requiredCapacity = this.Position + increament;
            if(requiredCapacity > Packet.PACKET_MAX_LEN){
                throw new Error("required buffer is too long to pck max length: " + Packet.PACKET_MAX_LEN);
            }
            let newCapacity = requiredCapacity > this.Capability * 2 ? requiredCapacity : this.Capability * 2;
            newCapacity = requiredCapacity > Packet.PACKET_MAX_LEN ? Packet.PACKET_MAX_LEN : newCapacity;
            let newBuffer = new Uint8Array(newCapacity);
            newBuffer.set(this.buffer,0);
            this.buffer = newBuffer;
        }
    }
}