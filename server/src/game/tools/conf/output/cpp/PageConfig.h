        #ifndef __SERVER_GAME_PAGECONFIG_H
#define __SERVER_GAME_PAGECONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class PageConfig {
	public:
		static map<int,PageConfig>& Dic()
        {
            static map<int,PageConfig> g_dic;
            return g_dic;
        }
		static vector<PageConfig>& Arr(){
            static vector<PageConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & pageid = v["PageId"];
                        Value & bg = v["Bg"];
                        Value & type = v["Type"];
                        Value & location = v["Location"];
                        vector<int> tLocation;
                        if(location.IsArray()){
                            for(size_t j = 0; j < location.Size();++j){
                                Value & val = location[j];
                                tLocation.push_back(val.GetInt());
                            }
                        }
                        Value & body = v["Body"];
                        Value & scale = v["Scale"];
                       
                       
                        PageConfig pageconfig;
                        pageconfig.setId(id.GetInt()); 
                        pageconfig.setPageId(pageid.GetInt()); 
                        pageconfig.setBg(bg.GetInt()); 
                        pageconfig.setType(type.GetInt()); 
                        pageconfig.setLocation(tLocation);
                        pageconfig.setBody(body.GetInt()); 
                        pageconfig.setScale(scale.GetFloat()); 
                        
                        
                        PageConfig::Dic().insert(pair<int,PageConfig>(pageconfig.getId(),pageconfig));
                        PageConfig::Arr().push_back(pageconfig);
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
        
        int getPageId(){
            return PageId;
        }
        void setPageId(int val){
            PageId = val;
        }
        
        int getBg(){
            return Bg;
        }
        void setBg(int val){
            Bg = val;
        }
        
        int getType(){
            return Type;
        }
        void setType(int val){
            Type = val;
        }
        
        vector<int> getLocation(){
            return Location;
        }
        void setLocation(vector<int> val){
            Location = val;
        }
        int getBody(){
            return Body;
        }
        void setBody(int val){
            Body = val;
        }
        
        float getScale(){
            return Scale;
        }
        void setScale(float val){
            Scale = val;
        }
        
        
        
		
    private:
         int Id;
         int PageId;
         int Bg;
         int Type;
         vector<int> Location;
         int Body;
         float Scale;
        
        
};

#endif