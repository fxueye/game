class BodyConfig {
    private static _dic:Dictionary<BodyConfig> = new Dictionary<BodyConfig>();
    private static _arr:Array<BodyConfig> = new Array<BodyConfig>();

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


    public static get Dic():Dictionary<BodyConfig>{
        return  BodyConfig._dic;
    }
    public static get Arr():Array<BodyConfig>{
        return BodyConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:BodyConfig = <BodyConfig>json[i];
            BodyConfig._arr.push(config);
            BodyConfig._dic.add(config.Id,config);
        }
    }
}