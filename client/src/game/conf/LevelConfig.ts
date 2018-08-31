class LevelConfig {
    private static _dic:Dictionary<LevelConfig> = new Dictionary<LevelConfig>();
    private static _arr:Array<LevelConfig> = new Array<LevelConfig>();

	 public Id :number ;
     public Exp :number ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<LevelConfig>{
        return  LevelConfig._dic;
    }
    public static get Arr():Array<LevelConfig>{
        return LevelConfig._arr;
    }
    public static parse(json:any[]){
        if(json && json.length > 0){
			for(var i = 0; i < json.length; i++){
				let config:LevelConfig = <LevelConfig>json[i];
				LevelConfig._arr.push(config);
				LevelConfig._dic.add(config.Id,config);
			}
        }else{
            console.error("LevelConfig loader fail!");
        }
    }
}