        #ifndef __SERVER_GAME_PARTCONFIG_H
#define __SERVER_GAME_PARTCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class PartConfig {
	public:
		static map<int,PartConfig>& Dic()
        {
            static map<int,PartConfig> g_dic;
            return g_dic;
        }
		static vector<PartConfig>& Arr(){
            static vector<PartConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & armname = v["ArmName"];
                        vector<string> tArmName;
                        if(armname.IsArray()){
                            for(size_t j = 0; j < armname.Size();++j){
                                Value & val = armname[j];
                                tArmName.push_back(val.GetString());
                            }
                        }
                       
                        Value & type = v["Type"];
                        Value & texname = v["TexName"];
                        vector<string> tTexName;
                        if(texname.IsArray()){
                            for(size_t j = 0; j < texname.Size();++j){
                                Value & val = texname[j];
                                tTexName.push_back(val.GetString());
                            }
                        }
                        Value & slots = v["Slots"];
                        vector<int> tSlots;
                        if(slots.IsArray()){
                            for(size_t j = 0; j < slots.Size();++j){
                                Value & val = slots[j];
                                tSlots.push_back(val.GetInt());
                            }
                        }
                        Value & meslots = v["MeSlots"];
                        vector<int> tMeSlots;
                        if(meslots.IsArray()){
                            for(size_t j = 0; j < meslots.Size();++j){
                                Value & val = meslots[j];
                                tMeSlots.push_back(val.GetInt());
                            }
                        }
                        Value & show = v["Show"];
                        Value & iconscale = v["IconScale"];
                        Value & deviation = v["Deviation"];
                        vector<float> tDeviation;
                        if(deviation.IsArray()){
                            for(size_t j = 0; j < deviation.Size();++j){
                                Value & val = deviation[j];
                                tDeviation.push_back(val.GetFloat());
                            }
                        }
                       
                        PartConfig partconfig;
                        partconfig.setId(id.GetInt()); 
                        partconfig.setArmName(tArmName);
                        
                        partconfig.setType(type.GetInt()); 
                        partconfig.setTexName(tTexName);
                        partconfig.setSlots(tSlots);
                        partconfig.setMeSlots(tMeSlots);
                        partconfig.setShow(show.GetInt()); 
                        partconfig.setIconScale(iconscale.GetFloat()); 
                        partconfig.setDeviation(tDeviation);
                        
                        PartConfig::Dic().insert(pair<int,PartConfig>(partconfig.getId(),partconfig));
                        PartConfig::Arr().push_back(partconfig);
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
        
        vector<string> getArmName(){
            return ArmName;
        }
        void setArmName(vector<string> val){
            ArmName = val;
        }
        
        int getType(){
            return Type;
        }
        void setType(int val){
            Type = val;
        }
        
        vector<string> getTexName(){
            return TexName;
        }
        void setTexName(vector<string> val){
            TexName = val;
        }
        vector<int> getSlots(){
            return Slots;
        }
        void setSlots(vector<int> val){
            Slots = val;
        }
        vector<int> getMeSlots(){
            return MeSlots;
        }
        void setMeSlots(vector<int> val){
            MeSlots = val;
        }
        int getShow(){
            return Show;
        }
        void setShow(int val){
            Show = val;
        }
        
        float getIconScale(){
            return IconScale;
        }
        void setIconScale(float val){
            IconScale = val;
        }
        
        vector<float> getDeviation(){
            return Deviation;
        }
        void setDeviation(vector<float> val){
            Deviation = val;
        }
        
		
    private:
         int Id;
         vector<string> ArmName;
        
         int Type;
         vector<string> TexName;
         vector<int> Slots;
         vector<int> MeSlots;
         int Show;
         float IconScale;
         vector<float> Deviation;
        
};

#endif