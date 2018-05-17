<template>
    <div>
    <mt-popup
    v-model="joinRoom"
    popup-transition="popup-fade" 
    class="join" >
        <p><i v-on:click="joinRoom = false"></i></p>
        <div class="joinCenter">
            <input type="text" maxlength='6' v-model.number='val' readonly/>
            <ul @click='number'>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li class="word">重输</li>
                <li>0</li>
                <li class="word">删除</li>
            </ul>
        </div>
    </mt-popup>
    <loading v-if='loading'></loading>
    </div>
</template>

<style  lang='scss' scoped>
    @import '../../utils/baseVar.scss';
    // border-radius
    .join{
        width: 8.444444rem;
        height: 8.916667rem;
        margin-top: -0.277778rem;
        .joinCenter{
            width: 6.296296rem;
            position: absolute;
            left: 50%;
            bottom: 0.2rem;
            -webkit-transform: translate(-50%,0);
               -moz-transform: translate(-50%,0);
                -ms-transform: translate(-50%,0);
                 -o-transform: translate(-50%,0);
                    transform: translate(-50%,0);
        }
        background: $oxCrowd_Join no-repeat;
        background-size: 8.444444rem 8.916667rem;
    p{
        height: 1.666667rem; width: 100%;
        i{
            position: absolute;
            right: 0;
            -webkit-transform: translate(-156%, 60%);
               -moz-transform: translate(-156%, 60%);
                -ms-transform: translate(-156%, 60%);
                 -o-transform: translate(-156%, 60%);
                    transform: translate(-156%, 60%);
            height: 0.555556rem;
            width: 0.555556rem;
            background: $oxCrowd_HDcha no-repeat;
            background-size: 0.555556rem 0.555556rem;
        }    
    }
    input{
        height: 1.12963rem;
        width: 100%;
        color: #fff;
        font-size: 0.666667rem;
        line-height: 1.092593rem;
        text-align: center;
        border: 1px solid #DBD4B8;
        border-radius: 13px;
        box-sizing: border-box;
        background: #DFC7A5;
        margin-bottom: 0.166667rem;
    }
    ul{
        width: 100%;
        font-size: 0.462963rem;
        @include flexbox();
        @include flex-wrap(wrap);
        @include justify-content(space-between);
        li{
            height: 1.24rem;
            width: 1.96rem;
            line-height: 1.231481rem;
            font-size: 0.703704rem;
            text-align: center;
            margin: 0.092593rem 0.0rem;
            color:white;
            background: $oxCrowd_LV no-repeat;
            background-size: 1.96rem 1.24rem;
        }
        li:active{
            position: relative;
            left: 0.018519rem;
            top: 0.046296rem;
        }
        .word{
            font-size:0.740741rem;
            background: $oxCrowd_H no-repeat;
            background-size: 1.96rem 1.24rem;
        }
    }
  }
</style>

<script>
    import http from '../../utils/httpClient.js';
    import router from '../../router/';
    import Vue from 'vue';
    import loading from '../../components/loading/loading.vue';
    Vue.component('loading', loading)

    export default {
        data() {
            return {
                loading: false,     // loading
                joinRoom: false,
                val: '',
            };
        },
    methods: {
        number(e) {
            var self = this;
            // 输入逻辑
            if(e.target.nodeName.toLowerCase() == 'li'){
                if(e.target.innerText == '重输'){
                    this.val = '';
                } else if(e.target.innerText == '删除'){
                    this.val = this.val.slice(0,-1);
                } else {
                    this.val = this.val+e.target.innerText;
                }
            }
            // 判断逻辑
            if(this.val.length == 6){
                var zhi = this.val
                http.post('/Room/getRooms',{
                        number: this.val,
                    },'',this)
                    .then(res => {
                        console.log(res)
                        if(res.status == 1) {
                            http.post('/Room/joinRoom' ,
                            {
                                zn_room_id : res.data.id,
                            }, '' ,this)
                            .then(res => {
                                if( res.status == 3 ){
                                    if(res.msg == "你是房主"){
                                        router.push({path: `room/${res.data.zc_number}`});
                                    } else {
                                        self.$parent.errorTips = '等待房主确认';
                                        self.$parent.careTip = true;
                                    }
                                } else if( res.status == 1){
                                    router.push({path: `room/${res.data.zc_number}`});
                                } else if( res.status == 0 ){
                                    self.$parent.errorTips = res.msg;
                                    self.$parent.careTip = true;
                                }
                            })
                        } else if( res.status == 0 ){
                            self.$parent.errorTips = '该房间不存在或不对外开放';
                            self.$parent.careTip = true;
                        }
                    })
            }else if(this.val.length > 6){
                this.val = this.val.slice(0,6)
            }
        },
    }
    };
</script>