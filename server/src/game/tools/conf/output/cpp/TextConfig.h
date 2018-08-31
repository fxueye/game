        #ifndef __SERVER_GAME_TEXTCONFIG_H
#define __SERVER_GAME_TEXTCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class TextConfig {
	public:
		static map<int,TextConfig>& Dic()
        {
            static map<int,TextConfig> g_dic;
            return g_dic;
        }
		static vector<TextConfig>& Arr(){
            static vector<TextConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & text = v["Text"];
                       
                        TextConfig textconfig;
                        textconfig.setId(id.GetInt()); 
                        textconfig.setText(text.GetString()); 
                        
                        TextConfig::Dic().insert(pair<int,TextConfig>(textconfig.getId(),textconfig));
                        TextConfig::Arr().push_back(textconfig);
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
        
        string getText(){
            return Text;
        }
        void setText(string val){
            Text = val;
        }
        
        
		
    private:
         int Id;
         string Text;
        
};

#endif