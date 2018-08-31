        #ifndef __SERVER_GAME_SOUNDCONGFIG_H
#define __SERVER_GAME_SOUNDCONGFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class SoundCongfig {
	public:
		static map<int,SoundCongfig>& Dic()
        {
            static map<int,SoundCongfig> g_dic;
            return g_dic;
        }
		static vector<SoundCongfig>& Arr(){
            static vector<SoundCongfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & type = v["Type"];
                        Value & name = v["Name"];
                       
                       
                        SoundCongfig soundcongfig;
                        soundcongfig.setId(id.GetInt()); 
                        soundcongfig.setType(type.GetInt()); 
                        soundcongfig.setName(name.GetString()); 
                        
                        
                        SoundCongfig::Dic().insert(pair<int,SoundCongfig>(soundcongfig.getId(),soundcongfig));
                        SoundCongfig::Arr().push_back(soundcongfig);
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
        
        string getName(){
            return Name;
        }
        void setName(string val){
            Name = val;
        }
        
        
        
		
    private:
         int Id;
         int Type;
         string Name;
        
        
};

#endif