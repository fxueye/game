class ClientCmds implements IClientCmds{
	private _rpc:Net.Simple.SimpleRPC;
	public constructor(rpc:Net.Simple.SimpleRPC) {
		this._rpc = rpc;
	}


	HeartBeat(cmd:Net.Simple.Command):void{
		console.log("opcode:" + cmd.Opcode);
		this._rpc.Send(0);
	}
}