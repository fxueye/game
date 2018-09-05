class HelpConfig {
    private static _dic:Dictionary<HelpConfig> = new Dictionary<HelpConfig>();
    private static _arr:Array<HelpConfig> = new Array<HelpConfig>();

	 public Id :number ;
     public HelpText :string ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<HelpConfig>{
        return  HelpConfig._dic;
    }
    public static get Arr():Array<HelpConfig>{
        return HelpConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:HelpConfig = <HelpConfig>json[i];
            HelpConfig._arr.push(config);
            HelpConfig._dic.add(config.Id,config);
        }
    }
}