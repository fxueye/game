interface IDistributor {
	distribution( val:IObject ):void;
    add( val:IObject ):void;
    get( type:number ):IObject;
    clear():void;
}