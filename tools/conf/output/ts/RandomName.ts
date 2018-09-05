class RandomName {
    private static _dic:Dictionary<RandomName> = new Dictionary<RandomName>();
    private static _arr:Array<RandomName> = new Array<RandomName>();

	 public Id :number ;
     public PlayerName :string ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<RandomName>{
        return  RandomName._dic;
    }
    public static get Arr():Array<RandomName>{
        return RandomName._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:RandomName = <RandomName>json[i];
            RandomName._arr.push(config);
            RandomName._dic.add(config.Id,config);
        }
    }
}