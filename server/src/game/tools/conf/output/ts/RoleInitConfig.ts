class RoleInitConfig {
    private static _dic:Dictionary<RoleInitConfig> = new Dictionary<RoleInitConfig>();
    private static _arr:Array<RoleInitConfig> = new Array<RoleInitConfig>();

	 public Id :number ;
     public IconID :number ;
     public Gold :number ;
     public Diamond :number ;
     public InitSuit :number ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<RoleInitConfig>{
        return  RoleInitConfig._dic;
    }
    public static get Arr():Array<RoleInitConfig>{
        return RoleInitConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:RoleInitConfig = <RoleInitConfig>json[i];
            RoleInitConfig._arr.push(config);
            RoleInitConfig._dic.add(config.Id,config);
        }
    }
}