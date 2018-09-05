        #ifndef __SERVER_GAME_MAILCONFIG_H
#define __SERVER_GAME_MAILCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class MailConfig {
	public:
		static map<int,MailConfig>& Dic()
        {
            static map<int,MailConfig> g_dic;
            return g_dic;
        }
		static vector<MailConfig>& Arr(){
            static vector<MailConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & mailid = v["MailId"];
                       
                        Value & mailtype = v["MailType"];
                        Value & subjecttext = v["SubjectText"];
                       
                        Value & contenttext = v["ContentText"];
                       
                        Value & sendertext = v["SenderText"];
                       
                        Value & icon = v["Icon"];
                        Value & rewarditemids = v["RewardItemIds"];
                        vector<int> tRewardItemIds;
                        if(rewarditemids.IsArray()){
                            for(size_t j = 0; j < rewarditemids.Size();++j){
                                Value & val = rewarditemids[j];
                                tRewardItemIds.push_back(val.GetInt());
                            }
                        }
                        Value & rewardnum = v["RewardNum"];
                        vector<int> tRewardNum;
                        if(rewardnum.IsArray()){
                            for(size_t j = 0; j < rewardnum.Size();++j){
                                Value & val = rewardnum[j];
                                tRewardNum.push_back(val.GetInt());
                            }
                        }
                        Value & savetime = v["SaveTime"];
                       
                        MailConfig mailconfig;
                        mailconfig.setId(id.GetInt()); 
                        mailconfig.setMailId(mailid.GetInt()); 
                        
                        mailconfig.setMailType(mailtype.GetInt()); 
                        mailconfig.setSubjectText(subjecttext.GetInt()); 
                        
                        mailconfig.setContentText(contenttext.GetInt()); 
                        
                        mailconfig.setSenderText(sendertext.GetInt()); 
                        
                        mailconfig.setIcon(icon.GetInt()); 
                        mailconfig.setRewardItemIds(tRewardItemIds);
                        mailconfig.setRewardNum(tRewardNum);
                        mailconfig.setSaveTime(savetime.GetInt()); 
                        
                        MailConfig::Dic().insert(pair<int,MailConfig>(mailconfig.getId(),mailconfig));
                        MailConfig::Arr().push_back(mailconfig);
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
        
        int getMailId(){
            return MailId;
        }
        void setMailId(int val){
            MailId = val;
        }
        
        
        int getMailType(){
            return MailType;
        }
        void setMailType(int val){
            MailType = val;
        }
        
        int getSubjectText(){
            return SubjectText;
        }
        void setSubjectText(int val){
            SubjectText = val;
        }
        
        
        int getContentText(){
            return ContentText;
        }
        void setContentText(int val){
            ContentText = val;
        }
        
        
        int getSenderText(){
            return SenderText;
        }
        void setSenderText(int val){
            SenderText = val;
        }
        
        
        int getIcon(){
            return Icon;
        }
        void setIcon(int val){
            Icon = val;
        }
        
        vector<int> getRewardItemIds(){
            return RewardItemIds;
        }
        void setRewardItemIds(vector<int> val){
            RewardItemIds = val;
        }
        vector<int> getRewardNum(){
            return RewardNum;
        }
        void setRewardNum(vector<int> val){
            RewardNum = val;
        }
        int getSaveTime(){
            return SaveTime;
        }
        void setSaveTime(int val){
            SaveTime = val;
        }
        
        
		
    private:
         int Id;
         int MailId;
        
         int MailType;
         int SubjectText;
        
         int ContentText;
        
         int SenderText;
        
         int Icon;
         vector<int> RewardItemIds;
         vector<int> RewardNum;
         int SaveTime;
        
};

#endif