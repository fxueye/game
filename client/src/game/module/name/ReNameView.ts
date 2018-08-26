class ReNameView extends BaseUIView{
	public imgMask:eui.Image;
	public gpCenter:eui.Group;
	public ettName:eui.EditableText;
	public btnChange:eui.Button;
	public labTitle:eui.Label;

	public btnConfirm:eui.Button;

	public constructor(controller:BaseController,parent:egret.DisplayObjectContainer) {
		super(controller,parent);
		this.skinName = "skin.RandNameSkin";
		let resource:string[] = [];
		this.setResources(resource);
	}
	public initCompoments():void{
		super.initCompoments();
		this.imgMask.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMaskClick,this);
		this.btnChange.visible = false;
		this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickChange,this);
		this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
		this.labTitle.text = "录入名称";

	}
	public initData():void{
		this.refresh();
    }
	protected refresh():void{
		this.ettName.text = App.Instance.Account.CurrRole.SecName;
    }
	private onClick(evt:egret.TouchEvent){
		var target = evt.currentTarget;
		if(this.btnConfirm.hashCode == target.hashCode){
			var text = this.ettName.text;
			App.Instance.Account.CurrRole.SecName = text;
			App.Instance.ViewMgr.pop(true,false);
			this.Controller.dispatchEventWith(GameDataEvent.DATA_REFRESH);
		}
	}
	private onClickChange(){
		this.ettName.text = GameUtils.RandName();
	}
	public open(...param:any[]):void{
		EffectUtils.OpenEffect(this.gpCenter,EffectType.Slight);
		this.refresh();
		super.open.apply(this,param);
	}
	public close(...param:any[]):void{
	 	super.close.apply(this,param);
	}
	private onMaskClick(evt:egret.TouchEvent){
		App.Instance.ViewMgr.pop(true,false);
	}
	
}
