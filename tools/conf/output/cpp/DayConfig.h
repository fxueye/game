        #ifndef __SERVER_GAME_DAYCONFIG_H
#define __SERVER_GAME_DAYCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class DayConfig {
	public:
		static map<int,DayConfig>& Dic()
        {
            static map<int,DayConfig> g_dic;
            return g_dic;
        }
		static vector<DayConfig>& Arr(){
            static vector<DayConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & markettype = v["MarketType"];
                        Value & day = v["Day"];
                        Value & isopen = v["IsOpen"];
                       
                       
                        DayConfig dayconfig;
                        dayconfig.setId(id.GetInt()); 
                        dayconfig.setMarketType(markettype.GetInt()); 
                        dayconfig.setDay(day.GetString()); 
                        dayconfig.setIsOpen(isopen.GetInt()); 
                        
                        
                        DayConfig::Dic().insert(pair<int,DayConfig>(dayconfig.getId(),dayconfig));
                        DayConfig::Arr().push_back(dayconfig);
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
        
        int getMarketType(){
            return MarketType;
        }
        void setMarketType(int val){
            MarketType = val;
        }
        
        string getDay(){
            return Day;
        }
        void setDay(string val){
            Day = val;
        }
        
        int getIsOpen(){
            return IsOpen;
        }
        void setIsOpen(int val){
            IsOpen = val;
        }
        
        
        
		
    private:
         int Id;
         int MarketType;
         string Day;
         int IsOpen;
        
        
};

#endif