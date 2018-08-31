namespace Net.Simple{
    export interface IInvoker{
        Invoke(cmd:Command)
    }
    export class Command{
        private _seqID:number;
        private _opcode:number;
        private _pack:Packet;
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
}