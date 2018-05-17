(function(){
    //取消浏览器的所有事件，使得active的样式在手机上正常生效
    document.addEventListener('touchstart',function(){
        return false;
    },true);
    // 禁止选择
    document.oncontextmenu=function(){
        return false;
    };
    // H5 plus事件处理
       var as='pop-in';// 默认窗口动画
       function plusReady(){
           // 隐藏滚动条
           plus.webview.currentWebview().setStyle({scrollIndicator:'none'});
           // Android处理返回键 Android
           plus.key.addEventListener('backbutton',function(){
                if(location.hash == '#/'){
                    var backcount=0;
                    mui.back = function () {
                    if (mui.os.ios) return;
                    if (backcount > 0) {
                    if (window.plus) plus.runtime.quit();
                    return;
                    };
                    mui.toast('再按一次退出应用');
                    backcount++;
                    setTimeout(function () {
                        backcount = 0;
                    }, 1500);
                    };
                }
               if(location.hash == '#/home' || location.hash == '#/oxCrowd' || location.hash.slice(0,7) == '#/room/'){
                   console.log(location.hash)
                   console.log(plus.os.name)
                  ('iOS'==plus.os.name)?plus.nativeUI.confirm('确认退出？', function(e){
                       alert(e.index)
                      if(e.index>0){
                          plus.runtime.quit();
                      }
                  }, '大战牛群', ['取消','确定']):confirm('确认退出？', function(e){
                       alert(e.index)
                      if(e.index>0){
                          plus.runtime.quit();
                      }
                  }, '大战牛群', ['取消','确定']);
              } else {
                  console.log(999)
                  // history.back();
              }

           },false);
           compatibleAdjust();
       }
       if(window.plus){
           plusReady();
       }else{
           document.addEventListener('plusready',plusReady,false);
       }
       // DOMContentLoaded事件处理
       var _domReady=false;
       document.addEventListener('DOMContentLoaded',function(){
           _domReady=true;
           compatibleAdjust();
       },false);
       // 兼容性样式调整
       var _adjust=false;
       function compatibleAdjust(){
           if(_adjust||!window.plus||!_domReady){
               return;
           }
           _adjust=true;
           // iOS平台特效
           if('iOS'==plus.os.name){
               document.getElementById('content').className='scontent';    // 使用div的滚动条
               if(navigator.userAgent.indexOf('StreamApp')>=0){    // 在流应用模式下显示返回按钮
                   document.getElementById('back').style.visibility='visible';
               }
           }
           // 预创建二级窗口
       //  preateWebviews();
           // 关闭启动界面
               plus.navigator.setStatusBarBackground('#D74B28');
           setTimeout(function(){
               plus.navigator.closeSplashscreen();
           },200);
       }

       // 预创建二级页面
       var preate={};
       function preateWebviews(){
           preateWebivew('plus/webview.html');
           var plist=document.getElementById('plist').children;
           // 由于启动是预创建过多Webview窗口会消耗较长的时间，所以这里限制仅创建5个
           for( var i=0;i<plist.length&&i<2;i++){
               var id=plist[i].id;
               id&&(id.length>0)&&preateWebivew(id);
           }
       }
       function preateWebivew(id){
           if(!preate[id]){
               var w=plus.webview.create(id,id,{scrollIndicator:'none',scalable:false,popGesture:'hide'},{preate:true});
               preate[id]=w;
               w.addEventListener('close',function(){//页面关闭后可再次打开
                   _openw=null;
                   preate[id]&&(preate[id]=null);//兼容窗口的关闭
               },false);
           }
       }
       // 清除预创建页面(仅)
       function preateClear(){
           for(var p in preate){
               var w=preate[p];
               if(w&&w.showded&&!w.isVisible()){
                   w.close();
                   preate[p]=null;
               }
           }
       }
   })()