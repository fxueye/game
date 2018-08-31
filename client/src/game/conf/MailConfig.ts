class MailConfig {
    private static _dic:Dictionary<MailConfig> = new Dictionary<MailConfig>();
    private static _arr:Array<MailConfig> = new Array<MailConfig>();

	 public Id :number ;
     public MailId :number ;
    
     public MailType :number ;
     public SubjectText :number ;
    
     public ContentText :number ;
    
     public SenderText :number ;
    
     public Icon :number ;
     public RewardItemIds : Array<number>  =new Array<number>();
     public RewardNum : Array<number>  =new Array<number>();
     public SaveTime :number ;
    

    
    public constructor(){

    }


    public static get Dic():Dictionary<MailConfig>{
        return  MailConfig._dic;
    }
    public static get Arr():Array<MailConfig>{
        return MailConfig._arr;
    }
    public static parse(json:any[]){
        if(json && json.length > 0){
			for(var i = 0; i < json.length; i++){
				let config:MailConfig = <MailConfig>json[i];
				MailConfig._arr.push(config);
				MailConfig._dic.add(config.Id,config);
			}
        }else{
            console.error("MailConfig loader fail!");
        }
    }
}