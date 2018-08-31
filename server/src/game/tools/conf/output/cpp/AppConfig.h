        #ifndef __SERVER_GAME_APPCONFIG_H
#define __SERVER_GAME_APPCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class AppConfig {
	public:
		static map<int,AppConfig>& Dic()
        {
            static map<int,AppConfig> g_dic;
            return g_dic;
        }
		static vector<AppConfig>& Arr(){
            static vector<AppConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & socketip = v["SocketIp"];
                        Value & socketport = v["SocketPort"];
                        Value & httpip = v["HttpIp"];
                        Value & httpport = v["HttpPort"];
                       
                        AppConfig appconfig;
                        appconfig.setId(id.GetInt()); 
                        appconfig.setSocketIp(socketip.GetString()); 
                        appconfig.setSocketPort(socketport.GetInt()); 
                        appconfig.setHttpIp(httpip.GetString()); 
                        appconfig.setHttpPort(httpport.GetInt()); 
                        
                        AppConfig::Dic().insert(pair<int,AppConfig>(appconfig.getId(),appconfig));
                        AppConfig::Arr().push_back(appconfig);
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
        
        string getSocketIp(){
            return SocketIp;
        }
        void setSocketIp(string val){
            SocketIp = val;
        }
        
        int getSocketPort(){
            return SocketPort;
        }
        void setSocketPort(int val){
            SocketPort = val;
        }
        
        string getHttpIp(){
            return HttpIp;
        }
        void setHttpIp(string val){
            HttpIp = val;
        }
        
        int getHttpPort(){
            return HttpPort;
        }
        void setHttpPort(int val){
            HttpPort = val;
        }
        
        
		
    private:
         int Id;
         string SocketIp;
         int SocketPort;
         string HttpIp;
         int HttpPort;
        
};

#endif