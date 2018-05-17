<template>
    <div>
    <!-- 庄 button --> 
    <mt-popup 
      v-model="setOwner"
      popup-transition="popup-fade" 
      class="owner" >
        
        <mt-popup
            v-model="details01"
            popup-transition="popup-fade" 
            :modal='false'
            class="details01">
            <span>选择锁定 <i @click="details01 = false"></i></span>
            <ul>
                <li v-for='(data, player) in $parent.dataList.pd' :key='data.zn_member_id' @click='sel = player'>
                    {{data.zn_member_name}} 
                    <b><img v-show="sel == player" src="../../srcImg/room027.png" alt=""></b>
                </li>
            </ul>
            <mt-button @click="know0"></mt-button>
        </mt-popup>

      <span><i @click="setOwner = false"></i></span>
      <p>上庄最低分数：<b>{{$parent.main.minFen}}</b></p>
      <hr/>
      <div>
        <label>
          <span @click="play = 1"><img src="../../srcImg/oxCrowd012.png" v-show="play==1" height="60" width="59" alt="" /></span>
            <p>自动轮庄</p>
        </label>

        <div class='height'>
            <div class='height_nei'>
                <p>输入轮庄局数</p>
                <input v-model='zhuanNum' type="text">
                <p @click='zhuan'></p>
            </div>
            <span>
                <img src="../../srcImg/room015.png" @click='$parent.barter()'/>
                <img src="../../srcImg/room014.png" @click='$parent.dataList.z.uid!=undefined?$parent.chat(2,$parent.dataList.z.uid,$parent.dataList.z.dian):""' />
            </span>
        </div>

            <hr/>
            <label>
                <span @click="play = 2,details01 = true"><img src="../../srcImg/oxCrowd012.png" v-show="play==2" height="60" width="59" alt="" /></span>
                <p>锁定庄家:</p>
                <b>{{zhuanList[0]}}</b>
                <img @click="details01 = true" class="list" src="../../srcImg/room013.png"/>
            </label>
          
        </div>
    </mt-popup >


    <!-- 普通玩家 -->
    <mt-popup 
        v-model="applyOn"
        popup-transition="popup-fade" 
        class="apply" >

        <span>{{applyObj.Lding == 0 && applyObj.type!=2 ? "申请上庄" : (applyObj.type==2 ? "我要下庄":"取消上庄")}}<i @click="applyOn = false"></i></span>

        <p>当前设置连庄 :
            <b>{{$parent.lunZ.type == 1 ? $parent.lunZ.num+"局" : "房主已锁定庄家"}}</b>
        </p>

        <p>上庄最低分数 :<b>{{minGrade}}</b></p>

        <p>您是否确定{{applyObj.Lding == 0 && applyObj.type!=2 ? "申请上庄" : (applyObj.type==2 ? "要下庄":"取消上庄")}}？</p>

        <mt-button @click="sz"></mt-button>
    </mt-popup >
    
    <!-- 奖金分数 -->
    <mt-popup
        v-model="details"
        popup-transition="popup-fade" 
        class="details">
        <span>奖金分数 <i @click="details = false"></i></span>

        <ul>
            <li>
                房间成员总分数  ：{{allFen}}
            </li>
            <li>
                房主抽水分数 &nbsp &nbsp &nbsp: <b>{{allWater.toFixed(2)}}</b>
            </li>
        </ul>
        <p>( 重新开始，房间局数，开奖记录，流水报表和抽水分数都将清零。房间成员分数保持不变)</p>
        <mt-button @click="newRoom"></mt-button>
    </mt-popup>
    <loading v-if='loading'></loading>
    </div>
</template>

<style lang='scss' scoped>
  @import '../../utils/baseVar.scss';

  // display: flex; 
    .apply{   // 申请上庄
        width: 8.407407rem;
        height: 5.305556rem;
        @include border-radius(0.277778rem);
        
        background: $room016 no-repeat;
        background-size: 8.407407rem 5.305556rem;
        padding: 0 0.601852rem;
        box-sizing: border-box;

    
        &>span:nth-of-type(1){
          display: block;
          color:white;
          font-size: 0.648148rem;
          width:8.87037rem;
          height: 1.9rem;
          line-height: 1.805556rem;
          
          text-align: center;
          position: relative;
          right: 0.87037rem;
          bottom: 0.231481rem;
            i{
                position: absolute;
                right: 0;
                -webkit-transform: translate(-180%, 90%);
                   -moz-transform: translate(-180%, 90%);
                    -ms-transform: translate(-180%, 90%);
                     -o-transform: translate(-180%, 90%);
                        transform: translate(-180%, 90%);
                height: 0.555556rem;
                width: 0.555556rem;
                background: $careTip01 no-repeat;
                background-size: 0.555556rem 0.555556rem;
            }
        }

        p{
          line-height:0.185185rem;
          padding-bottom: 0.462963rem;
          text-align:left;
          font-size:0.333333rem;
          margin-left:1.52963rem;
          b{
            color:#209434;
          }
        }
    
    
        p:nth-of-type(3){
          font-size:0.407407rem;
          color:#FB7040;
          text-align:center;
          margin-left:0.0rem;
          margin-top:0.185185rem;
        }
    
        input{
          width:2.351852rem;
          height:0.777778rem;
           @include border-radius(0.092593rem);
          margin-left:0.185185rem;
          font-size:0.240741rem;
        }
        
        button{
          width: 3.305556rem;
          height: 0.972222rem;
          line-height:0.925926rem;
           @include border-radius(0.509259rem);
          font-size:0.555556rem;
          position: relative;
          left: 0;
          bottom: 0rem;
          border: 0 none;
          color: white;

          background: $login006 no-repeat;
          background-size: 3.305556rem 0.972222rem;
        }
        button:active {
            position: relative;
            left: 0.018519rem;
            bottom: -0.1rem;
        }
        div{
          text-align:left;
          padding-left: 0.648148rem;
    
          label{
            display:inline-block;
            font-size:0.444444rem;
            width:100%;
            margin-bottom: 0.462963rem;
            line-height:0.740741rem;
            margin-left: 0.925926rem;
            span{
              display:inline-block;
              width:0.555556rem;
              height:0.601852rem;
              background-color: #DADADA;
               @include border-radius(0.092593rem);
              padding:0.046296rem 0.046296rem 0.0rem 0.046296rem;
              position:absolute;
              left:0.648148rem;
            }
            
          }
        }
    }

    .details{   // 奖金分数
        width: 8.407407rem;
        @include border-radius(0.277778rem);

        height: 5.777778rem;
        background: $room016 no-repeat;
        background-size: 8.407407rem 5.777778rem;
        padding: 0 0.62963rem;
        box-sizing: border-box;
      
        &>span:nth-of-type(1){
            display: block;
            color:white;
            font-size: 0.611111rem;
            width:8.87037rem;
            height:2.12963rem;
            line-height: 1.805556rem;

            text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
            -webkit-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
            -moz-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
            *filter: Glow(color=#000, strength=1);
            
            text-align: center;
            position: relative;
            right: 0.87037rem;
            bottom: 0.231481rem;
            i{
                position: absolute;
                right: 0;
                -webkit-transform: translate(-180%, 90%);
                   -moz-transform: translate(-180%, 90%);
                    -ms-transform: translate(-180%, 90%);
                     -o-transform: translate(-180%, 90%);
                        transform: translate(-180%, 90%);
                height: 0.555556rem;
                width: 0.555556rem;
                background: $careTip01 no-repeat;
                background-size: 0.555556rem 0.555556rem;
            }
        }

      ul{
        margin-left:0.481481rem;
        position:relative;
        bottom:0.388889rem;
        font-size:0.481481rem;
        li{
          text-align:left;
          b{
            color:#3B693E;
          }
        }
      }

        button{
            width:4.018519rem;
            height: 1.037037rem;
            @include border-radius(0.509259rem);
            position: absolute;
            left: 50%;
            bottom: 0.9rem;
            transform: translate(-50%, -54%);
            font-size:0.555556rem;
            border: 0 none;
            color: white;
            background: $room017 no-repeat;
            background-size: 4.018519rem 1.037037rem;
        }
        button:active {
            position: absolute;
            left: 50%;
            bottom: 0.9rem;
            -webkit-transform: translate(-50%, -50%);
               -moz-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                 -o-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
        }

      p{
        position: absolute;
        bottom: 0.32rem;
        font-size: 0.3rem;
        width: 6.6rem;
        color: red;

        display: block;
        word-wrap: break-word;
        word-break:break-all;
        white-space: pre-wrap;
        padding:0.0rem 0.3rem;
      }
    }
    .owner{ // 轮庄样式
        width: 8.407407rem;
        height: 10.0rem;
        @include border-radius(0.277778rem);
        background: $room012 no-repeat;
        background-size: 8.407407rem 10.0rem;
        padding: 0 0.9rem;
        box-sizing: border-box;

        &>span:nth-of-type(1){
            display: block;
            width: 100%;
            height: 1.6rem;
            i{
            position: absolute;
            right: 0;
            -webkit-transform: translate(-156%, 60%);
               -moz-transform: translate(-156%, 60%);
                -ms-transform: translate(-156%, 60%);
                 -o-transform: translate(-156%, 60%);
                    transform: translate(-156%, 60%);
            height: 0.555556rem;
            width: 0.555556rem;
            background: $careTip01 no-repeat;
            background-size: 0.555556rem 0.555556rem;
            }    
        }

        &>p:nth-of-type(1){
            line-height: 0.888889rem;
            text-align: left;
            font-size: 0.462963rem;
            margin-left: 0.462963rem;
            b{
                color: #FF3C0D;
                font-weight: normal;
            }
        }
        hr{
            width:100%;
            height: 0.01rem;
            background: #DFC7A5;
        }
      

        div{
            text-align: left;
            label{
                background: #F7E8D3;
                padding-top: 0.231481rem;
                display:inline-block;
                font-size:0.518519rem;
                width: 100%;
                line-height:0.648148rem;
                // padding-left: 1.296296rem;
                position: relative;
                box-sizing: border-box;
                span{
                    display:inline-block;
                    width: 0.675926rem;
                    height: 0.648148rem;
                    background-color: #DFC7A5;
                    float: left;
                    @include border-radius(0.1rem);
                    position: absolute;
                    top: 50%;
                    left: 0;
                    margin-left: 0.222222rem;
                    transform: translate(0,-50%);
                    img{
                        width: 0.546296rem;
                        height: 0.555556rem;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-52%,-50%);
                    }
                }
                &>p{
                    float: left;
                    text-align: left;
                    font-size: 0.5rem;
                    line-height: 0.601852rem;
                    padding-left: 1.15rem;
                }
                &>b{
                  font-size: 0.35rem;
                  color: #29A345;
                  font-weight: normal;
                  margin-left:0.08rem;
                }
                .list{
                    position: absolute;
                    right: 0.26rem;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 0.574074rem;
                    height: 0.601852rem;
                }
            }
        }

        .height{
            height: 5rem;
            padding: 0.185185rem 0.25rem 0;
            width: 6.296296rem;
            box-sizing: border-box;
            .height_nei{
                padding: 0 0.888889rem;
                height: 3.222222rem;
                width: 6.25rem;
                box-sizing: border-box;
                background: #DFC7A5;
                line-height: 0.833333rem;
                font-size: 0.333333rem;
                input{
                    width: 100%;
                    border: 0 none;
                    text-align: center;
                    height: 0.740741rem;
                    line-height: 0.740741rem;
                    font-size: 0.37037rem;
                    color: #0BA40B;
                    background: #F7E8D3;
                    border-radius: 0.12rem;
                }
                p:nth-of-type(2){
                    height: 0.9rem;
                    width: 2.888889rem;
                    margin-top: 0.52rem;
                    background: $careTip no-repeat;
                    background-size: 2.888889rem 0.9rem;
                    position:relative;
                    left: 50%;
                    transform: translate(-50%,0);
                }
                p:nth-of-type(2):active{
                    transform: translate(-50%,4%);
                }
            }
            span{
                display: block;
                height: 1.5rem;
                width: 6.25rem;
                position: relative;
                img{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-119%,-50%);
                    height: 0.740741rem;
                    width: 1.898148rem;
                }
                img:active{
                    transform: translate(-119%,-46%);
                }
                img:nth-of-type(2){
                    transform: translate(19%,-50%);
                }
                img:nth-of-type(2):active{
                    transform: translate(19%,-46%);
                }
            }
        }
    }
    
    .details01{
        width: 8.685185rem;
        height: 10.185185rem;
        background: $friend001 no-repeat;
        background-size: 8.685185rem 10.185185rem;

      @include box-sizing();
       @include border-radius(0.277778rem);
      img{
        width:0.87963rem;
        height:0.925926rem;
      }
        span{
            display:inline-block;
            width:100%;
            line-height:1.388889rem;
            font-size:0.592593rem;
            text-align:center;
            i{
                right: -0.26rem;
                top: -0.2rem;
                position: absolute;
                background: $login008 no-repeat;
                background-size: 0.907407rem 0.972222rem;
                height: 0.972222rem;
                width: 0.907407rem;
            }
        }
        ul{
          font-size:0.444444rem;
          width:8.055556rem;
          height: 7rem;
          
          overflow-y:auto;
          overflow-x:hidden;  
          li{
            border-bottom: 0.018519rem solid #D7D7D7;
            margin-left:0.555556rem;
            line-height:1.111111rem;
            position: relative;
            b{
              display:inline-block;

              width:0.87963rem;
              height:0.925926rem;
              background: $room026 no-repeat; 
              background-position: center;
              background-size: 0.87963rem 0.925926rem; 
              position: absolute;
              right: 0.092593rem;
              top: 50%;
              -webkit-transform: translate(0,-50%);
                 -moz-transform: translate(0,-50%);
                  -ms-transform: translate(0,-50%);
                   -o-transform: translate(0,-50%);
                      transform: translate(0,-50%);
              img{
                height: 0.925926rem;
                width: 0.87963rem;
              }
            }
          }
          li:nth-of-type(1){
            border-top: 0.018519rem solid #D7D7D7;
            }
        }
        button{
            width: 3.2rem;
            height: 0.972222rem;
            line-height:0.925926rem;
            @include border-radius(0.509259rem);
            font-size: 0.555556rem;
            margin: 0.462963rem 0 0 2.685185rem;
            border: 0 none;
            color: white;
            background: $careTip no-repeat;
            background-size: 3.2rem 0.972222rem;
        }
    }

    ul::-webkit-scrollbar {
        display: none;
    } 
</style>

<script type="es6">
    import { MessageBox } from 'mint-ui';
    import http from '../../utils/httpClient.js';
    import Vue from 'vue';
    import loading from '../../components/loading/loading.vue';
    Vue.component('loading', loading)

  export default {
    data() {
      return {
        loading: false,     // loading onprize
        applyOn: false,     // √
        details:false,       // √
        setOwner: false,    // √
        details01:false,    // √

        minGrade: 0,    // 最低上庄分数
        applyObj: {
            type: 0,
            gameType: 0,
            Lding: 0,       // 是否正在上庄
            rid: 0,
            uid: 0,
            status: 4,
        },
        zhuanNum: 5,     // 轮庄数
        play: 1,    // 1自动 2锁定
        
        sel: -1,
        zhuanList: ['', ''],  // 申请上庄的人的列表-默认
        allFen: 0,  // 房间总分
        allWater: 0,  // 抽水分数
      };
    },
    mounted: function(){
        this.lunzz()  
    },
    methods:{ 
        lunzz(){
            this.zhuanNum = this.$parent.lunZ.num;
            if(this.$parent.lunZ.type == 1){    // 轮庄
                this.play = 1;
            }else{
                this.play = 2;
            }
        },
        sz () {
            var self = this;
            var obj = this.applyObj;

            if(obj.type==2 && !(this.$parent.user.initType==0||this.$parent.user.initType==7)){    // 我要下庄    
                this.$parent.user.xiaZZZ=1;
                this.$parent.errorTips= '本轮游戏结束后生效';      // 提示内容
                this.$parent.careTip = true;    // 提示窗
            }
            else if(obj.type==2 && (this.$parent.user.initType==0||this.$parent.user.initType==7)){ // 我要下庄  
                http.post( '/RoomJoin/setMakers', {
                            roomid: obj.rid,
                            id: obj.uid,
                            type: 2,
                        })
                    .then(res => {
                        if(res.status==1){
                            // goEasy.publish({  // 发送文本
                            //     channel:  'room_' + obj.rid,
                            //     message: JSON.stringify(obj),
                            // });
                        }
                    })
            }
            else if(obj.Lding==1){   // 取消上庄
                http.post( '/RoomJoin/setMakers', {
                            roomid: obj.rid,
                            id: obj.uid,
                            type: 2,
                        })
                    .then(res => {
                        if(res.status==1){
                            // goEasy.publish({  // 发送文本
                            //     channel:  'room_' + obj.rid,
                            //     message: JSON.stringify(obj),
                            // });
                        }
                    })
            }
            else {        // 申请上庄
                http.post( '/RoomJoin/applyfor', {
                            roomid: obj.rid,
                            id: obj.uid,
                            
                        })
                    .then(res => {
                        console.log(res)
                        if(res.status == 1){
                            // obj.status = 4;
                            // goEasy.publish({  // 发送文本
                            //     channel:  'room_' + obj.rid,
                            //     message: JSON.stringify(obj),
                            // });
                        } else {    //  错误
                            self.$parent.errorTips = res.msg;
                            self.$parent.careTip = true;
                        }
                    })
            }
            self.applyOn = false;   // 申请上庄下庄
        },
        zhuan (n) {  // 庄模式设置
            var self = this;
            
            if( self.play == 2 && n!=undefined){     // 指定谁上庄
                http.post('/RoomJoin/setMakers',{
                    roomid: self.$parent.user.rid, // 房间id
                    type: 1,  // 1为设置庄家，2为下庄
                    id: n,  // 用户id
                    num: this.$parent.user.ju,
                })
                .then(res => {
                    if(res.status == 1){
                        self.$parent.list()
                    }
                    // self.$parent.errorTips = res.msg;
                    // self.$parent.careTip = true;
                })
            }
            http.post('/Room/setRoomMakers',{  // 设置庄模式
                roomid: self.$parent.user.rid, // 房间id
                maker: self.play == 1 ? 2 : 1,   // 庄家模式 1，指定，2轮庄
                makernumber: self.play == 1 ? self.zhuanNum : 999,  // 轮庄局数
            })
            .then(res => {
                console.log(res)
                    if(res.status == 1){
                        this.$parent.user.lunCoun = self.play == 1 ? 999 : self.zhuanNum;
                    }
                    // self.$parent.errorTips = res.msg;
                    // self.$parent.careTip = true;
                
            })
            this.setOwner = false;
        },
        know0 () {   // 上庄列表锁定人员
            // console.log(this.$parent.dataList.pd[0].zn_member_id) zc_nickname zn_member_name
            if(this.sel >= 0){
                this.play = 0
                this.zhuan(this.$parent.dataList.pd[0].zn_member_id);
            }
            this.details01 = false;
        },
        // 下个庄
        nextZhuan (){
            if(this.$parent.dataList.pd[0]!=undefined){
                http.post('/RoomJoin/setMakers',{
                    roomid: self.$parent.user.rid, // 房间id
                    type: 1,  // 1为设置庄家，2为下庄
                    id: this.$parent.dataList.pd[0].zn_member_id,  // 用户id
                    num: this.$parent.user.ju,
                })
                .then(res => {
                    self.$parent.errorTips = res.msg;
                    self.$parent.careTip = true;
                })
            } else {
                self.$parent.errorTips = '请检查有无上庄成员';
                self.$parent.careTip = true;
            }
        },
        
        newRoom () {    // 重新开局
            var self = this;
            var id = this.$parent.user.rid;
            http.post('/Room/reGame',{
                roomid: id, // 房间id
            })
            .then(res => {
                console.log(res)
                if(res.status == 0){
                    self.$parent.errorTips = res.msg;
                    self.$parent.careTip = true;
                } else if(res.status == 1){
                    
                }
            })
            self.details = false;
            self.details = false;
        },
    }
  };
</script>