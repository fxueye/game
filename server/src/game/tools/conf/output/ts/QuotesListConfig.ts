class QuotesListConfig {
    private static _dic:Dictionary<QuotesListConfig> = new Dictionary<QuotesListConfig>();
    private static _arr:Array<QuotesListConfig> = new Array<QuotesListConfig>();

	 public Id :number ;
     public GateType :number ;
     public GateId :number ;
    
     public DataSeries : Array<number>  =new Array<number>();
     public Special :string ;
     public Textid :string ;
    
     public Isbuy :string ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<QuotesListConfig>{
        return  QuotesListConfig._dic;
    }
    public static get Arr():Array<QuotesListConfig>{
        return QuotesListConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:QuotesListConfig = <QuotesListConfig>json[i];
            QuotesListConfig._arr.push(config);
            QuotesListConfig._dic.add(config.Id,config);
        }
    }
}