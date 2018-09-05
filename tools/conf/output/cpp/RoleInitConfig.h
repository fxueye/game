        #ifndef __SERVER_GAME_ROLEINITCONFIG_H
#define __SERVER_GAME_ROLEINITCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class RoleInitConfig {
	public:
		static map<int,RoleInitConfig>& Dic()
        {
            static map<int,RoleInitConfig> g_dic;
            return g_dic;
        }
		static vector<RoleInitConfig>& Arr(){
            static vector<RoleInitConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & iconid = v["IconID"];
                        Value & gold = v["Gold"];
                        Value & diamond = v["Diamond"];
                        Value & body = v["Body"];
                        Value & job = v["Job"];
                        Value & name = v["Name"];
                        Value & initsuit = v["InitSuit"];
                        Value & cloth = v["Cloth"];
                        vector<int> tCloth;
                        if(cloth.IsArray()){
                            for(size_t j = 0; j < cloth.Size();++j){
                                Value & val = cloth[j];
                                tCloth.push_back(val.GetInt());
                            }
                        }
                        Value & mood = v["Mood"];
                        Value & title = v["Title"];
                        Value & exp = v["Exp"];
                        Value & mail = v["Mail"];
                        Value & house = v["House"];
                        Value & car = v["Car"];
                        Value & ship = v["Ship"];
                        Value & itemids = v["ItemIds"];
                        vector<int> tItemIds;
                        if(itemids.IsArray()){
                            for(size_t j = 0; j < itemids.Size();++j){
                                Value & val = itemids[j];
                                tItemIds.push_back(val.GetInt());
                            }
                        }
                       
                        RoleInitConfig roleinitconfig;
                        roleinitconfig.setId(id.GetInt()); 
                        roleinitconfig.setIconID(iconid.GetInt()); 
                        roleinitconfig.setGold(gold.GetInt()); 
                        roleinitconfig.setDiamond(diamond.GetInt()); 
                        roleinitconfig.setBody(body.GetInt()); 
                        roleinitconfig.setJob(job.GetString()); 
                        roleinitconfig.setName(name.GetString()); 
                        roleinitconfig.setInitSuit(initsuit.GetInt()); 
                        roleinitconfig.setCloth(tCloth);
                        roleinitconfig.setMood(mood.GetInt()); 
                        roleinitconfig.setTitle(title.GetInt()); 
                        roleinitconfig.setExp(exp.GetInt()); 
                        roleinitconfig.setMail(mail.GetInt()); 
                        roleinitconfig.setHouse(house.GetInt()); 
                        roleinitconfig.setCar(car.GetInt()); 
                        roleinitconfig.setShip(ship.GetInt()); 
                        roleinitconfig.setItemIds(tItemIds);
                        
                        RoleInitConfig::Dic().insert(pair<int,RoleInitConfig>(roleinitconfig.getId(),roleinitconfig));
                        RoleInitConfig::Arr().push_back(roleinitconfig);
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
        
        int getIconID(){
            return IconID;
        }
        void setIconID(int val){
            IconID = val;
        }
        
        int getGold(){
            return Gold;
        }
        void setGold(int val){
            Gold = val;
        }
        
        int getDiamond(){
            return Diamond;
        }
        void setDiamond(int val){
            Diamond = val;
        }
        
        int getBody(){
            return Body;
        }
        void setBody(int val){
            Body = val;
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
        
        int getInitSuit(){
            return InitSuit;
        }
        void setInitSuit(int val){
            InitSuit = val;
        }
        
        vector<int> getCloth(){
            return Cloth;
        }
        void setCloth(vector<int> val){
            Cloth = val;
        }
        int getMood(){
            return Mood;
        }
        void setMood(int val){
            Mood = val;
        }
        
        int getTitle(){
            return Title;
        }
        void setTitle(int val){
            Title = val;
        }
        
        int getExp(){
            return Exp;
        }
        void setExp(int val){
            Exp = val;
        }
        
        int getMail(){
            return Mail;
        }
        void setMail(int val){
            Mail = val;
        }
        
        int getHouse(){
            return House;
        }
        void setHouse(int val){
            House = val;
        }
        
        int getCar(){
            return Car;
        }
        void setCar(int val){
            Car = val;
        }
        
        int getShip(){
            return Ship;
        }
        void setShip(int val){
            Ship = val;
        }
        
        vector<int> getItemIds(){
            return ItemIds;
        }
        void setItemIds(vector<int> val){
            ItemIds = val;
        }
        
		
    private:
         int Id;
         int IconID;
         int Gold;
         int Diamond;
         int Body;
         string Job;
         string Name;
         int InitSuit;
         vector<int> Cloth;
         int Mood;
         int Title;
         int Exp;
         int Mail;
         int House;
         int Car;
         int Ship;
         vector<int> ItemIds;
        
};

#endif