class CompanyConfig {
    private static _dic:Dictionary<CompanyConfig> = new Dictionary<CompanyConfig>();
    private static _arr:Array<CompanyConfig> = new Array<CompanyConfig>();

	 public Id :number ;
     public BodyId :number ;
     public Job :string ;
     public Name :string ;
    
    
    
    
    
    
    
    
    
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<CompanyConfig>{
        return  CompanyConfig._dic;
    }
    public static get Arr():Array<CompanyConfig>{
        return CompanyConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:CompanyConfig = <CompanyConfig>json[i];
            CompanyConfig._arr.push(config);
            CompanyConfig._dic.add(config.Id,config);
        }
    }
}