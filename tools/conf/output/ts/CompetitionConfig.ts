class CompetitionConfig {
    private static _dic:Dictionary<CompetitionConfig> = new Dictionary<CompetitionConfig>();
    private static _arr:Array<CompetitionConfig> = new Array<CompetitionConfig>();

	 public Id :number ;
     public Type :number ;
     public ApartTime :number ;
     public OffsetTime :number ;
     public StopTime :number ;
     public FreshenTime :number ;
     public WaitingTime :number ;
     public Space :number ;
     public ProSpace :number ;
     public DataSize :number ;
     public DataPosition : Array<number>  =new Array<number>();
     public DataColor :string ;
     public DataDotColor :string ;
     public UprealRate :number ;
     public UprealValue :number ;
     public UpdashedRate :number ;
     public UpdashedValue :number ;
     public DownrealRate :number ;
     public DownrealValue :number ;
     public DowndashedRate :number ;
     public DowndashedValue :number ;
     public BetIds : Array<number>  =new Array<number>();
     public IntervalIds : Array<number>  =new Array<number>();
     public McId :number ;
     public Location : Array<number>  =new Array<number>();
     public Scale :number ;
     public ParticleId :number ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<CompetitionConfig>{
        return  CompetitionConfig._dic;
    }
    public static get Arr():Array<CompetitionConfig>{
        return CompetitionConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:CompetitionConfig = <CompetitionConfig>json[i];
            CompetitionConfig._arr.push(config);
            CompetitionConfig._dic.add(config.Id,config);
        }
    }
}