class ArrayUtils {
	public constructor() {
	}
	public static isInArray(arr:Array<any>,value:any){
		if(arr.indexOf && typeof(arr.indexOf) == 'function'){
			var index = arr.indexOf(value);
			if(index >= 0){
				return true;
			}
		}else{
			for(var i:number = 0; i < arr.length; i++){
				if(value === arr[i]){
					return true;
				}
			}
			return false;
		}
	}
	//重复
	public static isRepeat(arr):boolean{
		var hash = {};
		for(var i in arr){
			if(hash[i]){
				return true;
			}
			hash[i] = true;
		}
		return false;
	}
	
	public static intersect(uniquelize:boolean,... arr):any{
		var result = [];
		var obj = {};
		for(var i = 0; i < arr.length; i++){
			if(uniquelize)
				arr[i] = ArrayUtils.uniquelize(arr[i]);
			for(var j = 0; j < arr[i].length; j++){
				var str = arr[i][j];
				if(!obj[str]){
					obj[str] = 1;
				}else{
					obj[str]++;
					if(obj[str] == arr.length){
						result.push(str);
					}
				}
			}
		}
		return result;
	}
	public static uniquelize(arr):any{
		var tmp = {};
		var ret = [];
		for(var i = 0; i < arr.length; i++){
			if(!tmp[arr[i]]){
				tmp[arr[i]] = 1;
				ret.push(arr[i]);
			}
		}
		return ret;
	}
}