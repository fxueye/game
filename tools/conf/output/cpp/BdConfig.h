        #ifndef __SERVER_GAME_BDCONFIG_H
#define __SERVER_GAME_BDCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class BdConfig {
	public:
		static map<int,BdConfig>& Dic()
        {
            static map<int,BdConfig> g_dic;
            return g_dic;
        }
		static vector<BdConfig>& Arr(){
            static vector<BdConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & playtimes = v["PlayTimes"];
                        Value & animation = v["Animation"];
                        Value & armname = v["ArmName"];
                        Value & name = v["Name"];
                        Value & type = v["Type"];
                        Value & texname = v["TexName"];
                        Value & slots = v["Slots"];
                        vector<int> tSlots;
                        if(slots.IsArray()){
                            for(size_t j = 0; j < slots.Size();++j){
                                Value & val = slots[j];
                                tSlots.push_back(val.GetInt());
                            }
                        }
                       
                        BdConfig bdconfig;
                        bdconfig.setId(id.GetInt()); 
                        bdconfig.setPlayTimes(playtimes.GetInt()); 
                        bdconfig.setAnimation(animation.GetString()); 
                        bdconfig.setArmName(armname.GetString()); 
                        bdconfig.setName(name.GetString()); 
                        bdconfig.setType(type.GetInt()); 
                        bdconfig.setTexName(texname.GetString()); 
                        bdconfig.setSlots(tSlots);
                        
                        BdConfig::Dic().insert(pair<int,BdConfig>(bdconfig.getId(),bdconfig));
                        BdConfig::Arr().push_back(bdconfig);
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
        
        int getPlayTimes(){
            return PlayTimes;
        }
        void setPlayTimes(int val){
            PlayTimes = val;
        }
        
        string getAnimation(){
            return Animation;
        }
        void setAnimation(string val){
            Animation = val;
        }
        
        string getArmName(){
            return ArmName;
        }
        void setArmName(string val){
            ArmName = val;
        }
        
        string getName(){
            return Name;
        }
        void setName(string val){
            Name = val;
        }
        
        int getType(){
            return Type;
        }
        void setType(int val){
            Type = val;
        }
        
        string getTexName(){
            return TexName;
        }
        void setTexName(string val){
            TexName = val;
        }
        
        vector<int> getSlots(){
            return Slots;
        }
        void setSlots(vector<int> val){
            Slots = val;
        }
        
		
    private:
         int Id;
         int PlayTimes;
         string Animation;
         string ArmName;
         string Name;
         int Type;
         string TexName;
         vector<int> Slots;
        
};

#endif