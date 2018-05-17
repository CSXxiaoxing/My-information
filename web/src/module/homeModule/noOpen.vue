<template>
  <mt-popup 
    v-model="onOpenRoom"
    popup-transition="popup-fade" 
    class="tip" >
    <span>提示 <i @click="onOpenRoom = false">×</i></span>
    <p>该房间尚未公开</p>
    <mt-button @click="onOpenRoom = false">  确定
    </mt-button>
  </mt-popup >
</template>

<style lang='scss' scoped>
 @import '../../utils/baseVar.scss';
  // box-sizing
  .tip{
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
      background-position: center;
      background-size:8.87037rem 1.805556rem;
      text-align: center;
      position: relative;
      right: 0.87037rem;
      bottom: 0.462963rem;
      
      i{
        position: absolute;
        font-size: 1.296296rem;
        color: #028B00;
        right: 1.111111rem;
      }
    }

    p{
      height:1.666667rem;
      line-height:0.925926rem;
      text-align:center;
      font-size:0.462963rem;
    }
    button{
      width:3.305556rem;
      height: 1.018519rem;
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


</style>

<script type="es6">
  export default {
    data() {
      return {
        onOpenRoom: false
      };


    }
  };
</script>