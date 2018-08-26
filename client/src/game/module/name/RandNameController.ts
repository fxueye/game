class RandNameController extends BaseController {
	private _randNameView:RandNameView;
	public constructor() {
		super();
		this._randNameView = new RandNameView(this,App.Instance.LayerMgr.UIPopup);
		App.Instance.ViewMgr.register(ModuleConst.RANDNAME,this._randNameView);
	}
}