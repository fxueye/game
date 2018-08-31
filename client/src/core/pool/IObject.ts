interface IObject{
	hashc:number;
	type:number;
    isIdle:boolean;
    dispose():void; 
    del():void;
    reset():void;
    setProtocol( val:IDistributor ):void;
}