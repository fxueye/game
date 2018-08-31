class QuotesDataConfig {
    private static _dic:Dictionary<QuotesDataConfig> = new Dictionary<QuotesDataConfig>();
    private static _arr:Array<QuotesDataConfig> = new Array<QuotesDataConfig>();

	 public Id :number ;
     public TextId :number ;
    
     public KeyId :number ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<QuotesDataConfig>{
        return  QuotesDataConfig._dic;
    }
    public static get Arr():Array<QuotesDataConfig>{
        return QuotesDataConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:QuotesDataConfig = <QuotesDataConfig>json[i];
            QuotesDataConfig._arr.push(config);
            QuotesDataConfig._dic.add(config.Id,config);
        }
    }
}