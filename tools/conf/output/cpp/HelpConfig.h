        #ifndef __SERVER_GAME_HELPCONFIG_H
#define __SERVER_GAME_HELPCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class HelpConfig {
	public:
		static map<int,HelpConfig>& Dic()
        {
            static map<int,HelpConfig> g_dic;
            return g_dic;
        }
		static vector<HelpConfig>& Arr(){
            static vector<HelpConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & helptext = v["HelpText"];
                       
                        HelpConfig helpconfig;
                        helpconfig.setId(id.GetInt()); 
                        helpconfig.setHelpText(helptext.GetString()); 
                        
                        HelpConfig::Dic().insert(pair<int,HelpConfig>(helpconfig.getId(),helpconfig));
                        HelpConfig::Arr().push_back(helpconfig);
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
        
        string getHelpText(){
            return HelpText;
        }
        void setHelpText(string val){
            HelpText = val;
        }
        
        
		
    private:
         int Id;
         string HelpText;
        
};

#endif