var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ConfLoader = (function () {
    function ConfLoader() {
        this._loadConfNames = {
            "appconfig_json": function (data) {
                AppConfig.parse(data);
            },
            "bdconfig_json": function (data) {
                BdConfig.parse(data);
            },
            "betconfig_json": function (data) {
                BetConfig.parse(data);
            },
            "bgconfig_json": function (data) {
                BgConfig.parse(data);
            },
            "bgimgconfig_json": function (data) {
                BgImgConfig.parse(data);
            },
            "buildingconfig_json": function (data) {
                BuildingConfig.parse(data);
            },
            "companyconfig_json": function (data) {
                CompanyConfig.parse(data);
            },
            "competitionconfig_json": function (data) {
                CompetitionConfig.parse(data);
            },
            "gameconfig_json": function (data) {
                GameConfig.parse(data);
            },
            "helpconfig_json": function (data) {
                HelpConfig.parse(data);
            },
            "intervalconfig_json": function (data) {
                IntervalConfig.parse(data);
            },
            "itemconfig_json": function (data) {
                ItemConfig.parse(data);
            },
            "levelconfig_json": function (data) {
                LevelConfig.parse(data);
            },
            "mailconfig_json": function (data) {
                MailConfig.parse(data);
            },
            "moveclipconfig_json": function (data) {
                MoveClipConfig.parse(data);
            },
            "oddsconfig_json": function (data) {
                OddsConfig.parse(data);
            },
            "pageconfig_json": function (data) {
                PageConfig.parse(data);
            },
            "partconfig_json": function (data) {
                PartConfig.parse(data);
            },
            "parttypeconfig_json": function (data) {
                PartTypeConfig.parse(data);
            },
            "particleconfig_json": function (data) {
                ParticleConfig.parse(data);
            },
            "payconfig_json": function (data) {
                PayConfig.parse(data);
            },
            "propertyconfig_json": function (data) {
                PropertyConfig.parse(data);
            },
            "propertytypeconfig_json": function (data) {
                PropertyTypeConfig.parse(data);
            },
            "randomname_json": function (data) {
                RandomName.parse(data);
            },
            "roleinitconfig_json": function (data) {
                RoleInitConfig.parse(data);
            },
            "roomconfig_json": function (data) {
                RoomConfig.parse(data);
            },
            "shopconfig_json": function (data) {
                ShopConfig.parse(data);
            },
            "signconfig_json": function (data) {
                SignConfig.parse(data);
            },
            "slotsconfig_json": function (data) {
                SlotsConfig.parse(data);
            },
            "soundcongfig_json": function (data) {
                SoundCongfig.parse(data);
            },
            "suitconfig_json": function (data) {
                SuitConfig.parse(data);
            },
            "textconfig_json": function (data) {
                TextConfig.parse(data);
            },
            "tipconfig_json": function (data) {
                TipConfig.parse(data);
            },
        };
    }
    ConfLoader.prototype.load = function () {
        var keys = Object.keys(this._loadConfNames);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var func = this._loadConfNames[key];
            var json = RES.getRes(key);
            func(json);
        }
    };
    return ConfLoader;
}());
__reflect(ConfLoader.prototype, "ConfLoader");
//# sourceMappingURL=ConfLoader.js.map