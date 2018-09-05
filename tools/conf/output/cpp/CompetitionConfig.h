        #ifndef __SERVER_GAME_COMPETITIONCONFIG_H
#define __SERVER_GAME_COMPETITIONCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class CompetitionConfig {
	public:
		static map<int,CompetitionConfig>& Dic()
        {
            static map<int,CompetitionConfig> g_dic;
            return g_dic;
        }
		static vector<CompetitionConfig>& Arr(){
            static vector<CompetitionConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & type = v["Type"];
                        Value & aparttime = v["ApartTime"];
                        Value & offsettime = v["OffsetTime"];
                        Value & stoptime = v["StopTime"];
                        Value & freshentime = v["FreshenTime"];
                        Value & waitingtime = v["WaitingTime"];
                        Value & space = v["Space"];
                        Value & prospace = v["ProSpace"];
                        Value & datasize = v["DataSize"];
                        Value & dataposition = v["DataPosition"];
                        vector<int> tDataPosition;
                        if(dataposition.IsArray()){
                            for(size_t j = 0; j < dataposition.Size();++j){
                                Value & val = dataposition[j];
                                tDataPosition.push_back(val.GetInt());
                            }
                        }
                        Value & datacolor = v["DataColor"];
                        Value & datadotcolor = v["DataDotColor"];
                        Value & uprealrate = v["UprealRate"];
                        Value & uprealvalue = v["UprealValue"];
                        Value & updashedrate = v["UpdashedRate"];
                        Value & updashedvalue = v["UpdashedValue"];
                        Value & downrealrate = v["DownrealRate"];
                        Value & downrealvalue = v["DownrealValue"];
                        Value & downdashedrate = v["DowndashedRate"];
                        Value & downdashedvalue = v["DowndashedValue"];
                        Value & betids = v["BetIds"];
                        vector<int> tBetIds;
                        if(betids.IsArray()){
                            for(size_t j = 0; j < betids.Size();++j){
                                Value & val = betids[j];
                                tBetIds.push_back(val.GetInt());
                            }
                        }
                        Value & intervalids = v["IntervalIds"];
                        vector<int> tIntervalIds;
                        if(intervalids.IsArray()){
                            for(size_t j = 0; j < intervalids.Size();++j){
                                Value & val = intervalids[j];
                                tIntervalIds.push_back(val.GetInt());
                            }
                        }
                        Value & mcid = v["McId"];
                        Value & location = v["Location"];
                        vector<int> tLocation;
                        if(location.IsArray()){
                            for(size_t j = 0; j < location.Size();++j){
                                Value & val = location[j];
                                tLocation.push_back(val.GetInt());
                            }
                        }
                        Value & scale = v["Scale"];
                        Value & particleid = v["ParticleId"];
                       
                        CompetitionConfig competitionconfig;
                        competitionconfig.setId(id.GetInt()); 
                        competitionconfig.setType(type.GetInt()); 
                        competitionconfig.setApartTime(aparttime.GetFloat()); 
                        competitionconfig.setOffsetTime(offsettime.GetFloat()); 
                        competitionconfig.setStopTime(stoptime.GetFloat()); 
                        competitionconfig.setFreshenTime(freshentime.GetFloat()); 
                        competitionconfig.setWaitingTime(waitingtime.GetFloat()); 
                        competitionconfig.setSpace(space.GetInt()); 
                        competitionconfig.setProSpace(prospace.GetInt()); 
                        competitionconfig.setDataSize(datasize.GetInt()); 
                        competitionconfig.setDataPosition(tDataPosition);
                        competitionconfig.setDataColor(datacolor.GetString()); 
                        competitionconfig.setDataDotColor(datadotcolor.GetString()); 
                        competitionconfig.setUprealRate(uprealrate.GetFloat()); 
                        competitionconfig.setUprealValue(uprealvalue.GetFloat()); 
                        competitionconfig.setUpdashedRate(updashedrate.GetFloat()); 
                        competitionconfig.setUpdashedValue(updashedvalue.GetFloat()); 
                        competitionconfig.setDownrealRate(downrealrate.GetFloat()); 
                        competitionconfig.setDownrealValue(downrealvalue.GetFloat()); 
                        competitionconfig.setDowndashedRate(downdashedrate.GetFloat()); 
                        competitionconfig.setDowndashedValue(downdashedvalue.GetFloat()); 
                        competitionconfig.setBetIds(tBetIds);
                        competitionconfig.setIntervalIds(tIntervalIds);
                        competitionconfig.setMcId(mcid.GetInt()); 
                        competitionconfig.setLocation(tLocation);
                        competitionconfig.setScale(scale.GetFloat()); 
                        competitionconfig.setParticleId(particleid.GetInt()); 
                        
                        CompetitionConfig::Dic().insert(pair<int,CompetitionConfig>(competitionconfig.getId(),competitionconfig));
                        CompetitionConfig::Arr().push_back(competitionconfig);
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
        
        float getApartTime(){
            return ApartTime;
        }
        void setApartTime(float val){
            ApartTime = val;
        }
        
        float getOffsetTime(){
            return OffsetTime;
        }
        void setOffsetTime(float val){
            OffsetTime = val;
        }
        
        float getStopTime(){
            return StopTime;
        }
        void setStopTime(float val){
            StopTime = val;
        }
        
        float getFreshenTime(){
            return FreshenTime;
        }
        void setFreshenTime(float val){
            FreshenTime = val;
        }
        
        float getWaitingTime(){
            return WaitingTime;
        }
        void setWaitingTime(float val){
            WaitingTime = val;
        }
        
        int getSpace(){
            return Space;
        }
        void setSpace(int val){
            Space = val;
        }
        
        int getProSpace(){
            return ProSpace;
        }
        void setProSpace(int val){
            ProSpace = val;
        }
        
        int getDataSize(){
            return DataSize;
        }
        void setDataSize(int val){
            DataSize = val;
        }
        
        vector<int> getDataPosition(){
            return DataPosition;
        }
        void setDataPosition(vector<int> val){
            DataPosition = val;
        }
        string getDataColor(){
            return DataColor;
        }
        void setDataColor(string val){
            DataColor = val;
        }
        
        string getDataDotColor(){
            return DataDotColor;
        }
        void setDataDotColor(string val){
            DataDotColor = val;
        }
        
        float getUprealRate(){
            return UprealRate;
        }
        void setUprealRate(float val){
            UprealRate = val;
        }
        
        float getUprealValue(){
            return UprealValue;
        }
        void setUprealValue(float val){
            UprealValue = val;
        }
        
        float getUpdashedRate(){
            return UpdashedRate;
        }
        void setUpdashedRate(float val){
            UpdashedRate = val;
        }
        
        float getUpdashedValue(){
            return UpdashedValue;
        }
        void setUpdashedValue(float val){
            UpdashedValue = val;
        }
        
        float getDownrealRate(){
            return DownrealRate;
        }
        void setDownrealRate(float val){
            DownrealRate = val;
        }
        
        float getDownrealValue(){
            return DownrealValue;
        }
        void setDownrealValue(float val){
            DownrealValue = val;
        }
        
        float getDowndashedRate(){
            return DowndashedRate;
        }
        void setDowndashedRate(float val){
            DowndashedRate = val;
        }
        
        float getDowndashedValue(){
            return DowndashedValue;
        }
        void setDowndashedValue(float val){
            DowndashedValue = val;
        }
        
        vector<int> getBetIds(){
            return BetIds;
        }
        void setBetIds(vector<int> val){
            BetIds = val;
        }
        vector<int> getIntervalIds(){
            return IntervalIds;
        }
        void setIntervalIds(vector<int> val){
            IntervalIds = val;
        }
        int getMcId(){
            return McId;
        }
        void setMcId(int val){
            McId = val;
        }
        
        vector<int> getLocation(){
            return Location;
        }
        void setLocation(vector<int> val){
            Location = val;
        }
        float getScale(){
            return Scale;
        }
        void setScale(float val){
            Scale = val;
        }
        
        int getParticleId(){
            return ParticleId;
        }
        void setParticleId(int val){
            ParticleId = val;
        }
        
        
		
    private:
         int Id;
         int Type;
         float ApartTime;
         float OffsetTime;
         float StopTime;
         float FreshenTime;
         float WaitingTime;
         int Space;
         int ProSpace;
         int DataSize;
         vector<int> DataPosition;
         string DataColor;
         string DataDotColor;
         float UprealRate;
         float UprealValue;
         float UpdashedRate;
         float UpdashedValue;
         float DownrealRate;
         float DownrealValue;
         float DowndashedRate;
         float DowndashedValue;
         vector<int> BetIds;
         vector<int> IntervalIds;
         int McId;
         vector<int> Location;
         float Scale;
         int ParticleId;
        
};

#endif