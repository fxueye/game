namespace Net.Simple{
    export class Request{
        private _pack:Packet;
        private _seqID:number;
        private _opcode:number;
        private _func:Function;
        private _obj:any;

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
        public func(func:Function,obj:any){
            this._func = func;
            this._obj = obj;
        }
        public Call(cmd:Net.Simple.Command){
            this._func.call(this._obj,cmd);
        }
    }
}
