        #ifndef __SERVER_GAME_SLOTSCONFIG_H
#define __SERVER_GAME_SLOTSCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class SlotsConfig {
	public:
		static map<int,SlotsConfig>& Dic()
        {
            static map<int,SlotsConfig> g_dic;
            return g_dic;
        }
		static vector<SlotsConfig>& Arr(){
            static vector<SlotsConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & name = v["Name"];
                        Value & beforeslot = v["BeforeSlot"];
                        vector<int> tBeforeSlot;
                        if(beforeslot.IsArray()){
                            for(size_t j = 0; j < beforeslot.Size();++j){
                                Value & val = beforeslot[j];
                                tBeforeSlot.push_back(val.GetInt());
                            }
                        }
                       
                       
                        SlotsConfig slotsconfig;
                        slotsconfig.setId(id.GetInt()); 
                        slotsconfig.setName(name.GetString()); 
                        slotsconfig.setBeforeSlot(tBeforeSlot);
                        
                        
                        SlotsConfig::Dic().insert(pair<int,SlotsConfig>(slotsconfig.getId(),slotsconfig));
                        SlotsConfig::Arr().push_back(slotsconfig);
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
        
        string getName(){
            return Name;
        }
        void setName(string val){
            Name = val;
        }
        
        vector<int> getBeforeSlot(){
            return BeforeSlot;
        }
        void setBeforeSlot(vector<int> val){
            BeforeSlot = val;
        }
        
        
		
    private:
         int Id;
         string Name;
         vector<int> BeforeSlot;
        
        
};

#endif