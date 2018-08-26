/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {

    login(): Promise<any>;
    createLoginButton():Promise<any>;
    share():Promise<any>;

}

class DebugPlatform implements Platform {
    async getUserInfo() {
        return {
            avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epEsuAdbQYk71zVS8qdSZH3l5MqxibSmGGQzrXHrrlCKGlChdbITT70ALWhwvaYjibEtgm4jVDqX0Pg/132"
        }
    }
    async login() {
        
        var openId = egret.localStorage.getItem("jrdh_openid");
        if(!openId){
            openId = Math.floor(Math.random() * 1000000000) + "";
            egret.localStorage.setItem("jrdh_openid",openId);
        }
        return {
                openId: openId,
                token:"",
                platform:""
            }
    }
    async share(){
        
    }
    async createLoginButton(){
        
    }
}


if (!window.platform) {
    window.platform = new DebugPlatform();
}



declare let platform: Platform;

declare interface Window {

    platform: Platform
}





