class PageConfig {
    private static _dic:Dictionary<PageConfig> = new Dictionary<PageConfig>();
    private static _arr:Array<PageConfig> = new Array<PageConfig>();

	 public Id :number ;
     public PageId :number ;
     public Bg :number ;
     public Type :number ;
     public Location : Array<number>  =new Array<number>();
     public Body :number ;
     public Scale :number ;
    
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<PageConfig>{
        return  PageConfig._dic;
    }
    public static get Arr():Array<PageConfig>{
        return PageConfig._arr;
    }
    public static parse(json:any[]){
        if(json && json.length > 0){
			for(var i = 0; i < json.length; i++){
				let config:PageConfig = <PageConfig>json[i];
				PageConfig._arr.push(config);
				PageConfig._dic.add(config.Id,config);
			}
        }else{
            console.error("PageConfig loader fail!");
        }
    }
}