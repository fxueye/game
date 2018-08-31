class SettingControler extends BaseController {
	private _settingView:SettingView;
	public constructor() {
		super();
		this._settingView = new SettingView(this,App.Instance.LayerMgr.UIPopup);
		App.Instance.ViewMgr.register(ModuleConst.SETTING,this._settingView);
	}
}