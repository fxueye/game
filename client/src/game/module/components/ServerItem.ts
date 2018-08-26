class ServerItem extends eui.ItemRenderer {
	public labServerName:eui.Label;
	public constructor() {
		super()
		this.skinName = "skin.Server";
	}
	protected dataChanged(): void{
		this.labServerName.text = this.data.SocketIp+":"+this.data.SocketPort;
	}
}