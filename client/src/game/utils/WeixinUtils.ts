class WeixinUtils {
	public constructor() {
	}
	public static open(key,width,height,itemHeight,itemPadding){
		let platform: any = window.platform;
		platform.openDataContext.postMessage({
			rankWidth: width,
			rankHeight: height,
			itemHeight: itemHeight,
			itemPadding:itemPadding,
			key:key,
            command: "open"
        });
	}
	public static close(){
		let platform: any = window.platform;
		platform.openDataContext.postMessage({
			command: "close"
        });
	}
	public static move(dis){
		let platform: any = window.platform;
		platform.openDataContext.postMessage({
			dis: dis,
            command: "move"
        });	
	}
	public static updateRank(type,score,updateTime){
		let platform: any = window.platform;
		var data = {wxgame:{score:score,update_time:updateTime}};
		var kvdata = {key:type +"",value:JSON.stringify(data)};
		platform.openDataContext.postMessage({
			kvdata: kvdata,
            command: "updateRank"
        });	
	}

}