const sql = require("./MySQL");
// 路由
const UserRouter = require("../router/UserRouter")

module.exports = {
    Register: function(app){
        let obj = {app,sql}

        UserRouter.Register(obj); // 用户信息

    }
}