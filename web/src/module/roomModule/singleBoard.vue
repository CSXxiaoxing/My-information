<template>
<div>
  <mt-popup 
    v-model="singleBoard"
    popup-transition="popup-fade" 
    class="single" >
    

    <mt-popup
        v-model="down"
        popup-transition="popup-fade" 
        :modal='false'
        class="down">
        <i @click="singleBoard = false"></i>
        <span>您的分数已低于上庄分数，如想继续坐庄，请联系房主加分。如不想继续，请点击下注。</span>
        <mt-button @click="down = false"></mt-button>
        <mt-button @click="down = false"></mt-button>
    </mt-popup>

    <span @click="down = true">单局结算 <i @click="singleBoard = false"></i></span>
    <table border="1" cellpadding="0" cellspacing="0">
      <thead>
        <tr>
          <td>昵称</td> <td>分数流水</td> <td>抽水分数</td> <td>结余分数</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>迷糊的诗诗 <img src="../../srcImg/room002.png"></td> <td>+100</td> <td>10</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td :class='"-20".indexOf("-") >= 0 ? "single_red":""'>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>+20</td> <td>10</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>+20</td> <td>10</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr class="total" >
          <td>房间余剩分数</td> <td colspan="3">+20</td>
        </tr>
        
      </tbody>
    </table>
  </mt-popup >
    <loading v-if='loading'></loading>
</div>
</template>

<style lang='scss' scoped>
  @import '../../utils/baseVar.scss';
//felx room_water1
    .single_red{
        color: #C75B1A;
    }
  .single{
    width: 9.555556rem;
    height: 15rem;
    background: $friend001 no-repeat;
    background-size: 9.555556rem 15rem;

    @include border-radius(0.277778rem);
    &>span:nth-of-type(1){
      display: block;
      font-size: 0.574074rem;
      width:8.87037rem;
      height:0.740741rem;
      margin-left:0.37037rem;
      line-height: 1.018519rem;
        i{
            position: absolute;
            background: $login008 no-repeat;
            right: -0.16rem;
            top: -0.24rem;
            background-size: 0.907407rem 0.972222rem;
            height: 0.972222rem;
            width: 0.907407rem;   
        }
    }
    
    table{
      width:8.925926rem;
      margin: 0.296296rem 0 0.277778rem 0.333333rem;
      text-align: center;
      background-color: white;
      border: 0.009259rem solid #BCBFB7;
      img{
        position: relative;
        top:0.092593rem;
      }
      tr{
        line-height:0.777778rem;
      }
        thead{
            color: #4D6131;
            tr{
              font-size: 0.351852rem;
              background-color: #D0E7B1; 
              font-weight: bold;
            }
        }
      tbody{
        color:#5F8C25;
        font-size:0.37037rem;
        tr:nth-of-type(2n){
          background-color: #EFF8E3;

        }
        td:nth-of-type(1){
          text-align:left;
          padding-left: 0.277778rem;
          color:#499BA5;
          width:2.592593rem;
        }
        .total{
          
          td{
            padding-right: 0.277778rem;
            color:#548512;  
            background-color: #D0E7B1;
          }
          td:nth-of-type(2){
            text-align:right;
            padding-right:0.648148rem;
            }
        }
      }
    }
  }

  

  .down{
    width: 8.796296rem;
    height: 6.018519rem;
    border-radius:0.277778rem;
    background: $idmess01 no-repeat;
    background-size: 8.796296rem 6.018519rem;

    i{
        position: absolute;
        background: $login008 no-repeat;
        right: -0.16rem;
        top: -0.24rem;
        background-size: 0.907407rem 0.972222rem;
        height: 0.972222rem;
        width: 0.907407rem; 
    }
    span{
        display:inline-block;
        color:red;
        width: 7.592593rem;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size:0.462963rem;
        text-align: left;
        // 文字
        display: block;
        word-wrap: break-word;
        word-break:break-all;
        white-space: pre-wrap;
    }

    button{
        width: 2.703704rem;
        height: 1.055556rem;
        border-radius: 0.509259rem;
        font-size:0.555556rem;
        margin:0 0.462963rem 0.277778rem 0.462963rem;
        border: 0 none;
        position: absolute;
        bottom: 0.7rem;
        
    }
    button:nth-of-type(1){
        background: $room019 no-repeat;
        background-size: 2.703704rem 1.055556rem;
        left: 0.7rem;
    }
    button:nth-of-type(2){
        background: $room020 no-repeat;
        background-size: 2.703704rem 1.055556rem;
        left: 4.5rem;
    }

    button:active {
        bottom: 0.66rem;
    }
  }
</style>

<script type="es6">
  import Vue from 'vue';
  import loading from '../../components/loading/loading.vue';
  Vue.component('loading', loading)
  export default {
    data() {
      return {
        loading: false,     // loading
        singleBoard: false,
        down: false,
      };
    },
    methods:{

  }
};
</script>