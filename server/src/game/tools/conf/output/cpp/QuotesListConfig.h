        #ifndef __SERVER_GAME_QUOTESLISTCONFIG_H
#define __SERVER_GAME_QUOTESLISTCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class QuotesListConfig {
	public:
		static map<int,QuotesListConfig>& Dic()
        {
            static map<int,QuotesListConfig> g_dic;
            return g_dic;
        }
		static vector<QuotesListConfig>& Arr(){
            static vector<QuotesListConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & gatetype = v["GateType"];
                        Value & gateid = v["GateId"];
                       
                        Value & dataseries = v["DataSeries"];
                        vector<int> tDataSeries;
                        if(dataseries.IsArray()){
                            for(size_t j = 0; j < dataseries.Size();++j){
                                Value & val = dataseries[j];
                                tDataSeries.push_back(val.GetInt());
                            }
                        }
                        Value & special = v["Special"];
                        Value & textid = v["Textid"];
                       
                        Value & isbuy = v["Isbuy"];
                       
                        QuotesListConfig quoteslistconfig;
                        quoteslistconfig.setId(id.GetInt()); 
                        quoteslistconfig.setGateType(gatetype.GetInt()); 
                        quoteslistconfig.setGateId(gateid.GetInt()); 
                        
                        quoteslistconfig.setDataSeries(tDataSeries);
                        quoteslistconfig.setSpecial(special.GetString()); 
                        quoteslistconfig.setTextid(textid.GetString()); 
                        
                        quoteslistconfig.setIsbuy(isbuy.GetString()); 
                        
                        QuotesListConfig::Dic().insert(pair<int,QuotesListConfig>(quoteslistconfig.getId(),quoteslistconfig));
                        QuotesListConfig::Arr().push_back(quoteslistconfig);
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
        
        int getGateType(){
            return GateType;
        }
        void setGateType(int val){
            GateType = val;
        }
        
        int getGateId(){
            return GateId;
        }
        void setGateId(int val){
            GateId = val;
        }
        
        
        vector<int> getDataSeries(){
            return DataSeries;
        }
        void setDataSeries(vector<int> val){
            DataSeries = val;
        }
        string getSpecial(){
            return Special;
        }
        void setSpecial(string val){
            Special = val;
        }
        
        string getTextid(){
            return Textid;
        }
        void setTextid(string val){
            Textid = val;
        }
        
        
        string getIsbuy(){
            return Isbuy;
        }
        void setIsbuy(string val){
            Isbuy = val;
        }
        
        
		
    private:
         int Id;
         int GateType;
         int GateId;
        
         vector<int> DataSeries;
         string Special;
         string Textid;
        
         string Isbuy;
        
};

#endif