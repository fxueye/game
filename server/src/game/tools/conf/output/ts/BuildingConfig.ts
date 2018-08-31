class BuildingConfig {
    private static _dic:Dictionary<BuildingConfig> = new Dictionary<BuildingConfig>();
    private static _arr:Array<BuildingConfig> = new Array<BuildingConfig>();

	 public Id :number ;
     public Name :string ;
     public TextId :number ;
     public NameLocation : Array<number>  =new Array<number>();
     public Open :number ;
     public Image :string ;
     public Location : Array<number>  =new Array<number>();
     public GateId :number ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<BuildingConfig>{
        return  BuildingConfig._dic;
    }
    public static get Arr():Array<BuildingConfig>{
        return BuildingConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:BuildingConfig = <BuildingConfig>json[i];
            BuildingConfig._arr.push(config);
            BuildingConfig._dic.add(config.Id,config);
        }
    }
}