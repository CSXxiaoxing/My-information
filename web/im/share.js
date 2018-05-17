function share_WANJI(WANJI_TYPE){
    var shares=null,share_bhref=false;
    /**
     * 初始化分享服务
     */
    function init(){
        plus.share.getServices( function(s){
            shares={};
            for(var i in s){
                var t=s[i];
                shares[t.id]=t;
            }
            outLine('正在调用分享操作')
            shareAction('weixin','WXSceneSession');
        }, function(e){
            outLine( "获取分享服务列表失败："+e.message );
        } );
    }
    /**
     * 分享操作
     * @param {Object} id
     * @param {Object} ex
     */
    function shareAction(id,ex){
        var s=null;
        if(!id||!(s=shares[id])){
            outLine( "无效的分享服务！" );
            return;
        }
        if ( s.authenticated ) {
            shareMessage(s,ex);
        } else {
            s.authorize( function(){
                    shareMessage(s,ex);
                },function(e){
                outLine( "认证授权失败："+e.code+" - "+e.message );
            });
        }
    }
    /**
     * 发送分享消息
     * @param {Object} s  thumbs
     * @param {Object} ex
     */
    function shareMessage(s,ex){
        var msg = {
            content: '分享-详情',
            href: WANJI_ALL_URL+'/Public/Static/tmp/index.html',
            title: '玩机吧',
            content: '史上最刺激的游戏',
            thumbs: ['http://wanji888.hamingniao.com/uploadfiles/images/121.jpeg'],
            pictures: ['http://wanji888.hamingniao.com/uploadfiles/images/121.jpeg'],
            extra: {
                scene: "WXSceneSession"
            }

        };
        
        s.send(msg, function() {
            outLine("分享成功!");
        }, function(e) {
            outLine("分享失败!");
        });

    }
    init();
}
// 控制台输出日志
function outSet(msg) {
    console.log(msg);
}
// 界面弹出吐司提示
function outLine(msg) {
    mui.toast(msg);
}