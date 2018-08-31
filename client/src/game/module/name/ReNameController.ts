class ReNameController extends BaseController {
	private _reNameView:ReNameView;
	public constructor() {
		super();
		this._reNameView = new ReNameView(this,App.Instance.LayerMgr.UIPopup);
		App.Instance.ViewMgr.register(ModuleConst.RENAME,this._reNameView);
	}
}