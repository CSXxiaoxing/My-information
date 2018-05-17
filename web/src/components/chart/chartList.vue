<template>
    <mt-popup id='chartList' position="left" :modal='false'
      v-model="listOff" >
      <!-- img -->
      <mt-popup 
          v-model="careTip"
          popup-transition="popup-fade" :modal='false'
          class="care" >
          <span>通知 <i @click="careTip = false">×</i></span>
          <p>该房间尚未公开</p>
          <mt-button @click="careTip = false">  确定
          </mt-button>
      </mt-popup >
        <!-- 退出房间 -->
        <mt-popup 
          v-model="putRoom" :modal='false'
          popup-transition="popup-fade" 
          class="tip" >
          <i @click='putRoom = false'></i>
          <p>退出房间分数将会清零，你是否要退出房间？</p>
          <mt-button @click="go(1)" >  
          </mt-button>
          <mt-button @click="putRoom = false">  
          </mt-button>
        </mt-popup >

        <!-- 解散房间 -->
        <mt-popup 
          v-model="dissolveRoom" :modal='false'
          popup-transition="popup-fade" 
          class="diss" >
            <i @click='dissolveRoom = false'></i>
          <p>房间玩家分数未清零你是否确定要解散房间？</p>

          <mt-button @click="delRoom"></mt-button>
          <mt-button @click="dissolveRoom = false"></mt-button>
        </mt-popup >
        <!-- 删除成员 -->
        <mt-popup v-model="DeleteCY"
            class='chartDelete' :modal='false'
             position="left">
            <header>
                <ul>
                    <li>
                        <i @click='DeleteCY = false'></i>
                    </li>
                    <li>删除房间成员</li>
                    <li @click='go(2, imgStyle)'>确认</li>
                </ul>
            </header>
            <div class='Del_list'>
                <ul>
                    <li v-for='(data, player) in $parent.$parent.chartList' 
                    :key='"del"+data.id'  v-if='player != "count"'
                    @click='imgStyle.indexOf(data.zn_member_id) >= 0 ? imgStyle.splice(imgStyle.indexOf(data.zn_member_id),1) : imgStyle.push(data.zn_member_id)' >

                        <img :src="data.zc_headimg" alt="">
                        <dl>
                            <dt>{{data.zn_member_name}}</dt>
                            <dd>分数 : <b>{{Number(data.zn_points).toFixed(2)}}</b></dd>
                        </dl>
                        <span>
                        <img v-show="imgStyle.indexOf(data.zn_member_id) >= 0" src="../../srcImg/room027.png" />
                        </span>
                    </li>
                </ul>
            </div>
        </mt-popup>
        
        <!-- 房间成员 -->
    	<header>
            <ul>
                <li>
                    <i @click='listOff = false'></i>
                </li>
                <li>房间成员({{$parent.$parent.lingth+1}}人)</li>
                <li style="visibility:hidden"><img src="../../srcImg/friend003.png" alt=""></li>
            </ul>
        </header>
        <div class='list'>
            <ul>
                <li :key='"fangzhu"' class='fangzhuClass'>
                    <div class="fzimg">
                        <img :src="fObj.fImg" alt="">
                        <img src="../../img/roomK02.png"/>
                    </div>
                    <p>- 房主 -</b></p>
                    <b>{{fObj.fName}}</b>
                    <span v-if='$store.state.user.friendId.indexOf(`${fObj.fid}`)<0 && fObj.fid != uid' @click='listAdd(fObj.fid)'><img src="../../srcImg/chart_List1.png" alt="">加友</span>
                </li>

                <li v-for='(data, key) in $parent.$parent.chartList' 
                :key='data.id' v-if='key != "count"' 
                @click='liaoT(2,data.zn_member_id)'
                :class='data.zn_member_id == cli ? "click" : ""' 
                @touchstart='cli = data.zn_member_id' >
            		<img :src="data.zc_headimg" alt="">
                    <b>{{data.zn_member_name}}</b>
                    <p v-show = 'fanzhu == 1'>分数 : <b>{{Number(data.zn_points).toFixed(2)}}</b></p>
                    <span v-if='$store.state.user.friendId.indexOf(`${data.zn_member_id}`)<0' v-show='uid_zj!=data.zn_member_id' @click='listAdd(data.zn_member_id)'><img src="../../srcImg/chart_List1.png" alt="">加友</span>
            	</li>

            </ul>
        </div>

        <footer>

            <mt-button v-show = 'fanzhu == 1' type="primary"  @click="dissolveRoom = true">
                    解散房间
            </mt-button>
            <mt-button v-show = 'fanzhu == 1' type="primary" @click='DeleteCY=true'>
                    删除成员
            </mt-button>
        	<mt-button v-show = 'fanzhu == 3 || fanzhu == 2' type="primary"  @click="putRoom = true">
                    退出房间
            </mt-button>
        </footer>
        <loading v-if='loading'></loading>
    </mt-popup>
</template>

<style lang='scss' scoped>

    @import '../../utils/baseVar.scss';

    .mut{
        width: 6.3rem;
        height: 4.212963rem;
        padding: 0.12963rem;
        box-sizing: border-box;
        background: $friend010 no-repeat;
        background-size: 6.3rem 4.212963rem;
        overflow: hidden;
        left: 41%;
        top: 50%;
        transform: translate(-50%,-50%);
        i{
            display: block;
            height: 0.712963rem;
            width: 0.712963rem;
            position: absolute;
            right: 0.037037rem;
            top: 0;
            transform: translate( 0rem, 0rem);
            background: $login008 no-repeat;
            background-size: 0.712963rem 0.712963rem;
        }
        p{
          height:1.666667rem;
          line-height: 0.5rem;
          font-size: 0.38rem;
          width: 4.351852rem;
          position: absolute;
          top: 44%;
          left: 50%;
          transform: translate(-50%,-50%);
          color: #F17956;
          display: block;
          word-wrap: break-word;
          word-break:break-all;
          white-space: pre-wrap;
          text-align: left;
        }
        button{
          width: 2.268519rem;
          height: 0.787037rem;
          @include border-radius((0.787037/2)+rem);

          font-size: 0.555556rem;
          margin-bottom: 0.462963rem;
          border: 0 none;
          color: white;

          background: $room025 no-repeat;
          background-size: 2.268519rem 0.787037rem;
          position: absolute;
            bottom: 0.3rem;
            left: 0.648148rem;
        }
        button:nth-of-type(2){
            background: $room024 no-repeat;
            background-size: 2.268519rem 0.787037rem;
            left: 3.36rem;
        }

    }

    #chartList {
        height: 100%;
        width: 100%;
        padding-right: 19%;
        background: rgba(0,0,0,0.4);
        box-sizing: border-box;

        @include flexbox();
        @include direction(column);
        header {
            @include box-sizing();
            background: #F7E8D3;
            color: #fff;
            ul {
                height: 0.796296rem;
                line-height: 0.796296rem;
                @include flexbox();
                @include justify-content(space-between);
                font-size:0.4rem;
                img{
                  position: relative;
                  right:0.092593rem;
                  top: 0.032rem;
                  width: 0.351852rem;
                  height: 0.351852rem;
                }
                li:nth-of-type(2){
                    text-align: center;
                }
                li:first-child {
                    position:relative;
                    &>i {
                        display: inline-block;
                        width: 0.537037rem;
                        height: 0.416667rem;
                        background: $friend002 no-repeat;
                        background-size: 0.537037rem 0.416667rem;
                        position: absolute;
                        top: 50%;
                        transform: translate(0, -50%);
                    }
                }
            }
        }
        
        .list{
            width: 100%;
            // height: 14.240741rem; border
            flex:1;
            overflow-y:auto;
            overflow-x:hidden;
            background: #F7E8D3;
            font-size:0.388889rem;
            .fangzhuClass{
                .fzimg{
                    position: relative;
                    border-radius: 0.092593rem;
                    overflow: hidden;
                    margin: 0.092593rem 0.185185rem 0 0.092593rem;
                    width: 1.407407rem;
                    height: 1.481481rem;
                    left: 0;
                    top: .09rem;
                    img{
                        margin: 0;
                        width: 100%;
                        height: 100%;
                    }
                    img:nth-of-type(2){
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: 50;
                    }
                }
                &>p{
                    color: #26C472;
                    bottom: 0;
                    display:inline-block;
                    position: absolute;
                    left: 50%;
                    top: 0rem;
                    transform: translate(-50%,4%);
                    font-size: 0.4rem;
                }
                &>b{
                    width: 48%;
                    display:inline-block;
                    position: relative;
                    font-size: 0.4rem;
                    line-height: 0.44rem;
                    bottom: 0.7rem;
                    left: 1.77rem;
                    font-weight: normal;
                    // display: block;
                    word-wrap: break-word;
                    word-break:break-all;
                    white-space: pre-wrap;
                }
            }
            li{
                height:1.759259rem;
                text-align:left;
                border-bottom: 0.018519rem solid #CCBDA8;
                position:relative;
                img{
                    margin:0.092593rem 0.185185rem 0 0.092593rem;
                    width:1.407407rem;
                    height:1.481481rem;
                }
                &>b{
                    width: 48%;
                    display:inline-block;
                    position: relative;
                    font-size: 0.4rem;
                    line-height: 0.44rem;
                    bottom: 0.6rem;
                    font-weight: normal;
                    // display: block;
                    word-wrap: break-word;
                    word-break:break-all;
                    white-space: pre-wrap;
                }
                p{
                    display:inline-block;
                    color:#757575;
                    position: absolute;
                    left: 1.8rem;
                    bottom: 0.2rem;
                    font-size: 0.30rem;

                    b{
                        color: #12AE0F;
                        font-weight: 500;
                    }
                }
                span{
                     width: 1.6rem;
                     height: 0.6rem;
                     border: 2px solid #0DBA09;
                     overflow: hidden;
                     @include border-radius(0.925926rem);
                     float: right;
                     position: absolute;
                     top: 50%;
                     right: 0.38rem;
                     -webkit-transform: translate(0,-50%);
                        -moz-transform: translate(0,-50%);
                         -ms-transform: translate(0,-50%);
                          -o-transform: translate(0,-50%);
                             transform: translate(0,-50%);
                     color: #13BD11;
                     font-size: 0.4rem;
                     line-height: 0.6rem;
                     padding-left: 0.68rem;
                     box-sizing: border-box;
                     img{
                        position: absolute;
                        display: inline-block;
                        // vertical-align: sub;
                        top: 50%;
                        left: 0.1rem;
                        transform: translate(0,-50%);
                        // margin-left:0.203704rem;
                        margin: 0;
                        width: 0.583333rem;
                        height:0.574074rem;
                     }
                }
            }
            li.click{
                background-color:#E3FFE3;
            }
            .clear{
                clear: both;
                height:0;
            }
        }
        .list::-webkit-scrollbar {
            display: none;
        } 

        footer{
            width: 100%;
            height: 1.21rem;
            position: relative;
            background: #F7E8D3;
            padding: 0 6%;
            box-sizing: border-box;

            button{
                width: 50%;
                height: 0.787037rem;
                font-size: 0px;
                border: none;

                position: relative;
                top: 50%;
                -webkit-transform: translate(0,-50%);
                   -moz-transform: translate(0,-50%);
                    -ms-transform: translate(0,-50%);
                     -o-transform: translate(0,-50%);
                        transform: translate(0,-50%);
            }
            button:nth-of-type(1){
                background: $room021 no-repeat;
                background-position: center;
                background-size:  2.555556rem 100%;
            }
            button:nth-of-type(2){
                background: $room022 no-repeat;
                background-position: center;
                background-size:  2.555556rem 100%;
            }
            button:nth-of-type(3){                
                background: $room023 no-repeat;
                background-position: center;
                background-size: 2.555556rem 100%;
            }
            button:active {
                    position: relative;
                    left: 0.018519rem;
                    bottom: -0.046296rem;
            }
        }
    }

    .tip{
      @extend .mut;
      p{
        color:red;
      }
    }

    .diss{
      @extend .mut;
    }

    // 删除成员
    .chartDelete {
        height: 100%;
        width: 100%;
        padding-right: 19%;
        background: rgba(0,0,0,0);
        box-sizing: border-box;
        
        header {
            height: 1.87037rem;
            padding: 1.018519rem 0.277778rem 0;
            @include box-sizing();
            background: #2F2E34;
            color: #fff;
            font-size:0.425926rem;
            ul {
                height: 0.796296rem;
                line-height: 0.796296rem;
                @include flexbox();
                @include justify-content(space-between);
                li:nth-of-type(2){
                    text-align: center;
                }
                li:nth-of-type(3) {
                    color: #248B18;
                    font-size: 0.36rem;
                }
            }
        }
        
        .Del_list{
            width: 100%;
            height:16.092593rem;
            overflow-y:auto;
            overflow-x:hidden;
            background:white;
            font-size:0.388889rem;
            background: #F7E8D3;
            li{

                height:1.759259rem;
                text-align: left;
                border-bottom: 1px solid #C8B9A4;
                img{
                    width:1.407407rem;
                    height:1.481481rem;
                    margin:0.092593rem 0.185185rem 0.0rem 0.092593rem;
                }
                dl{
                    display:inline-block;
                    line-height:0.555556rem;
                    background-position: center;
                    background-size:cover;
                    position:relative;
                    bottom:0.185185rem;
                    font-weight: normal;
                }
                dd{
                    color:#757575;
                    b{
                        color: #12AE0F;
                        font-weight: 500;
                    }
                }
                span{
                    width: 0.87963rem;
                    height: 0.925926rem;
                    float: right;
                    top: 0.43rem;
                    right: 0.5rem;

                    position: relative;
                    background: $room026 no-repeat;
                    background-size:  0.87963rem 0.925926rem;
                    img{
                        margin:0;
                        width: 100%;
                        height: 100%;
                    }
                }
                dd{
                    position: relative;
                    left: 0rem;
                    bottom: -0.05rem;
                }
                dd>b{
                    color: #26C472;
                    bottom: 0;
                    display:inline-block;
                    position: absolute;
                    left: 1.1rem;
                    bottom: 0rem;
                    transform: translate(0%,4%);
                    font-size: 0.4rem;
                }
                dt{
                    width: 3.6rem;
                    display:inline-block;
                    position: relative;
                    font-size: 0.4rem;
                    line-height: 0.44rem;
                    top: 0.05rem;
                    transform: translate(0,0%);
                    left: 0rem;
                    font-weight: normal;
                    // display: block;
                    word-wrap: break-word;
                    word-break:break-all;
                    white-space: pre-wrap;
                }
            }
            .clear{
                clear: both;
                height:0.0rem;
            }
        }
        .Del_list::-webkit-scrollbar {
            display: none;
        } 
    }
</style>

<script type="text/javascript">
    import Vue from 'vue';
    import http from '../../utils/httpClient.js';
    import router from '../../router/';
    import loading from '../loading/loading.vue';
    Vue.component('loading', loading)

    export default {
        data: function(){
            return {
                loading: false,   // loading
                listOff: false,   // 本页面主开关
                rid: 0,  // 房间id(不变)
                uid: localStorage.oxUid,
                list: this.$parent.$parent.chartList,   // 成员列表
                fanzhu: '',       // 3普通  1.2房主/庄
                uid_zj: localStorage.oxUid,// 自己id
                fObj: {},   // 总控数据

                chartDel: '', // 路由

                cli: -1,         // 选中
                imgStyle: [],    

                DeleteCY: false, // 删除成员
                putRoom: false,
                dissolveRoom: false,
                careTip : false,
            }
        },
        mounted: function(){},
        methods: {
            liaoT(n, id, fen){    // 点击聊天
                // console.log(n)
                this.$parent.$parent.$parent.$parent.$parent.chat(n, id)
            },
            delRoom () {        // 解散房间
                var self = this;
                http.post('/Room/dissolveRoom',{
                    roomid: this.rid,
                })
                .then(res => {
                    console.log(res)
                    if(res.status == 1){
                        this.dissolveRoom = false;
                        var obj = {
                            status: 3,
                            rid: this.rid,
                        }
                        goEasy.publish({  // 解散房间
                            channel:  'room_' + self.rid,
                            message: JSON.stringify(obj),
                            onSuccess:function(){
                                console.log('消息发送成功')
                                router.push({name: 'oxCrowd'});
                            },
                            onFailed: function(err){
                                console.log('消息发送错误，错误信息：'+err)
                            }
                        });
                    }
                })
            },
            go (n, id=[localStorage.oxUid]) {
                var self= this;
                var count = 0;
                // console.log(id)
                for(var i=0; i<id.length; i++){
                    http.post('/RoomJoin/closeRoom',{
                        id: id[i],
                        roomid: this.rid,
                        type: n,     // 1 退出房间 2 踢人
                    })
                    .then(res => {
                        console.log(res)
                        if(res.status==1 && n==1){
                            router.push({path: '/oxCrowd'});
                        }
                        count++;
                        // console.log(count)
                        if(id.length == count){
                            this.$parent.$parent.sl()
                        }
                    })
                }
                // $parent.$parent.list(this.rid)
            },
            listAdd(id){
                http.post('/MemberNotice/applyFriend',{
                    zn_mid      : localStorage.oxUid,
                    zc_content  : localStorage.oxName,
                    zn_applyid  : id,
                }).then(res=>{
                    console.log(res);
                    this.$parent.$parent.$parent.$parent.careTip_TEXT = res.msg;    // 错误提示
                    this.$parent.$parent.$parent.$parent.careTip = true;      // 错误提示
                })
            },
            chartDelete () {
                var self = this;
                router.push({path: self.chartDel});
            },
            
        }
    }
</script>