class SoundCongfig {
    private static _dic:Dictionary<SoundCongfig> = new Dictionary<SoundCongfig>();
    private static _arr:Array<SoundCongfig> = new Array<SoundCongfig>();

	 public Id :number ;
     public Type :number ;
     public Name :string ;
    
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<SoundCongfig>{
        return  SoundCongfig._dic;
    }
    public static get Arr():Array<SoundCongfig>{
        return SoundCongfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:SoundCongfig = <SoundCongfig>json[i];
            SoundCongfig._arr.push(config);
            SoundCongfig._dic.add(config.Id,config);
        }
    }
}