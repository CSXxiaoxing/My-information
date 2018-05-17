<template>
    <mt-popup 
            v-model="message"
            popup-transition="popup-fade"
            class="message">
    	<header>
            <ul>
                <li>
                    <i><a @click='message = false'></a></i>
                </li>
                <li>发布公告</li>
                <li @click="placard()">发布</li>
            </ul>
        </header>
        <div class='imp'>
            <textarea name = "shuruk" 
                placeholder = '输入公告内容' 
                @keyup  = 'textNum'
                v-model = 'content'>
            </textarea>
            <!-- <input type="text" placeholder='输入公告内容'/> -->
            <p><span>{{num}}</span>/50</p>
        </div>
        <loading v-if='loading'></loading>
    </mt-popup>
</template>

<style lang='scss' scoped>
@import '../../utils/baseVar.scss';
    .message {
        height: 100%;
        width: 100%;
        background: #F7E6D2;
        
        header {
            height: 1.87037rem;
            padding: 1.018519rem 0.277778rem 0.0rem;
            -webkit-box-sizing: border-box;
               -moz-box-sizing: border-box;
                -ms-box-sizing: border-box;
                 -o-box-sizing: border-box;
                    box-sizing: border-box;
            background: #2F2E34;
            color: #fff;
            ul {
                height: 0.796296rem;
                line-height: 0.796296rem;
                display: -webkit-flex;
                display: -moz-flex;
                display: -ms-flex;
                display: -o-flex;
                display: flex;

                padding-bottom: 0.037037rem;

                font-size:0.425926rem;
                
                -webkit-justify-content: space-between;
                   -moz-justify-content: space-between;
                    -ms-justify-content: space-between;
                     -o-justify-content: space-between;
                        justify-content: space-between;
                li:nth-of-type(2){
                    text-align: center;
                }
                li:first-child {
                    &>i {
                        display: inline-block;
                        width: 0.648148rem;
                        height: 0.509259rem;
                        background: $roomAll -4.351852rem -1.481481rem no-repeat;
                        background-size: 5.555556rem;
                        position: relative;
                        top: 50%;
                        
                        -webkit-transform: translate(0, -50%);
                           -moz-transform: translate(0, -50%);
                            -ms-transform: translate(0, -50%);
                             -o-transform: translate(0, -50%);
                                transform: translate(0, -50%);
                        a {
                            padding: 0.259259rem 0.37037rem;
                        }
                    }
                }
            }
        }
        
        .imp{
            width: 100%;
            height: 860px;
            background: #fff;
            padding: 0.25rem 0.37037rem;
            position: relative;
            overflow: hidden;
            -webkit-box-sizing: border-box;
               -moz-box-sizing: border-box;
                -ms-box-sizing: border-box;
                 -o-box-sizing: border-box;
                    box-sizing: border-box;

            textarea {
                width: 100%;
                height: 100%;
                line-height: 0.648148rem;
                font-size: 0.388889rem;
                white-space: wrap;
                -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
                -webkit-user-select: none;
                -moz-user-focus: none;
                -moz-user-select: none;
                -webkit-appearance: none;
                outline: none;
                border: none;
            }
            p {
                font-size:0.425926rem;
                position: absolute;
                bottom: 0.277778rem;
                right: 0;
                -webkit-transform: translate(-50%, 0);
                   -moz-transform: translate(-50%, 0);
                    -ms-transform: translate(-50%, 0);
                     -o-transform: translate(-50%, 0);
                        transform: translate(-50%, 0);

            }
            span {
                color: #06B400;
            }
        }
    }
</style>

<script type="text/javascript">
    import http from '../../utils/httpClient.js';
    import Vue from 'vue';
    import loading from '../loading/loading.vue';
    import router from '../../router/';
    Vue.component('loading', loading)

	export default {
        data: function(){
            return {
                loading: false,     // loading
                message: false,     
                content: '',
                num: 0,
                maxLength:50,
                careTip : false,
                roomid: this.$store.state.idRoom.id,
                mess : '',
            }
        },
        mounted: function(){
            // init
            // console.log(this.time.random)
            // this.$store.dispatch('login_IM')
            // this.$imConn.onOpened()
        },
        methods: {
            textNum(){
                if( this.content.length<50){
                    this.num = this.content.length;
                }else{
                    this.num = 50;
                    this.content=this.content.slice(0,this.maxLength) + '' ;
                }
            },  
            placard(){
                var vx = this.$store.state.placard;
                var self = this;
                if(self.content==''){

                }else{
                    http.post( '/RoomJoin/placard' ,{
                    content : self.content,
                    token: localStorage.oxToken,
                    roomid : self.roomid,
                }, '' , this)
                    .then(res => {            
                    console.log(res)          
                        if(res.status == 1 || res.status == 3){
                           vx.message = self.content;
                           self.content="";
                           self.num = 0;
                           self.message = false;
                        }
                        
                    })
                }
            }
        }
    }
</script>