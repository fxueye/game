        #ifndef __SERVER_GAME_PROPERTYTYPECONFIG_H
#define __SERVER_GAME_PROPERTYTYPECONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class PropertyTypeConfig {
	public:
		static map<int,PropertyTypeConfig>& Dic()
        {
            static map<int,PropertyTypeConfig> g_dic;
            return g_dic;
        }
		static vector<PropertyTypeConfig>& Arr(){
            static vector<PropertyTypeConfig> g_arr;
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
                        Value & bg = v["Bg"];
                        Value & icon = v["Icon"];
                        Value & icondown = v["IconDown"];
                       
                        PropertyTypeConfig propertytypeconfig;
                        propertytypeconfig.setId(id.GetInt()); 
                        propertytypeconfig.setParent(parent.GetInt()); 
                        propertytypeconfig.setName(name.GetString()); 
                        propertytypeconfig.setBg(bg.GetInt()); 
                        propertytypeconfig.setIcon(icon.GetString()); 
                        propertytypeconfig.setIconDown(icondown.GetString()); 
                        
                        PropertyTypeConfig::Dic().insert(pair<int,PropertyTypeConfig>(propertytypeconfig.getId(),propertytypeconfig));
                        PropertyTypeConfig::Arr().push_back(propertytypeconfig);
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
        
        int getBg(){
            return Bg;
        }
        void setBg(int val){
            Bg = val;
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
         int Bg;
         string Icon;
         string IconDown;
        
};

#endif