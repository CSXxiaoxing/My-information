  <!-- 单聊 -->
  <template>
    <mt-popup   position="top" :modal='false'
      v-model="DLRoom" id='DRoom'> 
        <!-- 消息通知 -->
        <mt-popup  
            v-model="careTip"
            popup-transition="popup-fade"
            class="care" >
            <span>通知 <i @click="careTip = false"></i></span>
            <p>{{errorTips}}</p>
            <mt-button @click="careTip = false">  确定
            </mt-button>
        </mt-popup >
        <!-- 好友信息 -->
        <mt-popup 
          v-model="findFriend"  :modal='false'
          popup-transition="popup-fade"
          class="findFriend" >
          <div>
            <i v-on:click="findFriend = false"></i>
            <img :src='sheImg' alt="">
            <ul>
                <li>{{sheName}}</li>
                <li>{{sheId}}</li>
            </ul>
            <mt-button @click="findFriend = false ,addFriend() "></mt-button>
          </div>
        </mt-popup >
        <!-- 加减分 -->
        <mt-popup 
            v-model="give" :modal='false'
            popup-transition="popup-fade"
            class="careTip" >
            <h3>当前分数：{{Fen}}</h3>
            <i @click="give = false"></i>
            <!-- 加减分 -->
            <label>加分: <input type="text" placeholder="输入分数" v-model.number = 'add' @focus='jian = ""'>
            </label>
            <label>减分: <input type="text" placeholder="输入分数" v-model.number = 'jian' @focus='add = ""'></label>
            <mt-button @click="give = false,addfen()"></mt-button>
        </mt-popup>

    	<header>
            <ul>
                <li>
                    <i @click='dlEse'></i>
                </li>
                <li>{{sheName}}</li>

                <li  v-show='rank == 1'  @click = 'give=true'></li>
                <li v-show='rank != 1' v-if='$store.state.user.friendId.indexOf(`${sheId}`)<0' @click="findFriend=true"><img src="../../srcImg/qun101.png" alt="">加友</li>
            </ul>
        </header>
        <div class='chart'  id='DLtxt'>
            <ul>
                <!-- 单聊 -->
                <li v-for="(data, idx) in $store.state.txt[sheId]"
                :class="Uid != data.toID ? 'left' : 'right'"
                :key = 'data.time' v-if='data.msg != ""'>
                    <img :src="Uid != data.toID ? $store.state.user.dictH[data.toID]||$store.state.user.dict[data.toID] : $store.state.user.userImg" alt="">
                    
                    <div class="test" v-if='data.txt == "txt"'>
                        <span class="bot"></span>
                        <p>{{data.msg}}</p>
                    </div>
                    
                    <div class="test"  v-if='data.txt == "audio"'>
                        <span class="bot"></span>
                        <p class='audio' @click='bofan(data.msg)'>{{data.endTime}}</p>
                        <audio 
                        :src='data.msg' v-show='true' class='audio'
                        :id='data.time' controls="controls" >
                        </audio>
                    </div>
                </li>
            </ul>
        </div>
        <footer>
            <div v-if='speak == 0'>
                <img src="../../srcImg/qun004.png" @touchend='speak = 1'>
                <span @touchstart='startRecord' @touchmove='cancelRecord' @touchend='stopRecord'>按住 说话</span>
            </div>
            <div v-if='speak == 1'>
                <img src="../../srcImg/qun003.png" @touchend='speak = 0'>
                <form action="#">
                  <input type="text" v-model='txt'/>
                  <span @click='textPush'></span>
                </form>
            </div>
        </footer>
        <loading v-if='loading'></loading>
    </mt-popup>
</template>

<style lang='scss' scoped>

    @import '../../utils/baseVar.scss';

    #DRoom { 
        height: 100%;
        width: 100%;

        background: $friend001 no-repeat;
        background-size: 9.157407rem 10.277778rem;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        header {
            font-size: 0.43rem;
            line-height: 0.87037rem;
            height: 0.87037rem;
            padding: 0;
            border-bottom: 1px solid #CCBDA8;
            background: rgba(0,0,0,0);

            @include box-sizing();
            position: relative;
            width: 100%;
            top: 0;
            left: 0;
            ul {
                @include flexbox();
                height: 100%;
                color: #111;
                text-align: center;
                padding: 0 0.37037rem;
                @include justify-content(space-between);
                img{
                    vertical-align: sub;
                    width:0.824074rem;
                    width:0.888889rem;
                }
                li:first-child {
                        position: relative;
                    &>i {
                        display: inline-block;
                        width: 0.537037rem;
                        height: 0.416667rem;
                        position:absolute;
                        background: $friend002 no-repeat;
                        background-size: 0.537037rem 0.416667rem;
                        top: 50%;
                        @include translate(0,-50%);
                    }
                }
                li:nth-of-type(2) {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                }
                li:nth-of-type(3){
                    width: 1.907407rem;
                    height: 0.592593rem;
                    background: $qun005 no-repeat;
                    background-size: 1.907407rem 0.592593rem;
                    position: relative;
                    top: 0.148148rem;
                }
                li:last-child{
                    position: relative;
                    img{
                        height: 0.44rem;
                        width: 0.47rem;
                        margin-right: 0.092593rem;
                    }
                    font-size: 0.37rem;
                    line-height: 0.861111rem;
                }
                
            }
        }
        .chart{
            flex: 1;
            width: 100%;
            background: rgba(0,0,0,0);
            padding: 0.25rem 0.37037rem;
            position: relative;
            overflow: hidden;
            font-size: 0.388889rem;
            box-sizing: border-box;
            overflow-y: auto;
            overflow-x: hidden;
            li{
                text-align: left;
                padding-bottom: 0.4rem;
                position: relative;
                height: auto;
                .test{
                    max-width: 5.555556rem; 
                    padding: 0.1rem 0.185185rem; 
                    border:0.027778rem solid #E4E3E8; 
                    position: relative;
                    top: 0;
                    border-radius:0.185185rem;
                    padding-left:0.185185rem; 
                    border: 0 none;
                    word-wrap:break-word;
                    box-shadow: 0px 3px 10px 0px #ccc;
                    
                    margin-top: 0.14rem;
                    display: block;
                    word-wrap: break-word;
                    word-break:break-all;
                    white-space: pre-wrap;
                    p{
                        font-size: 0.388889rem;
                        line-height: 0.5rem;
                        position: relative;
                        top: -0.2rem;
                    }
                    b {
                        font-size: 0.36rem;
                        line-height: 0.4rem;
                        width: 5rem;
                        position: absolute;
                        top: -0.02rem;
                        transform: translate(0, -100%);
                        color: #333;
                        text-align: left;
                    }
                }
                .test span{
                    width:0; height:0; 
                    font-size:0; 
                    overflow:hidden; 
                    position:absolute;
                    top: 50%;
                    -webkit-transform: translate(0,-60%);
                       -moz-transform: translate(0,-60%);
                        -ms-transform: translate(0,-60%);
                         -o-transform: translate(0,-60%);
                            transform: translate(0,-60%);
                }
                .test span.bot{
                    border-width: 0.185185rem; 
                    border-style: solid dashed dashed; 
                }
            }
            li:before,li:after {
                content: "";
                display: block;
                clear: both;
            }
            .chart{
                width:100%;
                position: relative;
            }
            .left{
                img{
                    float: left;
                    width: 1.388889rem;
                    height: 1.435185rem;
                }
                .test{
                    background-color:white;
                    float: left;
                    left:0.462963rem;
                    // top:0.277778rem;
                    box-shadow: 0px 3px 10px 0px #ccc;
                }
                .test span.bot{
                    border-color: transparent white transparent transparent; 
                    left:-0.37037rem;
                    top:0.37037rem;
                }
            }
            .right{
                color: white;
                img{
                    float: right;
                    width: 1.388889rem;
                    height: 1.435185rem;
                }
                .test{
                    background-color:#07AD05;
                    // bottom:-0.185185rem;
                    float: right;
                    right:0.277778rem;
                    box-shadow: 0px 3px 10px 0px #ccc;
                    b{
                        text-align: right;
                        right: 0;
                    }
                }
                .test span.bot{
                    border-color:transparent  transparent transparent #07AD05; 
                    right:-0.351852rem; 
                    top:0.37037rem;
                }
            }
        }
        .chart::-webkit-scrollbar {
            display: none;
        }
        .careTip{
            width: 6.4rem;
            height: 4.4rem;
            padding: 0.12963rem;
            box-sizing: border-box;
            background: $friend010 no-repeat;
            background-size: 6.4rem 4.4rem;

            h3{
                font-size: 0.38rem;
                font-weight: 500;
                border-bottom: 2px solid #E9DAC5;
                margin: 0;
                padding: 0.185185rem 0;
            }
            label{
                padding-top: 0.333333rem;
                padding: 0.334rem 0.37037rem 0;
                font-size: 0.38rem;
                line-height:  0.740741rem;
                display: block;
                width: 100%;
                height: 0.740741rem;
                height: 1rem;
                box-sizing: border-box;
                text-align: left;
                input{
                    height: 100%;
                    width: 4.4rem;
                    background: rgba(0,0,0,0);
                    border: 0.018519rem solid #C7B8A3;
                    font-size: 0.35rem;
                    padding-left: 0.1rem;
                }
            }
            button{
              width: 1.6rem;
              height: 0.62rem;
              
              position: absolute;
              left: 100%;
              bottom: 0.4rem;
              border-radius: 0;
              transform: translate(-130%,0);
              border: 0 none;
              color: white;

              background: $qun002 no-repeat;
              background-size: 1.6rem 0.62rem;
            }
            
        }
        footer{
            width: 100%;
            height: 1.203704rem;
            background: rgba(0,0,0,0);
            border-top: 0.05rem solid #E8D9C4;
            box-shadow: 0 -0.05rem 0.2rem 0rem #E8D9C4;
            position: relative;
            img{
                width:0.833333rem;
                height:0.833333rem;
                
            }
            &>div{
                display: flex;
                align-items: baseline;
                flex-wrap: nowrap;

                img{
                    height: 0.833333rem;
                    width: 0.833333rem;
                    padding: 0;
                    position: relative;
                    top: 0.2rem;
                    left: 0.305556rem;
                }
                // 复用
                @mixin fuyon {
                    display:inline-block;
                    font-size:0.37037rem;
                    height:0.833333rem;
                    line-height:0.833333rem;
                    border:0.018519rem solid #DFDFE1;
                    text-align: center;
                    position:relative;
                    bottom:0.277778rem;
                    border-radius: 0.111111rem;
                    background-color:white;
                }
                span{
                    @include fuyon;
                    flex: 1;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    width: 7rem;
                    transform: translate(0,-50%);
                    margin-right: 0.56rem;
                }
                form {
                    flex: 1;
                    position: relative;
                    // bottom: 0.277778rem;
                    height: 0.833333rem;
                    input {
                        @include fuyon;
                        width: 5.4rem;
                        height: 0.8rem;
                        text-align : left;
                        padding : 0 0.277778rem;
                        border: 1px solid #E1D9C4;
                        box-sizing: border-box;
                        bottom: 0.0rem;
                        outline: none;
                        position: relative;
                        left: 0.13rem;
                        top: -0.1rem;
                    }
                    span {
                        @include fuyon;
                        width: 1.7rem;
                        height: 0.8rem;
                        margin-right: 0.092593rem;
                        background: $qun002 no-repeat;
                        background-size: 1.7rem 0.8rem;
                        position: relative;
                        top: 0.2rem;
                        right: -0.3rem;
                        transform: translate(0,0);
                    }
                }
            }
        }
    }

    .addFriend{
        width: 7.092593rem;
        @include border-radius(0.277778rem);
        position: absolute;
        top:8.240741rem;
        span{
          display: block;
          color:white;
          font-size: 0.611111rem;
          width:8.87037rem;
          height:2.12963rem;
          line-height: 1.805556rem;
          background: $home08 no-repeat;
          background-size:8.87037rem 1.805556rem;
          background-position: center;
          text-align: center;
          position: relative;
          right: 0.87037rem;
          bottom: 0.4rem;
        }

        p{
          input{
              @include border-radius(0.092593rem);
              height:0.925926rem;
              line-height:0.740741rem;
              font-size:0.462963rem;
              width:4.62963rem;
              position:relative;
              padding-left:0.185185rem;
              bottom:0.5rem;
              text-align: left;
          }
          
        }
        button{
          width:2.777778rem;
          height: 1.0rem;
          line-height:0.925926rem;
          @include border-radius(0.509259rem);
          font-size:0.555556rem;
          margin-bottom:0.462963rem;
          border: 0 none;
          color: white;
          background: $homeAll -1.944444rem -1.388889rem no-repeat;
          background-size: 5.555556rem 5.555556rem;
        }
        button:active {
            position: relative;
            left: 0.018519rem;
            bottom: -0.046296rem;
        }
    }


    .audio{
        // width: auto;
        height: 40px;
        -webkit-transform: translate(0,15%);
           -moz-transform: translate(0,15%);
            -ms-transform: translate(0,15%);
             -o-transform: translate(0,15%);
                transform: translate(0,15%);
    }
</style>

<script type="text/javascript">
	import Vue from 'vue';
    import http from '../../utils/httpClient.js';
    import loading from '../loading/loading.vue';
    Vue.component('loading', loading)
    // [2,961109,961,0,112233] 路由数据案例 // open
	export default {
        data: function(){
            return {
                loading: false,     // loading
                careTip : false,    // 提示窗
                errorTips: '',      // 错误提示

                DLRoom: false,      // 总开关-单聊
                give: false,        // 加减分弹框
                rank: 0,        // 玩家个人状态 - 房间内配置
                Uid: localStorage.oxUid,   // 个人id
                txt: '',            // 发送产生的文本

                Fen: 0 ,        // 加减分联系人的分数
                fObj: {},   // 总控数据

                sheName: '???',     // 对方名字
                sheId: 0,           // 对方id
                sheImg: '',      // 对方img

                startY: 0,      // 取消录音开始位置
                moveY: 0,       // 移动距离

                speak: 1,           // 语音是0 输入是1 
                isfriend: 0,        // 是好友1  不是0

                roomNum: 1,         // 房间号
                toid: 0,            // 对方的uid
                
                roomid: 0,          // 房间id
                rid: 0,          // 房间id
                add: '', // 加n分
                jian: '', // 减n分
                findFriend: false,

                L_Type: 0,  // 0-连接无法确保   1-连接保证
            }
        },
        mounted: function(){
            this.initDL();
            this.L_Type = 0;
        },
        updated: function(){
            var chat = document.getElementById("DLtxt");
            chat.scrollTop = chat.scrollHeight;
        },
        methods: {
            dlEse(){    // 单聊退出房间
                if(this.$store.state.system.t==1){
                    this.$store.state.system.t=0;
                    this.$parent.$parent.friend_VIP=false;
                    this.DLRoom=false;
                }else{
                    this.DLRoom=false;
                }
            },
            initDL(){
                var [self, id] = [this, this.Uid];
                audio_TYPE = 1 // 录音参数修正
                               
                var timeD = setTimeout(function(){
                    var chat = document.getElementById("DLtxt");
                    chat.scrollTop = chat.scrollHeight;
                    clearTimeout(timeD)
                },200)

                http.post( '/Chat/getChatList', { // 聊天记录
                            formid: localStorage.oxUid,
                            toid: self.sheId,
                            pagesize: 50,
                            p: 1,
                        })
                    .then(res => {
                        console.log(res)
                })
            },
            // 对方玩家名称
            heName () {
                // this.$store.dispatch('dl')         // 聊天登录
                http.post('/MemberFriend/getFriend',{
                    id : this.sheId,
                })
                .then(res => {
                    console.log(res)
                    if(res.status == 1){
                        this.sheName = res.data.zc_nickname;
                        this.sheImg = res.data.zc_headimg;
                    }
                    this.$store.state.txtType = "hz_niuniu_"+this.sheId;  // 聊天状态头
                    this.textPush(1) // 先发送一波
                })
            },
            addfen () {     // 加减分
                var zhi = this.add+this.jian;

                http.post('/RoomJoin/chagePoint',{
                    id: this.sheId,  // 设置人id
                    points: zhi,     // 增加或减少分数
                    roomid: this.rid,    // 房间id
                    type: this.add==''?2:1,    // 1加分 2减分
                })
                .then(res => {
                    console.log(res)
                    this.jian = '';
                    this.add = '';
                    if(res.status != 1){
                        
                        this.errorTips = res.msg;
                        this.careTip = true;
                    }
                })
            },
            // 发送文本
            textPush (n) {
                var self = this;
                var type = this.give;  // 加减分
                setTimeout(()=>{
                    if(self.L_Type != 1){
                        this.$store.dispatch('dl')
                        setTimeout(()=>{
                            this.textPush(1) // 先发送一波
                        },500)
                    }
                },500)

                var sendPrivateText = function () {
                    var id = conn.getUniqueId(); // 生成本地消息id
                    var msg = new WebIM.message('txt', id);// 创建文本消息
                    // console.log(msg);
                    msg.set({
                        msg: localStorage.oxName+'#(en&^*'+self.txt,   // 消息内容
                        to: "hz_niuniu_"+self.sheId,   // 接收消息对象（用户id
                        roomType: false,
                        success: function () {
                            console.log("消息发送cg");

                            self.L_Type = 1;

                            self.zj(self.sheId)
                            // 储存聊天记录
                            self.$store.state.obj = {
                                pageSize: 10,
                                p: 1,
                                myId: localStorage.oxUid,
                                toId: self.sheId,
                                d_q: 'chat',
                                type: [{      //消息bodies 
                                    "msg": self.txt,//消息内容
                                    "type": "text",//文本消息类型
                                }],
                                time: new Date().getTime(),
                                msg_id: id,
                                style: 2,
                                TAname: localStorage.oxName,
                            };
                            self.$store.dispatch('webKeep');     // 保存聊天记录

                            // 本地消息储存
                            var a = JSON.parse(localStorage.oxTxtAll);
                            var date = new Date().getTime();
                            if(!a[`${self.sheId}`]){
                                a[`${self.sheId}`] = [];
                            }
                            var QUN_LIAO = {
                                txt: 'txt',
                                type: 'singleChat',
                                name: localStorage.oxName,
                                toID: localStorage.oxUid,
                                time: date,
                                msg: self.txt,
                            }
                            a[self.sheId].push(QUN_LIAO)
                            self.$store.state.txt = a;
                            localStorage.oxTxtAll = JSON.stringify(a);
                            console.log('发送成功')

                            self.txt = '';  // 内容请零
                        },
                        fail: function(e){
                            console.log("消息发送失败");
                            self.txt = '';
                        }
                    });
                    msg.body.chatType = 'singleChat';
                    
                    conn.send(msg.body);// 单聊发送文本消息txtType
                };
                sendPrivateText();
            },
            
            //添加好友
            addFriend(){
                var self = this;
                // 添加好友
                conn.subscribe({
                    to: 'hz_niuniu_'+self.sheId,
                    // Demo里面接收方没有展现出来这个message，在status字段里面
                    message: localStorage.oxName+'#(h9aoyou*)',
                });
            },
            sendPrivateAudio : function (emdTime) {  // 群聊发送音频消息-要改单聊
                function dataURLtoBlob(dataurl) {
                    var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                    while(n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    return new Blob([u8arr], {
                        type: mime
                    });
                }

                function blobToFile(theBlob, fileName) {
                    //A Blob() is almost a File() - it's just missing the two properties below which we will add
                    theBlob.lastModifiedDate = new Date();
                    theBlob.name = fileName;
                    return theBlob;
                }
                

                var self = this;
                var id = conn.getUniqueId();                   // 生成本地消息id
                var msg = new WebIM.message('audio', id);      // 创建音频消息
                var blob = dataURLtoBlob(BASE64);

                var url = window.URL.createObjectURL(blob);
                var input = blobToFile(blob, emdTime+'#(en&^*'+localStorage.oxName+'.amr');
                var uri = {
                    url: '',
                    filename: '',
                    filetype: '',
                    data: '',
                };
                uri.data = input;
                uri.url = window.URL.createObjectURL(input);
                uri.filename = input.name || '';
                var index = uri.filename.lastIndexOf('.');
                if(index != -1) {
                    uri.filetype = uri.filename.substring(index + 1).toLowerCase();
                }
                var file = uri;

                console.log(file)                
                // if(1 == 1){
                //     return false;
                // }
                var allowType = {
                    'mp3': true,
                    'amr': true,
                    'wmv': true,
                };
                if (file.filetype.toLowerCase() in allowType) {
                    var url = null;
                    var option = {
                        apiUrl: WebIM.config.apiURL,
                        file: file,
                        to: "hz_niuniu_"+self.sheId, // 接收消息群组
                        roomType: false,
                        chatType: 'singleChat',
                        onFileUploadError: function () {      // 消息上传失败
                            console.log('onFileUploadError');
                        },
                        onFileUploadComplete: function (data) {   // 消息上传成功
                            console.log('消息上传成功');
                            self.zj(self.sheId)
                            if(audio_URL != null){
                                audio_URL == null;
                            }
                            BASE64 = null;
                            // debugger;
                            url = data.uri + '/' + data.entities[0].uuid;
                            console.log(data.uri)
                            console.log(data.entities[0].uuid)
                            console.log(url)
                        },
                        success: function (uid, sid) {                // 消息发送成功
                        },
                        flashUpload: WebIM.flashUpload,
                    };
                    msg.set(option);
                    // msg.setGroup('groupchat'); 群聊里需添加
                    conn.send(msg.body);
                }
            },
            // 开始录音
            startRecord: function (ev){
                if(audio_TYPE == 1){
                    var obj = new WebView_Object();
                    obj.startRecord();
                }
                ev= ev || event
                //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
                if(ev.touches.length == 1){
                    // 记录开始位置
                    this.startY = ev.touches[0].clientY;
                }
            },
            // 结束录音
            stopRecord: function () {
                var obj = new WebView_Object();
                obj.stopRecord();
                console.log(this.moveY)
                if(this.moveY >= 100){  // 取消录音
                    this.moveY = 0;
                    var rt_Text = document.getElementById('rtime');
                    rt_Text.innerText = '上拉取消';
                    rt_Text.style = 'color: #000';
                    return false;
                }

                var endTime = end_time;
                // 本地消息储存
                var self = this;        // 路由渲染
                var Qid = self.zn_chatid;               // 群id
                var a = JSON.parse(localStorage.oxQun);

                var setI_ks = setInterval(function(){
                    if(audio_URL != null){
                        var date = new Date().getTime();
                        var QUN_LIAO = {
                            txt: 'audio',
                            type: 'groupchat',
                            name: localStorage.oxName,
                            toID: localStorage.oxUid,
                            time: date,
                            msg: '_doc/audio/'+audio_URL,
                            endTime: endTime,
                        }
                        a[Qid].push(QUN_LIAO)
                        self.$store.state.txt = a;
                        localStorage.oxQun = JSON.stringify(a);
                        // 发送语音
                        self.sendPrivateAudio(endTime);
                        clearInterval(setI_ks)
                    }
                },500)
            },
            // 取消录音
            cancelRecord : function(e) {
                console.log(e)
                e= e || event
                //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
                if(e.touches.length == 1){
                    // 记录移动距离
                    this.moveY = this.startY - e.touches[0].clientY;
                    var rt_Text = document.getElementById('rtime');
                    if(this.moveY >= 100){
                        rt_Text.innerText = '取消录音';
                        rt_Text.style = 'color: #FF0000';
                    } else {
                        rt_Text.innerText = '上拉取消';
                        rt_Text.style = 'color: #000';
                    }
                }
            },
            // 播放
            bofan (e) {
                e = e.replace('_doc/audio/','')
                console.log(e)
                var obj = new WebView_Object();
                obj.playAudio(e);
            },
            // 最近联系记录
            zj(fid){
                http.post( '/Chat/contact', { // 聊天记录 sendIQ
                    fid: fid,
                })
                .then(res => {
                    console.log(res)
                })
            },

        }
                
            
    }
</script>