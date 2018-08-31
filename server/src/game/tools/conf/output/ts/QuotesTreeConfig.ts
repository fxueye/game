class QuotesTreeConfig {
    private static _dic:Dictionary<QuotesTreeConfig> = new Dictionary<QuotesTreeConfig>();
    private static _arr:Array<QuotesTreeConfig> = new Array<QuotesTreeConfig>();

	 public Id :number ;
     public ParentId :number ;
     public Name :string ;
     public TextId :number ;
     public Type :number ;
     public ListId :number ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<QuotesTreeConfig>{
        return  QuotesTreeConfig._dic;
    }
    public static get Arr():Array<QuotesTreeConfig>{
        return QuotesTreeConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:QuotesTreeConfig = <QuotesTreeConfig>json[i];
            QuotesTreeConfig._arr.push(config);
            QuotesTreeConfig._dic.add(config.Id,config);
        }
    }
}