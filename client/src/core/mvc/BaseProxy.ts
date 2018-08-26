class BaseProxy{
    protected _controller:BaseController;
    public constructor(controller:BaseController){
        this._controller = controller;
    }
}