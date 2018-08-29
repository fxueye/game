interface IClientCmds 
{
	HeartBeat(cmd:Net.Simple.Command):void;
}
class ClientCmdsInvoker implements Net.Simple.IInvoker {
	private _cmds:IClientCmds = null;
	private _onCmdInvoked:Function = null;
	private _obj:any = null;
	public constructor(cmds:IClientCmds) {
		this._cmds = cmds;
	}
	public SetOnCmdInvoked(func:Function,obj:any){
		this._onCmdInvoked = func;
		this._obj = obj;
	}
	public Invoke(cmd:Net.Simple.Command):void{
		var pack = cmd.Pack;
		switch(cmd.Opcode){
			case ClientCmdsCodes.HEART_BEAT:
				this._cmds.HeartBeat(cmd);
			break;
		}
		if(this._onCmdInvoked != null && this._obj != null){
			this._onCmdInvoked.call(this._obj,cmd.Opcode);

		}
	}	

}