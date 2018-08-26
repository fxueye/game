class ToastUtils {
	public constructor() {
	}
	public static Error(code:number,... args){
		var textId = ErrorCode.Codes[code];
		if(textId){
			args.unshift(ConfigUtils.GetText(ErrorCode.Codes[code]));
		}else{
			args.unshift("error code:" + code);
		}
		var formatStr = StringUtils.format.apply(StringUtils,args)
		Toast.makeToast(formatStr,800).show();
	}
	public static LocalError(code:number,... args){
		if(code){
			args.unshift(ConfigUtils.GetText(code));
		}else{
			args.unshift("error code:" + code);
		}
		var formatStr = StringUtils.format.apply(StringUtils,args)
		Toast.makeToast(formatStr,800).show();
	}
}