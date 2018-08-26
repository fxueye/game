class Packet{
    public static readonly PACKET_DEFAULT_LEN:number = 256;
    public static readonly PACKET_MAX_LEN:number = 1024 * 1024;
    protected buffer:ArrayBuffer;
    protected pos:number;
    protected size:number;
    public constructor(bytes:ArrayBuffer,length:number,index:number = 0){
        if(length > Packet.PACKET_MAX_LEN){
            throw new Error("init len is larger than max length: " + Packet.PACKET_MAX_LEN);
        }
        if(index < 0 || index >= length){
            throw new Error("invalid index of bytes, index: " + index);
        }
        this.pos = index;
        this.size = length;
        this.buffer = new ArrayBuffer(length);
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
    public get Buffer():ArrayBuffer{
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
    public GetData():ArrayBuffer{
        var bytes = new ArrayBuffer(this.size);
        Packet.CopyBuffer(this.buffer,bytes,this.size);
        return bytes;
    }
    public PutBytes(bytes:ArrayBuffer){
        this.EnsureCapacity(bytes.byteLength);
        Packet.CopyBuffer(bytes,0,this.buffer,this.pos,bytes.byteLength);
        this.pos += bytes.byteLength;
        if(this.size < this.pos) this.size = this.pos;
    }
    public GetBytes(dest:ArrayBuffer,start:number,length:number){
        Packet.CopyBuffer(this.buffer,this.pos,dest,start,length);
        this.pos += length;
    }
    public PutBool(value:boolean){
        this.EnsureCapacity(1);
        var src = BitConverter.GetBytes(value);
        Packet.CopyBuffer(src,0,this.buffer,this.pos,src.byteLength);
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
        Packet.CopyBuffer(src,0,this.buffer,this.pos,src.byteLength);
        this.pos += src.byteLength;
        if(this.size < this.pos) this.size = this.pos;
    }
    public GetShort():number{
        var rst = BitConverter.ToInt32(this.buffer,this.pos);
        this.pos += 2;
        return rst;
    }
    public PutInt(val:number){
        this.EnsureCapacity(4);
        var src = BitConverter.GetBytes(val,32);
        Packet.CopyBuffer(src,0,this.buffer,this.pos,src.byteLength);
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
        Packet.CopyBuffer(src,0,this.buffer,this.pos,src.byteLength);
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
        Packet.CopyBuffer(src,0,this.buffer,this.pos,src.byteLength);
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
        let newBuffer = new ArrayBuffer(newCapacity);
        Packet.CopyBuffer(this.buffer,newBuffer,this.size);
        this.buffer = newBuffer;
    }
    public static CopyBuffer(src:ArrayBuffer,idx:number,dst:ArrayBuffer,index:number,len:number):void;
    public static CopyBuffer(src:ArrayBuffer,dst:ArrayBuffer,size:any):void;

    public static CopyBuffer(a:any,b:any,c?:any,d?:any,e?:any):any{
        let src = null;
        let dst = null;
        let size = null;
        let idx = null;
        let index = null;
        let len = null;


        if(a instanceof ArrayBuffer){
            src = <ArrayBuffer> a;
        }
        if(typeof b === "number"){
            idx = b;
        }else if(b instanceof ArrayBuffer){
            dst = <ArrayBuffer> b;
        }
        if(c instanceof ArrayBuffer){
            dst = <ArrayBuffer> c;
        }else if(typeof c === "number"){
            size = c;
        }
        if(typeof d === "number"){
            index = d;
        }
        if(typeof e === "number"){
            len = e;
        }
        if((src instanceof ArrayBuffer) && (dst instanceof ArrayBuffer) ){
            let dstArray:Int8Array = new Int8Array(dst);
            let srcArray:Int8Array = new Int8Array(src);
            if((typeof size === "number")){
                for(var i =0;i < size ; i++){
                    dstArray[i] = srcArray[i];
                }
            }
            if((typeof idx === "number") && (typeof index === "number") && (typeof len === "number")){
                let srcLen = src.byteLength;
                let endIdx = idx + srcLen;
                for(var i = idx; i < len; i++){
                    if(idx < endIdx){
                        dstArray[i] = srcArray[i];
                    }else{
                        //TODO
                    }
                }
            }
        }
        
        
    }



}