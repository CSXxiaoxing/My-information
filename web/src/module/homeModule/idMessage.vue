<template>
  <div>
  <mt-popup
    v-model="idMessage"
    popup-transition="popup-fade"
    class="mess" id='mes_swi'>
    <dl>
      <dt>
        <img :src='$store.state.user.userImg' alt="">
      </dt>
      <dd @click='changeTX'><span>更 换 头 像</span></dd>
    </dl>
    
    <ul>
      <li :class='ZD ? "":"baiBJ"'>
        <input type="text" v-model='name' :readonly='ZD'/>
        <img src="../../srcImg/idMessage3.png" @touchstart='ZD=!ZD' v-if='ZD'/>
        <b class='queren' v-if='!ZD' @click='changeName'></b>
      </li>
      <li>ID:{{id}}</li>
      <li>音乐 
            <span class='mess_swi'>
            <mt-switch v-model="$store.state.Music.autoplay">
            <span :class='[("onoff"),($store.state.Music.autoplay ? "on":"off")]'>
                {{$store.state.Music.autoplay ? "ON":"OFF"}}
            </span>
            </mt-switch>
            </span>
      </li>
      <li>音效 
          <span class='mess_swi'>
          <mt-switch v-model="$store.state.Music.musi">
          <span :class='[("onoff"),($store.state.Music.musi ? "on":"off")]'>{{$store.state.Music.musi ? "ON":"OFF"}}</span>
          </mt-switch>
          </span>
      </li>
    </ul>
    <i v-on:click="idMessage = false"></i>
    <p @click='loginOut'></p>
  </mt-popup>

  <loading v-if='loading'></loading>
  </div>
</template>

<style lang='scss' scoped>
    @import '../../utils/baseVar.scss';
        

  .mess{
    width:7.546296rem;
    height:4.87963rem;
    background: $idmess01 no-repeat;
    background-size:7.546296rem 4.87963rem;
        dl{
            float: left;
            width:2.514815rem;
            height:2.533333rem;
            position:relative;
            dt{
                position:relative;
                left: 0.451444rem;
                top:0.52963rem;
                width:2.333333rem;
                height: 2.37037rem;
                background: $idmess02 no-repeat;
                background-size:2.333333rem 2.37037rem;
                overflow: hidden;
                img{
                    width: 2.205926rem;
                    height: 2.175926rem;
                    z-index: 2px;
                    border-radius:0.185185rem;
                    padding-top:0.061296rem;
                    padding-right:0.010296rem;
                }
            }
            dd{
                color: white;
                position:relative;
                background-color: black;
                opacity: 0.7;
                width:2.175926rem;
                line-height:0.435185rem;
                left: 0.504444rem;
                border-radius:0px 0px 0.157407rem 0.157407rem;
                font-size:0.203704rem;
            }
        }
        ul{
            width:3.0rem;
            padding:0.509259rem 0.557407rem; 
            position:relative;
            font-size: 0.352963rem;
            float: left;
            text-align: left;
            li{
                margin-bottom: 0.122593rem;
                span{
                    position:absolute;
                    display:inline;
                    left:1.525926rem;
                }
            }
            li:nth-of-type(1){
                // width:2.27037rem;
                line-height: 0.494444rem;
                background-color: #DFC7A5;
                padding-left: 0.192593rem;
                border-radius: 0.925926rem;
                position: relative;
                height: 0.514rem;
                width: 76%;
                input{
                    border: 0 none;
                    background-color: rgba(0,0,0,0);
                    font-size: 0.277778rem;
                    line-height: 0.490741rem;
                    height: 0.490741rem;
                    width: 100%;
                }
                img{
                    position: absolute;
                    width: 0.157407rem;
                    height: 0.148148rem;
                    padding: 0.185185rem;
                    right: -0.04rem;
                    top: 50%;
                    -webkit-transform: translate(0,-50%);
                       -moz-transform: translate(0,-50%);
                        -ms-transform: translate(0,-50%);
                         -o-transform: translate(0,-50%);
                            transform: translate(0,-50%);
                }
                b.queren{
                    position: absolute;
                    right: -1.26rem;
                    top: 0;
                    width: 1.2rem;
                    height: 100%;
                    background: $login006 no-repeat;
                    background-size: 1.2rem 100%;
                }
            }
            li:nth-of-type(1).baiBJ{
                background-color: rgba(255,255,255,1);    
            }
        }
        i{
            position:absolute;
            right:-0.240741rem;
            top:-0.240741rem;
            width:0.944444rem;
            height:1.0rem;
            background:$idmess03 no-repeat;
            background-size:0.944444rem 1.0rem;
        }
        p{
            clear: both;
            position:relative;
            left:50%;
            top: 0.192593rem;
            transform:translateX(-50%);
            -webkit-transform:translateX(-50%);
            -moz-transform:translateX(-50%);
            width:3.361111rem;
            height:1.274074rem;
            background:$idmess04 no-repeat;
            background-size:3.361111rem  1.074074rem;
        }
    }
</style>

<script type="es6">
  import Vue from 'vue';
  import http from '../../utils/httpClient.js';
  import router from '../../router/';
  import loading from '../../components/loading/loading.vue';
  import { Switch } from 'mint-ui';
  Vue.component('loading', loading)
  Vue.component(Switch.name, Switch);
  export default {
    data() {
      return {
        loading: false,     // loading
        idMessage: false,
        ZD: true,   // 只读

        name : localStorage.oxName,
        id : localStorage.oxUid,
      }
    },
    mounted: function(){

    },
    methods: {
        changeTX: function(){ // 更换头像
            var self = this;
            var obj = new WebView_Object();

            window.JPEG = function(jpeg){
                // alert(jpeg)
                http.post('/Member/change_name',
                {
                    pic : jpeg,
                    // name: self.name,
                })
                .then(res => {
                    if(res.status == 1){
                        // localStorage.oxName =  res.msg.zc_nickname;
                        localStorage.oxImg = res.msg.zc_headimg;
                        self.$store.state.user.userImg = localStorage.oxImg;
                    }
                })
            }
            obj.galleryImg();
        },
        changeName: function(){ // 更换名字
            var self = this;
            this.ZD=true;
            http.post('/Member/change_name',
            {
                name: self.name,
            })
            .then(res => { 
                console.log(res)
                if(res.status == 1){
                    localStorage.oxName =  res.msg.zc_nickname;
                    self.$store.state.user.userName = localStorage.oxName
                }
            })
        },
        loginOut(){   // 退出
            var self =this;
            http.post('/Member/login_out',
            {
                token: localStorage.oxToken,
                uid: localStorage.oxUid,
            })
            .then(res => {
                console.log(res)
                if(res.status == 1){
                    localStorage.removeItem('oxToken')
                    self.idMessage = false
                    router.push({name: 'login'});
                } else if(res.status == 2){ // token失效
                    localStorage.removeItem("oxToken")
                    router.push({name: 'login'});
                }
            })
        }
        
      }
   }
</script>