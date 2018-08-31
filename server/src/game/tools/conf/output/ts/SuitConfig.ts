class SuitConfig {
    private static _dic:Dictionary<SuitConfig> = new Dictionary<SuitConfig>();
    private static _arr:Array<SuitConfig> = new Array<SuitConfig>();

	 public Id :number ;
     public Name :string ;
     public Parts : Array<number>  =new Array<number>();
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<SuitConfig>{
        return  SuitConfig._dic;
    }
    public static get Arr():Array<SuitConfig>{
        return SuitConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:SuitConfig = <SuitConfig>json[i];
            SuitConfig._arr.push(config);
            SuitConfig._dic.add(config.Id,config);
        }
    }
}