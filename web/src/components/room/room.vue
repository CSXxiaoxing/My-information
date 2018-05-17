<template> 
    <keep-alive>
    <!-- zn_member_id -->
    <div id='room'>
        <audio src="src/Music/fapai.mp3" autoplay v-if='music==$store.state.Music.musi' loop></audio>
        
        <mt-popup 
            v-model="careTip"
            popup-transition="popup-fade"
            class="care" >
            <span>通知 <i @click="careTip = false">×</i></span>
            <p>{{errorTips}}</p>
            <mt-button @click="careTip = false"> 
            </mt-button>
        </mt-popup >
        
        <mt-popup 
            v-model="cuopai"
            popup-transition="popup-fade"
            class="cuopai" >
            <div>
                <div class='fourCard'>
                    <img v-if='logic.oxImg[ka.index*5+idx-1]!=undefined' v-for='idx in 4' :src="`src/png/card/${logic.oxImg[ka.index*5+idx-1]}.png`"/>
                    <!-- <img v-for='idx in 4' :src="`src/png/card/a8.png`"/> -->
                </div>
                <div class='cuopaiCard' @touchstart='control(3)' @touchmove='control(4)' @touchend='control(5)' :style='ka.heziType' >
                    <img src="src/png/cardPlus/bei.png" alt="" />
                    <img v-if='logic.oxImg[ka.index*5+4]!=undefined' :src="`src/png/cardPlus/${logic.oxImg[ka.index*5+4]}.png`" alt="" :style='ka.img02'/>
                </div>
            </div>
        </mt-popup >
        <!-- 头部 -->
        <header>
            <ul>
                <li>
                    <i><a  @click='exit'></a></i>
                    <span>第<i>{{user.ju}}</i>局</span>
                    <p :class='user.initType >= 1 ? "open" : "" '>
                        <span>{{user.initType >= 1 ?  " 游 戏 " : " 暂 停 "}}</span>

                        <i v-show='user.type == 1' @click='user.ON_OFF = !user.ON_OFF'>
                            <b></b>
                        </i>
                        <mt-popup
                            v-model="user.ON_OFF"
                            :modal='false'
                            popup-transition="popup-fade"
                            class='gameStyle'>
                                <span @click='gameStyle(1),user.ON_OFF=false' >游 戏</span>
                                <span @click='gameStyle(2),user.ON_OFF=false' >暂 停</span>
                                <i class='triangle-up'></i>
                        </mt-popup>
                    </p>
                </li>
                <li>
                    <span @click='to(2)'><i></i>开奖记录</span>
                    <span @click='to(7)'><i></i><a>流水报表</a></span>
                </li>
            </ul>

            <dl>
                <!-- 个人头像 -->
                <dt @click='$refs.onidMessageChild.idMessage=true' >
                    <img :src='$store.state.user.userImg' />
                </dt>
                <!-- 房主 -->
                <dd>
                    {{user.type == 1 ? "房总分：": "分数："}}
                    <span>{{user.type == 1 ? (Number(user.allFen)+Number(user.oxWater)).toFixed(2) : user.myFen}}</span>
                     &nbsp;
                    房号：<span>{{user.number}}</span>
                </dd>
                
                <dd><i v-show='user.type == 1'  @click='varRoom'></i></dd>

                <dd  @click="$refs.ontoShareChild.toShare=true,$refs.ontoShareChild.rid=user.rid"></dd>

                <dd>
                    <i></i>
                    <mt-swipe :show-indicators="false" :speed="800" :auto="5000">
                        <mt-swipe-item v-for='notices in $store.state.oxCrowd.notice'>
                            <span>{{notices}}</span>
                        </mt-swipe-item>
                        <mt-swipe-item v-for='notices in $store.state.oxCrowd.notice'>
                            <span>{{notices}}</span>
                        </mt-swipe-item>
                    </mt-swipe>
                </dd>
            </dl>
        </header>
        <!-- 游戏主体 -->
        <div class='roomMain'>
            <!-- 左 -->
            <div class='left'>
                <div class="li" :key='dataList.z.name' @click='user.type==1 ? $refs.onapplyOnChild.setOwner = true:0' >
                    <div v-show='dataList.z.dian == undefined' class='konwei'>
                    </div>

                    <div v-if='Number(dataList.z.uid) >= 0' :class="user.type==1&&dataList.z.dian<main.minFen ? 'liRed':''">
                        <img src="../../srcImg/room_left02.png" />
                        <img src="../../srcImg/room_left01.png" />
                        <img class='leftZhuan' src="../../srcImg/room002.png" />
                        
                        <div class='leftImg'>
                            <img :src="dataList.z.img" alt="" />
                            <span>{{dataList.z.dian}}</span>

                            <p v-if='user.initType==7' :class='chenji.zfen > 0 ? "yin":"shu"' >{{chenji.zfen < 0 ? chenji.zfen : "+"+chenji.zfen}}</p>
                        </div>
                    </div>
                    <p v-show='Number(dataList.z.uid) >= 0'>{{dataList.z.name}}</p>
                </div>
                <ul>
                    <li  
                    v-for = '(data, index) in dataList.dd' 
                    @click='chat(2, data.uid, data.dian)' :key='data.uid+data.name'>
                        <div>
                            <img src="../../srcImg/roomK03.png" alt="" />
                            <img :src="'src/png/roomPage0'+(index <= 1 ? index+2:4)+'.png'" alt="" />
                            <span>{{index+2}}</span>
                            <div class='leftImg'>
                                <img v-if='data.uid!=undefined' :src="data.img" alt="" />
                                <span>{{data.dian}}</span>
                            </div>
                        </div>
                        <p>{{data.name}}</p>
                    </li>

                    <li v-for = 'num in (4-dataList.dd.length >= 0 ? 4-dataList.dd.length : 0)'>
                        <div class='konwei'>
                        </div>
                    </li>

                </ul>
            </div>
            <!-- 中间 -->
            <div class='center'>
                <!-- 移动用 -->
                <img src="src/png/card/bei.png" 
                v-for='(num,idx) in main.cardNum*5' :class='[("static_K"),(user.numCard == 7 ? "s":"")]' 
                :style='"visibility:hidden;"+move.trans[idx]' />

                <img v-for='(a,idx) in move.imgNum'  :src='move.srcImg[idx]' 
                :class='[(move.bounce[idx]!=undefined ? "bounce":""),("imgOne")]'  
                :style='"visibility:hidden;position:fixed;z-index:-1;width:1.2rem;height:1.2rem;"+chouma.LandR+move.srcImgStyle[idx]' v-show='move.srcImg[idx]!=""'/>

                <div :class='user.numCard == 7 ? "center_top_7" :"center_top"' class="center_top">
                    <h1>{{user.initTxt[user.initType]}}
                        <span v-show='user.initType >= 2&&user.initType!=4'>
                        {{time.time_x >= 60 ? "0"+Math.floor(time.time_x/60)+":"+time.time_x%60 : "00:"+(time.time_x >= 10 ? time.time_x : "0"+time.time_x)}}秒
                        </span>
                    </h1>
                    <p>还可下注：{{main.minFen_x}}</p>
                </div>

                <ul :class='user.numCard == 7 ? "ka7" :""' id='room_UL'>
                    <li 
                    v-for='(data,index) in user.numCard'
                    style='z-index:111'
                    :class='[(index==logic.z_index &&user.initType==5 ? "hover_no":""),(chouma.liCss[index]>=1 || move.liType ==index ?"hover":"")]'>
                    <!-- li背景 -->
                    <div class='libj'  @click='control(2,index)'></div>
                    <!-- 牌 -->
                    <div class='pai'>
                        <img 
                        v-if='logic.oxImg[index*5+ix]!=undefined'
                        v-for='(da,ix) in 5'
                        :src="`src/png/card/${logic.oxImg[index*5+ix]}.png`" 
                        :style='"visibility:hidden;"+logic.imgStyle' />
                        <!-- <img src="src/png/card/a1.png" v-for='(da,ix) in 5' alt="" /> -->
                        
                        <span v-if='user.initType==7&&logic.oxji[index]!=undefined'>
                            <img :src="`src/png/${logic.oxji[index]}.png`" />
                        </span>
                    </div>
                    
                    <!-- 筹码以及分数 -->
                    <div class="chou_fen">
                        <div class="not_zhuang" v-if='main.z_type==1&&index!=logic.z_index'>
                            <img src="../../srcImg/cc00.png" />
                            <p>{{logic.liAll_F[index]}}</p>
                            <p>{{logic.liMy_All[index]}}</p>
                        </div>
                        <img src="../../srcImg/room002.png" v-if='main.z_type==1&&index==logic.z_index'/>
                        <img src="../../srcImg/cuopai.png"
                         v-if='logic.liMy_All[index]>0&&user.initType==6&&user.type!=1' @click='cuopai=true,ka.index=index,ka.img02=""' class='cuopai_anniu'/>

                         <p v-if='user.initType==7 && chenji.myfen[index]!=0' :class='chenji.myfen[index] > 0 ? "yin":"shu"' >{{chenji.myfen[index] < 0 ? chenji.myfen[index] : "+"+chenji.myfen[index]}}</p>

                    </div>
                    </li>
                </ul>
                <p :class='user.initType==7?"jieguo":""' >{{chenji.allfen < 0 ? chenji.allfen : "+"+chenji.allfen}}</p>
                <p :class='user.initType==7?"jieguo":""' >{{chenji.allfen < 0 ? chenji.allfen : "+"+chenji.allfen}}</p>
            </div>
            <!-- 右 -->
            <div class='right'>
                <span>
                    <img src="../../srcImg/room009.png" @click='varRoom(0)'  v-show='user.type != 1' />
                    <img src="../../srcImg/room010.png"  @click='$store.state.Music.autoplay = !$store.state.Music.autoplay'/>
                </span>

                <ul>
                    <!-- v-if='dataList.px[0]!=undefined' -->
                    <li
                    v-for='PTW in dataList.pt' 
                    @click='chat(2, PTW.uid, PTW.dian)' 
                    :key='PTW.uid'> 
                        
                        <div>
                            <img src="../../srcImg/roomK03.png" alt="" />
                            
                            <div class='leftImg'>
                                <img :src="PTW.img" />
                                <span>{{PTW.dian}}</span>
                            </div>
                        </div>
                        <p>{{PTW.name}}</p>
                    </li>

                    <li v-for='a in (5-dataList.pt.length >= 0 ? 5-dataList.pt.length : 0)'>
                        <div class='konwei'></div>
                    </li>

                </ul>
            </div>
        </div>

        <div class="weibu">
            <!-- 控制器 -->
            <div class='control'>
                <!-- 上下庄 -->
                <span @click="applyOn" :class='[(user.type == 1 ? "zhuan" : ""),(user.Lding == 1 && user.type != 2 ? "win" : ""),(user.type == 2 ? "zhuan2" : ""),("control_left")]'>
                    {{user.type == 1 ? "申请上庄" : ""}}
                </span>
                <!-- 筹码 -->
                <span class='control_center' @touchend='move.liType = -1'>
                    <img :src="`src/png/c${main.minFen_x>=1 ? 'c' : 'h'}01.png`" 
                    :class='chouma.one==1?"tuqi":""' @click='select(1,1)'
                     :fen='"1"'/>
                     <img :src="`src/png/c${main.minFen_x>=5 ? 'c' : 'h'}02.png`" 
                    :class='chouma.one==2?"tuqi":""' @click='select(2,5)'
                     :fen='"5"'/>
                     <img :src="`src/png/c${main.minFen_x>=10 ? 'c' : 'h'}03.png`" 
                    :class='chouma.one==3?"tuqi":""' @click='select(3,10)'
                     :fen='"10"'/>
                     <img :src="`src/png/c${main.minFen_x>=50 ? 'c' : 'h'}04.png`" 
                    :class='chouma.one==4?"tuqi":""' @click='select(4,50)'
                     :fen='"10"'/>
                     <img :src="`src/png/c${main.minFen_x>=100 ? 'c' : 'h'}05.png`" 
                    :class='chouma.one==5?"tuqi":""' @click='select(5,100)'
                     :fen='"10"'/>
                </span>
                <span class='control_right'>
                    <img :src="`src/png/room006${main.bei? '':'6'}.png`" alt="" @click='bei_KZ(1)'/>
                    <img :src="`src/png/room007${main.bei? '':'7'}.png`" alt="" @click='bei_KZ(0)'/>
                </span>
            </div>
            <!-- 尾部 -->
            <footer @click='testtt'>
                <ul>
                    <li @click='f_HY'>
                        好友
                        <span class='dot' v-if='$store.state.system.H_All>0'>{{$store.state.system.H_All}}</span>
                    </li>
                    <li @click='chat(3)'>
                        聊天室
                        <span class='dot' v-show='$store.state.system.Q_Num>0'>{{$store.state.system.Q_Num}}</span>
                    </li>
                    <li v-show='user.type==3||user.type==2' @click='chat(2,user.fid),$store.state.system.t=1'>
                        联系房主
                    </li>
                    <li class='roomScore' v-show='user.type == 1' 
                        @click="to(3)">
                        <b>{{(user.oxWater).toFixed(2)}}</b>
                        <b>奖金分数</b>
                    </li>
                </ul>
            </footer>
        </div>
        
        <toShare ref="ontoShareChild" :share='"room"'></toShare>
        <varRoom ref="onvarRoomChild" ></varRoom>
        <prize ref="onprizeChild" ></prize>
        <keep-alive>
            <applyOn ref="onapplyOnChild" ></applyOn>
        </keep-alive>
        <idMessage ref="onidMessageChild" ></idMessage>
        <singleBoard ref="onsingleBoardChild"></singleBoard>
        <friendVIP ref="onfriendVIPChild"></friendVIP>
        <waterReport ref="onWater"></waterReport>
        <loading v-if='loading'></loading>
    </div>
    </keep-alive>
</template>

<script type="text/javascript">
    import './room.scss';
    import roomJS from './room.js';
    import Vue from 'vue';
    import router from '../../router/';
    import http from '../../utils/httpClient.js';
    import { Swipe, SwipeItem } from 'mint-ui';
    // 组件
    import toShare from '../../module/shareModule/toShare.vue'; // 邀请
    Vue.component('toShare', toShare)
    import setRoom from '../../module/homeModule/varRoom.vue';  // 修改房间设置
    Vue.component('varRoom', setRoom)
    import idMessage from '../../module/homeModule/idMessage.vue';  // 个人参数
    Vue.component('idMessage', idMessage)

    import prize from '../../module/roomModule/openRecords.vue';
    import applyOn from '../../module/roomModule/applyOn.vue';
    import singleBoard from '../../module/roomModule/singleBoard.vue';

    import loading from '../loading/loading.vue';   // loading
    Vue.component('loading', loading)
    import friendVIP from '../friend/friend.vue'; // 原好友
    Vue.component('friendVIP', friendVIP)
    import waterReport from './waterReport.vue';  // 原流水报表
    Vue.component('waterReport', waterReport)

    Vue.component('prize', prize)   // 开奖记录 goEasy
    Vue.component('applyOn', applyOn)
    Vue.component('singleBoard', singleBoard)

    // 游戏中定时器(timer-N)
    let pageTimer = {};
    export default {
        data: function(){
            return {
                loading: false,     // loading
                errorTips: '',      // 提示内容
                careTip : false,    // 提示窗
                cuopai: false,      // 搓牌
                music: false,
                test: 0,    // 测试控制
                chouma: {   // 筹码控制
                    one: 0,
                    LandR: 'left:0;top:0;',
                    liCss: [0,0,0,0,0,0,0],  // 所压li显示高亮
                },
                user : {     // 房间初始化数据
                    rid: 0,         // 房间id
                    fid: 0,         // 房主id
                    fName: '',         // 房主名字
                    fImg: '',          // 房主头像
                    qid: 0,         // 群聊id
                    uid: localStorage.oxUid, // 自己的id
                    numCard: 0,     // 几牌
                    ON_OFF: false,  // 游戏开始按钮是否显示
                    gametype: 0,    // 0暂停，1开始
                    number: 0,      // 房间号码
                    type: 0,        // 当前房间状态 1-房主 2-庄 3-普通玩家
                    Lding: 0,       // 是否在等待上庄
                    auto: true,    // true自动轮庄- -false指定庄家
                    allFen: 0,      // 房间总分
                    myFen: 0,       // 自己的分
                    initTxt: ['游戏暂未开始', '正在初始化游戏资源','准备开始：', '随机庄位：', '发牌中', '可押注时间：', '开牌倒计时：', '开牌结果'],
                    initType: 0,    // 游戏阶段
                    ju: 0,          // 游戏局数
                    oxWater: 0,     // 抽水
                    xiaZZZ: 0,      // 1-> 一局结束后下庄 0-> 不做任何操作
                    timeOrDay: 0,   
                    lun: 0,         // 轮庄计算
                },
                lunZ : {
                    type : 1,  // 0 是锁定  1 是轮庄
                    num  : 5,    // 轮庄的次数
                },
                renAll: [],     // 所有在房间人员uid
                dataList : {        // 房间内玩家数据
                    z : {},           // 庄的数据
                    pt: [],           // 普通玩家
                    dd: [],           // 等待上庄

                    dict:{},          // 字典--匹配个人头像
                },
                main : {        // 主体游戏流程代码
                    cardNum : 5,        // 扑克牌数
                    minFen  : 0,        // 最低上庄分数
                    minFen_j: 0,        // 最低上庄分数_计算用
                    minFen_x: 0,        // 最低上庄分数_显示用
                    maxBei  : 0,        // 单局最大倍数
                    beilv   : [],       // 倍率
                    bidui   : 0,        // 比什么
                    minYa   : 0,        // 下注范围
                    maxYa   : 0,        // 下注范围
                    bei     : 0,        // 选择有倍无倍
                    z_type  : 0,        // 庄以及筹码的显示
                    xianshi : null,       // 结算显示用数据
                },
                logic : {       // 主体逻辑代码
                    oxImg  : [],         // 牛牛路径
                    z_index: -1,         // 庄所在的位置    
                    oxji   : [],         // 牛几

                    imgStyle: '',        // 卡牌是否显示
                    sy     : [],         // 输赢判断
                    status : 0,          // 游戏当前状态
                    liAll_F: [0,0,0,0,0,0,0],         // 当前总压分
                    liMy_All: [0,0,0,0,0,0,0],       // 当前个人压分_所有的压分
                    liMy_Ff: [0,0,0,0,0,0,0],         // 当前个人压分_翻倍
                    liMy_Fn: [0,0,0,0,0,0,0],         // 当前个人压分_不翻倍
                },
                time : {            // 游戏时间控制
                    time_x  : 0,    // 显示用—时间
                    downTime: 10,   // 倒计时时间
                    random  : 3,    // 倒计时
                    speed   : 80,   // 随机速度
                    $Time: 0,       // 可下注时间
                    $openCard: 10,  // 开牌倒计时
                    $water: 5,      // 流水报表时间
                    $esc: 10,       // 10下盘等待
                    InTime: 1000,   // 定时器速度总开关
                },
                move : {        // 卡牌动效控制
                    trans: [],      // 背面移动位置
                    bei_s : 4,    // 背面移动速度
                    liType: -1,     // 手指移动到哪个li上面
                    srcImgStyle: [],// xy位置
                    srcImg: [],     // 移动筹码的img
                    
                    bounce: [],     // 弹跳c3
                    imgNum: 1,  // 移动用img的数量
                },
                ka:{    // 搓牌临时
                    initY: 0,   // 开始的y
                    cardH: 0,   // 牌的高度
                    heziType:'',// 盒子的style
                    img02: '',  // img的高度
                    type: 0,    // 阶段判断
                    index: 0,   // 所点开的卡牌所在组
                },
                chenji:{    // 分数成绩
                    allfen: 0,  // 单局总分数波动
                    zfen: 0,    // 庄的分数波动
                    myfen: [0,0,0,0,0,0,0], // 个人押注输赢总分
                },
                roomData:{},// 房间初始数据

                message : this.$store.state.placard.message,
            }
        },
        mounted: function(){
            this.$store.state.system.Q_Num=0;   // 清除房间群聊信息条数
            let self = this ;
            this.$store.state.oxCrowd.z = {};   // 清除初始值
            self.newData();
        },
        methods: {
            f_HY(){ // 好友
                this.$refs.onfriendVIPChild.friend_VIP=true;
                this.$refs.onfriendVIPChild.fir();
            },
            select(n,p){
                if(this.main.minFen_x>=p){
                    this.control(1,n)
                }
            },
            control(n,idx){
                switch (n){
                    // 控制器部分
                    case 1 : roomJS.jetton(idx,this);  // 选择什么筹码
                    break;
                    case 2 : roomJS.yazhu(idx,this,http);  // 押注
                    break;
                    case 3 : roomJS.cuoinit(this);  // 搓牌开始
                    break;
                    case 4 : roomJS.cuoka(this);    // 搓牌实现
                    break;
                    case 5 :  roomJS.cuoEnd(this);  // 搓牌结束
                    break;
                }
            },
            testtt(){},
            bei_KZ(n){   // 倍数控制
                this.main.bei=n;
                if(n==0){   // 无倍
                    this.main.minFen_x = this.main.minFen_j;
                } else if(n==1){
                    this.main.minFen_x = Math.floor(this.main.minFen_j/this.main.maxBei);
                }
            },
            chat(n,sheId,fen){  // n=个人状态,sheId=要联系人的id  点击聊天
                var obj = {
                    rank : this.user.type,      // 在房间的状态
                    sheId,                      // 联系人id
                    qid  : this.user.qid,       // 群id
                    rid  : this.user.rid,       // 房间id
                    rnum : this.user.number,    // 房间Num
                    type : n,                   // 对应聊天状态
                    fFen : fen,                 // 联系人分数
                    fid  : this.user.fid,       // 房主id
                    fName: this.user.fName,         // 房主名字
                    fImg : this.user.fImg,          // 房主头像
                }
                if(sheId==localStorage.oxUid){
                    return false;
                }
                if(n==1){} // 选择人聊天
                else if(n==2){} // 加减分
                else if(n==3) { // 群聊
                    // 清除未读条数显示
                    this.$store.state.system.Q_Num=0;
                }
                this.$refs.onfriendVIPChild.friend_VIP=true;
                this.$refs.onfriendVIPChild.inlet(obj)
            },
            goeasy(goEasy_ID){
                var self = this;
                goEasy.subscribe({
                    channel: 'room_' + goEasy_ID,
                    onMessage: function(message){
                        // console.log('接收到消息:'+JSON.parse(message.content))
                        console.log(JSON.parse(message.content))
                        if(location.hash.slice(-6)!=self.user.number){
                            return false;
                        }
                        var data = JSON.parse(message.content);
                        var status = data.status;
                        var type = data.type;
                        switch(status){
                        case 2 :                        // 房主暂停游戏
                            break;
                        case 3 :                        // 通知房间已解散
                            alert('房间:'+self.user.number+',已被房主解散')
                            router.push({name: 'oxCrowd'});
                            break;
                        case 4 :                        // 更新房员列表
                            break;
                        case 5 :                        // 发牌
                            // console.log(data)
                            self.remove();// 游戏数据清除
                            self.user.ju = data.num; // 游戏局数
                            self.user.xiaZZZ = 0;
                            self.logic={
                                oxImg  : data.card,         // 牛牛路径
                                z_index: data.banker,        // 庄所在的位置    
                                oxji   : data.cow,         // 牛几

                                imgStyle: '',        // 卡牌是否显示
                                sy     : [],         // 输赢判断
                                status : 0,          // 游戏当前状态
                                liAll_F: [0,0,0,0,0,0,0],         // 当前总压分
                                liMy_All: [0,0,0,0,0,0,0],       // 当前个人压分_所有的压分
                                liMy_Ff: [0,0,0,0,0,0,0],         // 当前个人压分_翻倍
                                liMy_Fn: [0,0,0,0,0,0,0],         // 当前个人压分_不翻倍
                            }
                            self.K ();  // 开始游戏
                            break;
                        case 6 :                            // 当局结果
                            console.log(data)
                            self.chenji={    // 分数成绩
                                allfen: 0,  // 单局总分数波动
                                zfen: 0,    // 庄的分数波动
                                myfen: [0,0,0,0,0,0,0], // 个人押注输赢总分
                            }
                            self.main.xianshi = null;
                            self.main.xianshi = data.card;
                            // console.log(self.logic.z_index)
                            // console.log(self.chenji)
                            break;
                        case 7 : 
                            self.lunzhun();
                            break;
                        }



                        switch(type){
                        case 9: // 压分
                            console.log(data)
                            var y_f = {
                                uid : self.user.uid,     // 自己的id
                                few : Number(data.few),  // 所压的组
                                fen : Number(data.score),// 所压的分数
                                bei : Number(data.is_rate),// 最大倍数
                            }
                            self.logic.liAll_F[y_f.few]+=y_f.fen;   // 分组总压分
                            data.uid==y_f.uid ? self.user.myFen-=y_f.fen:0; // 自己压的分
                            if(y_f.bei>1){
                                self.main.minFen_j-=(y_f.fen*y_f.bei);
                                if(data.uid==y_f.uid || self.user.type==2 || self.user.type==1){
                                    self.logic.liMy_Ff[y_f.few]+=y_f.fen;
                                    self.logic.liMy_All[y_f.few]+=y_f.fen;
                                }
                            }else{
                                self.main.minFen_j-=y_f.fen;
                                if(data.uid==y_f.uid || self.user.type==2 || self.user.type==1){
                                    self.logic.liMy_Fn[y_f.few]+=y_f.fen;
                                    self.logic.liMy_All[y_f.few]+=y_f.fen;
                                }
                            }
                            self.bei_KZ(self.main.bei);
                            break;

                        // 数据更新
                        case 1:// 通知有人加入
                            console.log(self.renAll.indexOf(data.zn_member_id))
                            if(self.renAll.indexOf(data.zn_member_id) < 0){
                                self.renAll.push(data.zn_member_id)
                            } else {
                                return false;
                            }
                            if(data.zn_member_id == localStorage.oxUid){
                                return false;
                            }
                            console.log(data)
                            var datum = {
                                img : data.src,
                                name: data.nikename,
                                dian: data.zn_points,
                                uid : data.zn_member_id,
                            }
                            self.dataList.pt.push(datum) // 添加加入成员
                        break;
                        case 5:// 通知有人分数变化--完成
                            if(data.data.zn_makers == 1){   // 庄
                                self.dataList.z.dian = data.data.zn_points;
                            } else if(data.data.zn_maker_status == 1){ // 等待上庄
                                for(var i=0; i<self.dataList.dd.length; i++){
                                    if(self.dataList.dd[i].zn_member_id == data.uid){
                                        self.dataList.dd[i].zn_points = data.data.zn_points;
                                    }
                                }
                            } else {
                                for(var i=0; i<self.dataList.pt.length; i++){
                                    if(self.dataList.pt[i].uid == data.uid){
                                        self.dataList.pt[i].dian = Number(data.data.zn_points);
                                    }
                                }
                            }
                        break;
                        case 60:// 退出房间
                            var esc_i = self.renAll.indexOf(data.uid);
                            self.renAll.splice(esc_i, 1)
                            var pt = self.dataList.pt; // 删减成员
                            for(var i=0; i<pt.length; i++){
                                if(pt[i].uid == data.uid){
                                    pt.splice(i, 1);
                                    return false;
                                }
                            }
                        break;
                        case 7:// 通知有人成为庄家
                            for(var i=0; i<self.dataList.dd.length; i++){
                                var dd = self.dataList.dd;
                                console.log(dd)
                                if(data.id == self.user.uid){
                                    self.user.type = 2;
                                }
                                if(dd[i].uid == data.id){
                                    self.dataList.z = dd[i];
                                    self.dataList.dd.splice(i,1);
                                }
                            }
                        break;
                        case 8:// 通知有人申请上庄
                            for(var i=0; i<self.dataList.pt.length; i++){
                                var pt = self.dataList.pt;
                                if(data.id == self.user.uid){
                                    self.user.Lding = 1;
                                }
                                if(pt[i].uid == data.id){
                                    self.dataList.dd.push(pt[i])
                                    pt.splice(i, 1);
                                }
                            }
                            if(self.user.uid == data.id || self.user.type == 1){
                                if(self.dataList.z.dian==undefined && self.user.auto){
                                    http.post( '/RoomJoin/setMakers', {
                                            roomid: self.user.rid,
                                            type: 1,
                                            id: data.id,
                                            num: self.user.ju,
                                        })
                                    .then(res => {
                                        if(res.status == 1){
                                            self.user.lun = self.lunZ.num+Number(self.user.ju)-1;
                                            // self.dataList.dd.splice(0,1);
                                        }
                                    })
                                }
                            }
                        break;
                        case 80: // 下庄
                            if(data.is_boss==1){
                                self.dataList.pt.push(self.dataList.z);
                                self.dataList.z = {};
                                if(data.id == self.user.uid){
                                    self.user.type = 3;
                                    self.user.Lding = 0;
                                }
                                if((self.user.uid == data.id || self.user.type == 1) && self.dataList.dd[0]!=undefined){
                                    http.post( '/RoomJoin/setMakers', {
                                            roomid: self.user.rid,
                                            type: 1,
                                            id: self.dataList.dd[0].uid,
                                            num: self.user.ju,
                                        })
                                    .then(res => {
                                        if(res.status == 1){
                                            self.user.lun = self.lunZ.num+Number(self.user.ju)-1;
                                            // self.dataList.dd.splice(0,1);
                                        }
                                    })
                                }
                            } else {
                                for(var i=0; i<self.dataList.dd.length; i++){
                                    var dd = self.dataList.dd;
                                    if(data.id == self.user.uid){
                                        self.user.type = 3;
                                        self.user.Lding = 0;
                                    }
                                    if(dd[i].uid == data.id){
                                        self.dataList.pt.push(dd[i]);
                                        self.dataList.dd.splice(i,1);
                                    }
                                }
                                
                            }
                            // self.list(); // 更新列表
                        break;
                        case 11:// 重新开局
                            self.list(); // 更新列表
                        break;

                        case 14: // 房主暂停游戏
                            self.user.initType=0;
                            break;
                        case 16: // 更新房间信息
                            self.newData()
                            break;
                        case 15:                            // 中止下注
                            break;
                        
                        }
                        
                    }
                }); // 注册goeasy 
            },
            newData: function(){    // 初始化数据
                var main = this.main;   // 游戏主体数据
                var user = this.user;   // 用户初始数据
                var self = this;
                // this.$store.dispatch('webIM')       // 聊天配置
                http.post('/Room/getRooms',{
                    number: self.$route.params.id,
                })
                .then(res => {
                    if(res.status == 1){
                        console.log(res)
                        var data = res.data;
                        this.roomData = data; // 初始数据

                        user.rid = data.id;  // 房间id
                        user.fid= data.zn_member_id;    // 房主id
                        user.fName= data.zc_nickname;     // 房主名字
                        user.fImg = res.data.img_url;   // 房主头像
                        user.qid= data.zn_chatid; // 群聊id
                        user.number = data.zc_number;  // 房间Num
                        user.numCard= data.zn_play_type==1?5:7;
                        user.timeOrDay= data.zn_pay_type;
                        data.zn_member_id == localStorage.oxUid ? // 是否庄
                        user.type=1:user.type=3;
                        main.cardNum = data.zn_play_type == 1 ? 5 : 7;  // 几牌
                        main.minFen = Number(data.zn_min_score);  // 最低上庄分数
                        main.minFen_x = Number(data.zn_min_score);  // 最低上庄分数_显示用
                        main.minFen_j = Number(data.zn_min_score);  // 最低上庄分数_计算用
                        main.maxBei = JSON.parse(data.zc_rate)[11];  // 最大倍数     
                        main.beilv = JSON.parse(data.zc_rate) // 倍率
                        main.bidui = JSON.parse(data.zc_rate)[12];  // 比什么     
                        main.minYa = data.zn_bet_between_s;  // 押注范围—最小
                        main.maxYa = data.zn_bet_between_e;  // 押注范围—最大
                        main.water = data.zn_extract;  // 抽水百分比 
                        this.time.$Time = data.zn_bet_time;      // 可押注时间 

                        // self.gameResult() // 查询游戏局数
                        this.goeasy(data.id)    // 注册goEasy
                        this.list() // 获取字典以及数据
                        this.lunzhun() // 获取轮庄

                        // this.$store.dispatch('webIM')       // 聊天配置
                        // this.$store.dispatch('dl')         // 聊天登录
                        var addGroupMembers = function () {     // 加入群聊
                            var option3 = {
                                list: ['hz_niuniu_'+localStorage.oxUid],
                                roomId: user.qid,
                            };
                            conn.addGroupMembers(option3);
                        };
                        addGroupMembers()   // 群聊


                        http.post('/Card/getWaterTotal',{ // toFixed
                            room_id: this.user.rid,
                        }).then(res=>{
                            if(res.status==1){
                                var num = Number(res.data);
                                
                                // num = num.toFixed(2);
                                this.user.oxWater = num;
                                
                            }
                        })

                        var addGroupMembers = function () {     // 加入群聊
                            var option3 = {
                                list: ['hz_niuniu_'+localStorage.oxUid],
                                roomId: data.zn_chatid,
                            };
                            conn.addGroupMembers(option3);
                        };
                        addGroupMembers()   // 群聊

                    }
                })
            },
            lunzhun(){  // 轮庄
                http.post('/Room/maker_num',{ // zn_maker_status
                    room_id: this.user.rid,
                }).then(res=>{
                    this.lunZ.type = res.status;
                    if(res.status==1){  // 轮庄
                        this.lunZ.num = Number(res.data);
                        this.user.lun = this.lunZ.num+Number(this.user.ju)-1;
                    }
                })
            },
            list () {           // 玩家列表
                this.dataList = {        // 房间内玩家数据
                    z : {},           // 庄的数据
                    pt: [],           // 普通玩家
                    dd: [],           // 等待上庄
                    dict:{},          // 字典--匹配
                }
                var self = this;
                var dict = this.dataList.dict;  // 字典
                this.user.allFen = 0;
                var z_type = 0;
                http.post('/RoomJoin/getJoinMessage',{ // zn_maker_status
                    roomid: this.user.rid,
                })
                .then(res=>{
                    if(res.status==1){
                        var data = res.msg;
                        console.log(data)
                        var pt_count = []; // 辅助pt
                        for(var i=0; i<data.length; i++){
                            if(this.renAll.indexOf(data[i].zn_member_id) == -1){
                                this.renAll.push(data[i].zn_member_id)
                            }
                            
                            var datum = {
                                img : data[i].zc_headimg,
                                // name: data[i].zn_member_name,
                                name: data[i].zc_nickname,
                                dian: data[i].zn_points,
                                uid : data[i].zn_member_id,
                            }
                            self.user.allFen+=Number(datum.dian);// 房总分
                            if(datum.uid==localStorage.oxUid){
                                self.user.myFen = Number(datum.dian)
                            }
                            // dict[data[i].zn_member_id]=datum.img;
                            this.$store.state.user.dict[this.user.fid]=this.user.fImg;// 房主
                            this.$store.state.user.dict[data[i].zn_member_id] = datum.img; 
                            
                            if(data[i].zl_visible == 1){
                            if(data[i].zn_makers==1){ // 庄
                                if(data[i].zn_member_id==this.user.uid){
                                    this.user.type = 2;
                                }
                                self.dataList.z=datum;
                            } 
                            else if(data[i].zn_maker_status==1){ // 庄申请列表
                                if(data[i].zn_member_id==this.user.uid){
                                    this.user.Lding = 1;
                                }
                            } 
                            else {
                                if(data[i].zn_member_id==this.user.uid){
                                    this.user.type = 3;
                                    this.user.Lding = 0;
                                }
                                pt_count.push(datum);
                                var len = pt_count.length;

                                if(len==1){
                                    self.$set(self.dataList.pt,0,datum);
                                } else {
                                    zpx(Number(datum.dian),0,datum);
                                }

                                function zpx(d,o,datum){     // 排序
                                    var L = self.dataList.pt.length;
                                    if(Number(self.dataList.pt[o].dian)<=d){
                                        self.dataList.pt.splice(o,0,datum);
                                    }
                                    else if(o+1==L){
                                       self.$set(self.dataList.pt,o+1,datum);
                                    }
                                    else {
                                       zpx(d,o+1,datum);
                                    }
                                    
                                }
                            }
                            }
                        }
                        z_type+=1;
                        z_type==2 ? host():0;
                    }
                })

                http.post('/RoomJoin/getMakerList',{
                    roomid: this.user.rid,
                })
                .then(res => {
                    // console.log(res)
                    var arrt = [];
                    if(res.status == 1){
                        var data = res.data;
                        for(var i=0; i<data.length; i++){
                            if(data[i].zl_visible == 1){
                                var datum = {
                                    img : data[i].zc_headimg,
                                    name: data[i].zn_member_name,
                                    dian: data[i].zn_points,
                                    uid : data[i].zn_member_id,
                                }
                                arrt.push(datum)
                            }
                        }
                        this.dataList.dd = arrt;
                        z_type+=1;
                        z_type==2 ? host():0;
                    }
                })

                function host(){
                    if(self.dataList.z.dian==undefined && self.user.auto && self.dataList.dd[0]!=undefined){
                        http.post( '/RoomJoin/setMakers', {
                                roomid: self.user.rid,
                                type: 1,
                                id: self.dataList.dd[0].uid,
                                num: self.user.ju,
                            })
                        .then(res => {
                            if(res.status == 1){
                                self.user.lun = self.lunZ.num+Number(self.user.ju)-1;
                                // self.dataList.dd.splice(0,1);
                            }
                        })
                        
                    }
                }
            },
            exit () {   // 退出房间
                var self = this;
                if(this.user.type == 1){
                    console.log(1)
                    if((this.user.initType==0||this.user.initType==7) && this.user.gametype == 1){
                        self.errorTips = "您是房主，退出房间游戏将无法进行";
                        self.careTip = true;
                    } else {
                        router.push({name: 'oxCrowd'});
                        // http.post('/RoomJoin/quitRoom',{
                        //     roomid: this.user.rid, // 房间id
                        //     id: this.user.uid,
                        // })
                        // .then(res => {
                        //     console.log(res)
                        //     if(res.status == 1){
                                
                        //     } else {
                        //         self.errorTips = res.msg;
                        //         self.careTip = true;
                        //     }
                        // })
                        
                    }
                } 
                else if(this.user.type == 2){
                    console.log(2)
                    self.errorTips = "您当前正在坐庄，请退庄后再退出房间";
                    self.careTip = true;
                } 
                else if(this.user.type == 3){     // 普通玩家退出
                    http.post('/RoomJoin/quitRoom',{
                        roomid: this.user.rid, // 房间id
                        id: this.user.uid,
                    })
                    .then(res => {
                        console.log(res)
                    })
                    router.push({name: 'oxCrowd'});
                }
            },
            // 游戏流程
            gameStyle(n){       // 游戏流程--开始(1)--检查庄状态
                var mainBody = this.main;   // 游戏主体数据
                var minFen = mainBody.minFen; // 最低上庄分数
                var dian = Number(this.dataList.z.dian); // 庄当前分数
                var self = this;
                var In_time = this.time.InTime;  // 定时器速度
                if( n==1 ){
                    if(dian > minFen){  // 庄分数大于最低上庄分数
                        this.user.gametype = 1; // 游戏执行中
                        this.user.initType=1;
                        var i=0;
                        pageTimer["css"] = setInterval(function(){
                            i++;
                            if(i>3){
                                i=1;
                                self.user.initTxt[1] = self.user.initTxt[1].replace('...','');
                            }
                            if(i<=3){
                                self.$set(self.user.initTxt, 1,self.user.initTxt[1]+='.');
                            }
                        },In_time)
                        this.fk();

                    } else {
                        this.errorTips = '庄家参数异常，请检查有无庄或者庄的分数';
                        this.careTip = true;
                    }
                } else if(n==2) {
                    // this.roomStyle(1);      // 游戏暂停
                    if(this.user.gametype == 1){
                        this.errorTips = '本轮游戏结束后生效';
                        this.careTip = true;
                    }
                    this.user.gametype = 0;
                }
            },
            fk(){   // 房卡
                if(this.test == "2aa"){
                    http.post('/card/card',{room_id: this.user.rid});
                }else{
                http.post('/RoomCard/descRoomCard',{
                    room_id: this.user.rid,
                })
                .then(res => {
                    console.log(res);
                    if(res.status==0){  // 需要扣费
                        http.post('/RoomCard/descRoomCard',{  // 扣费接口
                            type: this.user.timeOrDay,
                            room_id: this.user.rid,
                        })
                        .then(res => {
                            console.log(res);
                            if(res.status==0){  // 扣费失败
                                this.errorTips= res.msg;      // 提示内容
                                this.careTip = true;    // 提示窗
                                this.user.gametype==0;
                                this.user.initTxt[1] = '正在初始化游戏资源';
                                this.user.initType = 0;
                                http.post('/RoomCard/stopGame',{  // 暂停游戏
                                    room_id: this.user.rid,
                                })
                                .then(res => {
                                    console.log(res);
                                })
                            }else if(res.status == 1){
                                localStorage.cardNum = res.card_num;
                                this.$store.state.user.userCard = res.card_num;

                                http.post('/card/card',{room_id: this.user.rid});
                            }
                        })
                    }else{
                        http.post('/card/card',{room_id: this.user.rid});
                    }
                })
                }
            },
            K : function(){   // 游戏流程--回调开局(2)
                var In_time = this.time.InTime;  // 定时器速度
                this.user.initType = 2;
                this.main.minFen_j = this.main.minFen; // 压庄总分
                this.bei_KZ(this.main.bei); // 控制当前状态下的下注分数

                // 清除游戏余留状态
                for(var each in pageTimer) {    // 清除所有定时器
                    clearInterval(pageTimer[each])
                }
                this.time.time_x = this.time.downTime; // 时间赋值
                pageTimer["timer01"] = setInterval( ()=> {
                    this.time.time_x--;
                    if(this.time.time_x <= 0) {
                        this.bank()
                        clearInterval(pageTimer["timer01"])
                    }
                },In_time)
            },
            bank () {           // 2、随机选庄家牌
                let self = this;
                let num = this.main.cardNum; // 几牌
                var In_time = this.time.InTime;  // 定时器速度
                let zhuan = this.logic.z_index;
                this.user.initType = 3;
                this.time.time_x = this.time.random; // 时间赋值
                pageTimer["timer02"] = setInterval( ()=> {
                    self.time.time_x--;

                    if(self.time.time_x < 0) {    
                        this.time.time_x = '';
                        this.user.initType = 4;     // 文字-->发牌中
                        clearInterval(pageTimer["timer03"])
                        this.move.liType = -1;
                        this.main.z_type = 1;
                        this.c3test();  // 发牌      
                        clearInterval(pageTimer["timer02"])
                    }
                },In_time)

                let i = self.move.liType;
                pageTimer["timer03"] = setInterval(function(){
                    i++;
                    if(i>=num){
                        i=0;
                    }
                    self.move.liType = i;
                },self.time.speed)
            },
            c3test: function(){ // 发牌动作
                // self.move.trans = [];   // 测试用-清除数据
                var self = this;
                this.music = true;
                var pai = document.getElementsByClassName('pai');
                var kaNum = this.main.cardNum;          // 玩几牌的
                var s = this.move.bei_s/(kaNum*5);     // 背牌移动速度 Card/score_result
                var setTime = null;

                pai_mover(0,0,0);
                function pai_mover(i,n,o){
                    if(o == kaNum*5){
                        return false;
                    }
                    var pai2 = document.getElementsByClassName('static_K')[o].getBoundingClientRect();
                    var imgs= pai[i].children[n].getBoundingClientRect();

                    self.move.trans.push("visibility:visible;transform:translate(-"+(pai2.left-imgs.left)+"px,"+(imgs.top-pai2.top)+"px);transition:transform "+s+"s ease;z-index:13"+n);
                    setTime = setTimeout(function(){
                        if(i==kaNum-1){
                            i=-1;n++;
                        }
                        if(self.move.trans.length == kaNum*5){
                            self.music = false;
                            self.countDown();
                            clearTimeout(setTime)
                        }
                        pai_mover(++i,n,++o);
                    },s*1000)
                }
            },
            countDown () {          // 3、可押注时间倒计时
                let self = this;
                this.user.initType = 5;
                this.time.time_x = this.time.$Time;
                var In_time = this.time.InTime;  // 定时器速度
                // 延时器-发完牌后 -- 押注倒计时
                pageTimer['timer04'] = setInterval( ()=> {
                    if(this.time.time_x >= 1){
                        this.time.time_x-- ;
                    } else {
                        self.careTip = false;
                        self.openCard();
                        if(this.user.type==1){
                            http.post('/card/score_result',{
                                room_id: this.user.rid,
                                num: this.user.ju,
                            })
                            .then(res => {})
                        }
                        clearInterval(pageTimer['timer04']);
                    }
                } , In_time);
            },
            openCard () {                 // 4、开牌--算输赢
                var self = this;
                var cardNum = this.main.cardNum;    // 牌数
                var z_index = this.logic.z_index;   // 庄的位置
                var In_time = this.time.InTime;  // 定时器速度
                this.logic.imgStyle = "visibility:visible;"

                var o =0;
                pageTimer["timer05"] = setInterval( ()=> {
                    for(var i=0;i<cardNum;i++){
                        this.$set(this.move.trans,i+o,this.move.trans[i+o].replace('px)','px) rotateY(90deg)'));
                    }
                    o+=cardNum;
                    if(o==cardNum*4){
                        this.move.trans[cardNum*4+z_index]="";
                        this.user.initType=6;
                        this.time.time_x = this.time.$openCard;
                        pageTimer["timer06"] = setInterval( ()=> {
                            if(this.time.time_x == this.time.$openCard){
                                
                            }
                            if(this.time.time_x >= 1){
                                this.time.time_x-- ;
                            } else {
                                self.cuopai=false;
                                for(var i=0;i<cardNum;i++){
                                    this.$set(this.move.trans,i+o,this.move.trans[i+o].replace('px)','px) rotateY(90deg)'));
                                }
                                this.user.initType=7;
                                this.xianshi(); // 分数结果显示
                                // 算胜负计算分数
                                this.time.time_x = this.time.$esc;  // 10s
                                this.move.imgNum=0; // 隐藏筹码
                                
                                pageTimer["timer08"] = setInterval( ()=> {
                                    if(this.time.time_x >= 1){
                                        this.time.time_x-- ;
                                    } else {
                                        self.remove();// 游戏数据清除
                                        this.user.initTxt[1] = '正在初始化游戏资源';
                                        // console.log(this.user.ju)
                                        // console.log(this.user.lun)
                                        // 庄分数计算
                                        var minFen = this.main.minFen; // 最低上庄分数
                                        var dian = Number(this.dataList.z.dian); // 庄当前分数
                                        if(dian < minFen && this.user.type == 2){  // 庄分数小于最低上庄分数
                                            self.errorTips = '您的上庄分数不足，请及时联系房主充值。';
                                            self.careTip = true;
                                        }
                                        // 检查是否需要换庄
                                        if(this.user.ju >= this.user.lun-1 && this.user.type==1){

                                            if(this.dataList.dd[0]!=undefined){
                                                http.post('/RoomJoin/setMakers',{
                                                    roomid: this.user.rid, // 房间id
                                                    type: 1,  // 1为设置庄家，2为下庄
                                                    id: this.dataList.dd[0].zn_member_id,  // 用户id
                                                })
                                                .then(res => {
                                                    if(res.status==1){
                                                        this.user.lun = this.lunZ.num+Number(this.user.ju)-1;
                                                    } else {
                                                        self.errorTips = res.msg;
                                                        self.careTip = true;
                                                    }
                                                })
                                            } else {
                                                self.errorTips = '游戏局数已满且无下一位上庄玩家';
                                                self.careTip = true;
                                                this.roomStyle(1);      // 游戏暂停
                                                console.log(111)
                                                this.user.lun+=this.lunZ.num;
                                                clearInterval(pageTimer['timer08']);
                                                return false;
                                            }
                                        }
                                        if(this.user.type==1 && this.user.gametype==1 && this.dataList.z.name!=undefined){
                                            this.gameStyle(1);
                                        } else if(this.user.type==1){
                                            this.roomStyle(1);      // 游戏暂停
                                        }
                                        clearInterval(pageTimer['timer08']);
                                    }
                                },In_time)

                                clearInterval(pageTimer['timer06']);
                            }
                        },In_time)

                        clearInterval(pageTimer["timer05"]);
                    }
                },In_time/2)
            },
            barter(){       // 更换庄家
                if(this.dataList.dd[0]!=undefined && this.user.gametype==0){
                    http.post('/RoomJoin/setMakers',{
                        roomid: this.user.rid, // 房间id
                        type: 1,  // 1为设置庄家，2为下庄
                        id: this.dataList.dd[0].zn_member_id,  // 用户id
                    })
                    .then(res => {
                        this.errorTips = res.msg;
                        this.careTip = true;
                    })
                } else if(this.user.gametype==1){
                    this.errorTips = '请在游戏暂停后操作';
                    this.careTip = true;
                } else if(this.dataList.dd[0]==undefined){
                    this.errorTips = '当前不存在其他等候上庄者';
                    this.careTip = true;
                }
            },
            xianshi(){      // 分数结果显示
                var self = this;
                var card = self.main.xianshi;
                if(this.user.xiaZZZ==1){ // 执行下庄
                    http.post( '/RoomJoin/setMakers', {
                                roomid: this.user.rid,
                                id: this.user.uid,
                                type: 2,
                            })
                        .then(res => {
                            if(res.status==1){
                                goEasy.publish({  // 发送文本
                                    channel:  'room_' + obj.rid,
                                    message: JSON.stringify(obj),
                                });
                            }
                        })
                }
                console.log(card)
                if(card!=undefined){
                    for(var i=0; i<card.length; i++){
                        if(card[i].few==self.logic.z_index){     // 庄
                            self.chenji.zfen = card[i].win_score;
                            var water = Number(card[i].water_score);
                            
                            self.user.oxWater+=water;
                        }
                        self.user.myFen+=self.logic.liMy_All[Number(card[i].few)];
                        if(card[i].uid==localStorage.oxUid){    // 自己
                            self.user.myFen+=card[i].win_score;
                            self.chenji.allfen+=card[i].win_score;
                            self.chenji.myfen[Number(card[i].few)]+=card[i].win_score;
                        }
                    }
                }
                self.list();
            },

            remove(){   // 一局结束需要清零的数据
                this.main.z_type = -1;
                this.logic = {           // 主体逻辑代码
                    z_index: -1,         // 庄所在的位置
                    oxImg  : [],         // 牛牛路径
                    imgStyle: '',        // 卡牌是否显示
                    oxji   : [],         // 牛几
                    sy     : [],         // 输赢判断
                    status : 0,          // 游戏当前状态
                    liAll_F: [0,0,0,0,0,0,0],         // 当前总压分
                    liMy_All: [0,0,0,0,0,0,0],        // 当前个人压分_所有的压分
                    liMy_Ff: [0,0,0,0,0,0,0],         // 当前个人压分_翻倍
                    liMy_Fn: [0,0,0,0,0,0,0],         // 当前个人压分_不翻倍
                }

                this.move = {        // 卡牌动效控制
                    trans: [],      // 背面移动位置
                    bei_s : 4,     // 背面移动速度
                    liType: -1,     // 手指移动到哪个li上面
                    srcImgStyle: [],// xy位置
                    srcImg: [],     // 移动筹码的img
                    bounce: [],     // 弹跳c3
                    imgNum: 1,  // 移动用img的数量
                }
                this.chenji={    // 分数成绩
                    allfen: 0,  // 单局总分数波动
                    zfen: 0,    // 庄的分数波动
                    myfen: [0,0,0,0,0,0,0], // 个人押注输赢总分
                }
                this.chouma={   // 筹码控制
                    one: 0,
                    LandR: 'left:0;top:0;',
                    liCss: [0,0,0,0,0,0,0],  // 所压li显示高亮
                }
            },
            roomStyle (type,dataArr) {      // 游戏状态
                var self = this;

                if(this.user.type == 1){    // 庄家发起控制
                    dataArr = JSON.stringify(dataArr)
                    http.post('/Room/setRoomStatus',{
                        zn_room_id: this.user.rid,
                        zn_status: type,
                        zn_text: dataArr,
                    })
                    .then(res => {
                        if(res.status != 1){
                            self.errorTips = res.msg;
                            self.careTip = true;
                        }

                    })
                }
            },
            to(n){              // 弹框控制
                switch (n) {
                    case 2 :    // 开奖记录
                        http.post('/GameLog/gameResult',{
                            room_id : this.user.rid,
                        }).then(res=>{
                            console.log(res)
                            this.$refs.onprizeChild.ooxData = res.data;
                        })
                        this.$refs.onprizeChild.onprize=true;
                        // this.gameResult(this.user.rid)
                        break;
                    case 3 :    // 抽水分数
                        this.$refs.onapplyOnChild.details=true;
                        this.$refs.onapplyOnChild.allFen = Number(this.user.allFen)+Number(this.user.oxWater);
                        this.$refs.onapplyOnChild.allWater= this.user.oxWater; // 抽水分数
                        break;
                    case 4 :    // 游戏内分享
                        this.$refs.onfriendVIPChild.friend_VIP=true;
                        this.$refs.onfriendVIPChild.arrows = 3;
                        this.$refs.onfriendVIPChild.roomNumber = this.user.number;
                        this.$refs.onfriendVIPChild.share = true;
                        break;
                    case 7 :    // 流水报表
                        http.post('/Card/get_water_log',{
                            room_id: this.user.rid,
                            // num:this.user.ju,
                        })
                        .then(res => {
                            console.log(res);
                            var arr = [];
                            for(var an in res.data){
                                arr[Number(an-1)]=res.data[an];
                            }
                            console.log(arr)
                            this.$refs.onWater.waterList=arr.reverse();
                            if(this.user.type==1){
                                this.$refs.onWater.fz=true;
                            }
                        })
                        this.$refs.onWater.water=true
                        break;
                }
            },
            varRoom(n){          // 房间设置
                var set = this.user.initType;
                this.$refs.onvarRoomChild.zao=false;
                if(n==0){
                    this.$refs.onvarRoomChild.zao=true;
                    lookRoom(this)
                } else {
                    if(set<1){   // 游戏暂停方可打开
                        lookRoom(this)
                    } else {
                        this.errorTips = '请在游戏暂停时重置房间配置';
                        this.careTip = true;
                    }
                }
                function lookRoom(self){
                    self.$refs.onvarRoomChild.initType = 1;
                    var data = self.roomData;
                    console.log(self.roomData)
                    // self.$refs.onvarRoomChild.imgState = self.roomData;
                    self.$refs.onvarRoomChild.newMan = data.zn_confirm==1 ? true:false;// 新人确认
                    self.$refs.onvarRoomChild.initData = {
                        zc_number       :data.zc_number,
                        zc_title        :data.zc_title,
                        zn_room_type    :data.zn_room_type,
                        zn_confirm      :data.zn_confirm,
                        zn_play_type    :data.zn_play_type,
                        zn_pay_type     :data.zn_pay_type,
                        zn_bet_time     :data.zn_bet_time,
                        zn_min_score    :data.zn_min_score,
                        zn_bet_between_s:data.zn_bet_between_s,
                        zn_bet_between_e:data.zn_bet_between_e,
                        zn_extract      :data.zn_extract,
                        zn_ext          :data.zn_ext,
                        zc_rate         :data.zc_rate,
                        zn_chatid       :data.zn_chatid,
                        id              :self.user.rid,
                    }
                    self.$refs.onvarRoomChild.boxState.CvarRoom=true;
                    self.$refs.onvarRoomChild.noModal();
                }
            },
            applyOn(){         // 申请上庄or选择做庄
                let user = this.user;
                var Lding = this.user.Lding; // 等待上庄
                var obj = {
                    type: this.user.type,
                    gameType: this.user.initType,
                    Lding,
                    rid: this.user.rid,
                    uid: this.user.uid,
                }
                
                if(user.type == 2 || user.type == 3){  // 禁止房主
                    this.$refs.onapplyOnChild.applyOn = true;
                    this.$refs.onapplyOnChild.minGrade = this.main.minFen;
                    this.$refs.onapplyOnChild.applyObj = obj;
                }else{
                    this.test = '2aa'
                }
            },
            shangZ () {
                var self = this;
                http.post( '/RoomJoin/setMakers', { // 直接下一个上庄
                            roomid: self.$store.state.idRoom.id,
                            id: self.$store.state.data.Zlist[0].zn_member_id || 0,
                            type: 1,  // 1为设置庄家，2为下庄
                        })
                    .then(res => {
                        if(res.status == 0){
                            self.shangZ()
                        } else if(res.status == 1){
                            self.roomStyle(2); 
                        }
                    })
            },
            

            gameResult () { // 先获取一波所有的游戏结果
                var self = this;
                http.post('/GameLog/gameResult',{
                    room_id : this.user.rid,
                }).then(res=>{
                    this.user.ju = res.data.length;
                    this.user.lun = this.user.ju;
                })
            },
    },
}
</script>