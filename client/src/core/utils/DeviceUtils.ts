class DeviceUtils {
	public constructor() {
	}
	public static IsHtml5():boolean{
		return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
	}
	public static IsWeixin():boolean{
		return egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME;
	}
	public static IsNative():boolean{
		return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
	}
	public static IsMobile():boolean{
		return egret.Capabilities.isMobile;
	}
	public static IsPc():boolean{
		return !egret.Capabilities.isMobile;
	}
	
}