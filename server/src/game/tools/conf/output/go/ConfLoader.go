package conf

import (
)

func LoadConfigs() {
	loadAppConfig("conf/AppConfig.json")
	loadBdConfig("conf/BdConfig.json")
	loadBgConfig("conf/BgConfig.json")
	loadBgImgConfig("conf/BgImgConfig.json")
	loadBuildingConfig("conf/BuildingConfig.json")
	loadItemConfig("conf/ItemConfig.json")
	loadLevelConfig("conf/LevelConfig.json")
	loadMoveClipConfig("conf/MoveClipConfig.json")
	loadPageConfig("conf/PageConfig.json")
	loadPartConfig("conf/PartConfig.json")
	loadPartTypeConfig("conf/PartTypeConfig.json")
	loadParticleConfig("conf/ParticleConfig.json")
	loadPayConfig("conf/PayConfig.json")
	loadPropertyConfig("conf/PropertyConfig.json")
	loadPropertyTypeConfig("conf/PropertyTypeConfig.json")
	loadQuotesDataConfig("conf/QuotesDataConfig.json")
	loadQuotesListConfig("conf/QuotesListConfig.json")
	loadQuotesTreeConfig("conf/QuotesTreeConfig.json")
	loadRandomName("conf/RandomName.json")
	loadRoleInitConfig("conf/RoleInitConfig.json")
	loadShopConfig("conf/ShopConfig.json")
	loadSignConfig("conf/SignConfig.json")
	loadSlotsConfig("conf/SlotsConfig.json")
	loadSoundCongfig("conf/SoundCongfig.json")
	loadStockConfig("conf/StockConfig.json")
	loadSuitConfig("conf/SuitConfig.json")
	loadTextConfig("conf/TextConfig.json")
	loadTipConfig("conf/TipConfig.json")
	
}