class BgConfig {
    private static _dic:Dictionary<BgConfig> = new Dictionary<BgConfig>();
    private static _arr:Array<BgConfig> = new Array<BgConfig>();

	 public Id :number ;
     public Type :number ;
     public Imgs : Array<number>  =new Array<number>();
     public Floor :number ;
     public Particle : Array<number>  =new Array<number>();
     public BgMusic :number ;
    
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<BgConfig>{
        return  BgConfig._dic;
    }
    public static get Arr():Array<BgConfig>{
        return BgConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:BgConfig = <BgConfig>json[i];
            BgConfig._arr.push(config);
            BgConfig._dic.add(config.Id,config);
        }
    }
}