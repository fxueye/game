        #ifndef __SERVER_GAME_COMPANYCONFIG_H
#define __SERVER_GAME_COMPANYCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class CompanyConfig {
	public:
		static map<int,CompanyConfig>& Dic()
        {
            static map<int,CompanyConfig> g_dic;
            return g_dic;
        }
		static vector<CompanyConfig>& Arr(){
            static vector<CompanyConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & bodyid = v["BodyId"];
                        Value & job = v["Job"];
                        Value & name = v["Name"];
                       
                       
                       
                       
                       
                       
                       
                       
                       
                       
                        CompanyConfig companyconfig;
                        companyconfig.setId(id.GetInt()); 
                        companyconfig.setBodyId(bodyid.GetInt()); 
                        companyconfig.setJob(job.GetString()); 
                        companyconfig.setName(name.GetString()); 
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        CompanyConfig::Dic().insert(pair<int,CompanyConfig>(companyconfig.getId(),companyconfig));
                        CompanyConfig::Arr().push_back(companyconfig);
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
        
        int getBodyId(){
            return BodyId;
        }
        void setBodyId(int val){
            BodyId = val;
        }
        
        string getJob(){
            return Job;
        }
        void setJob(string val){
            Job = val;
        }
        
        string getName(){
            return Name;
        }
        void setName(string val){
            Name = val;
        }
        
        
        
        
        
        
        
        
        
        
        
		
    private:
         int Id;
         int BodyId;
         string Job;
         string Name;
        
        
        
        
        
        
        
        
        
        
};

#endif