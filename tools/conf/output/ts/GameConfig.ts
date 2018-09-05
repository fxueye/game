class GameConfig {
    private static _dic:Dictionary<GameConfig> = new Dictionary<GameConfig>();
    private static _arr:Array<GameConfig> = new Array<GameConfig>();

	 public Id :number ;
     public Data :string ;
    
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<GameConfig>{
        return  GameConfig._dic;
    }
    public static get Arr():Array<GameConfig>{
        return GameConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:GameConfig = <GameConfig>json[i];
            GameConfig._arr.push(config);
            GameConfig._dic.add(config.Id,config);
        }
    }
}