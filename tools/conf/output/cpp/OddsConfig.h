        #ifndef __SERVER_GAME_ODDSCONFIG_H
#define __SERVER_GAME_ODDSCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class OddsConfig {
	public:
		static map<int,OddsConfig>& Dic()
        {
            static map<int,OddsConfig> g_dic;
            return g_dic;
        }
		static vector<OddsConfig>& Arr(){
            static vector<OddsConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                       
                        Value & confirmvalue = v["ConfirmValue"];
                        Value & movingrate = v["MovingRate"];
                       
                        OddsConfig oddsconfig;
                        oddsconfig.setId(id.GetInt()); 
                        
                        oddsconfig.setConfirmValue(confirmvalue.GetFloat()); 
                        oddsconfig.setMovingRate(movingrate.GetFloat()); 
                        
                        OddsConfig::Dic().insert(pair<int,OddsConfig>(oddsconfig.getId(),oddsconfig));
                        OddsConfig::Arr().push_back(oddsconfig);
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
        
        
        float getConfirmValue(){
            return ConfirmValue;
        }
        void setConfirmValue(float val){
            ConfirmValue = val;
        }
        
        float getMovingRate(){
            return MovingRate;
        }
        void setMovingRate(float val){
            MovingRate = val;
        }
        
        
		
    private:
         int Id;
        
         float ConfirmValue;
         float MovingRate;
        
};

#endif