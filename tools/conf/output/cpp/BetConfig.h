        #ifndef __SERVER_GAME_BETCONFIG_H
#define __SERVER_GAME_BETCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class BetConfig {
	public:
		static map<int,BetConfig>& Dic()
        {
            static map<int,BetConfig> g_dic;
            return g_dic;
        }
		static vector<BetConfig>& Arr(){
            static vector<BetConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & groupid = v["GroupId"];
                        Value & betmoney = v["BetMoney"];
                       
                        BetConfig betconfig;
                        betconfig.setId(id.GetInt()); 
                        betconfig.setGroupId(groupid.GetInt()); 
                        betconfig.setBetMoney(betmoney.GetInt()); 
                        
                        BetConfig::Dic().insert(pair<int,BetConfig>(betconfig.getId(),betconfig));
                        BetConfig::Arr().push_back(betconfig);
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
        
        int getGroupId(){
            return GroupId;
        }
        void setGroupId(int val){
            GroupId = val;
        }
        
        int getBetMoney(){
            return BetMoney;
        }
        void setBetMoney(int val){
            BetMoney = val;
        }
        
        
		
    private:
         int Id;
         int GroupId;
         int BetMoney;
        
};

#endif