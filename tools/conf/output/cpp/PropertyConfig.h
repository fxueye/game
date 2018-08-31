        #ifndef __SERVER_GAME_PROPERTYCONFIG_H
#define __SERVER_GAME_PROPERTYCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class PropertyConfig {
	public:
		static map<int,PropertyConfig>& Dic()
        {
            static map<int,PropertyConfig> g_dic;
            return g_dic;
        }
		static vector<PropertyConfig>& Arr(){
            static vector<PropertyConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                       
                        Value & type = v["Type"];
                        Value & image = v["Image"];
                        Value & icon = v["Icon"];
                        Value & iconscale = v["IconScale"];
                        Value & deviation = v["Deviation"];
                        vector<float> tDeviation;
                        if(deviation.IsArray()){
                            for(size_t j = 0; j < deviation.Size();++j){
                                Value & val = deviation[j];
                                tDeviation.push_back(val.GetFloat());
                            }
                        }
                        Value & sort = v["Sort"];
                        Value & location = v["Location"];
                        vector<int> tLocation;
                        if(location.IsArray()){
                            for(size_t j = 0; j < location.Size();++j){
                                Value & val = location[j];
                                tLocation.push_back(val.GetInt());
                            }
                        }
                       
                        PropertyConfig propertyconfig;
                        propertyconfig.setId(id.GetInt()); 
                        
                        propertyconfig.setType(type.GetInt()); 
                        propertyconfig.setImage(image.GetString()); 
                        propertyconfig.setIcon(icon.GetString()); 
                        propertyconfig.setIconScale(iconscale.GetFloat()); 
                        propertyconfig.setDeviation(tDeviation);
                        propertyconfig.setSort(sort.GetInt()); 
                        propertyconfig.setLocation(tLocation);
                        
                        PropertyConfig::Dic().insert(pair<int,PropertyConfig>(propertyconfig.getId(),propertyconfig));
                        PropertyConfig::Arr().push_back(propertyconfig);
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
        
        
        int getType(){
            return Type;
        }
        void setType(int val){
            Type = val;
        }
        
        string getImage(){
            return Image;
        }
        void setImage(string val){
            Image = val;
        }
        
        string getIcon(){
            return Icon;
        }
        void setIcon(string val){
            Icon = val;
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
        int getSort(){
            return Sort;
        }
        void setSort(int val){
            Sort = val;
        }
        
        vector<int> getLocation(){
            return Location;
        }
        void setLocation(vector<int> val){
            Location = val;
        }
        
		
    private:
         int Id;
        
         int Type;
         string Image;
         string Icon;
         float IconScale;
         vector<float> Deviation;
         int Sort;
         vector<int> Location;
        
};

#endif