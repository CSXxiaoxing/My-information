<template>
<mt-popup
  position="bottom"
  v-model="toShare" class="share">
        <div class="jiantou">
            <img src="../../srcImg/toShare003.png" alt="" />
            <p v-if='share == "home"'>分享给朋友</p>
            <p v-if='share == "room"'>选择邀请方式</p>
            <img src="../../srcImg/toShare004.png" alt="" />
        </div>

        <div class="toShare_center">
    		<dl @click='dl'>
    			<dt><img src="../../srcImg/toShare001.png" height="174" width="174"></dt>
    			<dd>微信好友</dd>
    		</dl> 
    		<dl v-if='share == "home"' @click='cope'>
    			<dt>
                <img src="../../srcImg/toShare002.png" height="174" width="174"></dt>
    			<dd>复制链接</dd>
    		</dl> 
            <dl v-if='share == "room"' @click='room_toShare'>
                <dt><img src="../../srcImg/toShare005.png" height="174" width="174"></dt>
                <dd>游戏好友</dd>
            </dl>
        </div>
        <textarea id='wanzhi_url' v-show='false'>http://wanji888.hamingniao.com/Public/Static/tmp/index.html</textarea>
  		<p @click="toShare = false">取消</p>
</mt-popup>
</template>
<style lang='scss' scoped>
  .share{
    // felx
    width:100%;
    height: 5.462963rem;
    background-color: #F8F0DD;
    padding: 0 1.018519rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .jiantou{
        height: 1.2rem;
        position: relative;
      	p{
    		font-size: 0.462963rem;
    		line-height: 1.2rem;
      	}
        img{
            position: absolute;
            top: 50%;
            -webkit-transform: translateY(-50%);
               -moz-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                 -o-transform: translateY(-50%);
                    transform: translateY(-50%);
            width: 2.287037rem;
            height: 0.416667rem;
        }
        img:first-child{
            left: 0;
        }
        img:last-child{
            right: 0;
        }
    }
    .toShare_center{
        flex: 1;
        position: relative;
        dl{
            position: absolute;
            top: 50%;
            -webkit-transform: translateY(-50%);
               -moz-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                 -o-transform: translateY(-50%);
                    transform: translateY(-50%);
            font-size:0.37037rem;
            width: 50%;
            img{
              width:1.611111rem;
              height:1.611111rem;
              margin-bottom: 0.26rem;
            }
        }
        dl:nth-of-type(1){
            left: 0;
        }
        dl:nth-of-type(2){
            right: 0;
        }
    }

  	&>p:nth-of-type(1){
        height: 0.972222rem;
		font-size: 0.462963rem;
		line-height: 0.962963rem;
		background-color: #F8F0DD;
		clear: both;
    border-top: 1px solid #C6BEAB;
    // margin: 0 1.018519rem;
  	}
  }
</style>

<script type="es6">
  export default {
    data() {
      return {
        toShare: false,
        rid: 0,
      };
    },
    props: ['share'],
    methods: {
        dl(){
            share_WANJI();
        },
        cope(){
            var Url2=document.getElementById("wanzhi_url");
            Url2.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            mui.toast("复制成功!");
        },
        room_toShare(){
            console.log(this.$parent)
            this.toShare = false;
            this.$parent.to(4);
            
        }
    },
  };
</script>