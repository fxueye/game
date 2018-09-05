        #ifndef __SERVER_GAME_MOVECLIPCONFIG_H
#define __SERVER_GAME_MOVECLIPCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class MoveClipConfig {
	public:
		static map<int,MoveClipConfig>& Dic()
        {
            static map<int,MoveClipConfig> g_dic;
            return g_dic;
        }
		static vector<MoveClipConfig>& Arr(){
            static vector<MoveClipConfig> g_arr;
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
                        Value & name = v["Name"];
                        Value & play = v["Play"];
                        Value & framerate = v["FrameRate"];
                        Value & times = v["Times"];
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
                       
                        MoveClipConfig moveclipconfig;
                        moveclipconfig.setId(id.GetInt()); 
                        moveclipconfig.setTexture(texture.GetString()); 
                        moveclipconfig.setConfig(config.GetString()); 
                        moveclipconfig.setName(name.GetString()); 
                        moveclipconfig.setPlay(play.GetString()); 
                        moveclipconfig.setFrameRate(framerate.GetFloat()); 
                        moveclipconfig.setTimes(times.GetInt()); 
                        moveclipconfig.setLocation(tLocation);
                        moveclipconfig.setScale(tScale);
                        
                        MoveClipConfig::Dic().insert(pair<int,MoveClipConfig>(moveclipconfig.getId(),moveclipconfig));
                        MoveClipConfig::Arr().push_back(moveclipconfig);
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
        
        string getName(){
            return Name;
        }
        void setName(string val){
            Name = val;
        }
        
        string getPlay(){
            return Play;
        }
        void setPlay(string val){
            Play = val;
        }
        
        float getFrameRate(){
            return FrameRate;
        }
        void setFrameRate(float val){
            FrameRate = val;
        }
        
        int getTimes(){
            return Times;
        }
        void setTimes(int val){
            Times = val;
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
         string Name;
         string Play;
         float FrameRate;
         int Times;
         vector<int> Location;
         vector<float> Scale;
        
};

#endif