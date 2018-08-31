        #ifndef __SERVER_GAME_STOCKCONFIG_H
#define __SERVER_GAME_STOCKCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class StockConfig {
	public:
		static map<int,StockConfig>& Dic()
        {
            static map<int,StockConfig> g_dic;
            return g_dic;
        }
		static vector<StockConfig>& Arr(){
            static vector<StockConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & ukey = v["Ukey"];
                        Value & market_id = v["Market_id"];
                        Value & major_type = v["Major_type"];
                        Value & minor_type = v["Minor_type"];
                        Value & market_code = v["Market_code"];
                        Value & market_abbr = v["Market_abbr"];
                        Value & chinese_name = v["Chinese_name"];
                        Value & english_name = v["English_name"];
                        Value & list_date = v["List_date"];
                        Value & delist_date = v["Delist_date"];
                        Value & currency_id = v["Currency_id"];
                        Value & jy_code = v["Jy_code"];
                        Value & wind_code = v["Wind_code"];
                        Value & input_code = v["Input_code"];
                        Value & last_update = v["Last_update"];
                        Value & show = v["Show"];
                       
                        StockConfig stockconfig;
                        stockconfig.setId(id.GetInt()); 
                        stockconfig.setUkey(ukey.GetInt()); 
                        stockconfig.setMarket_id(market_id.GetInt()); 
                        stockconfig.setMajor_type(major_type.GetInt()); 
                        stockconfig.setMinor_type(minor_type.GetInt()); 
                        stockconfig.setMarket_code(market_code.GetInt()); 
                        stockconfig.setMarket_abbr(market_abbr.GetString()); 
                        stockconfig.setChinese_name(chinese_name.GetString()); 
                        stockconfig.setEnglish_name(english_name.GetString()); 
                        stockconfig.setList_date(list_date.GetString()); 
                        stockconfig.setDelist_date(delist_date.GetString()); 
                        stockconfig.setCurrency_id(currency_id.GetString()); 
                        stockconfig.setJy_code(jy_code.GetString()); 
                        stockconfig.setWind_code(wind_code.GetString()); 
                        stockconfig.setInput_code(input_code.GetString()); 
                        stockconfig.setLast_update(last_update.GetString()); 
                        stockconfig.setShow(show.GetInt()); 
                        
                        StockConfig::Dic().insert(pair<int,StockConfig>(stockconfig.getId(),stockconfig));
                        StockConfig::Arr().push_back(stockconfig);
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
        
        int getUkey(){
            return Ukey;
        }
        void setUkey(int val){
            Ukey = val;
        }
        
        int getMarket_id(){
            return Market_id;
        }
        void setMarket_id(int val){
            Market_id = val;
        }
        
        int getMajor_type(){
            return Major_type;
        }
        void setMajor_type(int val){
            Major_type = val;
        }
        
        int getMinor_type(){
            return Minor_type;
        }
        void setMinor_type(int val){
            Minor_type = val;
        }
        
        int getMarket_code(){
            return Market_code;
        }
        void setMarket_code(int val){
            Market_code = val;
        }
        
        string getMarket_abbr(){
            return Market_abbr;
        }
        void setMarket_abbr(string val){
            Market_abbr = val;
        }
        
        string getChinese_name(){
            return Chinese_name;
        }
        void setChinese_name(string val){
            Chinese_name = val;
        }
        
        string getEnglish_name(){
            return English_name;
        }
        void setEnglish_name(string val){
            English_name = val;
        }
        
        string getList_date(){
            return List_date;
        }
        void setList_date(string val){
            List_date = val;
        }
        
        string getDelist_date(){
            return Delist_date;
        }
        void setDelist_date(string val){
            Delist_date = val;
        }
        
        string getCurrency_id(){
            return Currency_id;
        }
        void setCurrency_id(string val){
            Currency_id = val;
        }
        
        string getJy_code(){
            return Jy_code;
        }
        void setJy_code(string val){
            Jy_code = val;
        }
        
        string getWind_code(){
            return Wind_code;
        }
        void setWind_code(string val){
            Wind_code = val;
        }
        
        string getInput_code(){
            return Input_code;
        }
        void setInput_code(string val){
            Input_code = val;
        }
        
        string getLast_update(){
            return Last_update;
        }
        void setLast_update(string val){
            Last_update = val;
        }
        
        int getShow(){
            return Show;
        }
        void setShow(int val){
            Show = val;
        }
        
        
		
    private:
         int Id;
         int Ukey;
         int Market_id;
         int Major_type;
         int Minor_type;
         int Market_code;
         string Market_abbr;
         string Chinese_name;
         string English_name;
         string List_date;
         string Delist_date;
         string Currency_id;
         string Jy_code;
         string Wind_code;
         string Input_code;
         string Last_update;
         int Show;
        
};

#endif