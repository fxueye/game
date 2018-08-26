class PropertyTypeConfig {
    private static _dic:Dictionary<PropertyTypeConfig> = new Dictionary<PropertyTypeConfig>();
    private static _arr:Array<PropertyTypeConfig> = new Array<PropertyTypeConfig>();

	 public Id :number ;
     public Parent :number ;
     public Name :string ;
     public Bg :number ;
     public Icon :string ;
     public IconDown :string ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<PropertyTypeConfig>{
        return  PropertyTypeConfig._dic;
    }
    public static get Arr():Array<PropertyTypeConfig>{
        return PropertyTypeConfig._arr;
    }
    public static parse(json:any[]){
        if(json && json.length > 0){
			for(var i = 0; i < json.length; i++){
				let config:PropertyTypeConfig = <PropertyTypeConfig>json[i];
				PropertyTypeConfig._arr.push(config);
				PropertyTypeConfig._dic.add(config.Id,config);
			}
        }else{
            console.error("PropertyTypeConfig loader fail!");
        }
    }
}