class LoadingController extends BaseController {
	private _loadingView:LoadingView;
	public constructor() {
		super();
		this._loadingView = new LoadingView(this,App.Instance.LayerMgr.UIMain);
		App.Instance.ViewMgr.register(ModuleConst.LOADING,this._loadingView);
	}
	public setProgress(current:number,total:number):void{
		this._loadingView.setProgress(current,total);
	}
}