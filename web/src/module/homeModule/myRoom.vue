<template>
    <div>
    <!-- img -->
    <mt-popup
        v-model="myRoom"
        popup-transition="popup-fade" 
        class="mine">
        <p><i @click="myRoom = false"></i></p>
            
        <div class="room">
            <div class="select" >
                <div>
                    <img  :class ='sel == 0 ? "left":"right"' src="../../srcImg/oxCrowd008.png" alt="">
                    <button @click='sel = 0 '>我开的房间</button>
                    <button @click='sel = 1 '>加入的房间</button>
                </div>
            </div>
            <div class='room_ul'>
                <ul @click='openS'>
                    <img src="../../srcImg/oxCrowd009.png"  v-show = '(!MYkai[0] && sel == 0) || (!MYjoin[0] && sel ==1)' alt="">
                    <p v-show = '(!MYkai[0] && sel == 0) || (!MYjoin[0] && sel ==1)'>你还没有创建/加入房间，快去创建/加入~~</p>
                    
                    
                    <li v-show = 'sel==0' v-for='(dataRoom) in MYkai' :key='"my"+dataRoom.id' :openState='`${dataRoom.zn_room_type == 1 ? "true" : "false"}`' :roomid = 'dataRoom.zc_number'>
                        <b v-if='dataRoom.zn_room_type == 1 ? true : false'></b>
                        <p>{{dataRoom.zc_title}}</p>
                    </li>


                    <li v-show = 'sel==1' v-for='(dataRoom) in MYjoin' :key='dataRoom.id' :openState='`${dataRoom.zn_room_type == 1 ? "true" : "false"}`' :roomid = 'dataRoom.zc_number'>
                        <b v-if='dataRoom.zn_room_type == 1 ? true : false'></b>
                        <p>{{dataRoom.zc_title}}</p>
                    </li>

                </ul>
            </div>
        </div>
    </mt-popup>
        <loading v-if='loading'></loading>
    </div>
</template> 

<style  lang='scss' scoped>
   @import '../../utils/baseVar.scss';
    // direction
    .mine{
        width: 8.518519rem;
        height: 9.481481rem;

        background: $oxCrowd_Join no-repeat;
        background-size: 8.518519rem 9.481481rem;
        @include border-radius(0.259259rem);
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

        .select{
            margin-left:0.740741rem;
            margin-bottom:0.23rem;
            padding:0.0rem 0.277778rem;
            width:5.185185rem;
            height:0.833333rem;
            line-height:0.87037rem;
            @include border-radius(0.462963rem);
            background-color: white;
            border: 0.046296rem solid #E1DFE0;
            position: relative;

            background: $oxCrowd_KBJ no-repeat;
            background-size: 5.833333rem 0.833333rem;

            div{
                width:5rem;
                // height:0.8rem;
                height: 100%;
            button{
                font-size:0.388889rem;
                text-align:center;
                width:2.4rem;
                height:0.6rem;
                line-height: 0.6rem;
                font-size: 0.416667rem;
                border: none;
                background-color: transparent;
                position: relative;
                border: none;
                outline: none;
                position:absolute;
                top: 50%;
                bottom:0.074074rem;
                -webkit-tap-highlight-color: #000000;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }
            button:nth-of-type(1){
                left: 0;
                @include translate(10%,-50%);
            }
            button:nth-of-type(2){
                right: 0;
                @include translate(-10%,-50%);
            }
            img{
              width:2.962963rem;
              height: 100%;
              position: absolute;
              left:0rem;
            }
            img.right{
              position: absolute;
              left: 100%;
              @include translate(-100%,0%);
              @include transition(all,1s);
            }
            img.left{
                position:absolute;
                // left:0.740741rem;
                left:0rem;
                @include transition(all,1s);
            }
            }
        }

        .room{
            @include flex(1);
            width: 7.111111rem;
            height: 7.851852rem;
            position: absolute;
            left: 50%;
            bottom: 0.18rem;
            padding-top: 0.203704rem;
            box-sizing: border-box;
            -webkit-transform: translate(-50%,0);
               -moz-transform: translate(-50%,0);
                -ms-transform: translate(-50%,0);
                 -o-transform: translate(-50%,0);
                    transform: translate(-50%,0);
            @include border-radius(0.259259rem);
            p{
              font-size: 0.31rem;
              color: #665F4F;
              width:5.907407rem;
              margin: 0.1rem auto;
            }
            .room_ul{
                overflow-y: auto;
                overflow-x: hidden;
                height: 6.5rem;
            }
            .room_ul::-webkit-scrollbar {
                display: none;
            } 
            ul{
                padding: 1.8%;
                @include flexbox();
                @include justify-content(space-between);
                @include direction(row);
                @include flex-wrap(wrap);
                li {
                    width: 49.5%;
                    height: 1.759259rem;
                    margin-bottom: 0.185rem;
                    position: relative;

                    background: $oxCrowd_LIBJ no-repeat;
                    background-size: cover;
                    background-position: center;
                    background-size: 100% 1.759259rem;

                    b{
                        display: block;
                        background: $oxCrowd_BJKF no-repeat;
                        background-size: 0.712963rem 0.76rem;
                        height: 0.76rem;
                        width: 0.712963rem;
                        float: left;
                        position: relative;
                        bottom: 0.010rem;
                        left: 0rem;
                    }
                    p{
                        width: 2.666667rem;
                        height: 0.611111rem;
                        padding: 0 0.296296rem;
                        box-sizing: border-box;

                        color: #EBF8E7;
                        font-weight: 600;
                        font-size: 0.277778rem;
                        line-height: 0.58rem;
                        // 文字
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        // 定位/图片
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        background: $oxCrowd_010 no-repeat;
                        background-size: 2.666667rem 0.611111rem;
                    }
                }
                img{
                    width: 4.074074rem;
                    height: 3.87037rem;
                    position: relative;
                    margin-top: 0.555556rem;
                    left: 50%;
                    -webkit-transform: translate(-50%,0);
                       -moz-transform: translate(-50%,0);
                        -ms-transform: translate(-50%,0);
                         -o-transform: translate(-50%,0);
                            transform: translate(-50%,0);
                }
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
                myRoom: false, 

                MYkai: [],      // 我开的房间
                MYkaiid: [],    // 去重
                MYkaiidALL: [],    // 去重
                MYjoin: [],     // 我进过的房间
                MYjoinid: [],   // 去重
                MYjoinidALL: [],   // 去重

                sel:0,
                CU: true,

                MYpagesize: 100,
                type :2 ,

            };
        },
        beforeMount: function () {
            this.kaiF(1);
            this.join(1);
        },
        beforeUpdate: function () {
            if(this.CU && this.myRoom){ // 更新要的数据
                this.kaiF(1);
                this.join(1);
            }
        },
        updated: function () {
            this.CU = this.myRoom ? false : true;
        },
        mounted: function(){},
        methods: {
            kaiF: function(p) { // 我开的房
                var [self,cd] = [this,this.MYpagesize];

                http.post('/Room/getRoomList' ,
                {
                    pagesize : cd,
                    type : self.type,
                    p : p,
                }, '')
                .then(res => {
                    if(res.data.length >= cd){
                        self.kaiF(p+1)
                        self.SET(1,res.data,false)
                    } else {
                        self.SET(1,res.data,true)
                    }
                })
            },
            join: function(p) { // 我进的房间
                var self = this;
                http.post('/Room/joinRoomList' ,
                   {
                      id : localStorage.oxUid,
                   }, '')
                   .then(res => {
                        self.SET(2,res.data,true)
                   })
            },
            SET: function(init,data,end){    // 去重算法
                var self = this;    // 房间   // 用于判断关掉的房间
                var arr = null, arrData=null, delID=null;

                if(init == 1){  // 开房
                    arr=self.MYkaiid;
                    delID=self.MYkaiidALL;
                    arrData=self.MYkai;
                } else if(init == 2){   // 加入房间
                    arr=self.MYjoinid;
                    delID=self.MYjoinidALL;
                    arrData=self.MYjoin;
                }
                console.log(data)
                if(data!=undefined){
                for(var i=0; i<data.length; i++){
                    var id = data[i].id;
                    if(arr.indexOf(id) <0){
                        arrData.push(data[i])
                        arr.push(id)
                    }
                    if(delID.indexOf(id) <0){
                        delID.push(id)
                    }
                }   
                }
                if(end){    // 去掉重复房间
                    var length = arrData.length-1;
                    for(var i=length; i>=0; i--){
                        var dID = arrData[i].id;
                        if(delID.indexOf(dID) <0){
                            arrData.splice(i,1);
                        }
                    }
                    delID = arr;
                }
                // 存入结果
                if(init == 1){  // 开房
                    self.MYkaiid=arr;
                    self.MYkaiidALL=delID;
                    self.MYkai = arrData
                } else if(init == 2){   // 加入房间
                    self.MYjoinid=arr;
                    self.MYjoinidALL=delID;
                    self.MYjoin = arrData
                }
            },
            openS(e){
                var self = this;
                let Etar = e.target;
                var Tar = () => {
                var EtarName = Etar.nodeName.toLowerCase();
                        if(EtarName == 'li'){
                          var nodeValue = Etar.attributes["openState"].nodeValue;

                          nodeValue == 'false' ? this.$refs.onOpenChild.onOpenRoom =
                          ++[[]][+[]]+[+[]] == 10 : 0.1+0.2 ==0.3;

                          if(nodeValue == 'true'){
                            this.sendId = Etar.attributes["roomid"].nodeValue
                            console.log(Etar.attributes["roomid"].nodeValue)
                            http.post('/Room/getRooms',{
                                          number: this.sendId,
                                      })
                            .then(res => {
                                if(res.status == 1) {
                                    http.post('/Room/joinRoom' ,
                                    {
                                        zn_room_id : res.data.id,
                                    }, '' ,this)
                                    .then(res => {
                                    console.log(res)
                                    
                                    if( res.status == 3 ){
                                        if(res.msg == "你是房主"){
                                            router.push({path: `room/${Etar.attributes["roomid"].nodeValue}`});
                                        } else {
                                            self.$parent.errorTips = '等待房主确认';
                                            self.$parent.careTip = true;
                                        }
                                    } else if( res.status == 1 ){
                                        router.push({path: `room/${res.data.zc_number}`});
                                    } else if( res.status == 0 ){
                                        self.$parent.errorTips = '你已在房间内，请退出当前房间';
                                        self.$parent.careTip = true;
                                    }
                                    })
                                }
                            })
                          }
                          return false;
                        } else if(EtarName == 'body'){
                          return false;
                        } else {
                          Etar = Etar.parentElement;
                          Tar();
                        }
                      };
                      Tar();
            },

        }
  }
</script>