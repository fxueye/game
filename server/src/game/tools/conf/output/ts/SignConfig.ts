class SignConfig {
    private static _dic:Dictionary<SignConfig> = new Dictionary<SignConfig>();
    private static _arr:Array<SignConfig> = new Array<SignConfig>();

	 public Id :number ;
     public Name :string ;
     public Icon :string ;
     public Bg :string ;
     public Reward : Array<number>  =new Array<number>();
     public Nums : Array<number>  =new Array<number>();
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<SignConfig>{
        return  SignConfig._dic;
    }
    public static get Arr():Array<SignConfig>{
        return SignConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:SignConfig = <SignConfig>json[i];
            SignConfig._arr.push(config);
            SignConfig._dic.add(config.Id,config);
        }
    }
}