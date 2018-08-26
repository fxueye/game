class DateUtil {
		public constructor() {
		}
		public static Format(date:Date,fmt:string):string{
			var o = {
				"M+": date.getMonth() + 1, //月份 
				"d+": date.getDate(), //日 
				"H+": date.getHours(), //小时 
				"m+": date.getMinutes(), //分 
				"s+": date.getSeconds(), //秒 
				"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
				"S": date.getMilliseconds() //毫秒 
			};
			if(/(y+)/.test(fmt)){
				fmt = fmt.replace(RegExp.$1,(date.getFullYear() + "").substr(4 - RegExp.$1.length));
			}
			for(var k in o){
				if(new RegExp("(" + k +")").test(fmt)){
					fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				}
			}
			return fmt;
		}
		public static LongTimeFormat(date:Date):string{
			return DateUtil.Format(date,"yyyy-MM-dd HH:mm:ss");
		}
		public static ShortTimeFormat(date:Date):string{
			return DateUtil.Format(date,"HH:mm");
		}
		public static DateFormat(date:Date):string{
			return DateUtil.Format(date,"yyyy/MM/dd");
		}
		public static Date2Timestamp(date:Date):number{
			return date.getTime() / 1000;
		}
		public static Timestamp2Date(time:number):Date{
			return new Date(time * 1000);
		}
		public static IsToady(date:Date){
			// var now = new Date();
			// 获取服务器时间
			var now = App.Instance.SrvDate.ServetDate;
			var a = DateUtil.Format(now,"yyyy-MM-dd");
			var b = DateUtil.Format(date,"yyyy-MM-dd");
			return a == b;
		}
		public static Timestamp(date?:Date){
			if(!date){
				// date = new Date();
				// 获取服务器时间
				date = App.Instance.SrvDate.ServetDate;
			}
			return date.getTime() / 1000;
		}
		
}