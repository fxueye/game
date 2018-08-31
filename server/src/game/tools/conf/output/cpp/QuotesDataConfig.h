        #ifndef __SERVER_GAME_QUOTESDATACONFIG_H
#define __SERVER_GAME_QUOTESDATACONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class QuotesDataConfig {
	public:
		static map<int,QuotesDataConfig>& Dic()
        {
            static map<int,QuotesDataConfig> g_dic;
            return g_dic;
        }
		static vector<QuotesDataConfig>& Arr(){
            static vector<QuotesDataConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & textid = v["TextId"];
                       
                        Value & keyid = v["KeyId"];
                       
                        QuotesDataConfig quotesdataconfig;
                        quotesdataconfig.setId(id.GetInt()); 
                        quotesdataconfig.setTextId(textid.GetInt()); 
                        
                        quotesdataconfig.setKeyId(keyid.GetInt()); 
                        
                        QuotesDataConfig::Dic().insert(pair<int,QuotesDataConfig>(quotesdataconfig.getId(),quotesdataconfig));
                        QuotesDataConfig::Arr().push_back(quotesdataconfig);
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
        
        int getTextId(){
            return TextId;
        }
        void setTextId(int val){
            TextId = val;
        }
        
        
        int getKeyId(){
            return KeyId;
        }
        void setKeyId(int val){
            KeyId = val;
        }
        
        
		
    private:
         int Id;
         int TextId;
        
         int KeyId;
        
};

#endif