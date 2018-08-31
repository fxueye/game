enum LogLevel{
	ALL,
	DEBUG,
	INFO,
	WARN,
	ERROR,
	LOG,
	OFF
}
class Logger {
	public static LEVEL:LogLevel = LogLevel.ALL;
	public constructor() {
	}
	public static error(message?: any, ...optionalParams: any[]){
		if(Logger.LEVEL < LogLevel.ERROR && Logger.LEVEL != LogLevel.OFF){
			if(message){
				optionalParams.unshift(message);
			}
			console.error.apply(console,optionalParams);
		}
		
	}
	public static log(message?: any, ...optionalParams: any[]){
		if(Logger.LEVEL < LogLevel.LOG && Logger.LEVEL != LogLevel.OFF){
			if(message){
				optionalParams.unshift(message);
			}
			console.log.apply(console,optionalParams);
		}
	}
	public static info(message?: any, ...optionalParams: any[]){
		if(Logger.LEVEL < LogLevel.INFO && Logger.LEVEL != LogLevel.OFF){
			if(message){
				optionalParams.unshift(message);
			}
			console.info.apply(console,optionalParams);
		}
	}
	public static debug(message?: any, ...optionalParams: any[]){
		if(Logger.LEVEL < LogLevel.DEBUG && Logger.LEVEL != LogLevel.OFF){
			if(message){
				optionalParams.unshift(message);
			}
			console.debug.apply(console,optionalParams);
		}

	}

}