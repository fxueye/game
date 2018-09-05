class DayConfig {
    private static _dic:Dictionary<DayConfig> = new Dictionary<DayConfig>();
    private static _arr:Array<DayConfig> = new Array<DayConfig>();

	 public Id :number ;
     public MarketType :number ;
     public Day :string ;
     public IsOpen :number ;
    
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<DayConfig>{
        return  DayConfig._dic;
    }
    public static get Arr():Array<DayConfig>{
        return DayConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:DayConfig = <DayConfig>json[i];
            DayConfig._arr.push(config);
            DayConfig._dic.add(config.Id,config);
        }
    }
}