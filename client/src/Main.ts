//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        
        App.Instance.fullScreenAdaptation(1280,720,this.onResized);

        this.runGame().catch(e => {
            Logger.log(e);
        })
        

    }
    private async runGame() {
        //开启文理跨域
        egret.ImageLoader.crossOrigin = "anonymous";


        App.Instance.Version = Game.VERSION;
        App.Instance.Key = Game.KEY;

        await this.loadResource()
        // App.Instance.init();
        
        this.initScene();
        this.initModule();
        // const userInfo = await platform.getUserInfo();
        App.Instance.init();

        App.Instance.SceneMgr.runScene(SceneConst.WORD);
      
        // const loginInfo = await platform.login();
        // Logger.log(loginInfo);

        // Commder.Instance.login(loginInfo.openId,loginInfo.token,loginInfo.platform);

        

        
        // var pro2 = new Protocols.getUserInfoPro();
        // pro2.userId = 2;
        // App.Instance.RPC.Send2Server(pro2,(code,data)=>{
        //     var d = <Protocols.getUserInfoProResp>data;
        //     Logger.log(d.name);
        //     Logger.log(d.userId);
            
        // },this);

    }

    private async loadResource() {
        try {
            // const loadingView = new LoadingUI();
            // this.stage.addChild(loadingView);       
            var resPath = "";
            if(DeviceUtils.IsHtml5() && !DeviceUtils.IsPc()){
                resPath = Game.CDN_RES_PATH;
                App.Instance.RES.addConfig("resource/default.res.json" + "?v=" + App.Instance.Version, "resource/");
                App.Instance.RES.addConfig(resPath+"resource/resource.ui.res.json" + "?v=" + App.Instance.Version, resPath+"resource/");
                App.Instance.RES.addConfig(resPath+"resource/resource.sound.res.json" + "?v=" + App.Instance.Version, resPath+"resource/");
                App.Instance.RES.addConfig(resPath+"resource/resource.conf.res.json" + "?v=" + App.Instance.Version , resPath+"resource/");
                App.Instance.RES.addConfig(resPath+"resource/resource.dragon.res.json" + "?v=" + App.Instance.Version , resPath+"resource/");
                App.Instance.RES.addConfig(resPath+"resource/resource.mc.res.json" + "?v=" + App.Instance.Version , resPath+"resource/");
                App.Instance.RES.addConfig(resPath+"resource/resource.particle.res.json" + "?v=" + App.Instance.Version, resPath+"resource/");
            }else if(DeviceUtils.IsWeixin()){
                resPath = Game.CDN_RES_PATH;
                App.Instance.RES.addConfig(StringUtils.format("resource/default.res.{0}.json",App.Instance.Version), "resource/");
                App.Instance.RES.addConfig(resPath+StringUtils.format("resource/resource.ui.res.{0}.json",App.Instance.Version), resPath+"resource/");
                App.Instance.RES.addConfig(resPath+StringUtils.format("resource/resource.sound.res.{0}.json" , App.Instance.Version), resPath+"resource/");
                App.Instance.RES.addConfig(resPath+StringUtils.format("resource/resource.conf.res.{0}.json" ,App.Instance.Version), resPath+"resource/");
                App.Instance.RES.addConfig(resPath+StringUtils.format("resource/resource.dragon.res.{0}.json",App.Instance.Version), resPath+"resource/");
                App.Instance.RES.addConfig(resPath+StringUtils.format("resource/resource.mc.res.{0}.json" , App.Instance.Version), resPath+"resource/");
                App.Instance.RES.addConfig(resPath+StringUtils.format("resource/resource.particle.res.{0}.json",App.Instance.Version), resPath+"resource/");
            }else{
                App.Instance.RES.addConfig("resource/default.res.json" , "resource/");
                App.Instance.RES.addConfig(resPath+"resource/resource.ui.res.json" , resPath+"resource/");
                App.Instance.RES.addConfig(resPath+"resource/resource.sound.res.json" , resPath+"resource/");
                App.Instance.RES.addConfig(resPath+"resource/resource.conf.res.json"  , resPath+"resource/");
                App.Instance.RES.addConfig(resPath+"resource/resource.dragon.res.json"  , resPath+"resource/");
                App.Instance.RES.addConfig(resPath+"resource/resource.mc.res.json"  , resPath+"resource/");
                App.Instance.RES.addConfig(resPath+"resource/resource.particle.res.json" , resPath+"resource/");
            }
            
            
            await App.Instance.RES.asyncLoadConfig();
            await this.loadTheme();
            await App.Instance.RES.asyncLoadGroup("loading");
            App.Instance.EasyLoading.showLoading();
            await App.Instance.RES.asyncLoadGroup("preload_config");

            App.Instance.ConfLoader.load();
            App.Instance.EasyLoading.hideLoading();
            // this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }
    
    protected initScene(): void {
        App.Instance.SceneMgr.register(SceneConst.LOADING,new LoadingScene());
        App.Instance.SceneMgr.register(SceneConst.GAME,new GameScene());
        App.Instance.SceneMgr.register(SceneConst.WORD,new WordScene());
    }
    protected initModule():void{
        App.Instance.ControlMgr.register(ModuleConst.LOADING,new LoadingController());
        App.Instance.ControlMgr.register(ModuleConst.SETTING,new SettingControler());
        App.Instance.ControlMgr.register(ModuleConst.RANDNAME,new RandNameController());
        App.Instance.ControlMgr.register(ModuleConst.SERVERLIST,new ServerController());
    }

    private onResized():void{
        App.Instance.SceneMgr.onResize();
    }


}
