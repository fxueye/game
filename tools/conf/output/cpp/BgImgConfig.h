        #ifndef __SERVER_GAME_BGIMGCONFIG_H
#define __SERVER_GAME_BGIMGCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class BgImgConfig {
	public:
		static map<int,BgImgConfig>& Dic()
        {
            static map<int,BgImgConfig> g_dic;
            return g_dic;
        }
		static vector<BgImgConfig>& Arr(){
            static vector<BgImgConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & name = v["Name"];
                        Value & location = v["Location"];
                        vector<int> tLocation;
                        if(location.IsArray()){
                            for(size_t j = 0; j < location.Size();++j){
                                Value & val = location[j];
                                tLocation.push_back(val.GetInt());
                            }
                        }
                       
                       
                        BgImgConfig bgimgconfig;
                        bgimgconfig.setId(id.GetInt()); 
                        bgimgconfig.setName(name.GetString()); 
                        bgimgconfig.setLocation(tLocation);
                        
                        
                        BgImgConfig::Dic().insert(pair<int,BgImgConfig>(bgimgconfig.getId(),bgimgconfig));
                        BgImgConfig::Arr().push_back(bgimgconfig);
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
        
        string getName(){
            return Name;
        }
        void setName(string val){
            Name = val;
        }
        
        vector<int> getLocation(){
            return Location;
        }
        void setLocation(vector<int> val){
            Location = val;
        }
        
        
		
    private:
         int Id;
         string Name;
         vector<int> Location;
        
        
};

#endif