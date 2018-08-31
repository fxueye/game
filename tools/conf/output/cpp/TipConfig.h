        #ifndef __SERVER_GAME_TIPCONFIG_H
#define __SERVER_GAME_TIPCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class TipConfig {
	public:
		static map<int,TipConfig>& Dic()
        {
            static map<int,TipConfig> g_dic;
            return g_dic;
        }
		static vector<TipConfig>& Arr(){
            static vector<TipConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & tip = v["Tip"];
                       
                        TipConfig tipconfig;
                        tipconfig.setId(id.GetInt()); 
                        tipconfig.setTip(tip.GetString()); 
                        
                        TipConfig::Dic().insert(pair<int,TipConfig>(tipconfig.getId(),tipconfig));
                        TipConfig::Arr().push_back(tipconfig);
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
        
        string getTip(){
            return Tip;
        }
        void setTip(string val){
            Tip = val;
        }
        
        
		
    private:
         int Id;
         string Tip;
        
};

#endif