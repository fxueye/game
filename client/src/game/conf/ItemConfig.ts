class ItemConfig {
    private static _dic:Dictionary<ItemConfig> = new Dictionary<ItemConfig>();
    private static _arr:Array<ItemConfig> = new Array<ItemConfig>();

	 public Id :number ;
     public Name :string ;
     public ItemType :number ;
     public Icon :string ;
     public Star :number ;
     public AddType :number ;
     public WorthPrice :number ;
     public Iconframe :string ;
     public IconScale :number ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<ItemConfig>{
        return  ItemConfig._dic;
    }
    public static get Arr():Array<ItemConfig>{
        return ItemConfig._arr;
    }
    public static parse(json:any[]){
        if(json && json.length > 0){
			for(var i = 0; i < json.length; i++){
				let config:ItemConfig = <ItemConfig>json[i];
				ItemConfig._arr.push(config);
				ItemConfig._dic.add(config.Id,config);
			}
        }else{
            console.error("ItemConfig loader fail!");
        }
    }
}