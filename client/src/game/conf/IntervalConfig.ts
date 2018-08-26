class IntervalConfig {
    private static _dic:Dictionary<IntervalConfig> = new Dictionary<IntervalConfig>();
    private static _arr:Array<IntervalConfig> = new Array<IntervalConfig>();

	 public Id :number ;
     public IntervalId :number ;
     public OddsId :number ;
     public McId :number ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<IntervalConfig>{
        return  IntervalConfig._dic;
    }
    public static get Arr():Array<IntervalConfig>{
        return IntervalConfig._arr;
    }
    public static parse(json:any[]){
        if(json && json.length > 0){
			for(var i = 0; i < json.length; i++){
				let config:IntervalConfig = <IntervalConfig>json[i];
				IntervalConfig._arr.push(config);
				IntervalConfig._dic.add(config.Id,config);
			}
        }else{
            console.error("IntervalConfig loader fail!");
        }
    }
}