class ParticleConfig {
    private static _dic:Dictionary<ParticleConfig> = new Dictionary<ParticleConfig>();
    private static _arr:Array<ParticleConfig> = new Array<ParticleConfig>();

	 public Id :number ;
     public Texture :string ;
     public Config :string ;
     public Location : Array<number>  =new Array<number>();
     public Scale : Array<number>  =new Array<number>();
     public SoundId :number ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<ParticleConfig>{
        return  ParticleConfig._dic;
    }
    public static get Arr():Array<ParticleConfig>{
        return ParticleConfig._arr;
    }
    public static parse(json:any[]){
        if(json && json.length > 0){
			for(var i = 0; i < json.length; i++){
				let config:ParticleConfig = <ParticleConfig>json[i];
				ParticleConfig._arr.push(config);
				ParticleConfig._dic.add(config.Id,config);
			}
        }else{
            console.error("ParticleConfig loader fail!");
        }
    }
}