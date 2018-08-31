        #ifndef __SERVER_GAME_PARTICLECONFIG_H
#define __SERVER_GAME_PARTICLECONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class ParticleConfig {
	public:
		static map<int,ParticleConfig>& Dic()
        {
            static map<int,ParticleConfig> g_dic;
            return g_dic;
        }
		static vector<ParticleConfig>& Arr(){
            static vector<ParticleConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & texture = v["Texture"];
                        Value & config = v["Config"];
                        Value & location = v["Location"];
                        vector<int> tLocation;
                        if(location.IsArray()){
                            for(size_t j = 0; j < location.Size();++j){
                                Value & val = location[j];
                                tLocation.push_back(val.GetInt());
                            }
                        }
                        Value & scale = v["Scale"];
                        vector<float> tScale;
                        if(scale.IsArray()){
                            for(size_t j = 0; j < scale.Size();++j){
                                Value & val = scale[j];
                                tScale.push_back(val.GetFloat());
                            }
                        }
                       
                        ParticleConfig particleconfig;
                        particleconfig.setId(id.GetInt()); 
                        particleconfig.setTexture(texture.GetString()); 
                        particleconfig.setConfig(config.GetString()); 
                        particleconfig.setLocation(tLocation);
                        particleconfig.setScale(tScale);
                        
                        ParticleConfig::Dic().insert(pair<int,ParticleConfig>(particleconfig.getId(),particleconfig));
                        ParticleConfig::Arr().push_back(particleconfig);
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
        
        string getTexture(){
            return Texture;
        }
        void setTexture(string val){
            Texture = val;
        }
        
        string getConfig(){
            return Config;
        }
        void setConfig(string val){
            Config = val;
        }
        
        vector<int> getLocation(){
            return Location;
        }
        void setLocation(vector<int> val){
            Location = val;
        }
        vector<float> getScale(){
            return Scale;
        }
        void setScale(vector<float> val){
            Scale = val;
        }
        
		
    private:
         int Id;
         string Texture;
         string Config;
         vector<int> Location;
         vector<float> Scale;
        
};

#endif