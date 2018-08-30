class ClientCmds implements IClientCmds{
	private _rpc:Net.Simple.SimpleRPC;
	public constructor(rpc:Net.Simple.SimpleRPC) {
		this._rpc = rpc;
	}

	HeartBeat(cmd:Net.Simple.Command, msg:string ){
		console.log("opcode:" + cmd.Opcode +" msg:" + msg);
	}
	LoginSuccess(cmd:Net.Simple.Command, player:PlayerWrap , reconnect:boolean , extension:string ){

	}
	LoginFailed(cmd:Net.Simple.Command, errorCode:number , errMsg:string ){

	}
	
}