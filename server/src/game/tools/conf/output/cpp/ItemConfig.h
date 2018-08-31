        #ifndef __SERVER_GAME_ITEMCONFIG_H
#define __SERVER_GAME_ITEMCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class ItemConfig {
	public:
		static map<int,ItemConfig>& Dic()
        {
            static map<int,ItemConfig> g_dic;
            return g_dic;
        }
		static vector<ItemConfig>& Arr(){
            static vector<ItemConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & name = v["Name"];
                        Value & itemtype = v["ItemType"];
                        Value & icon = v["Icon"];
                        Value & star = v["Star"];
                       
                        ItemConfig itemconfig;
                        itemconfig.setId(id.GetInt()); 
                        itemconfig.setName(name.GetString()); 
                        itemconfig.setItemType(itemtype.GetInt()); 
                        itemconfig.setIcon(icon.GetString()); 
                        itemconfig.setStar(star.GetInt()); 
                        
                        ItemConfig::Dic().insert(pair<int,ItemConfig>(itemconfig.getId(),itemconfig));
                        ItemConfig::Arr().push_back(itemconfig);
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
        
        int getItemType(){
            return ItemType;
        }
        void setItemType(int val){
            ItemType = val;
        }
        
        string getIcon(){
            return Icon;
        }
        void setIcon(string val){
            Icon = val;
        }
        
        int getStar(){
            return Star;
        }
        void setStar(int val){
            Star = val;
        }
        
        
		
    private:
         int Id;
         string Name;
         int ItemType;
         string Icon;
         int Star;
        
};

#endif