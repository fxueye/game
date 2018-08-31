class TipConfig {
    private static _dic:Dictionary<TipConfig> = new Dictionary<TipConfig>();
    private static _arr:Array<TipConfig> = new Array<TipConfig>();

	 public Id :number ;
     public Tip :string ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<TipConfig>{
        return  TipConfig._dic;
    }
    public static get Arr():Array<TipConfig>{
        return TipConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:TipConfig = <TipConfig>json[i];
            TipConfig._arr.push(config);
            TipConfig._dic.add(config.Id,config);
        }
    }
}