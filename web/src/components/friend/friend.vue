<template>
    <mt-popup
      position="bottom"
      v-model="friend_VIP" id='friend'>
        <!-- 错误提示 -->
        <mt-popup 
            v-model="careTip" :modal='false'
            popup-transition="popup-fade"
            class="careTip" >
            <h3>通知</h3>
            <i @click="careTip = false"></i>
            <p>{{careTip_TEXT}}</p>
            <mt-button @click="careTip = false">
            </mt-button>
        </mt-popup>
        <!-- 删除确认 -->
        <mt-popup 
            v-model="delTip" :modal='false'
            popup-transition="popup-fade"
            class="careTip" >
            <h3>操作确认</h3>
            <i @click="delTip = false"></i>
            <p>{{delTip_TEXT}}</p>
            <mt-button @click="delTip = false">
            </mt-button>
        </mt-popup>

        <!-- 进房确认 -->
        <mt-popup 
            v-model="jinTip" :modal='false'
            popup-transition="popup-fade"
            class="jinTip" >
            <h3>操作确认</h3>
            <i @click="jinTip = false"></i>
            <p>{{jinTip_TEXT}}</p>
            <mt-button @click="jinCs(jinCanshu,2)"></mt-button>
            <mt-button @click="jinCs(jinCanshu,1)"></mt-button>
        </mt-popup>
        <!-- 好友信息 -->
        <mt-popup 
          v-model="findFriend"  :modal='false'
          popup-transition="popup-fade"
          class="findFriend" >
          <div>
            <i v-on:click="findFriend = false"></i>
            <img src="../../srcImg/home004.png" alt="">
            <ul>
                <li>{{friendName}}</li>
                <li>{{findID}}</li>
            </ul>
            <mt-button @click="findFriend = false ,applyFriend() "></mt-button>
          </div>
        </mt-popup >
        <!--备注好友-->
        <mt-popup 
            v-model="markFriend"  :modal='false'
            popup-transition="popup-fade"
            class="markFriend" >
            <input type="text" placeholder="请输入要备注的名字" v-model='markName' />
            <i @click="markFriend = false"></i>
            <mt-button @click="remarkFriend()">
            </mt-button>
        </mt-popup>

        <header class='frifri'>
            <ul>
                <li>
                    <i @click='addFriend ? addFriend=false : friend_VIP=false'></i>
                </li>
                <li>{{addFriend ? "添加好友" : "好友列表"}}</li>
                <li @click="addFriend = true">
                    <i></i>
                </li>
            </ul>
        </header>
        <div class='friMain' v-if='!addFriend'>
            <ul>
                <li @click='ConTypr(1),addDATA()' v-show='share ? !share : true'>
                    <span><i class='dian2' v-if='newNum>0'>{{newNum}}</i></span>
                    <span>最新消息</span>
                    <span><i :class='arrows == 1 ? "Iup" : ""'></i></span>
                </li>

                <li  :class='arrows == 1 ? "show" : "hide"'>
                    <!-- 系统消息 -->
                    <dl class='sys' v-for='(sys,squest) in systemMess' :key='sys.id' 
                          @touchend='[(q=-1),(k=squest),(sysSel = squest),(touchEnd)]' 
                          @click='changeTime(sys.zn_cdate)'  
                          @touchstart='touchStart'
                          @touchmove='touchMove'
                          :style="squest == k ? deleteSlider: ''">
                        <dt>
                            <span><i class='dian3' v-if='sys.read==1'>1</i></span>
                        </dt>
                        <dd @click="show = 0,setRead(sys.id, sys.title, sys.content, sys.time)" >
                            <b>[系统消息]</b>
                            <b>{{sys.title}}</b>
                            <b :class='arrows == 1 ? "show" : "hide"'></b>
                            <b v-show="sys.read == 1" ></b>
                        </dd>
                        <dd class="remove" ref='remove' @click="deleteApplySys"><p>删除</p></dd>
                    </dl>

                    <!-- 房间请求 $store.state.system.lodin -->
                    <dl class='sys' v-for='(sys,squest) in $store.state.system.lodin' :key='sys.id' 
                          @touchend='[(q=-1),(k=squest),(sysSel = squest),(touchEnd)]' 
                          @click='changeTime(sys.zn_cdate)'  
                          @touchstart='touchStart'
                          @touchmove='touchMove'
                          :style="squest == k ? deleteSlider: ''">
                        <dt>
                            <span><i class='dian3'>1</i></span>
                        </dt>
                        <dd @click="show = 0, jinRoom(sys.uid,sys.name,sys.rid,sys.roomName,sys.roomNum)" >
                            <b>[系统消息]</b>
                            <b>{{sys.name}} 申请加入房间：{{sys.roomName}}（{{sys.roomNum}}） </b>
                            <b :class='arrows == 1 ? "show" : "hide"'></b>
                            <b v-show="sys.zn_read == 1" ></b>
                        </dd>
                        <dd class="remove" ref='remove' @click="deleteApplySys"><p>删除</p></dd>
                    </dl>

                    <!--好友消息-->
                    <dl class="fri" v-for='(fri,quest) in friendApply' :key='fri.id'
                    @touchend='[(k=-1),(q=quest),(touchEnd)]' v-if='friDel.indexOf(fri.appid)<0 && friDel.indexOf(fri.id)<0'
                    @touchstart='touchStart'
                    @touchmove='touchMove'
                    :style="quest == q ? deleteSlider: ''">
                        <dt>
                            <span><i class='dian3' v-if='fri.read==1'>1</i></span>
                        </dt>
                        <dd @click="show = 0,setRead(fri.id, fri.title, fri.content, fri.time)">
                            <p><i>{{fri.content}}</i>请求添加你为好友</p>
                            <p @touchend='friSel = quest' @click='agreeFriend(fri.appid)'>同意</p>
                        </dd>
                        <dd class="remove" ref='remove' @click='noFriend(fri.id,fri.appid)'><p>拒绝</p></dd>
                    </dl>
                </li>
                
                
                <li @click='ConTypr(2),ZJ_List()' v-show='share ? !share : true'>
                    <span><i class='dian2' v-if='zjNum>0'>{{zjNum}}</i></span>
                    <span>最近联系</span>
                    <span><i :class='arrows == 2 ? "Iup" : ""'></i></span>
                </li>
                <li  :class='arrows == 2 ? "show" : "hide"'>
                    <dl   v-for='(z_List,fquest) in zjList'> 
                        <dd
                        :key='z_List.fid_nickname+"zjlist"'
                        @click='share ? yaoqin(z_List.fid) : (liaotian(z_List.fid),x=1)'
                        @touchend='touchEnd'
                        @touchstart='touchStart'
                        @touchmove='touchMove'
                          :style="1 == 1 ? deleteSlider: ''">

                            <img :src="z_List.fid_headimg" @touchend='friQuest = fquest'/>
                            <i class='dian' v-show='x==0' v-if='$store.state.system.H_Num[z_List.fid]>0'>{{$store.state.system.H_Num[z_List.fid]}}</i>

                            <span @touchend='friQuest = fquest'>{{z_List.fid_nickname}}</span>
                            <span @touchend='friQuest = fquest' @click.stop='markFriend =true'><i></i>备注
                            </span>
                            <span class="remove" ref='remove' @click.stop="deleteFri(z_List.fid)"><p>删除</p>
                            </span>


                        </dd>
                    </dl>
                </li>

                <li @click='ConTypr(3),myFriend()' v-show='share ? !share : true'>
                    <span><i class='dian2' v-if='friNum>0'>{{friNum}}</i></span>
                    <span>我的好友</span>
                    <span><i :class='arrows == 3 ? "Iup" : ""'></i></span>
                </li>

                <li  :class='arrows == 3 ? "show" : "hide"'>
                    <dl v-for='(friends,fquest) in friendList'>
                        <dd
                        :key='friends.name'
                        @click='share ? yaoqin(friends.fid) : (liaotian(friends.fid),changeTime(),x=1)'
                        @touchend='sysSel = fquest,touchEnd'
                        @touchstart='[(k=fquest),(touchStart)]'
                        @touchmove='touchMove'
                        :style="fquest == k ? deleteSlider: ''">

                            <img :src="friends.img_url" @touchend='friQuest = fquest'/>

                            <i class='dian' v-show='x==0' v-if='$store.state.system.H_Num[friends.fid]>0'>{{$store.state.system.H_Num[friends.fid]}}</i>

                            <span @touchend='friQuest = fquest'>{{friends.remark == '' ? friends.name : friends.remark}}</span>
                            <span @touchend='friQuest = fquest' @click.stop='markFriend =true'><i></i>备注
                            </span>
                            <span class="remove" ref='remove' @click.stop="deleteFri(friends.fid)"><p>删除</p>
                            </span>
                        </dd>
                    </dl>
                </li>
            </ul>
        </div>

        <div class='addHaoyou' v-if='addFriend' style='height: 20%'>
            <input type="text" placeholder='输入ID号' v-model='findID'/>
            <i></i>
            <div class='seekHaoyou'  v-show='findID.length != 0' @click='searchFriend(1)'>
                <img src="../../srcImg/friend006.png" alt="" />
                <p>搜索 ：<span>{{findID}}</span></p>
            </div>
        </div>

        <chartMessage ref="onchartMessageChild"></chartMessage>
        <DanLiao ref="onDanLiaoChild"></DanLiao>
        <CHATQUN ref="onQUNChild"></CHATQUN>

        <loading v-if='loading'></loading>
    </mt-popup> 
</template>

<script type="text/javascript">
    import './friend.scss';
    import Vue from 'vue';
    import http from '../../utils/httpClient.js';
    import router from '../../router/';

    import chartMessage from '../chart/chartMessage.vue'; // 系统消息
    Vue.component('chartMessage', chartMessage)
    import DanLiao from '../chart/DanLiao.vue'; // 单聊
    Vue.component('DanLiao', DanLiao)


    import CHATQUN from '../chart/CHAT_QUN.vue'; // 群聊
    Vue.component('CHATQUN', CHATQUN)

    export default {
        data: function(){
            return {
                friend_VIP: false,       // 主页面
                loading: false,          // loading
                arrows: 0,               // 上下箭头
                careTip : false,         // 错误提示
                careTip_TEXT : false,    // 错误提示
                delTip : false,          // 删除提示
                delTip_TEXT : '',        // 删除提示
                jinTip : false,          // 进房提示
                jinTip_TEXT : '',        // 进房提示
                jinCanshu: {},           // 进房参数
                imgInit: '',
                // 数据
                friendList : [],    //好友列表
                zjList : [],    //最近联系人列表
                x: 0,
                friNum: 0,  // 好友总数据
                zjNum: 0,  // 最近联系人总数据
                newNum: 0,  // 最近消息总数据
                // 分享
                share: false,    
                roomNumber: null,
                
                findFriend: false,      // 好友申请
                markFriend: false,      // 备注好友
                addFriend : false,      // 查找好友
                findID: '',             // 要寻找的id
                friendName: '',         // 对方名字
                

                systemMess: [],  //系统信息
                friendApply :[],  //好友信息
                friDel: [],       // 已经同意的用户

                sysTime : '', //系统信息时间
                friSel :-1, 
                friQuest :-1,
                sysSel:-1,
                markName:'',
                pagesize : 15,
                p :1,
                friendListId : [], //好友列表id
                startX:0,   //触摸位置
                endX:0,     //结束位置
                moveX: 0,   //滑动时的位置
                disX: 0,    //移动距离
                deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider" friend1
                k:-1,   // 系统消息
                q:-1,   // 好友申请
                ForZ: 0,// 庄时状态为1
            }
        },
        mounted: function(){
            // this.$store.dispatch('dl')         // 聊天登录
            this.imgInit=GAME_ALL_URL;
            http.post('/MemberFriend/getFrientList',{
                id : localStorage.oxUid,
            })
            .then(res =>{
                console.log(res)
            })
            var self = this;
            // 获取系统信息
            self.addDATA();
            // 获取好友
            self.myFriend();
        },
        methods: {
            fir(){
                this.myFriend()     // 好友列表
                this.ZJ_List()  // 最近联系人列表
            },
            yaoqin(id){   // 邀请好友接口
                // alert('等待对接')
                http.post('/MemberNotice/inviteGame',{
                    content : localStorage.oxName+' 邀请您进入 '+this.roomNumber+' 房间一起进行游戏',
                    inviteID: id,
                }).then(res => {
                    if(res.status == 1){
                        this.share=false;
                        this.careTip_TEXT = res.msg;
                        this.careTip = true;
                        // this.friend_VIP=false;
                    }
                })
            },
            jinRoom(id,name,rid,rname,rnum){     // 进房提示
                this.jinTip = true;         
                this.jinTip_TEXT = name+"申请加入房间:"+rname+'('+rnum+')';        // 进房提示
                this.jinCanshu={
                    id,
                    nikename: name,
                    roomid: rid,
                }
            },
            jinCs(obj,type){    // 获取系统消息
                console.log(this.$store.state.system.lodin)
                console.log(obj)
                http.post('/Room/isJoin',{
                    id : obj.id,
                    nikename:obj.nikename,
                    roomid:obj.roomid,
                    type: type,
                })
                .then(res =>{
                    console.log(res)
                    var lodin = this.$store.state.system.lodin;
                    for(var i=0; i<lodin.length; i++){
                        if(lodin[i].uid==obj.uid && lodin[i].rid==obj.rid){
                            lodin.splice(i,1);
                        }
                    }
                })
                this.jinTip = false;
            },
            addDATA(){
                
                var self = this;
                http.post('/MemberNotice/getNotify',{
                    id : localStorage.oxUid,
                })
                .then(res =>{
                    console.log(res)
                    if(res.status == 1){
                        this.newNum = 0;
                        this.newNum = this.$store.state.system.lodin.length;
                        self.friendApply = [];
                        self.systemMess = [];
                        for(let i in res.data){
                            if(res.data[i].zn_read==1){
                                this.newNum += 1;
                            }
                            if(res.data[i].zn_way == 2){
                                self.friendApply.push({  // 好友信息
                                    id  :res.data[i].id,             //信息id
                                    appid :res.data[i].zn_applyid,     // id=>950
                                    content : res.data[i].zc_content,//信息内容
                                    read : res.data[i].zn_read,      //已读未读
                                    time : res.data[i].zn_cdate,     //信息时间
                                    title : res.data[i].zc_title,    //信息标题
                                })
                            } else if(res.data[i].zn_way == 1 || res.data[i].zn_way == 3){ // 系统消息
                                self.systemMess.push({
                                    id  :res.data[i].id,             //信息id
                                    content : res.data[i].zc_content,//信息内容
                                    read : res.data[i].zn_read,      //已读未读
                                    time : res.data[i].zn_cdate,     //信息时间
                                    title : res.data[i].zc_title,    //信息标题
                                })
                            }
                        }
                    }
                })
            },
            myFriend(){     // 我的好友
                http.post('/MemberFriend/getFrientList',{
                    id : localStorage.oxUid,
                })
                .then(res =>{
                    console.log(res)
                    if(res.status==1){
                        var data = {};
                        var msg = res.msg;
                        this.friNum = 0;
                        for(var i=0; i<msg.length; i++){
                            data[msg[i].fid] = msg[i].img_url;
                            // console.log(msg[i])
                            var num = Number(this.$store.state.system.H_Num[msg[i].fid]);
                            // console.log(num)
                            if(num >= 0){
                                this.friNum += num;
                            }
                        }
                        this.$store.state.user.dictH = data;
                        this.friendList = null;
                        this.friendList = msg;
                    }
                })
            },
            liaotian(sheId){  // 聊天
                var sheId=sheId.replace("hz_niuniu_",'')
                console.log(sheId)
                var obj = {
                    rank : 3,                   // 在房间的状态
                    sheId,                      // 联系人id
                    type : 1,                   // 对应聊天状态
                }
                this.$store.state.system.H_All -= this.$store.state.system.H_Num[sheId];
                this.$store.state.system.H_Num[sheId] = 0;
                this.x=0;
                this.inlet(obj);
            },
            inlet: function(obj){   // 单-群入口  
                var self = this;
                var dan = this.$refs.onDanLiaoChild;
                var qun = this.$refs.onQUNChild;
                dan.fObj = obj;
                qun.fObj = obj;
                if(obj.type == 1){  // 单聊
                    dan.DLRoom = true;
                    dan.sheId = obj.sheId; 
                    dan.heName(obj.sheId);
                }
                else if(obj.type == 2){
                    // console.log('加减分')
                    dan.DLRoom = true;
                    dan.sheId = obj.sheId; 
                    dan.heName(obj.sheId); 
                    dan.rank = obj.rank;
                    dan.rid = obj.rid;
                    dan.Fen = obj.fFen;
                }
                else if(obj.type == 3){  // 群
                    qun.chatLT = true;
                    qun.zn_chatid = obj.qid;
                    qun.rid = obj.rid;
                    qun.rank = obj.rank;
                    qun.list(obj.rid);
                    qun.qunliao()   // 确保加入群聊
                }
            },
            ConTypr(num){   // 箭头状态
                if(this.arrows == num) {
                    this.arrows = 0;
                } else {
                    this.arrows = num;
                }
            },
            //查找好友
            searchFriend(n){
                var self = this;
                if(self.findID==localStorage.oxUid){
                    self.careTip_TEXT = '不能添加自己作为好友';
                    self.careTip = true;
                    return false;
                }
                n==undefined?n=2:'';

                http.post('/MemberFriend/getFriend', {
                    id : self.findID,
                    status: n,
                })
                .then(res =>{
                    if(res.status==1){
                        self.friendName =  res.data.zc_nickname;
                        console.log(res.data.zc_nickname)
                        self.findFriend = true;
                    } else{
                        console.log(res)
                        self.careTip = true;
                        self.careTip_TEXT = res.msg;
                    }
                })
            },
            //发送申请 
            applyFriend(){  // 添加好友
                var self = this;
                http.post('/MemberNotice/applyFriend',{
                    zn_mid      : localStorage.oxUid,
                    zc_content  : localStorage.oxName,
                    zn_applyid  : self.findID,
                }).then(res=>{
                    this.careTip = true;      // 错误提示
                    this.careTip_TEXT = res.msg;    // 错误提示
                })
            },
            // 拒绝申请好友
            noFriend(id,friId){
                /*拒绝添加好友的方法处理*/
                // conn.unsubscribed({
                //   to: id,
                //   message : '对方拒绝添加您为好友',
                // });

                http.post('/MemberNotice/delNotify',{
                    id    : id,
                })
                .then(res => {
                    console.log(res)
                    if(res.status==1){
                        this.friDel.push(id)
                    }
                })
            },
            //同意申请好友
            agreeFriend(id){
                var self = this;
                http.post('/MemberFriend/addFriend',{
                    uid    : localStorage.oxUid,
                    fid    : id,
                    agree  : 1,
                })
                .then(res => {
                    console.log(res)
                    if(res.status==1 || res.status==2){
                        self.myFriend();
                        this.friDel.push(id);
                    }
                })
            },
            //删除系统信息
            deleteApplySys(){
                var self = this;
                http.post('/MemberNotice/delNotify',{
                    id : self.systemMess[self.sysSel].id
                })
                .then(res =>{
                    if(res.status == 1){
                        self.addDATA();
                    }
                })
            },
            //备注好友
            remarkFriend(){
                var self = this;
                console.log(self.friQuest)
                if(self.markName==''){
                    self.markFriend=false;
                }else{
                    http.post('/MemberFriend/modifyMark' ,{
                        id : localStorage.oxUid,
                        fid : Number(self.friendList[self.friQuest].fid),
                        remark : self.markName,
                    })
                    .then(res =>{
                        self.markFriend=false
                        if(res.status==1){
                            self.myFriend();
                            self.friendList[self.friQuest].mname = self.markName;
                            self.markName = '';
                        }
                    })
                }  
            },
            //消息已读未读 点击跳转到详情页面
            setRead(xxid, title, content, time){
                console.log(xxid,title,content,time)
                var self = this; 
                http.post('/MemberNotice/setRead',{
                    id : xxid
                })
                .then(res=>{
                    if(res.status == 1){
                        var vx = {};
                        vx.time = self.timestampToTime(time);
                        vx.title = title;

                        var messyCode = /&lt;|p&gt;|\/p&gt;/g;
                        vx.content = content.replace(messyCode,'');
                        if(title == null){
                            vx.content = vx.content + ` 请求添加您为好友`;
                        }
                        console.log(content)

                        self.$refs.onchartMessageChild.msgObj=vx;
                        self.$refs.onchartMessageChild.chartMessage=true;
                    }
                })
            },
            //删除好友
            deleteFri(id){
                var self = this;
                http.post('/MemberFriend/delFriend',{
                    fid : id,
                    uid : localStorage.oxUid,
                })
                .then(res =>{
                    if(res.status==1){
                        self.myFriend();
                    }
                })
            },
            //时间戳转换时间
            changeTime(time){
                var self = this;
                self.sysTime = self.timestampToTime(time);
            },
            timestampToTime(timestamp) {
                    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                    var Y = date.getFullYear() + '-';
                    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    var D = date.getDate() + ' ';
                    var h = date.getHours() + ':';
                    var m = date.getMinutes() + ':';
                    var s = date.getSeconds();
                    return Y+M+D+h+m+s;
            },
            //左滑
            handleClick (v) {
                    this.$emit('msg-from-child', this.val)
                    this.deleteSlider = "transform:translateX(0rem)";
                },
            touchStart(ev){
                    this.k = ev
                    ev= ev || event
                    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
                    if(ev.touches.length == 1){
                        // 记录开始位置
                        this.startX = ev.touches[0].clientX;
                }
            },
            touchMove(ev){
                    ev = ev || event;
                    //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
                    let wd=2;
                    if(ev.touches.length == 1) {
                        // 滑动时距离浏览器左侧实时距离
                        this.moveX = ev.touches[0].clientX
                        //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                        this.disX = this.startX - this.moveX;
                        // console.log(this.disX)
                        // 如果是向右滑动或者不滑动，不改变滑块的位置
                        if(this.disX < 0 || this.disX == 0) {
                            this.deleteSlider = "transform:translateX(0rem)";
                            // 大于0，表示左滑了，此时滑块开始滑动 
                        }else if (this.disX > 0) {
                            //具体滑动距离我取的是 手指偏移距离*5。
                            this.deleteSlider = "transform:translateX(-" + this.disX*5 + "rem)";
                            // 最大也只能等于删除按钮宽度 
                            if (this.disX*5 >=wd) {
                                this.deleteSlider = "transform:translateX(-" +wd+ "rem)";
                            }
                        }
                    }
            },
            touchEnd(ev){
                ev = ev || event;
                let wd=2;
                if (ev.changedTouches.length == 1) {
                    let endX = ev.changedTouches[0].clientX;
                    this.disX = this.startX - endX;
                    // console.log(this.disX)
                    //如果距离小于删除按钮1/3,强行回到起点
                    if ((this.disX*5) < (wd/3)) {
                        this.deleteSlider = "transform:translateX(0rem)";
                    }else{
                        //大于一半 滑动到最大值
                        this.deleteSlider = "transform:translateX(-"+wd+ "rem)";
                    }
                }
            },
            // 最近联系人
            ZJ_List(){
                http.post( '/Chat/getContact', {
                    uid: localStorage.oxUid,
                })
                .then(res => {
                    console.log(res)
                    if(res.status == 1){ // zjNum
                        this.zjList = res.data;
                        console.log(res.data)
                        this.zjNum = 0;
                        for(var i=0; i<res.data.length; i++){
                            var num = Number(this.$store.state.system.H_Num[res.data[i].fid]);
                            // console.log(num)
                            if(num >= 0){
                                this.zjNum += num;
                                console.log(this.zjNum)
                            }
                        }
                    }
                })
            },
        }
    }
</script>