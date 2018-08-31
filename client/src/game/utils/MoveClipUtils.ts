class MovieClipUtils {
	//优化方向对象池
	public static mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory();
	public static mcList:Dictionary<egret.MovieClip> = new Dictionary<egret.MovieClip>();
	public static mcTempList:Array<egret.MovieClip> = new Array<egret.MovieClip>();
	public constructor() {
		
	}
	public static removeMc(obj:egret.Sprite,mc:egret.MovieClip){
		if(obj.getChildIndex(mc) == -1){
			return;
		}
		obj.removeChild(mc);
	}
	public static createAddMc(obj:any,id:number,tempSave:boolean = true):egret.MovieClip{
		Logger.log("length:" + MovieClipUtils.mcTempList.length);
		var mcConf = MoveClipConfig.Dic.get(id);
		if(mcConf == null){
			console.error("MoveClipConfig is not find id:" + id);
			return;
		}
		var data = RES.getRes(mcConf.Config);
		var txtr = RES.getRes(mcConf.Texture);
		MovieClipUtils.mcFactory.mcDataSet = data;
		MovieClipUtils.mcFactory.texture = txtr;
		var mvData = MovieClipUtils.mcFactory.generateMovieClipData(mcConf.Name);
		if(mcConf.FrameRate >= 0){
			mvData.frameRate = mcConf.FrameRate;
		}
		var mc:egret.MovieClip =  new egret.MovieClip(mvData);
		if(tempSave){
			MovieClipUtils.mcTempList.push(mc);
		}
		if(mcConf.Scale.length >=2){
			mc.scaleX = mcConf.Scale[0];
			mc.scaleY = mcConf.Scale[1];
		}
		obj.addChild(mc);
		mc.x = obj.width/2;
		mc.y = obj.height/2;
		mc.gotoAndPlay(mcConf.Play,mcConf.Times);
		return mc;
	}
	public static clearTemp(){
		for(var i =0, length = MovieClipUtils.mcTempList.length;i < length; i++){
			var mc = MovieClipUtils.mcTempList[i];
			mc.parent.removeChild(mc);
			mc = null;
		}
		MovieClipUtils.mcTempList = null;
		MovieClipUtils.mcTempList = new Array<egret.MovieClip>();
	}
	public static addMc(obj:any,id:number):egret.MovieClip{
		var mcConf = MoveClipConfig.Dic.get(id);
		if(mcConf == null){
			console.error("MoveClipConfig is not find id:" + id);
			return;
		}
		var mc:egret.MovieClip = MovieClipUtils.mcList.get(id);
		if(mc == null){
			var data = RES.getRes(mcConf.Config);
			var txtr = RES.getRes(mcConf.Texture);
			MovieClipUtils.mcFactory.mcDataSet = data;
			MovieClipUtils.mcFactory.texture = txtr;
			var mvData = MovieClipUtils.mcFactory.generateMovieClipData(mcConf.Name);
			if(mcConf.FrameRate >= 0){
				mvData.frameRate = mcConf.FrameRate;
			}
			mc =  new egret.MovieClip(mvData);
			MovieClipUtils.mcList.add(id,mc);
			if(mcConf.Scale.length >=2){
				mc.scaleX = mcConf.Scale[0];
				mc.scaleY = mcConf.Scale[1];
			}
			
		}
		obj.addChild(mc);
		mc.x = obj.width/2;
		mc.y = obj.height/2;
	
		// if(mcConf.Location.length >= 2){
		// 	mc.x = mcConf.Location[0];
		// 	mc.y = mcConf.Location[1];
		// }
		// mc.play();
		mc.gotoAndPlay(mcConf.Play,mcConf.Times);
		return mc;
	}

}