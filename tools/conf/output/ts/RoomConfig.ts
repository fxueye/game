class RoomConfig {
    private static _dic:Dictionary<RoomConfig> = new Dictionary<RoomConfig>();
    private static _arr:Array<RoomConfig> = new Array<RoomConfig>();

	 public Id :number ;
     public TotalType :number ;
     public Name :string ;
     public CompetitionIds : Array<number>  =new Array<number>();
     public StockName :string ;
     public IsOpen :number ;
     public DayType :number ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<RoomConfig>{
        return  RoomConfig._dic;
    }
    public static get Arr():Array<RoomConfig>{
        return RoomConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:RoomConfig = <RoomConfig>json[i];
            RoomConfig._arr.push(config);
            RoomConfig._dic.add(config.Id,config);
        }
    }
}