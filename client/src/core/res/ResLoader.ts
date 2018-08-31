class ResLoader{
    private _configs:Array<any>;
    private _onConfigComplete:Function;
    private _onConfigCompleteTarget:any;
    private _groups:any;
    private _groupIndex:number = 0;

    public constructor(){
        this._configs = new Array<any>();
        this._groups = {};
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceLoadProgress,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
    }
    
    public addConfig(jsonPath:string ,filePath:string):void{
        this._configs.push([jsonPath,filePath]);
    }
    public setComplete(onConfigComplete:Function, onConfigCompleteTarget:any):void{
        this._onConfigComplete = onConfigComplete;
        this._onConfigCompleteTarget = onConfigCompleteTarget;
    }
    public loadConfig(onConfigComplete:Function, onConfigCompleteTarget:any):void{
        this._onConfigComplete = onConfigComplete;
        this._onConfigCompleteTarget = onConfigCompleteTarget;
        this.loadNextConfig();
    }
    public async asyncLoadConfig():Promise<any>{
        while(this._configs.length != 0){
            let arr:any = this._configs.shift();
            await RES.loadConfig(arr[0],arr[1]);
        }
    }
    private loadNextConfig():void{
        if(this._configs.length == 0){
            this._onConfigComplete.call(this._onConfigCompleteTarget);
            this._onConfigComplete = null;
            this._onConfigCompleteTarget = null;
            return;
        }
        let arr:any = this._configs.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigCompleteHandle,this);
        RES.loadConfig(arr[0],arr[1]);
    }
    private onConfigCompleteHandle(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigCompleteHandle,this);
        this.loadNextConfig();
    }
    public async asyncLoadGroup(groupName:string,reporter?: RES.PromiseTaskReporter):Promise<any>{
        return RES.loadGroup(groupName,0,reporter);
    }
    public loadGroup(groupName:string,onResourceLoadComplete:Function,onResourceLoadProgress:Function,onResourceLoadCompleteTarget:any): void{
        this._groups[groupName] = [onResourceLoadComplete,onResourceLoadProgress,onResourceLoadCompleteTarget];
        RES.loadGroup(groupName);
    }
    public loadGroups(groupName:string,subGroups:Array<any>,onResourceLoadComplete:Function, onResourceLoadProgress:Function, onResourceLoadTarget:any):void{
        RES.createGroup(groupName,subGroups,true);
        this.loadGroup(groupName,onResourceLoadComplete,onResourceLoadProgress,onResourceLoadTarget);
    }


    private onResourceLoadComplete(event: RES.ResourceEvent):void{
        let groupName: string = event.groupName;
        if(this._groups[groupName]){
            let loadComplete:Function = this._groups[groupName][0];
            let loadCompleteTarget:any = this._groups[groupName][2];
            if(loadComplete != null){
                loadComplete.call(loadCompleteTarget,groupName);
            }
            this._groups[groupName] = null;
            delete this._groups[groupName];
        }
    }
    private onResourceLoadProgress(event: RES.ResourceEvent):void{
        let groupName: string = event.groupName;
        if(this._groups[groupName]){
            let loadProgress:Function = this._groups[groupName][1];
            let loadProgressTarget:any = this._groups[groupName[2]];
            if(loadProgress != null){
                loadProgress.call(loadProgressTarget,event.itemsLoaded,event.itemsTotal);
            }
        }
    }
    private onResourceLoadError(event: RES.ResourceEvent):void{
        Logger.log(event.groupName + " load failed!");
        this.onResourceLoadComplete(event);
    }

    public createGroup(groupName:string , resKeys:string[]):void{
        RES.createGroup(groupName,resKeys,true);
    }

    public loadResource(resource = [],groups = [],onResourceLoadComplete:Function = null,onResourceLoadProgress:Function = null,onResourceLoadCompleteTarget:any = null):void{
        let needLoadArr = resource.concat(groups);
        let tempName = "loadGroup_" + this._groupIndex++;
        RES.createGroup(tempName,needLoadArr,true);
        this._groups[tempName] =  [onResourceLoadComplete,onResourceLoadProgress,onResourceLoadCompleteTarget];
        RES.loadGroup(tempName);
    }


}
