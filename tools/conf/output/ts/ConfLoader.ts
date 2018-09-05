class ConfLoader{
    private _loadConfNames:any;
    public constructor(){
        this._loadConfNames = {
            
            "appconfig_json":(data)=>{
                AppConfig.parse(data);
            },
            
            "bdconfig_json":(data)=>{
                BdConfig.parse(data);
            },
            
            "betconfig_json":(data)=>{
                BetConfig.parse(data);
            },
            
            "bgconfig_json":(data)=>{
                BgConfig.parse(data);
            },
            
            "bgimgconfig_json":(data)=>{
                BgImgConfig.parse(data);
            },
            
            "buildingconfig_json":(data)=>{
                BuildingConfig.parse(data);
            },
            
            "companyconfig_json":(data)=>{
                CompanyConfig.parse(data);
            },
            
            "competitionconfig_json":(data)=>{
                CompetitionConfig.parse(data);
            },
            
            "dayconfig_json":(data)=>{
                DayConfig.parse(data);
            },
            
            "gameconfig_json":(data)=>{
                GameConfig.parse(data);
            },
            
            "helpconfig_json":(data)=>{
                HelpConfig.parse(data);
            },
            
            "intervalconfig_json":(data)=>{
                IntervalConfig.parse(data);
            },
            
            "itemconfig_json":(data)=>{
                ItemConfig.parse(data);
            },
            
            "levelconfig_json":(data)=>{
                LevelConfig.parse(data);
            },
            
            "mailconfig_json":(data)=>{
                MailConfig.parse(data);
            },
            
            "moveclipconfig_json":(data)=>{
                MoveClipConfig.parse(data);
            },
            
            "oddsconfig_json":(data)=>{
                OddsConfig.parse(data);
            },
            
            "pageconfig_json":(data)=>{
                PageConfig.parse(data);
            },
            
            "partconfig_json":(data)=>{
                PartConfig.parse(data);
            },
            
            "parttypeconfig_json":(data)=>{
                PartTypeConfig.parse(data);
            },
            
            "particleconfig_json":(data)=>{
                ParticleConfig.parse(data);
            },
            
            "payconfig_json":(data)=>{
                PayConfig.parse(data);
            },
            
            "propertyconfig_json":(data)=>{
                PropertyConfig.parse(data);
            },
            
            "propertytypeconfig_json":(data)=>{
                PropertyTypeConfig.parse(data);
            },
            
            "randomname_json":(data)=>{
                RandomName.parse(data);
            },
            
            "roleinitconfig_json":(data)=>{
                RoleInitConfig.parse(data);
            },
            
            "roomconfig_json":(data)=>{
                RoomConfig.parse(data);
            },
            
            "shopconfig_json":(data)=>{
                ShopConfig.parse(data);
            },
            
            "signconfig_json":(data)=>{
                SignConfig.parse(data);
            },
            
            "slotsconfig_json":(data)=>{
                SlotsConfig.parse(data);
            },
            
            "soundcongfig_json":(data)=>{
                SoundCongfig.parse(data);
            },
            
            "suitconfig_json":(data)=>{
                SuitConfig.parse(data);
            },
            
            "textconfig_json":(data)=>{
                TextConfig.parse(data);
            },
            
            "tipconfig_json":(data)=>{
                TipConfig.parse(data);
            },
            
        }
        
    }
    public load():void{
        let keys = Object.keys(this._loadConfNames);
        for(var i = 0; i < keys.length; i++){
            let key = keys[i];
            let func:Function = this._loadConfNames[key];
            let json = RES.getRes(key);
            func(json);
        }
    }

}