class PayConfig {
    private static _dic:Dictionary<PayConfig> = new Dictionary<PayConfig>();
    private static _arr:Array<PayConfig> = new Array<PayConfig>();

	 public Id :number ;
     public Sort :number ;
     public ProductId :string ;
     public ProductName :string ;
     public ProductDesc :string ;
     public Visible :boolean ;
     public Hot :boolean ;
     public MoneyType :number ;
     public MoneyCount :number ;
     public GiftMoneyCount :number ;
     public Price :number ;
     public Currency :string ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<PayConfig>{
        return  PayConfig._dic;
    }
    public static get Arr():Array<PayConfig>{
        return PayConfig._arr;
    }
    public static parse(json:any[]){
        if(json && json.length > 0){
			for(var i = 0; i < json.length; i++){
				let config:PayConfig = <PayConfig>json[i];
				PayConfig._arr.push(config);
				PayConfig._dic.add(config.Id,config);
			}
        }else{
            console.error("PayConfig loader fail!");
        }
    }
}