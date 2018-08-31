class BdConfig {
    private static _dic:Dictionary<BdConfig> = new Dictionary<BdConfig>();
    private static _arr:Array<BdConfig> = new Array<BdConfig>();

	 public Id :number ;
     public PlayTimes :number ;
     public Animation :string ;
     public ArmName :string ;
     public Name :string ;
     public Type :number ;
     public TexName :string ;
     public Slots : Array<number>  =new Array<number>();
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<BdConfig>{
        return  BdConfig._dic;
    }
    public static get Arr():Array<BdConfig>{
        return BdConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:BdConfig = <BdConfig>json[i];
            BdConfig._arr.push(config);
            BdConfig._dic.add(config.Id,config);
        }
    }
}