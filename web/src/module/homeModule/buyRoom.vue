<template>
  <div>
  <mt-popup 
  v-model="buyRoom" 
  popup-transition="popup-fade" 
  class="buy" >
  <div class="buyR_modal" style='z-index: 2000' @touchend='noBuyMoal'></div>
    <mt-popup
      v-model="moreCard"
      popup-transition="popup-fade"
      :modal='false'
      class="more">
        <span>
            <b @click="noBuyMoal"></b>
        </span>
        <p>{{cardNumError}}</p>
        <p>请输入购买的房卡数量</p>
        <input  class="num" v-model.trim='cardNum' ></input>
        <mt-button @click="cardNumber" ></mt-button>
    </mt-popup>
    <mt-popup 
        v-model="buyK" :modal='false'
        popup-transition="popup-fade"
        class="caress" >
        <span><i @click="buyK = false">×</i></span>
        <mt-button @click="buyKa(1)">支付宝支付</mt-button>
        <mt-button @click="buyKa(2)">微信支付</mt-button>
    </mt-popup >

    <h1> <i v-on:click="buyRoom = false"></i></h1>

    <ul>
      <li>
        <table v-for='(cards,quest) in list'>
          <tr>
            <td rowspan="3"><img src="../../srcImg/oxCrowd017.png" height="250" width="258" alt=""></td>
            <td>{{cards.title}}</td
          </tr>
          <tr>
            <td v-if="quest != 3">RMB：{{cards.price}}元</td>
            <td v-if="quest == 3" class="sev">7折优惠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          </tr>
          <tr>
            <td>
                <button v-if="quest != 3" @click='buyCard(cards.num,cards.id)'></button>
                <mt-button  v-if="quest == 3" class="sevb" type="primary" @click="more"></mt-button>
            </td>
          </tr>
        </table>
      </li>
    </ul>
  </mt-popup>
  <loading v-if='loading'></loading>
  </div>
</template>

<style lang='scss' scoped>
    @import '../../utils/baseVar.scss';
    .buyR_modal{
            position: absolute; 
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            width: 200%;
            height: 200%;
            filter:alpha(opacity=50);
            -moz-opacity:0.5;  
            -khtml-opacity: 0.5;  
            opacity: 0.5;
            background: #000;
            display: none;
    }
    // 点击按钮
    .button {
        background-position: center;
        border: 0 none;
        outline: none;
        color: white;
        &:active {
            position: relative;
            top: 0.046296rem;
            left: 0.018519rem;
        }
    }
    .buy{
        width: 7.768519rem;
        height: 12.944444rem;
        background: $buyRoom no-repeat;
        background-size: 7.768519rem 12.944444rem;

        h1{
            height: 1.9rem;
            font-size:0.555556rem;
            font-weight:bolder;
            color: #5E4205;
            text-align:center;
            i{
                position:absolute;
                right:0.185185rem;
                top:0.26rem;
                width: 0.925926rem;
                height: 0.925926rem;
                padding-right:0.092593rem;
                background: $oxCrowd_018 no-repeat;
                background-size: 0.925926rem 0.925926rem;
            }
        }
        ul{
            text-align: center;
            li{
                table{
                    img{
                      width:2.388889rem;
                      height:2.314815rem;
                    }
                    position: relative;
                    left:3.05rem;
                    bottom: 0.277778rem;
                    width: 5.925926rem;
                    height: 2.5rem;
                    transform: translate(-50%, 0);
                }
            }
        }
        table{
            font-size:0.388889rem;
            background-color: white;
            width:6.111111rem;
            height: 2.5rem;
            @include border-radius(0.277778rem);
            margin: 0.185185rem 0.0rem 0.185185rem 0.833333rem;
            text-align:left;
            button{
                width: 2.416667rem;
                height: 0.685185rem;

                background: $oxCrowd_016 no-repeat;
                background-size: 2.416667rem 0.685185rem;
                @extend .button;
            }
            tr{
                td{
                    img{
                        display: block;
                        width: 2.1rem;
                        height: 2.1rem;
                        margin-left: 0.15rem;
                    }
                }
            }
            
            tr:nth-of-type(1){
                td:nth-of-type(2){
                    padding-top:0.277778rem;
                    padding-left: 0.185185rem;
                }
            }

            tr:nth-of-type(2){
                color:#149824;
                td{
                    padding-left: 0.185185rem;
                }
            }
            .sev{
                text-align: left;
                color:#3B87C5;
            }
            .sevb{
                background: $oxCrowd_019 no-repeat;
                background-size: 2.416667rem 0.685185rem;
            }
            
        }
    }
    .caress{
        border-radius: 0.277778rem;
        width: 8.425926rem;
        height: 5.37037rem;
        background: url('../../image/careTipK.png') no-repeat;
        background-size: 8.425926rem 5.37037rem; 
        margin-top: -1rem;
        span{
            display: block;
            color:white;
            font-size: 0rem;
            width:8.87037rem;
            height:2.12963rem;
            line-height: 1.805556rem;

            text-align: center;
            position: relative;
            right: 0.87037rem;
            bottom: 0.462963rem;
            position: relative;
            i{
                display: block;
                height: 0.611111rem;
                width: 0.611111rem;
                position: absolute;
                right: 0%;
                top: 50%;
                transform: translate(-80%, -50%);
                background: url('../../image/careTip01.png') no-repeat;
                background-size: 0.611111rem 0.611111rem;
            }
        }

        button{
          width:4rem;
          height: 1.2rem;
          line-height:0.925926rem;
          border-radius: 0.509259rem;
          font-size:0.555556rem;
          margin-bottom:0.462963rem;
          border: 0 none;
          color: white;
          background: url('../../image/zhifu.png') no-repeat;
          background-size: 4rem 1.2rem;
          position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-66%);
        }
        button:nth-of-type(2){
          width:4rem;
          height: 1.2rem;
          line-height:0.925926rem;
          border-radius: 0.509259rem;
          font-size:0.555556rem;
          margin-bottom:0.462963rem;
          border: 0 none;
          color: white;
          background: url('../../image/zhifu.png') no-repeat;
          background-size: 4rem 1.2rem;
          transform: translate(-50%,66%);
        }
        // button:active {
        //     position: relative;
        //     left: 0.018519rem;
        //     bottom: -0.046296rem;
        // }
    }
  .more{    // 购买房卡
      width: 8.407407rem;
      height: 5.787037rem;
      background: $oxCrowd_015 no-repeat;
      background-size: 8.407407rem 5.787037rem;

      @include border-radius(0.185185rem);
      span{
        display: block;
        color:white;
        font-size: 0.62963rem;
        width:8.796296rem;
        height:1.805556rem;
        line-height: 1.527778rem;

        background-position: center;
        text-align: center;
        position: relative;
        right: 0.833333rem;
        bottom: 0.277778rem;
        
          b{
            display: block;
            height: 0.611111rem;
            width: 0.611111rem;
            position: absolute;
            right: 0%;
            top: 50%;
            transform: translate(-80%, -50%);
            background: url('../../image/careTip01.png') no-repeat;
            background-size: 0.611111rem 0.611111rem;
          }
      }

      p:nth-of-type(1){
        padding-bottom: 0.185185rem;
        position:relative;
        bottom:0.277778rem;
        color:red;
        text-align:center;
        font-size:0.416667rem;
      }
      p:nth-of-type(2){
        margin-bottom: 0.185185rem;
        margin-left: 1.28rem;
        font-size:0.324074rem;
        font-weight: bold;
        text-align: left;
      }

      .num{
        width: 6.018519rem;
        height: 1.064815rem;
        font-size: 0.666667rem;
        text-align: center;
        margin: 0.0rem 0.0rem 0.0rem 0.092593rem;
        @include border-radius(0.138889rem);
        border: 0.027778rem solid #D2C3AE; 
        color: #0BBA05;
        background-color: rgba(0,0,0,0);
      }
      button{
        @include border-radius(0.481481rem);
        width: 3.305556rem;
        height: 0.962963rem;
        line-height: 0.962963rem;
        font-size:0.555556rem;
        margin: 0.398148rem 0;

        background: $login006 no-repeat;
        background-size: 3.305556rem 0.962963rem;
        @extend .button;
      }
    }
</style>

<script type="es6">
  import Vue from 'vue';
  import http from '../../utils/httpClient.js';
  import router from '../../router/';
  import loading from '../../components/loading/loading.vue';
  Vue.component('loading', loading)
  export default {
    data() {
      return {
        loading: false,     // loading
        buyK: false, // 选择支付方式

        buyRoom: false,
        moreCard: false,
        cardNum: '',
        cardNumError: 'n张以上，几折优惠',
        list:[],

        num:0,
        num_id:0,
      };
    },
    mounted:function(){
        //房卡列表
          var self = this;
          http.post('/RoomCard/getData',{

          })
          .then(res=>{
            //console.log(res)
            if(res.status == 1){
                for(let i in res.data){
                    self.list.push({
                        title : res.data[i].zc_title,
                        price : res.data[i].zn_price,
                        image : res.data[i].zc_image,
                        num : res.data[i].zn_num,
                        id : res.data[i].zn_cat_id,
                    })
                }
                self.cardNumError = self.list[3].num + '张以上，7折优惠'
                console.log(self.list);
                console.log(self.list);
            }
          })
    },
    methods: {
        buyKa(n){   // 购买
            var self = this;
            var href = window.location.href;
            console.log(window.location.href)
            href=href.replace('#','');
            //http://www.hamingniao.com/index/pay/index?type=1&uid=hmn92c450b9c639ef4cafd66e2c8f09d6dd&fee=0.01&order_no=1524297129961281&url=http://www.wanjiba888.com/RoomCard/getReturn&returnurl=http://localhost:8090/#/home&sign=8F5C0517015153E2C528C0EB710A8345
            //http://www.hamingniao.com/index/pay/index?type=1&uid=hmn92c450b9c639ef4cafd66e2c8f09d6dd&fee=0.01&order_no=1524297779991505&url=http://www.wanjiba888.com/RoomCard/getReturn&sign=A28D6D9021F1D18B5F691F87A10553FF&returnurl=file:///storage/emulated/0/Android/data/io.dcloud.HBuilder/apps/HBuilder/www/index.html#/home
            http.post('/RoomCard/buyCard',{
                    id: Number(localStorage.oxUid),
                    commodityid: Number(this.num_id),
                    returnurl: href,
                    num: Number(this.num),
                    type: n,// 1支付宝 2微信
                },'',this)
                .then(res => {
                    if(n==1){
                        self.$parent.iframeCss = 'iframeCss02';
                    } else {
                        self.$parent.iframeCss = 'iframeCss03';
                    }
                    
                    self.$parent.iframe = res.url;
                    console.log(res.url)
                    // window.open(res.url)
                })
        },
        buyCard(num,id){      // 购买房卡
            this.num = num;
            this.num_id = id;
            this.buyK = true;
        },
        cardNumber(){
            let reg = new RegExp("^[0-9]*$");
            if(!reg.test(this.cardNum)){
                this.cardNumError = '请输入正确数量';
                setTimeout(()=>{
                    this.cardNumError = 'N张以上，几折优惠';
                }, 1800)
                return false;
            } else if(this.cardNum == 0){
                this.cardNumError = '请输入房卡数量';
                setTimeout(()=>{
                    this.cardNumError = 'N张以上，几折优惠';
                }, 1800)
                return false;
            } else {
                console.log(this.cardNum.replace(/^[0]+/,''))
                this.buyCard(this.cardNum,4);
            }
        },
        buyModal(event) {
            var vModal = document.getElementsByClassName('buyR_modal')
            var Cvar = document.getElementsByClassName('buy')
            var touModal = ()=>{
                vModal[0].style.zIndex <= Cvar[0].style.zIndex ? 
                ( vModal[0].style.zIndex++ && touModal() ) : 
                vModal[0].style.display = 'block';
            }
            touModal()
        },
        noBuyMoal() {
            this.moreCard = false;
            document.getElementsByClassName('buyR_modal')[0].style.display = 'none';
        },
        more() {
            this.buyModal(event);
            this.moreCard = true;
        },
    }
  }
</script>