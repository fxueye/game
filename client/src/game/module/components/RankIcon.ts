class RankIcon extends Icon{
	public imgRank:eui.Image;
    public lbRank:eui.Label;
	public constructor() {
		super();
		
	}
	protected createChildren():void {
        super.createChildren();
		this.imgRank.visible = true;
		// this.lbRank.visible = true;
    }
	protected dataChanged(): void{
        if(this.data.Rank == 0){
            this.imgRank.visible = false;
        }else{
            this.imgRank.visible = true;
        }
		if(this.data.Rank < 4){
			this.lbRank.visible = false;
		}else{
			this.lbRank.visible = true;
		}
		this.lbRank.text = StringUtils.pad(this.data.Rank,2);
    }
}