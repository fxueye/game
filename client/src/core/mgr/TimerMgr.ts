class TimerMgr{
    private _handlers:Array<TimerHander>;
    private _delHandler:Array<TimerHander>;
    private _currTime:number;
    private _currFrame:number;
    private _timeScale:number;
    public constructor(){
        this._handlers = new Array<TimerHander>();
        this._delHandler= new Array<TimerHander>();
        this._currTime = 0;
        this._currFrame = 0;
        this._timeScale = 1;
        egret.Ticker.getInstance().register(this.onEnterFrame,this);
    }
    private onEnterFrame():void{
        this._currFrame++;
        this._currTime = egret.getTimer();
        for(let i:number = 0;i < this._handlers.length;i++){
            let handler:TimerHander = this._handlers[i];
            let t:number = handler.useFrame ? this._currFrame : this._currTime;
            if(t >= handler.exeTime){
                handler.method.call(handler.methodObj,(this._currTime - handler.dealTime) * this._timeScale);
                handler.dealTime = this._currTime;
                handler.exeTime += handler.delay;
                if(!handler.repeat){
                    if(handler.repeatCount > 1){
                        handler.repeatCount--;
                    }else{
                        if(handler.completeMethod){
                            handler.completeMethod.call(handler.complateMethodObj);
                        }
                        this._delHandler.push(handler);
                    }
                }
            }
        }
        while(this._delHandler.length){
            let handler:TimerHander = this._delHandler.pop();
            this.remove(handler.method,handler.methodObj);
        }
    }
    public create(useFrame:boolean,delay:number,repeatCount:number,method:Function,methodObj:any,completeMethod:Function,complateMethodObj:any):void{
        if(delay < 0 || repeatCount < 0 || method == null){
            console.error("Please check delay repeatCount and method!");
            return;
        }
        this.remove(method,methodObj);
        let handler:TimerHander = new TimerHander();
        handler.useFrame = useFrame;
        handler.repeat = repeatCount == 0;
        handler.repeatCount = repeatCount;
        handler.delay = delay;
        handler.method = method;
        handler.methodObj = methodObj;
        handler.completeMethod = completeMethod;
        handler.complateMethodObj = complateMethodObj;
        handler.exeTime = delay + (useFrame ? this._currTime : this._currTime);
        handler.dealTime = this._currTime;
        this._handlers.push(handler);
    }
    //定时执行
    public startTimer(delay:number, repeatCount:number, method:Function, methodObj:any, complateMethod:Function = null, complateMethodObj:any = null):void{
        this.create(false, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj);
        
    }
    
    public startFarme(delay:number, repeatCount:number, method:Function, methodObj:any, complateMethod:Function = null, complateMethodObj:any = null):void{
        this.create(true, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj);
    }
    public remove(method:Function,methodObj:any):void{
        let count = this._handlers.length;
    
        for(let i:number = count - 1; i  >= 0 ; i--){
            let handler:TimerHander = this._handlers[i];
            if(handler.method == method && handler.methodObj == methodObj){
                this._handlers[i] = null;
                this._handlers.splice(i,1);
            }
            break;
        }
    }
    public removeAll(methodObj:any){
        let count = this._handlers.length;
        for(let i:number = count - 1 ; i >= 0; i--){
            let handler:TimerHander = this._handlers[i];
            if(handler.methodObj == methodObj){
                this._handlers[i] = null;
                this._handlers.splice(i,1);
            }
        }
    }
    public get count():number{
        return this._handlers.length;
    }
    public setTimeScale(timeScale:number):void {
        this._timeScale = timeScale;
    }
}

class TimerHander{
    public delay:number = 0;
    public repeat:boolean;
    public repeatCount:number = 0;
    public useFrame:boolean;
    public exeTime:number = 0;
    public method:Function;
    public methodObj:any;
    public completeMethod:Function;
    public complateMethodObj:any;
    public dealTime:number = 0;
    public clear():void{
        this.method = null;
        this.methodObj = null;
        this.completeMethod = null;
        this.complateMethodObj = null;
    }
}