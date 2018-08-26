class StringUtils {
	public constructor() {
	}
	public static format(str:string, ... args):string{
		for(var i= 0; i <  args.length; i++)
			str = str.replace(new RegExp("\\{" + i + "\\}", "g"),args[i]);
		return str;
	}
	public static pad(num,n):string{
		var len = num.toString().length;
		while(len < n){
			num = "0"+num;
			len++;
		}
		return num;
	}
}