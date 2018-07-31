const sql = require("./MySQL");
// 路由
const UserRouter = require("../router/UserRouter")
const UrlRouter = require("../router/Url_Router")

module.exports = {
    Register: function(app){
        let obj = {app,sql}
        
        UserRouter.Register(obj); // 用户信息
        UrlRouter.Register(obj); // 资料url

    }
}