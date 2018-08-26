class SettingView extends BaseUIView{
	public imgMask:eui.Image;
	public gpCenter:eui.Group;
	public tgsSound:eui.ToggleSwitch;
	public hSliderGame:eui.HSlider;
	public hSliderBg:eui.HSlider;
	public hSliderDub:eui.HSlider;
	public constructor(controller:BaseController,parent:egret.DisplayObjectContainer) {
		super(controller,parent);
		this.skinName = "skin.SettingSkin";
		let resource:string[] = ["setting"];
		this.setResources(resource);
	}
	public initCompoments():void{
		super.initCompoments();
		this.imgMask.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMaskClick,this);
		this.tgsSound.addEventListener(egret.Event.CHANGE,this.onChange,this);
		this.hSliderBg.maximum = 100;
		this.hSliderDub.maximum = 100;
		this.hSliderGame.maximum = 100;
		this.hSliderBg.addEventListener(egret.Event.CHANGE,this.onChange,this);
		this.hSliderGame.addEventListener(egret.Event.CHANGE,this.onChange,this);
		this.hSliderDub.addEventListener(egret.Event.CHANGE,this.onChange,this);
	}
	public initData():void{
		this.refresh();
    }
	protected refresh():void{
		this.tgsSound.selected = App.Instance.Account.OpenSound;
		this.hSliderBg.value = App.Instance.Account.BgSoundVolume;
		this.hSliderGame.value = App.Instance.Account.EffectSoundVolume;
		this.hSliderDub.value = App.Instance.Account.DubSoundVolume;
    }
	private onChange(evt:egret.Event){
		if(this.tgsSound.hashCode == evt.currentTarget.hashCode){
			GameUtils.play(GameSound.BUTTON_1);
			App.Instance.Account.OpenSound = this.tgsSound.selected;
		}else if(this.hSliderBg.hashCode == evt.currentTarget.hashCode){
			App.Instance.Account.BgSoundVolume = this.hSliderBg.value;
		}else if(this.hSliderGame.hashCode == evt.currentTarget.hashCode){
			App.Instance.Account.EffectSoundVolume = this.hSliderGame.value;
		}else if(this.hSliderDub.hashCode == evt.currentTarget.hashCode){
			App.Instance.Account.DubSoundVolume = this.hSliderDub.value;
		}
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