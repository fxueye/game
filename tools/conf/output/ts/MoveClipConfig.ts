class MoveClipConfig {
    private static _dic:Dictionary<MoveClipConfig> = new Dictionary<MoveClipConfig>();
    private static _arr:Array<MoveClipConfig> = new Array<MoveClipConfig>();

	 public Id :number ;
     public Texture :string ;
     public Config :string ;
     public Name :string ;
     public Play :string ;
     public FrameRate :number ;
     public Times :number ;
     public Location : Array<number>  =new Array<number>();
     public Scale : Array<number>  =new Array<number>();
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<MoveClipConfig>{
        return  MoveClipConfig._dic;
    }
    public static get Arr():Array<MoveClipConfig>{
        return MoveClipConfig._arr;
    }
    public static parse(json:any[]){

        for(var i = 0; i < json.length; i++){
            let config:MoveClipConfig = <MoveClipConfig>json[i];
            MoveClipConfig._arr.push(config);
            MoveClipConfig._dic.add(config.Id,config);
        }
    }
}