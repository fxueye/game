class TextConfig {
    private static _dic:Dictionary<TextConfig> = new Dictionary<TextConfig>();
    private static _arr:Array<TextConfig> = new Array<TextConfig>();

	 public Id :number ;
     public Text :string ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<TextConfig>{
        return  TextConfig._dic;
    }
    public static get Arr():Array<TextConfig>{
        return TextConfig._arr;
    }
    public static parse(json:any[]){
        if(json && json.length > 0){
			for(var i = 0; i < json.length; i++){
				let config:TextConfig = <TextConfig>json[i];
				TextConfig._arr.push(config);
				TextConfig._dic.add(config.Id,config);
			}
        }else{
            console.error("TextConfig loader fail!");
        }
    }
}