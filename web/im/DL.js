var weixin_WANJI_DL_data = null;
function weixin_WANJI_DL(){
    var auths=null;
    // 监听plusready事件  
    function plusReady(){
        // 扩展API加载完毕，现在可以正常调用扩展API
        plus.oauth.getServices( function(services){
            auths = services;
            // alert(JSON.stringify(auths))
            authLogin()
        }, function(e){
            alert( "获取分享服务列表失败："+e.message+" - "+e.code );
        });
    };

    if(window.plus){
        plusReady();
    }else{
        document.addEventListener('plusready',plusReady,false);
    }
    // 登录操作
    function authLogin(){
        var s;
        for (var i = 0; i < auths.length; i++){
            if (auths[i].id == 'weixin'){
                s = auths[i];
                break; 
            }
        }

        if ( !s.authResult ) {
            s.login( function(e){
                outLine( "登录认证成功！" );
                authUserInfo();
            }, function(e){
                alert( "登录认证失败："+e.message+" - "+e.code );
            }, {appid:"wxa1bc8e9b951839dd"  // 微信应用的appid
                ,scope:"snsapi_userinfo"}   // 授权获取用户信息
            );
        }
    }




    // var auths=null;
    // function plusReady(){
    //     // 扩展API加载完毕，现在可以正常调用扩展API
    //     plus.oauth.getServices( function(services){
    //         auths = services;
    //         alert(JSON.stringify(auths[0]))
    //         alert('正在发起请求')
    //         authLogin()
    //     }, function(e){
    //         alert( "获取分享服务列表失败："+e.message+" - "+e.code );
    //     })
    // }
    // if(window.plus){
    //     plusReady();
    // }else{
    //     document.addEventListener('plusready',plusReady,false);
    // }
    // // alert(666) authLogin

    // // 登录操作
    // function authLogin(){
    //     var s = auths[0];
        
    //     if (!s.authResult) {
    //         s.login(function(e) {
    //             alert("登录认证成功！");
    //             authUserInfo();
    //         }, function(e) {
    //             alert( "登录认证失败："+e.message+" - "+e.code );
    //             authUserInfo();
    //             if(e.code=="-2"){
    //                 if ( plus.os.name == "Android" ) {
    //                     plus.runtime.launchApplication({pname:"com.tencent.mm"});
    //                 } else if ( plus.os.name == "iOS" ) {
    //                     plus.runtime.launchApplication({action:"weixin://RnUbAwvEilb1rU9g9yBU"});
    //                 }
    //                 // setTimeout(function(){
    //                 //     authLogin()//再次执行微信登录
    //                 // },4500)
    //             }
    //         });
    //     } else {
    //         alert("已经登录认证！");
    //         authUserInfo();
    //     }
    // }

    // 获取登录用户信息操作
    function authUserInfo(){
        var s;
        for (var i = 0; i < auths.length; i++){
            if (auths[i].id == 'weixin'){
             s = auths[i];
             break; 
            }
        }

        if ( !s.authResult ) {
            alert("未登录授权！");
        } else {
            s.getUserInfo( function(e){
                // alert( "获取用户信息成功："+JSON.stringify(s.userInfo) );
                var xhr = new XMLHttpRequest();
                var formData = new FormData();
                formData.append('feifei', JSON.stringify(s.userInfo));

                xhr.open('post', WANJI_ALL_URL+"/Member/wxLogin");
                //发送请求
                xhr.send(formData);
                xhr.onreadystatechange = function (e) {
                    // alert(JSON.stringify(e))
                    // 这步为判断服务器是否正确响应
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        // alert(xhr.responseText);
                        weixin_DL(JSON.parse(xhr.responseText))
                        weixin_WANJI_DL_data = JSON.parse(xhr.responseText)
                        authLogout();
                    }
                };
            }, function(e){
                alert( "获取用户信息失败："+e.message+" - "+e.code );
            } );
        }
    }
    //注销
    function authLogout() {
        for (var i in auths) {
            var s = auths[i];
            if (s.authResult) {
                s.logout(function(e) {
                    // alert("注销登录认证成功！");
                }, function(e) {
                    // alert("注销登录认证失败！");
                });
            }
        }
    }
    // 添加用户手机号信息
    // function addPhoneNumber(){
    //     var s = auths[0];
    //     if ( !s.authResult ) {
    //         alert("未登录授权！");
    //     } else {
    //         s.addPhoneNumber( function(e){
    //             alert( "添加用户手机号信息成功！");
    //             alert(JSON.stringify(e))
    //         }, function(e){
    //             alert( "添加用户手机号信息失败："+e.message+" - "+e.code );
    //         } );
    //     }
    // }
};

// 控制台输出日志
function outSet(msg) {
    console.log(msg);
}
// 界面弹出吐司提示
function outLine(msg) {
    mui.toast(msg);
}