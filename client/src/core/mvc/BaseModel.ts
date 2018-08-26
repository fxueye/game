class BaseModel{
    protected _controller:BaseController;
    public constructor(controller:BaseController){
        this._controller = controller;
        this._controller.setModel(this);
    }
}