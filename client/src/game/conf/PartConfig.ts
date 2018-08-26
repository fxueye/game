class PartConfig {
    private static _dic:Dictionary<PartConfig> = new Dictionary<PartConfig>();
    private static _arr:Array<PartConfig> = new Array<PartConfig>();

	 public Id :number ;
     public ArmName : Array<string>  =new Array<string>();
    
     public Type :number ;
     public TexName : Array<string>  =new Array<string>();
     public Slots : Array<number>  =new Array<number>();
     public MeSlots : Array<number>  =new Array<number>();
     public Show :number ;
     public IconScale :number ;
     public Deviation : Array<number>  =new Array<number>();
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<PartConfig>{
        return  PartConfig._dic;
    }
    public static get Arr():Array<PartConfig>{
        return PartConfig._arr;
    }
    public static parse(json:any[]){
        if(json && json.length > 0){
			for(var i = 0; i < json.length; i++){
				let config:PartConfig = <PartConfig>json[i];
				PartConfig._arr.push(config);
				PartConfig._dic.add(config.Id,config);
			}
        }else{
            console.error("PartConfig loader fail!");
        }
    }
}