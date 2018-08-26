class ServerController extends BaseController {
	private _serverView:ServerView;
	public constructor() {
		super();
		this._serverView = new ServerView(this,App.Instance.LayerMgr.UIPopup);
		App.Instance.ViewMgr.register(ModuleConst.SERVERLIST,this._serverView);
	}
}