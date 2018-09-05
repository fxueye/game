        #ifndef __SERVER_GAME_INTERVALCONFIG_H
#define __SERVER_GAME_INTERVALCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class IntervalConfig {
	public:
		static map<int,IntervalConfig>& Dic()
        {
            static map<int,IntervalConfig> g_dic;
            return g_dic;
        }
		static vector<IntervalConfig>& Arr(){
            static vector<IntervalConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & intervalid = v["IntervalId"];
                        Value & oddsid = v["OddsId"];
                        Value & mcid = v["McId"];
                       
                        IntervalConfig intervalconfig;
                        intervalconfig.setId(id.GetInt()); 
                        intervalconfig.setIntervalId(intervalid.GetInt()); 
                        intervalconfig.setOddsId(oddsid.GetInt()); 
                        intervalconfig.setMcId(mcid.GetInt()); 
                        
                        IntervalConfig::Dic().insert(pair<int,IntervalConfig>(intervalconfig.getId(),intervalconfig));
                        IntervalConfig::Arr().push_back(intervalconfig);
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
        
        int getIntervalId(){
            return IntervalId;
        }
        void setIntervalId(int val){
            IntervalId = val;
        }
        
        int getOddsId(){
            return OddsId;
        }
        void setOddsId(int val){
            OddsId = val;
        }
        
        int getMcId(){
            return McId;
        }
        void setMcId(int val){
            McId = val;
        }
        
        
		
    private:
         int Id;
         int IntervalId;
         int OddsId;
         int McId;
        
};

#endif