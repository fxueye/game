class ShopConfig {
    private static _dic:Dictionary<ShopConfig> = new Dictionary<ShopConfig>();
    private static _arr:Array<ShopConfig> = new Array<ShopConfig>();

	 public Id :number ;
     public ItemId :number ;
     public ItemCount :number ;
    
     public Propaganda :string ;
     public Type :number ;
     public Tabid :number ;
     public Order :number ;
     public Cost :number ;
     public Price :number ;
     public PurchaseNums :number ;
     public Scale :number ;
     public Location : Array<number>  =new Array<number>();
     public NewStar :string ;
     public NewEnd :string ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<ShopConfig>{
        return  ShopConfig._dic;
    }
    public static get Arr():Array<ShopConfig>{
        return ShopConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:ShopConfig = <ShopConfig>json[i];
            ShopConfig._arr.push(config);
            ShopConfig._dic.add(config.Id,config);
        }
    }
}