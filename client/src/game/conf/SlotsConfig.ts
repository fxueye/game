class SlotsConfig {
    private static _dic:Dictionary<SlotsConfig> = new Dictionary<SlotsConfig>();
    private static _arr:Array<SlotsConfig> = new Array<SlotsConfig>();

	 public Id :number ;
     public Name :string ;
     public BeforeSlot : Array<number>  =new Array<number>();
    
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<SlotsConfig>{
        return  SlotsConfig._dic;
    }
    public static get Arr():Array<SlotsConfig>{
        return SlotsConfig._arr;
    }
    public static parse(json:any[]){
        if(json && json.length > 0){
			for(var i = 0; i < json.length; i++){
				let config:SlotsConfig = <SlotsConfig>json[i];
				SlotsConfig._arr.push(config);
				SlotsConfig._dic.add(config.Id,config);
			}
        }else{
            console.error("SlotsConfig loader fail!");
        }
    }
}