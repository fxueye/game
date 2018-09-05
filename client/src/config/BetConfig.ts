class BetConfig {
    private static _dic:Dictionary<BetConfig> = new Dictionary<BetConfig>();
    private static _arr:Array<BetConfig> = new Array<BetConfig>();

	 public Id :number ;
     public GroupId :number ;
     public BetMoney :number ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<BetConfig>{
        return  BetConfig._dic;
    }
    public static get Arr():Array<BetConfig>{
        return BetConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:BetConfig = <BetConfig>json[i];
            BetConfig._arr.push(config);
            BetConfig._dic.add(config.Id,config);
        }
    }
}