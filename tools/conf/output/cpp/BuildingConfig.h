        #ifndef __SERVER_GAME_BUILDINGCONFIG_H
#define __SERVER_GAME_BUILDINGCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class BuildingConfig {
	public:
		static map<int,BuildingConfig>& Dic()
        {
            static map<int,BuildingConfig> g_dic;
            return g_dic;
        }
		static vector<BuildingConfig>& Arr(){
            static vector<BuildingConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & name = v["Name"];
                        Value & textid = v["TextId"];
                        Value & namelocation = v["NameLocation"];
                        vector<int> tNameLocation;
                        if(namelocation.IsArray()){
                            for(size_t j = 0; j < namelocation.Size();++j){
                                Value & val = namelocation[j];
                                tNameLocation.push_back(val.GetInt());
                            }
                        }
                        Value & open = v["Open"];
                        Value & image = v["Image"];
                        Value & location = v["Location"];
                        vector<int> tLocation;
                        if(location.IsArray()){
                            for(size_t j = 0; j < location.Size();++j){
                                Value & val = location[j];
                                tLocation.push_back(val.GetInt());
                            }
                        }
                        Value & gateid = v["GateId"];
                       
                        BuildingConfig buildingconfig;
                        buildingconfig.setId(id.GetInt()); 
                        buildingconfig.setName(name.GetString()); 
                        buildingconfig.setTextId(textid.GetInt()); 
                        buildingconfig.setNameLocation(tNameLocation);
                        buildingconfig.setOpen(open.GetInt()); 
                        buildingconfig.setImage(image.GetString()); 
                        buildingconfig.setLocation(tLocation);
                        buildingconfig.setGateId(gateid.GetInt()); 
                        
                        BuildingConfig::Dic().insert(pair<int,BuildingConfig>(buildingconfig.getId(),buildingconfig));
                        BuildingConfig::Arr().push_back(buildingconfig);
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
        
        int getTextId(){
            return TextId;
        }
        void setTextId(int val){
            TextId = val;
        }
        
        vector<int> getNameLocation(){
            return NameLocation;
        }
        void setNameLocation(vector<int> val){
            NameLocation = val;
        }
        int getOpen(){
            return Open;
        }
        void setOpen(int val){
            Open = val;
        }
        
        string getImage(){
            return Image;
        }
        void setImage(string val){
            Image = val;
        }
        
        vector<int> getLocation(){
            return Location;
        }
        void setLocation(vector<int> val){
            Location = val;
        }
        int getGateId(){
            return GateId;
        }
        void setGateId(int val){
            GateId = val;
        }
        
        
		
    private:
         int Id;
         string Name;
         int TextId;
         vector<int> NameLocation;
         int Open;
         string Image;
         vector<int> Location;
         int GateId;
        
};

#endif