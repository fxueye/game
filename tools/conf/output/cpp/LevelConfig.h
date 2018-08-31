        #ifndef __SERVER_GAME_LEVELCONFIG_H
#define __SERVER_GAME_LEVELCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class LevelConfig {
	public:
		static map<int,LevelConfig>& Dic()
        {
            static map<int,LevelConfig> g_dic;
            return g_dic;
        }
		static vector<LevelConfig>& Arr(){
            static vector<LevelConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & exp = v["Exp"];
                       
                        LevelConfig levelconfig;
                        levelconfig.setId(id.GetInt()); 
                        levelconfig.setExp(exp.GetInt()); 
                        
                        LevelConfig::Dic().insert(pair<int,LevelConfig>(levelconfig.getId(),levelconfig));
                        LevelConfig::Arr().push_back(levelconfig);
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
        
        int getExp(){
            return Exp;
        }
        void setExp(int val){
            Exp = val;
        }
        
        
		
    private:
         int Id;
         int Exp;
        
};

#endif