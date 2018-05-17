// server作为所有api的服务器主入口，尽量简洁
// 引入主路由
var router = require('./router/Router.js');
// 通过main调用其他所有api,并传入端口span
router.Register(999);