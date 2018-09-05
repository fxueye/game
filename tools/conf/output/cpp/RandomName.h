        #ifndef __SERVER_GAME_RANDOMNAME_H
#define __SERVER_GAME_RANDOMNAME_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class RandomName {
	public:
		static map<int,RandomName>& Dic()
        {
            static map<int,RandomName> g_dic;
            return g_dic;
        }
		static vector<RandomName>& Arr(){
            static vector<RandomName> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & playername = v["PlayerName"];
                       
                        RandomName randomname;
                        randomname.setId(id.GetInt()); 
                        randomname.setPlayerName(playername.GetString()); 
                        
                        RandomName::Dic().insert(pair<int,RandomName>(randomname.getId(),randomname));
                        RandomName::Arr().push_back(randomname);
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
        
        string getPlayerName(){
            return PlayerName;
        }
        void setPlayerName(string val){
            PlayerName = val;
        }
        
        
		
    private:
         int Id;
         string PlayerName;
        
};

#endif