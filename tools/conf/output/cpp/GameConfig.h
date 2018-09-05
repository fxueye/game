        #ifndef __SERVER_GAME_GAMECONFIG_H
#define __SERVER_GAME_GAMECONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class GameConfig {
	public:
		static map<int,GameConfig>& Dic()
        {
            static map<int,GameConfig> g_dic;
            return g_dic;
        }
		static vector<GameConfig>& Arr(){
            static vector<GameConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & data = v["Data"];
                       
                       
                        GameConfig gameconfig;
                        gameconfig.setId(id.GetInt()); 
                        gameconfig.setData(data.GetString()); 
                        
                        
                        GameConfig::Dic().insert(pair<int,GameConfig>(gameconfig.getId(),gameconfig));
                        GameConfig::Arr().push_back(gameconfig);
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
        
        string getData(){
            return Data;
        }
        void setData(string val){
            Data = val;
        }
        
        
        
		
    private:
         int Id;
         string Data;
        
        
};

#endif