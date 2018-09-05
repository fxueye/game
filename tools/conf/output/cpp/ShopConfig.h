        #ifndef __SERVER_GAME_SHOPCONFIG_H
#define __SERVER_GAME_SHOPCONFIG_H

#include <iostream>
#include <map>
#include <vector>
#include <string>
#include "rapidjson/document.h"
using namespace std;
using rapidjson::Document;
using rapidjson::Value;

class ShopConfig {
	public:
		static map<int,ShopConfig>& Dic()
        {
            static map<int,ShopConfig> g_dic;
            return g_dic;
        }
		static vector<ShopConfig>& Arr(){
            static vector<ShopConfig> g_arr;
            return g_arr;
        }
        static void parse(Document doc){
			if(doc.IsArray()){
				for(size_t i = 0; i < doc.Size(); i++){
					Value & v = doc[i];
					if(v.IsObject()){
                        Value & id = v["Id"];
                        Value & itemid = v["ItemId"];
                        Value & itemcount = v["ItemCount"];
                       
                        Value & propaganda = v["Propaganda"];
                        Value & type = v["Type"];
                        Value & tabid = v["Tabid"];
                        Value & order = v["Order"];
                        Value & cost = v["Cost"];
                        Value & price = v["Price"];
                        Value & purchasenums = v["PurchaseNums"];
                        Value & scale = v["Scale"];
                        Value & location = v["Location"];
                        vector<int> tLocation;
                        if(location.IsArray()){
                            for(size_t j = 0; j < location.Size();++j){
                                Value & val = location[j];
                                tLocation.push_back(val.GetInt());
                            }
                        }
                        Value & newstar = v["NewStar"];
                        Value & newend = v["NewEnd"];
                       
                        ShopConfig shopconfig;
                        shopconfig.setId(id.GetInt()); 
                        shopconfig.setItemId(itemid.GetInt()); 
                        shopconfig.setItemCount(itemcount.GetInt()); 
                        
                        shopconfig.setPropaganda(propaganda.GetString()); 
                        shopconfig.setType(type.GetInt()); 
                        shopconfig.setTabid(tabid.GetInt()); 
                        shopconfig.setOrder(order.GetInt()); 
                        shopconfig.setCost(cost.GetInt()); 
                        shopconfig.setPrice(price.GetInt()); 
                        shopconfig.setPurchaseNums(purchasenums.GetInt()); 
                        shopconfig.setScale(scale.GetFloat()); 
                        shopconfig.setLocation(tLocation);
                        shopconfig.setNewStar(newstar.GetString()); 
                        shopconfig.setNewEnd(newend.GetString()); 
                        
                        ShopConfig::Dic().insert(pair<int,ShopConfig>(shopconfig.getId(),shopconfig));
                        ShopConfig::Arr().push_back(shopconfig);
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
        
        int getItemId(){
            return ItemId;
        }
        void setItemId(int val){
            ItemId = val;
        }
        
        int getItemCount(){
            return ItemCount;
        }
        void setItemCount(int val){
            ItemCount = val;
        }
        
        
        string getPropaganda(){
            return Propaganda;
        }
        void setPropaganda(string val){
            Propaganda = val;
        }
        
        int getType(){
            return Type;
        }
        void setType(int val){
            Type = val;
        }
        
        int getTabid(){
            return Tabid;
        }
        void setTabid(int val){
            Tabid = val;
        }
        
        int getOrder(){
            return Order;
        }
        void setOrder(int val){
            Order = val;
        }
        
        int getCost(){
            return Cost;
        }
        void setCost(int val){
            Cost = val;
        }
        
        int getPrice(){
            return Price;
        }
        void setPrice(int val){
            Price = val;
        }
        
        int getPurchaseNums(){
            return PurchaseNums;
        }
        void setPurchaseNums(int val){
            PurchaseNums = val;
        }
        
        float getScale(){
            return Scale;
        }
        void setScale(float val){
            Scale = val;
        }
        
        vector<int> getLocation(){
            return Location;
        }
        void setLocation(vector<int> val){
            Location = val;
        }
        string getNewStar(){
            return NewStar;
        }
        void setNewStar(string val){
            NewStar = val;
        }
        
        string getNewEnd(){
            return NewEnd;
        }
        void setNewEnd(string val){
            NewEnd = val;
        }
        
        
		
    private:
         int Id;
         int ItemId;
         int ItemCount;
        
         string Propaganda;
         int Type;
         int Tabid;
         int Order;
         int Cost;
         int Price;
         int PurchaseNums;
         float Scale;
         vector<int> Location;
         string NewStar;
         string NewEnd;
        
};

#endif