class AppConfig {
    private static _dic:Dictionary<AppConfig> = new Dictionary<AppConfig>();
    private static _arr:Array<AppConfig> = new Array<AppConfig>();

	 public Id :number ;
     public SocketIp :string ;
     public SocketPort :number ;
     public HttpIp :string ;
     public HttpPort :number ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<AppConfig>{
        return  AppConfig._dic;
    }
    public static get Arr():Array<AppConfig>{
        return AppConfig._arr;
    }
    public static parse(json:any[]){
        if(json && json.length > 0){
			for(var i = 0; i < json.length; i++){
				let config:AppConfig = <AppConfig>json[i];
				AppConfig._arr.push(config);
				AppConfig._dic.add(config.Id,config);
			}
        }else{
            console.error("AppConfig loader fail!");
        }
    }
}