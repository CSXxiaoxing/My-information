  <!-- 群聊 -->
  <template>
    <mt-popup id='chartRoom' position="top" :modal='false'
      v-model="chatLT" > 
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

    	<header>
            <ul>
                <li>
                    <i @click='$parent.$parent.friend_VIP=false,chatLT=false'></i>
                </li>
                <li>聊天室（{{lingth*1+1}}）</li>
                <li 
                    @click='$refs.onChartList.listOff = true,
                    $refs.onChartList.fanzhu = rank,$refs.onChartList.rid = rid,$refs.onChartList.fObj = fObj'>

                    <img src="../../srcImg/qun001.png" />
                </li>
            </ul>
        </header>

        <div class='chart'  id='txtbox'>
            <ul>
                <!-- 群聊 -->
                <li v-for="(data, idx) in $store.state.txt[zn_chatid]"
                :class="Uid != data.toID ? 'left' : 'right'"   
                :key = 'data.time' v-if='data.msg != ""'>
                    <img :src="Uid != data.toID ? $store.state.user.dict[data.toID] : $store.state.user.userImg">

                    <div class="test" v-if='data.txt == "txt"'>
                        <b>{{data.name}}</b>
                        <span class="bot"></span>
                        <p>{{data.msg}}</p>
                    </div>

                    <div class="test"  v-if='data.txt == "audio"'>
                        <span class="bot"></span>
                        <h5 class='audioP'>{{data.endTime}}</h5>
                        <audio 
                        @click='bofan(data.msg)'
                        :src='data.msg' v-show='true' class='audio'
                        :id='data.time' controls="controls" >
                        </audio>
                    </div>
                </li>
            </ul>
        </div>

        <footer>
        	<div v-if='speak == 0'>
                <img src="../../srcImg/qun004.png" @click='speak = 1'>
                <span @touchstart='startRecord' @touchmove='cancelRecord' @touchend='stopRecord'>按住 说话</span>
            </div>
            <div v-if='speak == 1'>
                <img src="../../srcImg/qun003.png" @click='speak = 0'>
                <form action="#">
                  <input type="text" v-model='txt'/>
                  <span @click='textPush'></span>
                </form>
            </div>
        </footer>
        <loading v-if='loading'></loading>
        <chartList ref="onChartList"></chartList>
    </mt-popup>
</template>

<style lang='scss' scoped>
    // test
    @import '../../utils/baseVar.scss';


    #chartRoom {
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
                height: 0.796296rem;
                line-height: 0.796296rem;
                display: flex;
                justify-content: space-between;
                font-size:0.4rem;
                position: relative;
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
                    -webkit-transform: translate(-50%,-50%);
                       -moz-transform: translate(-50%,-50%);
                        -ms-transform: translate(-50%,-50%);
                         -o-transform: translate(-50%,-50%);
                            transform: translate(-50%,-50%);
                }
                li:last-child {
                    img {
                        width: 0.583333rem;
                        height: 0.462963rem;
                    }
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
                    position: relative;
                    
                    margin-top: 0.4rem;
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
                &>.test{
                    background-color:white;
                    float: left;
                    left:0.462963rem;
                    // top:0.277778rem;
                    box-shadow: 0px 3px 10px 0px #ccc;
                    border-left: 0 none;
                    &>.audioP{
                        // width: auto;
                        position: absolute;
                        margin: 0;
                        right: 0;
                        top: 50%;
                        transform: translate(130%,-60%);
                        font-size: 0.388889rem;
                        line-height: 0.5rem;
                        z-index: 50;
                        font-weight: 300;
                    }
                }
                .test span.bot{
                    // border-right: 0 none;
                    border-color: transparent white transparent transparent;
                    left:-0.37037rem;
                    top:0.37037rem;
                    z-index: 3;
                }
            }
            .right{
                color: white;
                img{
                    float: right;
                    width: 1.388889rem;
                    height: 1.435185rem;
                }
                &>.test{
                    background-color:#07AD05;
                    // bottom:-0.185185rem;
                    float: right;
                    right:0.277778rem;
                    box-shadow: 0px 3px 10px 0px #ccc;
                    b{
                        text-align: right;
                        right: 0;
                    }
                    &>.audioP{
                        // width: auto;
                        position: absolute;
                        margin: 0;
                        left: 0;
                        top: 50%;
                        transform: translate(-130%,-60%);
                        font-size: 0.388889rem;
                        line-height: 0.5rem;
                        z-index: 50;
                        font-weight: 300;
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

    import chartList from './chartList.vue'; // 成员列表
    Vue.component('chartList', chartList)

    import loading from '../loading/loading.vue';
    Vue.component('loading', loading)
    // [2,961109,961,0,112233] 路由数据案例
	export default {
        data: function(){
            return {
                loading: false,     // loading √
                careTip : false,    // 提示窗 √
                errorTips: '',      // 错误提示 √
                chatLT: false,    // 总开关-群聊
                rank: 0, // 所在房间等级

                speak: 1,           // 语音是0 输入是1 √
                zn_chatid: 0,       // 群聊id（群）
                rid: 0,             // 房间id
                txt: '',            // 发送产生的文本
                Uid: localStorage.oxUid,   // 个人id
                fObj: {},   // 总控数据

                startY: 0,      // 取消录音开始位置
                moveY: 0,       // 移动距离

                chartList: [],      // 成员列表（群）
                lingth: 0,          // 成员人数（群）
                isfriend: 0,        // 是好友1  不是0
                Q_Type: 0,  // 0失效 1-666
            }
        },
        mounted: function(){
            var [self, id] = [this, this.Uid];
            audio_TYPE = 1 // 录音参数修正
            
            var timeD = setTimeout(function(){
                var chat = document.getElementById("txtbox");
                chat.scrollTop = chat.scrollHeight;
                clearTimeout(timeD)
            },200)

            // this.qunliao() // 加入群聊
            http.post( '/Chat/getChatList', { // 聊天记录 sendIQ
                        formid: localStorage.oxUid,
                        toid: self.zn_chatid,
                        pagesize: 50,
                        p: 1,
                    }, '', this )
                .then(res => {
                    console.log(res)
            })
        },
        updated: function(){
            var chat = document.getElementById("txtbox");
            if(chat.scrollHeight!=undefined){
                chat.scrollTop = chat.scrollHeight;
            }
        },
        methods: {
            qunliao : function() {
                var self = this;
                var chat = document.getElementById("txtbox");
                if(chat.scrollHeight!=undefined){
                    chat.scrollTop = chat.scrollHeight;
                }
                var a = JSON.parse(localStorage.oxQun)
                if(!a[`${self.zn_chatid}`]){
                    a[`${self.zn_chatid}`] = []
                    self.textPush() // 先发送一波
                }
                localStorage.oxQun = JSON.stringify(a)
                self.$store.state.txt = JSON.parse(localStorage.oxQun) || '';

                var options2 = {                        // 获取用户加入的群组列表
                    success: function (resp) {
                        console.log("Response: ", resp)
                    },
                    error: function (e) {
                        console.log(e)
                    }
                }
                conn.getGroup(options2); 
                var addGroupMembers = function () {     // 加入群聊
                    var option3 = {
                        list: ['hz_niuniu_'+localStorage.oxUid],
                        roomId: self.zn_chatid,
                    };
                    conn.addGroupMembers(option3);
                };
                addGroupMembers()   // 群聊
            },
            // 发送文本
            textPush () {
                var self = this;
                setTimeout(()=>{
                    if(self.Q_Type != 1){
                        this.$store.dispatch('dl')
                        setTimeout(()=>{
                            this.textPush() // 先发送一波
                        },500)
                    }
                },500)
                // 群聊发送文本消息
                var sendGroupText = function () {
                    var id = conn.getUniqueId();            // 生成本地消息id
                    var Qid = self.zn_chatid;               // 群id
                    var msg = new WebIM.message('txt', id); // 创建文本消息
                    var option = {
                        msg: localStorage.oxName+'#(en&^*'+self.txt,   // 消息内容
                        to: self.zn_chatid,        // 接收消息对象(群组id)
                        roomType: false,
                        chatType: 'chatRoom',
                        success: function () {
                            self.Q_Type = 1
                            // 储存聊天记录
                            self.$store.state.obj = {
                                pageSize: 10,
                                p: 1,
                                myId: localStorage.oxUid,
                                toId: self.zn_chatid,
                                d_q: 'groupchat',
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
                            var a = JSON.parse(localStorage.oxQun);
                            var date = new Date().getTime();
                            if(!a[`${self.zn_chatid}`]){
                                a[`${self.zn_chatid}`] = [];
                            }
                            var QUN_LIAO = {
                                txt: 'txt',
                                type: 'groupchat',
                                name: localStorage.oxName,
                                toID: localStorage.oxUid,
                                time: date,
                                msg: self.txt,
                            }
                            a[Qid].push(QUN_LIAO)
                            self.$store.state.txt = a;
                            localStorage.oxQun = JSON.stringify(a);
                            self.txt = '';  // 内容请零
                        },
                        fail: function () {
                            // alert('群聊信息发送失败');
                            self.txt = '';
                        }
                    };
                    msg.set(option);
                    msg.setGroup('groupchat');
                    conn.send(msg.body);
                };
                
                // this.$store.state.txt = JSON.parse(localStorage.oxQun)
                sendGroupText()
            },
            sendPrivateAudio : function (emdTime) {  // 群聊发送音频消息
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
                    data: ''
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
                        to: self.zn_chatid,                   // 接收消息群组
                        roomType: false,
                        chatType: 'groupChat',
                        onFileUploadError: function () {      // 消息上传失败
                            console.log('onFileUploadError');
                        },
                        onFileUploadComplete: function (data) {   // 消息上传成功
                            console.log('消息上传成功');
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
                    msg.setGroup('groupchat');
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
            sl(){
                this.list()
            },
            // 玩家数量
            list (rid=this.rid) {
                var self = this;
                console.log(rid)
                this.chartList = [];
                // /RoomJoin/getJoinRoomList
                http.post('/RoomJoin/getJoinMessage',{
                    roomid: rid,
                })
                .then(res => {
                    console.log(res.msg)
                    if(res.status == 1){
                        this.chartList = res.msg;
                        self.lingth =  res.msg.length;
                    }
                })
            },
        }
    }
</script>