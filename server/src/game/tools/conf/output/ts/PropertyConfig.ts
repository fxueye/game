class PropertyConfig {
    private static _dic:Dictionary<PropertyConfig> = new Dictionary<PropertyConfig>();
    private static _arr:Array<PropertyConfig> = new Array<PropertyConfig>();

	 public Id :number ;
    
     public Type :number ;
     public Image :string ;
     public Icon :string ;
     public IconScale :number ;
     public Deviation : Array<number>  =new Array<number>();
     public Sort :number ;
     public Location : Array<number>  =new Array<number>();
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<PropertyConfig>{
        return  PropertyConfig._dic;
    }
    public static get Arr():Array<PropertyConfig>{
        return PropertyConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:PropertyConfig = <PropertyConfig>json[i];
            PropertyConfig._arr.push(config);
            PropertyConfig._dic.add(config.Id,config);
        }
    }
}