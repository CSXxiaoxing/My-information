  <!-- 客服 speak -->
  <template>
    <mt-popup   position="bottom"
      v-model="keType" id='DRoom'>
    	<header>
            <ul>
                <li>客 服</li>
            </ul>
        </header>

        <div class='chart'  id='KFtxt'>
            <ul>
                <li v-for="(text, idx) in connetArr" 
                :class='text.slice(0,3)=="K&5"?"right" :"left"'>
                    <img :src='text.slice(0,3)=="K&5" ? $store.state.user.userImg : "http://wanji888.hamingniao.com/Public/Static/tmp/kefu.png"'>
                    
                    <div class="test">
                        <span class="bot"></span>
                       {{text.slice(3)}}
                    </div>
                </li>
            </ul>
        </div>
        <div class='zw'></div>
        <footer>
            <form action="#">
                <input type="text" v-model='connet'/>
                <span @click='kf'></span>
            </form>
        </footer>
    </mt-popup>
</template>

<style lang='scss' scoped>
    @import '../../utils/baseVar.scss';
    #DRoom { 
        height: 10.277778rem; 
        width: 9.157407rem;
        margin-bottom: 1.6rem;
        margin-left: -0.255rem;

        box-sizing: border-box;

        background: $friend001 no-repeat;
        background-size: 9.157407rem 10.277778rem;
        box-shadow: 0 0 0.566rem 0rem #000;
        border-radius: 0.277778rem;
        overflow: hidden;
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
                height: 100%;
                color: #111;
                text-align: center;
                padding: 0 0.37037rem;
                li{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    font-size: 0.48rem;
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
            z-index: 8;
            li{
                text-align: left;
                padding-bottom: 20px;
                position: relative;
                height: auto;
                .test{
                    max-width:5.555556rem; 
                    padding:0.177778rem 0.185185rem; 
                    border:0.027778rem solid #E4E3E8; 
                    position: relative;
                    // top: 50%;
                    // transform: translate(0,-50%);

                    border-radius:0.185185rem;
                    padding-left:0.185185rem; 
                    border: 0 none;
                    word-wrap:break-word;
                    box-shadow: 0px 3px 10px 0px #ccc;
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
                    top:0.277778rem;
                    box-shadow: 0px 3px 10px 0px #ccc;
                }
                .test span.bot{
                    border-color: transparent white transparent transparent; 
                    left:-0.37037rem;
                    bottom:0.37037rem;
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
                    bottom:-0.24rem;
                    float: right;
                    right:0.277778rem;
                    box-shadow: 0px 3px 10px 0px #ccc;
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
        .zw{
            width: 100%;
            height: 1.203704rem;
            background: rgba(255,255,255,0);
        }
        footer{
            width: 100%;
            height: 1.203704rem;
            background: rgba(0,0,0,0);
            border-top: 0.05rem solid #E8D9C4;
            box-shadow: 0 -0.05rem 0.2rem 0rem #E8D9C4;
            position: absolute;
            bottom: 0;
            z-index: 10;
            img{
                height: 0.833333rem;
                width: 0.833333rem;
                padding: 0;
                position: absolute;
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
                    width: 6rem;
                    height: 0.8rem;
                    text-align : left;
                    padding : 0 0.277778rem;
                    border: 1px solid #E1D9C4;
                    box-sizing: border-box;
                    bottom: 0.0rem;
                    outline: none;
                    position: relative;
                    left: -0.08rem;
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
                    right: -0.24rem;
                    transform: translate(0,0);
                }
            }
        }
    }
</style>

<script type="text/javascript">
    import Vue from 'vue';
    import router from '../../router/';
    import http from '../../utils/httpClient.js';

	export default {
        data: function(){
            return {
                keType: false,
                connet: '',
                connetArr: [],
            }
        },
        mounted:function(){
            http.post( '/Chat/getFeedback', {
                    uid: localStorage.oxUid,
                })
            .then(res => {
                console.log(res)
                if(res.status==1){
                    this.connetArr = res.data;
                    this.xxtype = 1;
                }
            })
        },
        methods: {
            tz(){
                var timeKf = null;
                timeKf=setTimeout(()=>{
                    var chat = document.getElementById("KFtxt");
                    chat.scrollTop = chat.scrollHeight;
                    clearTimeout(timeKf)
                },500)
            },
            kf(){
                if(this.connet!=''){
                    this.connetArr.push("K&5"+this.connet)
                    http.post( '/Chat/Feedback', {
                        connect: this.connet,
                    })
                    .then(res => {
                        this.connet = '';
                        if(res.status==1){
                            // this.connetArr
                            // this.kefu=false;
                        } else if(res.status==2){
                            this.connetArr.push("H%3"+res.msg);
                            this.kefuType = 1;
                        }
                        console.log(res)
                    })
                } else {
                    this.kefu=false;
                }
            }
        }
                
            
    }
</script>