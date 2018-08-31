class OddsConfig {
    private static _dic:Dictionary<OddsConfig> = new Dictionary<OddsConfig>();
    private static _arr:Array<OddsConfig> = new Array<OddsConfig>();

	 public Id :number ;
    
     public ConfirmValue :number ;
     public MovingRate :number ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<OddsConfig>{
        return  OddsConfig._dic;
    }
    public static get Arr():Array<OddsConfig>{
        return OddsConfig._arr;
    }
    public static parse(json:any[]){
        if(json && json.length > 0){
			for(var i = 0; i < json.length; i++){
				let config:OddsConfig = <OddsConfig>json[i];
				OddsConfig._arr.push(config);
				OddsConfig._dic.add(config.Id,config);
			}
        }else{
            console.error("OddsConfig loader fail!");
        }
    }
}