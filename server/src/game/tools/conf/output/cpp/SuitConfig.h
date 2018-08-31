        #ifndef __SERVER_GAME_SUITCONFIG_H
#define __SERVER_GAME_SUITCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class SuitConfig {
	public:
		static map<int,SuitConfig>& Dic()
        {
            static map<int,SuitConfig> g_dic;
            return g_dic;
        }
		static vector<SuitConfig>& Arr(){
            static vector<SuitConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & name = v["Name"];
                        Value & parts = v["Parts"];
                        vector<int> tParts;
                        if(parts.IsArray()){
                            for(size_t j = 0; j < parts.Size();++j){
                                Value & val = parts[j];
                                tParts.push_back(val.GetInt());
                            }
                        }
                       
                        SuitConfig suitconfig;
                        suitconfig.setId(id.GetInt()); 
                        suitconfig.setName(name.GetString()); 
                        suitconfig.setParts(tParts);
                        
                        SuitConfig::Dic().insert(pair<int,SuitConfig>(suitconfig.getId(),suitconfig));
                        SuitConfig::Arr().push_back(suitconfig);
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
        
        vector<int> getParts(){
            return Parts;
        }
        void setParts(vector<int> val){
            Parts = val;
        }
        
		
    private:
         int Id;
         string Name;
         vector<int> Parts;
        
};

#endif