class PartTypeConfig {
    private static _dic:Dictionary<PartTypeConfig> = new Dictionary<PartTypeConfig>();
    private static _arr:Array<PartTypeConfig> = new Array<PartTypeConfig>();

	 public Id :number ;
     public Parent :number ;
     public Name :string ;
     public Icon :string ;
     public IconDown :string ;
    
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<PartTypeConfig>{
        return  PartTypeConfig._dic;
    }
    public static get Arr():Array<PartTypeConfig>{
        return PartTypeConfig._arr;
    }
    public static parse(json:any[]){
        if(json && json.length > 0){
			for(var i = 0; i < json.length; i++){
				let config:PartTypeConfig = <PartTypeConfig>json[i];
				PartTypeConfig._arr.push(config);
				PartTypeConfig._dic.add(config.Id,config);
			}
        }else{
            console.error("PartTypeConfig loader fail!");
        }
    }
}