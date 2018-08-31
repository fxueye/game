        #ifndef __SERVER_GAME_PARTTYPECONFIG_H
#define __SERVER_GAME_PARTTYPECONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class PartTypeConfig {
	public:
		static map<int,PartTypeConfig>& Dic()
        {
            static map<int,PartTypeConfig> g_dic;
            return g_dic;
        }
		static vector<PartTypeConfig>& Arr(){
            static vector<PartTypeConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & parent = v["Parent"];
                        Value & name = v["Name"];
                        Value & icon = v["Icon"];
                        Value & icondown = v["IconDown"];
                       
                       
                        PartTypeConfig parttypeconfig;
                        parttypeconfig.setId(id.GetInt()); 
                        parttypeconfig.setParent(parent.GetInt()); 
                        parttypeconfig.setName(name.GetString()); 
                        parttypeconfig.setIcon(icon.GetString()); 
                        parttypeconfig.setIconDown(icondown.GetString()); 
                        
                        
                        PartTypeConfig::Dic().insert(pair<int,PartTypeConfig>(parttypeconfig.getId(),parttypeconfig));
                        PartTypeConfig::Arr().push_back(parttypeconfig);
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
        
        int getParent(){
            return Parent;
        }
        void setParent(int val){
            Parent = val;
        }
        
        string getName(){
            return Name;
        }
        void setName(string val){
            Name = val;
        }
        
        string getIcon(){
            return Icon;
        }
        void setIcon(string val){
            Icon = val;
        }
        
        string getIconDown(){
            return IconDown;
        }
        void setIconDown(string val){
            IconDown = val;
        }
        
        
        
		
    private:
         int Id;
         int Parent;
         string Name;
         string Icon;
         string IconDown;
        
        
};

#endif