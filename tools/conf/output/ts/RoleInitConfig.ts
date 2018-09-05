class RoleInitConfig {
    private static _dic:Dictionary<RoleInitConfig> = new Dictionary<RoleInitConfig>();
    private static _arr:Array<RoleInitConfig> = new Array<RoleInitConfig>();

	 public Id :number ;
     public IconID :number ;
     public Gold :number ;
     public Diamond :number ;
     public Body :number ;
     public Job :string ;
     public Name :string ;
     public InitSuit :number ;
     public Cloth : Array<number>  =new Array<number>();
     public Mood :number ;
     public Title :number ;
     public Exp :number ;
     public Mail :number ;
     public House :number ;
     public Car :number ;
     public Ship :number ;
     public ItemIds : Array<number>  =new Array<number>();
    

    
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