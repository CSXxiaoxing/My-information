const room = {
    jetton : function(idx,self,e){  // 选择筹码
        e = e || event;
        if(self.chouma.one == idx){
            self.chouma.one = -1;
        } else {
            self.chouma.one = idx;
            self.chouma.LandR = `left:${e.pageX}px;top:${e.pageY}px;`
        }
        return this;
    },
    yazhu : function(idx,self,http,e){ // 押注
        e = e || event;
        // console.log(e.target)
        var fefefe = [1,5,10,50,100];

        if(self.user.type == 1 || self.user.type == 2 || self.user.initType != 5 || self.chouma.one<=0 || idx == self.logic.z_index){  //房主和庄家不参与游戏
            return false;
        }
        if(Number(self.main.minYa) > fefefe[idx] || Number(self.main.maxYa < fefefe[idx])){  // 押注范围限制
            self.errorTips = '下注范围为'+self.main.minYa+'-'+self.main.maxYa;
            self.careTip = true;
            return false;
        }
        var maxBel = '';
        if(self.main.bei==1){
            maxBel = self.main.maxBei;  // 最大倍率
        }else{
            maxBel = 1;  // 不翻倍
        }
        var fen = null;
        switch(self.chouma.one){
            case 1:  fen=1;   break;
            case 2:  fen=5;   break;
            case 3:  fen=10;  break;
            case 4:  fen=50;  break;
            case 5:  fen=100; break;
        }

        if(Number(self.main.minFen_x) < fefefe[idx] || (Number(self.user.myFen)-Number(fen*maxBel))<0){
            return false;
        }
        var header_H = document.querySelector('#app').offsetHeight;
        
        var imgOnes = document.getElementsByClassName('imgOne');
        var idxCard = self.move.bounce.length;
        self.move.imgNum += 1;                          // 复制
        self.move.srcImg[idxCard] = `src/png/cc0${self.chouma.one}.png`;        // 赋值
        // console.log(e.s)
        self.$set(self.move.srcImgStyle, idxCard ,`visibility:visible;left:${e.clientX}px;top:${e.clientY}px;z-index:999;width:1.2rem;height:1.2rem;transform:translate(-50%,-50%);transition:all 2s;`);
        self.move.bounce[idxCard] = 6;                  // 坠落动效and计数

        http.post('/RoomJoin/newChargePoints',{
            uid     : self.user.uid,     // 个人uid
            roomid  : self.user.rid,     // 房间id
            rate    : maxBel,            // 倍率
            score   : fen,               // 压分分数
            num     : self.user.ju,      // 局数
            few     : idx,               // 第几副牌
        })
        .then(res => {
            // console.log(res)
            if(res.status != 1){
                self.errorTips = res.msg;
                self.careTip = true;
            } else {
                self.chouma.liCss[idx]=1;
            }
        })
        return this;
    },
    cuoinit : function(self,ev){ // 搓牌开始
        ev = ev || event;
        var hezi =document.getElementsByClassName('cuopaiCard')[0].getBoundingClientRect();
        self.ka.type=0;
        self.ka.initY=0;
        self.ka.cardH=0;
        self.ka.heziType='';
        if (ev.changedTouches.length == 1) {    // 只有一个手指触摸
            var touY = ev.changedTouches[0].pageY;
            self.ka.cardH = hezi.height;
            self.ka.initY = touY;
        }
        return this;
    },
    cuoka : function(self,ev){ // 搓牌实现
        ev = ev || event;
        var img1_H=document.getElementsByClassName('cuopaiCard')[0].children[0].getBoundingClientRect().height;
        var img1_W=document.getElementsByClassName('cuopaiCard')[0].children[0].getBoundingClientRect().width;
        var [init_touY, init_H, touY] = [self.ka.initY, self.ka.cardH, ev.changedTouches[0].pageY];
        var y = init_touY-touY;

        if (ev.changedTouches.length == 1 && touY<init_touY) {    // 只有一个手指触摸
            self.ka.heziType = 'height:'+(init_H-y)+'px;';
            self.ka.img02    = 'transform: translate(-50%, -'+(y*2)+'px);z-index: 50;';
            if(y>=img1_H/2){
                self.ka.type = 1;
                self.ka.heziType = 'height:'+(self.ka.cardH)+'px;';
                self.ka.img02 = 'height:'+img1_H+'px;width:'+img1_W+'px;top: 0;transform: translate(-50%,0.3rem); transition: all 0.3s; z-index: 50;';
            }
        }
        return this;
    },
    cuoEnd: function(self,ev){ // 搓牌结束
        ev = ev || event;
        if(self.ka.type == 0){
            self.ka.heziType = 'height:'+(self.ka.cardH)+'px;';
            self.ka.img02 = 'transform: translate(-50%, 0px);z-index: 50;';
        }
        return this;
    },
    
}

export default room;