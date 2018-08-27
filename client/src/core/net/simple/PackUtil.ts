namespace Net.Simple{
	export class PackUtil {
		public constructor() {
		}
		public static CreatePacket(seqID:number,opcode:number,... params:any[]){
			var pack = new Packet();
			pack.PutShort(seqID);
			pack.PutShort(opcode);
			var len = params.length;
			if(len > 0){
				for(var i = 0; i < len; i++){
					var p = params[i];
					if(p == null){
						console.error("call server , params is null, opcode = "+ opcode);
						continue;
					}
					PackUtil.Pack(pack,p);
				}
			}
			pack.Rewind();
			return pack;
		}
		public static Pack(pack:Packet,val:any){
			var type = typeof val;
			if(type === "number"){
				pack.PutInt(val);
			}else if(type === "boolean"){
				pack.PutBool(val);
			}else if(type === "string"){
				pack.PutString(val);
			}else if(type === "object"){
				// if(val.toString() == "Array"){

				// }
				// if(val instanceof IWrapper){
				// 	var w = <IWrapper>val;
				// 	w.Encode(pack);
				// }
			}
			
		}
		public static Unpack(type:any,pack:Packet){
			if(type === "number"){
				return pack.GetInt();
			}else if(type === "boolean"){
				return pack.GetBool();
			}else if(type === "string"){
				return pack.GetString();
			}else if(type === "object"){
				
			}
		}
	}
}