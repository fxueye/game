        #ifndef __SERVER_GAME_SIGNCONFIG_H
#define __SERVER_GAME_SIGNCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class SignConfig {
	public:
		static map<int,SignConfig>& Dic()
        {
            static map<int,SignConfig> g_dic;
            return g_dic;
        }
		static vector<SignConfig>& Arr(){
            static vector<SignConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & name = v["Name"];
                        Value & icon = v["Icon"];
                        Value & bg = v["Bg"];
                        Value & reward = v["Reward"];
                        vector<int> tReward;
                        if(reward.IsArray()){
                            for(size_t j = 0; j < reward.Size();++j){
                                Value & val = reward[j];
                                tReward.push_back(val.GetInt());
                            }
                        }
                        Value & nums = v["Nums"];
                        vector<int> tNums;
                        if(nums.IsArray()){
                            for(size_t j = 0; j < nums.Size();++j){
                                Value & val = nums[j];
                                tNums.push_back(val.GetInt());
                            }
                        }
                        Value & scale = v["Scale"];
                       
                        SignConfig signconfig;
                        signconfig.setId(id.GetInt()); 
                        signconfig.setName(name.GetString()); 
                        signconfig.setIcon(icon.GetString()); 
                        signconfig.setBg(bg.GetString()); 
                        signconfig.setReward(tReward);
                        signconfig.setNums(tNums);
                        signconfig.setScale(scale.GetFloat()); 
                        
                        SignConfig::Dic().insert(pair<int,SignConfig>(signconfig.getId(),signconfig));
                        SignConfig::Arr().push_back(signconfig);
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
        
        string getIcon(){
            return Icon;
        }
        void setIcon(string val){
            Icon = val;
        }
        
        string getBg(){
            return Bg;
        }
        void setBg(string val){
            Bg = val;
        }
        
        vector<int> getReward(){
            return Reward;
        }
        void setReward(vector<int> val){
            Reward = val;
        }
        vector<int> getNums(){
            return Nums;
        }
        void setNums(vector<int> val){
            Nums = val;
        }
        float getScale(){
            return Scale;
        }
        void setScale(float val){
            Scale = val;
        }
        
        
		
    private:
         int Id;
         string Name;
         string Icon;
         string Bg;
         vector<int> Reward;
         vector<int> Nums;
         float Scale;
        
};

#endif