        #ifndef __SERVER_GAME_PAYCONFIG_H
#define __SERVER_GAME_PAYCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class PayConfig {
	public:
		static map<int,PayConfig>& Dic()
        {
            static map<int,PayConfig> g_dic;
            return g_dic;
        }
		static vector<PayConfig>& Arr(){
            static vector<PayConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & sort = v["Sort"];
                        Value & productid = v["ProductId"];
                        Value & productname = v["ProductName"];
                        Value & productdesc = v["ProductDesc"];
                        Value & visible = v["Visible"];
                        Value & hot = v["Hot"];
                        Value & moneytype = v["MoneyType"];
                        Value & moneycount = v["MoneyCount"];
                        Value & giftmoneycount = v["GiftMoneyCount"];
                        Value & price = v["Price"];
                        Value & currency = v["Currency"];
                       
                        PayConfig payconfig;
                        payconfig.setId(id.GetInt()); 
                        payconfig.setSort(sort.GetInt()); 
                        payconfig.setProductId(productid.GetString()); 
                        payconfig.setProductName(productname.GetString()); 
                        payconfig.setProductDesc(productdesc.GetString()); 
                        payconfig.setVisible(visible.GetBool()); 
                        payconfig.setHot(hot.GetBool()); 
                        payconfig.setMoneyType(moneytype.GetInt()); 
                        payconfig.setMoneyCount(moneycount.GetInt()); 
                        payconfig.setGiftMoneyCount(giftmoneycount.GetInt()); 
                        payconfig.setPrice(price.GetFloat()); 
                        payconfig.setCurrency(currency.GetString()); 
                        
                        PayConfig::Dic().insert(pair<int,PayConfig>(payconfig.getId(),payconfig));
                        PayConfig::Arr().push_back(payconfig);
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
        
        int getSort(){
            return Sort;
        }
        void setSort(int val){
            Sort = val;
        }
        
        string getProductId(){
            return ProductId;
        }
        void setProductId(string val){
            ProductId = val;
        }
        
        string getProductName(){
            return ProductName;
        }
        void setProductName(string val){
            ProductName = val;
        }
        
        string getProductDesc(){
            return ProductDesc;
        }
        void setProductDesc(string val){
            ProductDesc = val;
        }
        
        bool getVisible(){
            return Visible;
        }
        void setVisible(bool val){
            Visible = val;
        }
        
        bool getHot(){
            return Hot;
        }
        void setHot(bool val){
            Hot = val;
        }
        
        int getMoneyType(){
            return MoneyType;
        }
        void setMoneyType(int val){
            MoneyType = val;
        }
        
        int getMoneyCount(){
            return MoneyCount;
        }
        void setMoneyCount(int val){
            MoneyCount = val;
        }
        
        int getGiftMoneyCount(){
            return GiftMoneyCount;
        }
        void setGiftMoneyCount(int val){
            GiftMoneyCount = val;
        }
        
        float getPrice(){
            return Price;
        }
        void setPrice(float val){
            Price = val;
        }
        
        string getCurrency(){
            return Currency;
        }
        void setCurrency(string val){
            Currency = val;
        }
        
        
		
    private:
         int Id;
         int Sort;
         string ProductId;
         string ProductName;
         string ProductDesc;
         bool Visible;
         bool Hot;
         int MoneyType;
         int MoneyCount;
         int GiftMoneyCount;
         float Price;
         string Currency;
        
};

#endif