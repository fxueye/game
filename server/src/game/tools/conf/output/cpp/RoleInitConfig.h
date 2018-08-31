        #ifndef __SERVER_GAME_ROLEINITCONFIG_H
#define __SERVER_GAME_ROLEINITCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class RoleInitConfig {
	public:
		static map<int,RoleInitConfig>& Dic()
        {
            static map<int,RoleInitConfig> g_dic;
            return g_dic;
        }
		static vector<RoleInitConfig>& Arr(){
            static vector<RoleInitConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & iconid = v["IconID"];
                        Value & gold = v["Gold"];
                        Value & diamond = v["Diamond"];
                        Value & initsuit = v["InitSuit"];
                       
                        RoleInitConfig roleinitconfig;
                        roleinitconfig.setId(id.GetInt()); 
                        roleinitconfig.setIconID(iconid.GetInt()); 
                        roleinitconfig.setGold(gold.GetInt()); 
                        roleinitconfig.setDiamond(diamond.GetInt()); 
                        roleinitconfig.setInitSuit(initsuit.GetInt()); 
                        
                        RoleInitConfig::Dic().insert(pair<int,RoleInitConfig>(roleinitconfig.getId(),roleinitconfig));
                        RoleInitConfig::Arr().push_back(roleinitconfig);
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
        
        int getIconID(){
            return IconID;
        }
        void setIconID(int val){
            IconID = val;
        }
        
        int getGold(){
            return Gold;
        }
        void setGold(int val){
            Gold = val;
        }
        
        int getDiamond(){
            return Diamond;
        }
        void setDiamond(int val){
            Diamond = val;
        }
        
        int getInitSuit(){
            return InitSuit;
        }
        void setInitSuit(int val){
            InitSuit = val;
        }
        
        
		
    private:
         int Id;
         int IconID;
         int Gold;
         int Diamond;
         int InitSuit;
        
};

#endif