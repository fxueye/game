        #ifndef __SERVER_GAME_ROOMCONFIG_H
#define __SERVER_GAME_ROOMCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class RoomConfig {
	public:
		static map<int,RoomConfig>& Dic()
        {
            static map<int,RoomConfig> g_dic;
            return g_dic;
        }
		static vector<RoomConfig>& Arr(){
            static vector<RoomConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & totaltype = v["TotalType"];
                        Value & name = v["Name"];
                        Value & competitionids = v["CompetitionIds"];
                        vector<int> tCompetitionIds;
                        if(competitionids.IsArray()){
                            for(size_t j = 0; j < competitionids.Size();++j){
                                Value & val = competitionids[j];
                                tCompetitionIds.push_back(val.GetInt());
                            }
                        }
                        Value & stockname = v["StockName"];
                        Value & isopen = v["IsOpen"];
                        Value & daytype = v["DayType"];
                       
                        RoomConfig roomconfig;
                        roomconfig.setId(id.GetInt()); 
                        roomconfig.setTotalType(totaltype.GetInt()); 
                        roomconfig.setName(name.GetString()); 
                        roomconfig.setCompetitionIds(tCompetitionIds);
                        roomconfig.setStockName(stockname.GetString()); 
                        roomconfig.setIsOpen(isopen.GetInt()); 
                        roomconfig.setDayType(daytype.GetInt()); 
                        
                        RoomConfig::Dic().insert(pair<int,RoomConfig>(roomconfig.getId(),roomconfig));
                        RoomConfig::Arr().push_back(roomconfig);
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
        
        int getTotalType(){
            return TotalType;
        }
        void setTotalType(int val){
            TotalType = val;
        }
        
        string getName(){
            return Name;
        }
        void setName(string val){
            Name = val;
        }
        
        vector<int> getCompetitionIds(){
            return CompetitionIds;
        }
        void setCompetitionIds(vector<int> val){
            CompetitionIds = val;
        }
        string getStockName(){
            return StockName;
        }
        void setStockName(string val){
            StockName = val;
        }
        
        int getIsOpen(){
            return IsOpen;
        }
        void setIsOpen(int val){
            IsOpen = val;
        }
        
        int getDayType(){
            return DayType;
        }
        void setDayType(int val){
            DayType = val;
        }
        
        
		
    private:
         int Id;
         int TotalType;
         string Name;
         vector<int> CompetitionIds;
         string StockName;
         int IsOpen;
         int DayType;
        
};

#endif