class StockConfig {
    private static _dic:Dictionary<StockConfig> = new Dictionary<StockConfig>();
    private static _arr:Array<StockConfig> = new Array<StockConfig>();

	 public Id :number ;
     public Ukey :number ;
     public Market_id :number ;
     public Major_type :number ;
     public Minor_type :number ;
     public Market_code :number ;
     public Market_abbr :string ;
     public Chinese_name :string ;
     public English_name :string ;
     public List_date :string ;
     public Delist_date :string ;
     public Currency_id :string ;
     public Jy_code :string ;
     public Wind_code :string ;
     public Input_code :string ;
     public Last_update :string ;
     public Show :number ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<StockConfig>{
        return  StockConfig._dic;
    }
    public static get Arr():Array<StockConfig>{
        return StockConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:StockConfig = <StockConfig>json[i];
            StockConfig._arr.push(config);
            StockConfig._dic.add(config.Id,config);
        }
    }
}