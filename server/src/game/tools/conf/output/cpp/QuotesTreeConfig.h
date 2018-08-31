        #ifndef __SERVER_GAME_QUOTESTREECONFIG_H
#define __SERVER_GAME_QUOTESTREECONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class QuotesTreeConfig {
	public:
		static map<int,QuotesTreeConfig>& Dic()
        {
            static map<int,QuotesTreeConfig> g_dic;
            return g_dic;
        }
		static vector<QuotesTreeConfig>& Arr(){
            static vector<QuotesTreeConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & parentid = v["ParentId"];
                        Value & name = v["Name"];
                        Value & textid = v["TextId"];
                        Value & type = v["Type"];
                        Value & listid = v["ListId"];
                       
                        QuotesTreeConfig quotestreeconfig;
                        quotestreeconfig.setId(id.GetInt()); 
                        quotestreeconfig.setParentId(parentid.GetInt()); 
                        quotestreeconfig.setName(name.GetString()); 
                        quotestreeconfig.setTextId(textid.GetInt()); 
                        quotestreeconfig.setType(type.GetInt()); 
                        quotestreeconfig.setListId(listid.GetInt()); 
                        
                        QuotesTreeConfig::Dic().insert(pair<int,QuotesTreeConfig>(quotestreeconfig.getId(),quotestreeconfig));
                        QuotesTreeConfig::Arr().push_back(quotestreeconfig);
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
        
        int getParentId(){
            return ParentId;
        }
        void setParentId(int val){
            ParentId = val;
        }
        
        string getName(){
            return Name;
        }
        void setName(string val){
            Name = val;
        }
        
        int getTextId(){
            return TextId;
        }
        void setTextId(int val){
            TextId = val;
        }
        
        int getType(){
            return Type;
        }
        void setType(int val){
            Type = val;
        }
        
        int getListId(){
            return ListId;
        }
        void setListId(int val){
            ListId = val;
        }
        
        
		
    private:
         int Id;
         int ParentId;
         string Name;
         int TextId;
         int Type;
         int ListId;
        
};

#endif