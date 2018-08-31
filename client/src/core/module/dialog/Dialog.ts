class Dialog extends eui.Component{
	public imgMask:eui.Image;
	public gpCenter:eui.Group;
	public labTitle:eui.Label;
	public labMsg:eui.Label;
	public btnCancel:eui.Button;
	public btnComfirm:eui.Button;
	

	private _parent:egret.DisplayObjectContainer;
    private _resources:string[] = null;
	private _cancel:Function = null;
	private _comfirm:Function = null;
	private _obj:any = null;
	private _title:string;
	private _msg:string;
	private _isInit:boolean;
	private _canCancel:boolean = true;
	public constructor() {
		super();
		this.skinName = "skin.DialogSkin";
		this._resources = ["setting"];
		this._parent = App.Instance.LayerMgr.UIPopup;
	}
	public initCompoments():void{
		this._isInit = true;
		this.imgMask.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMaskClick,this);
		this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
		this.btnComfirm.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
		this.btnCancel.visible = false;
		this.btnComfirm.visible = false;
	}
    public isInit():boolean{
        return this._isInit;
    }
    public isShow():boolean{
        return this.stage != null && this.visible;
    }
	protected refresh():void{
		if(this.isInit()){
			this.labTitle.text = this._title;
			this.labMsg.text = this._msg;
			if(this._obj == null || this._cancel == null ){
				this.btnComfirm.x =  this.btnComfirm.parent.width / 2 ;
				this.btnComfirm.visible = true;
			}
			if(this._obj != null && this._cancel != null && this._comfirm == null ){
				this.btnCancel.x =  this.btnCancel.parent.width / 2 ;
				this.btnCancel.visible = true;
			}
		}
		
    }
	public open(...param:any[]):Dialog{
        if(this.isShow()){
            this.setVisible(true);
            return this;
        }
        if(this.isInit()){
            this.setVisible(true);
            this.addToParent();
        }else{
            App.Instance.EasyLoading.showLoading();
            this.loadResource(function(){
                this.setVisible(false);
                this.addToParent();
            }.bind(this),function(){
                this.initCompoments();
                this.setVisible(true);
				EffectUtils.OpenEffect(this.gpCenter,EffectType.Slight);
				this.refresh();
                App.Instance.EasyLoading.hideLoading();
            }.bind(this));
        }
        return this;

	}

	public loadResource(loadComplete:Function,initComplete:Function):void{
        if(this._resources && this._resources.length > 0){
            App.Instance.RES.loadResource(this._resources,[],loadComplete,null,this);
            this.once(eui.UIEvent.CREATION_COMPLETE,initComplete,this);
        }else{
            loadComplete();
            initComplete();
        }
    }
	public addToParent():void{
        this._parent.addChild(this);
    }
    public removeFromParent():void{
        this.parent.removeChild(this);
    }
    public setVisible(value:boolean):void{
        this.visible = value;
    }
	public close(...param:any[]):void{
	 	 if(!this.isShow()){
            return;
        }
        this.setVisible(false);
        this.removeFromParent();
	}
	private onMaskClick(evt:egret.TouchEvent){
		if(this._canCancel){
			this.close();
		}
	}
	private onClick(evt:egret.TouchEvent){
		var target = evt.target;
		if(target.hashCode == this.btnCancel.hashCode){
			if(this._cancel != null){
				this._cancel.call(this._obj);
			}
			this.close();
		}else if(target.hashCode == this.btnComfirm.hashCode){
			if(this._comfirm  != null){
				this._comfirm.call(this._obj);
			}
			this.close();
		}
	}
	public set Titile (val:string){
		this._title = val;
	}
	public set Msg(val:string){
		this._msg = val;
	}
	public set CanCancel(val:boolean){
		this._canCancel = val; 
	}
	public set Obj(val:any){
		this._obj = val;
	}
	public set Cancel(val:Function){
		this.btnCancel.visible = true;
		this._cancel = val;
	}
	public set ComFirm(val:Function){
		this.btnComfirm.visible = true;
		this._comfirm = val;
	}


	public static makeDialog(title:string,msg:string,cancel:boolean = true,obj:any = null,comfirmFunc:Function = null,cancelFunc:Function = null):Dialog{
		var d = new Dialog();
		d.Titile = title;
		d.Msg = msg;
		d.CanCancel = cancel;
		if(obj != null){
			d.Obj = obj;
			if(cancelFunc != null){
				d.Cancel= cancelFunc;
			}
			if(comfirmFunc != null){
				d.ComFirm = comfirmFunc;
			}
		}
		return d;
	}

}
