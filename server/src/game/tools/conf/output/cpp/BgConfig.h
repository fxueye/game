        #ifndef __SERVER_GAME_BGCONFIG_H
#define __SERVER_GAME_BGCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class BgConfig {
	public:
		static map<int,BgConfig>& Dic()
        {
            static map<int,BgConfig> g_dic;
            return g_dic;
        }
		static vector<BgConfig>& Arr(){
            static vector<BgConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & type = v["Type"];
                        Value & imgs = v["Imgs"];
                        vector<int> tImgs;
                        if(imgs.IsArray()){
                            for(size_t j = 0; j < imgs.Size();++j){
                                Value & val = imgs[j];
                                tImgs.push_back(val.GetInt());
                            }
                        }
                        Value & floor = v["Floor"];
                        Value & particle = v["Particle"];
                        vector<int> tParticle;
                        if(particle.IsArray()){
                            for(size_t j = 0; j < particle.Size();++j){
                                Value & val = particle[j];
                                tParticle.push_back(val.GetInt());
                            }
                        }
                        Value & bgmusic = v["BgMusic"];
                       
                       
                        BgConfig bgconfig;
                        bgconfig.setId(id.GetInt()); 
                        bgconfig.setType(type.GetInt()); 
                        bgconfig.setImgs(tImgs);
                        bgconfig.setFloor(floor.GetInt()); 
                        bgconfig.setParticle(tParticle);
                        bgconfig.setBgMusic(bgmusic.GetInt()); 
                        
                        
                        BgConfig::Dic().insert(pair<int,BgConfig>(bgconfig.getId(),bgconfig));
                        BgConfig::Arr().push_back(bgconfig);
					}
				}
			}
        }
        int getId(){
            return Id;
        }
        void setId(int val){
            Id = val;
        }
        
        int getType(){
            return Type;
        }
        void setType(int val){
            Type = val;
        }
        
        vector<int> getImgs(){
            return Imgs;
        }
        void setImgs(vector<int> val){
            Imgs = val;
        }
        int getFloor(){
            return Floor;
        }
        void setFloor(int val){
            Floor = val;
        }
        
        vector<int> getParticle(){
            return Particle;
        }
        void setParticle(vector<int> val){
            Particle = val;
        }
        int getBgMusic(){
            return BgMusic;
        }
        void setBgMusic(int val){
            BgMusic = val;
        }
        
        
        
		
    private:
         int Id;
         int Type;
         vector<int> Imgs;
         int Floor;
         vector<int> Particle;
         int BgMusic;
        
        
};

#endif