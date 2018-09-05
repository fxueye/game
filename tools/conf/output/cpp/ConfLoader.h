#ifndef __SERVER_GAME_CONFLOADER_H
#define __SERVER_GAME_CONFLOADER_H
#include <iostream>
#include <string>
#include "rapidjson/document.h"
#include "rapidjson/stringbuffer.h"
#include "rapidjson/writer.h"
#include "utils/log.h"
#include "AppConfig.h"
#include "BdConfig.h"
#include "BetConfig.h"
#include "BgConfig.h"
#include "BgImgConfig.h"
#include "BuildingConfig.h"
#include "CompanyConfig.h"
#include "CompetitionConfig.h"
#include "DayConfig.h"
#include "GameConfig.h"
#include "HelpConfig.h"
#include "IntervalConfig.h"
#include "ItemConfig.h"
#include "LevelConfig.h"
#include "MailConfig.h"
#include "MoveClipConfig.h"
#include "OddsConfig.h"
#include "PageConfig.h"
#include "PartConfig.h"
#include "PartTypeConfig.h"
#include "ParticleConfig.h"
#include "PayConfig.h"
#include "PropertyConfig.h"
#include "PropertyTypeConfig.h"
#include "RandomName.h"
#include "RoleInitConfig.h"
#include "RoomConfig.h"
#include "ShopConfig.h"
#include "SignConfig.h"
#include "SlotsConfig.h"
#include "SoundCongfig.h"
#include "SuitConfig.h"
#include "TextConfig.h"
#include "TipConfig.h"


using namespace std;
using rapidjson::Document;

class ConfLoader{
	private:
		Document readJsonFile(string path){
			string stringFormStream;
			ifstream in;
			in.open(path,ifstream::in);
			if(!in.is_open()){
				cerr << "path:" << path << "not open." << endl;
				return NULL;
			}
			string line;
			while(getline(in,line)){
				stringFormStream.append(line+ "\n");
			}
			in.close();
//			using rapidjson::Document;
			Document doc;
			doc.Parse(stringFormStream.c_str());
			if(doc.HasParseError()){
				rapidjson::ParseErrorCode code = doc.GetParseError();
				cout << "json parse error:" <<  code <<  endl;
				return NULL;
			}
			return doc;
			
		}
	public:
		void load(string path){
             AppConfig::parse(readJsonFile(path + "/" + "appconfig.json"));
             BdConfig::parse(readJsonFile(path + "/" + "bdconfig.json"));
             BetConfig::parse(readJsonFile(path + "/" + "betconfig.json"));
             BgConfig::parse(readJsonFile(path + "/" + "bgconfig.json"));
             BgImgConfig::parse(readJsonFile(path + "/" + "bgimgconfig.json"));
             BuildingConfig::parse(readJsonFile(path + "/" + "buildingconfig.json"));
             CompanyConfig::parse(readJsonFile(path + "/" + "companyconfig.json"));
             CompetitionConfig::parse(readJsonFile(path + "/" + "competitionconfig.json"));
             DayConfig::parse(readJsonFile(path + "/" + "dayconfig.json"));
             GameConfig::parse(readJsonFile(path + "/" + "gameconfig.json"));
             HelpConfig::parse(readJsonFile(path + "/" + "helpconfig.json"));
             IntervalConfig::parse(readJsonFile(path + "/" + "intervalconfig.json"));
             ItemConfig::parse(readJsonFile(path + "/" + "itemconfig.json"));
             LevelConfig::parse(readJsonFile(path + "/" + "levelconfig.json"));
             MailConfig::parse(readJsonFile(path + "/" + "mailconfig.json"));
             MoveClipConfig::parse(readJsonFile(path + "/" + "moveclipconfig.json"));
             OddsConfig::parse(readJsonFile(path + "/" + "oddsconfig.json"));
             PageConfig::parse(readJsonFile(path + "/" + "pageconfig.json"));
             PartConfig::parse(readJsonFile(path + "/" + "partconfig.json"));
             PartTypeConfig::parse(readJsonFile(path + "/" + "parttypeconfig.json"));
             ParticleConfig::parse(readJsonFile(path + "/" + "particleconfig.json"));
             PayConfig::parse(readJsonFile(path + "/" + "payconfig.json"));
             PropertyConfig::parse(readJsonFile(path + "/" + "propertyconfig.json"));
             PropertyTypeConfig::parse(readJsonFile(path + "/" + "propertytypeconfig.json"));
             RandomName::parse(readJsonFile(path + "/" + "randomname.json"));
             RoleInitConfig::parse(readJsonFile(path + "/" + "roleinitconfig.json"));
             RoomConfig::parse(readJsonFile(path + "/" + "roomconfig.json"));
             ShopConfig::parse(readJsonFile(path + "/" + "shopconfig.json"));
             SignConfig::parse(readJsonFile(path + "/" + "signconfig.json"));
             SlotsConfig::parse(readJsonFile(path + "/" + "slotsconfig.json"));
             SoundCongfig::parse(readJsonFile(path + "/" + "soundcongfig.json"));
             SuitConfig::parse(readJsonFile(path + "/" + "suitconfig.json"));
             TextConfig::parse(readJsonFile(path + "/" + "textconfig.json"));
             TipConfig::parse(readJsonFile(path + "/" + "tipconfig.json"));
            
		}
};
#endif
