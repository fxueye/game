class ConfigUtils {
	public constructor() {
	}
	
	public static GetPartType():Dictionary<Array<PartTypeConfig>>{
		let dic = new Dictionary<Array<PartTypeConfig>>();
		for(var i:number =0; i < PartTypeConfig.Arr.length;i++){
			let typeConf = PartTypeConfig.Arr[i];
			var arr = dic.get(typeConf.Parent);
			if(arr != null){
				arr.push(typeConf);
			}else{
				arr = new Array<PartTypeConfig>();
				arr.push(typeConf);
				dic.add(typeConf.Parent,arr);
			}
		}
		return dic;
	}
	public static GetProType():Dictionary<Array<PropertyTypeConfig>>{
		let dic = new Dictionary<Array<PropertyTypeConfig>>();
		for(var i:number =0; i < PropertyTypeConfig.Arr.length;i++){
			let typeConf = PropertyTypeConfig.Arr[i];
			var arr = dic.get(typeConf.Parent);
			if(arr != null){
				arr.push(typeConf);
			}else{
				arr = new Array<PropertyTypeConfig>();
				arr.push(typeConf);
				dic.add(typeConf.Parent,arr);
			}
		}
		return dic;
	}

	public static GetText(id:number):string{
		return TextConfig.Dic.get(id).Text.replace(/\\n/g,"\n");
	}
	 public static GetPartByType(type:number,show?:boolean):Array<PartConfig>{
		var items:Array<PartConfig> = new Array<PartConfig>();
		var s = show ? 0 : 1;
		for(var conf of PartConfig.Arr){
			if(conf.Type == type && conf.Show  != s){
				items.push(conf);
			}
		}
		return items;
	}

	public static GetSlotByName(name:string):SlotsConfig{
		for(var conf of SlotsConfig.Arr){
			if(conf.Name == name){
				return conf;
			}
		}
		return null;
	}

	public static GetPageByPageIdAndType(pageId:number,type:number):PageConfig{
		for(var conf of PageConfig.Arr){
			if(conf.PageId == pageId && conf.Type == type){
				return conf;
			}
		}
		return null;
	}
}