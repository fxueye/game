class ViewMgr{
    private _views:any;
    private _opens:Array<number>;
    
    public constructor(){
        this._views = {};
        this._opens = [];
    }

    public register(key:number,view:IBaseView):void{
        if(view == null){
            return;
        }
        if(this._views[key]){
            return;
        }
        this._views[key] = view;
    }

    public unregister(key:number){
        if(!this._views[key]){
            return;
        }
        this._views[key] = null;
        delete this._views[key];
    }

    public getView(key:number):IBaseView{
        return this._views[key];
    }

    public destroy(key:number,newView:IBaseView = null):void{
        let oldView:IBaseView = this.getView(key);
        if(oldView){
            this.unregister(key);
            oldView.destroy();
            oldView = null;
        }
        if(newView)
            this.register(key,newView);
    }

    public open(key:number,...param:any[]):IBaseView{
        let view:IBaseView = this.getView(key);
        if(view == null){
            console.error("view_" + key + " not find!");
            return;
        }
        if(view.isShow()){
            // view.open.apply(view,param);
            view.setVisible(true);
            return view;
        }
        if(view.isInit()){
            view.setVisible(true);
            view.addToParent();
            view.open.apply(view,param);
        }else{
            App.Instance.EasyLoading.showLoading();
            view.loadResource(function(){
                view.setVisible(false);
                view.addToParent();
            }.bind(this),function(){
                view.initCompoments();
                view.initData();
                view.open.apply(view,param);
                view.setVisible(true);
                view.afterOpen.apply(view);
                App.Instance.EasyLoading.hideLoading();
            }.bind(this));
        }
        return view;
    }
    public push(key:number,closeLast:boolean = true,...param:any[]){
        var index = this._opens.indexOf(key);
        if(index > -1){
            return;
        }

        var lastKey = this._opens[this._opens.length - 1];
        if(lastKey && closeLast)
            this.close(lastKey);
        var params = [];
        params.push(key);
        params.push.apply(params,param)
        this.open.apply(this,params);
        this._opens.push(key);
    }
    public pop(openLast:boolean = true,effec:boolean = true){
        if(effec){
            EffectUtils.MovieEffect(5);
        }
        let key  =  this._opens.pop();
        if(key)
            this.close(key);
        var lastKey = this._opens[this._opens.length - 1];
        if(lastKey && openLast)
            this.open(lastKey);
    }
    public close(key:number, ...param:any[]):void{
        if(!this.isShow(key)){
            return;
        }
        let view:IBaseView = this.getView(key);
        if(view == null){
            return;
        }
        view.setVisible(false);
        view.removeFromParent();
        view.close.apply(view,param);
    }
    public closeAll(){
        for(var i = this._opens.length - 1 ; i >= 0; i-- )
        {
            let key = this._opens.pop();
            if(key)
                this.close(key);
        }
    }
    public closeView(view:IBaseView, ...param:any[]):void{
        let keys = Object.keys(this._views);
        for(let i:number = 0 ; i < keys.length - 1; i++){
            let key:number = parseInt(keys[i]);
            if(this._views[key] == view){
                this.close(key,param);
                return;
            }
        }
    }
    public isShow(key:number):boolean{
        var view= this.getView(key);
        return view.isShow();
    }
    public onPause():void{
        for(var id of this._opens){
            var view  = this.getView(id);
            if(view){
                view.onPause();
            }
        }
    }
    public onResume():void{
        for(var id of this._opens){
            var view  = this.getView(id);
            if(view){
                view.onResume();
            }
        }
    }

}