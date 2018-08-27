class Request{
    private _pack:Packet;
    private _seqID:number;
    private _opcode:number;

    public constructor(seqID:number,opcode:number,pack:Packet){
        this._pack = pack;
        this._seqID = seqID;
        this._opcode = opcode;
    }
    public get SeqID():number{
        return this._seqID;
    }
    public get Opcode():number{
        return this._opcode;
    }
    public get Pack():Packet{
        return this._pack;
    }
}