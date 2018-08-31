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
            
            "bgconfig_json":(data)=>{
                BgConfig.parse(data);
            },
            
            "bgimgconfig_json":(data)=>{
                BgImgConfig.parse(data);
            },
            
            "buildingconfig_json":(data)=>{
                BuildingConfig.parse(data);
            },
            
            "itemconfig_json":(data)=>{
                ItemConfig.parse(data);
            },
            
            "levelconfig_json":(data)=>{
                LevelConfig.parse(data);
            },
            
            "moveclipconfig_json":(data)=>{
                MoveClipConfig.parse(data);
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
            
            "quotesdataconfig_json":(data)=>{
                QuotesDataConfig.parse(data);
            },
            
            "quoteslistconfig_json":(data)=>{
                QuotesListConfig.parse(data);
            },
            
            "quotestreeconfig_json":(data)=>{
                QuotesTreeConfig.parse(data);
            },
            
            "randomname_json":(data)=>{
                RandomName.parse(data);
            },
            
            "roleinitconfig_json":(data)=>{
                RoleInitConfig.parse(data);
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
            
            "stockconfig_json":(data)=>{
                StockConfig.parse(data);
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