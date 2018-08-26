class BgImgConfig {
    private static _dic:Dictionary<BgImgConfig> = new Dictionary<BgImgConfig>();
    private static _arr:Array<BgImgConfig> = new Array<BgImgConfig>();

	 public Id :number ;
     public Name :string ;
     public Location : Array<number>  =new Array<number>();
    
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<BgImgConfig>{
        return  BgImgConfig._dic;
    }
    public static get Arr():Array<BgImgConfig>{
        return BgImgConfig._arr;
    }
    public static parse(json:any[]){
        if(json && json.length > 0){
			for(var i = 0; i < json.length; i++){
				let config:BgImgConfig = <BgImgConfig>json[i];
				BgImgConfig._arr.push(config);
				BgImgConfig._dic.add(config.Id,config);
			}
        }else{
            console.error("BgImgConfig loader fail!");
        }
    }
}