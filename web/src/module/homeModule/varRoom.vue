<template>
    <div>
    <div class="varR_modal" :style='"z-index:"+zidx' @click='noModal'></div>
    <mt-popup 
      v-model="boxState.coreVisible"
      popup-transition="popup-fade" 
      :modal='false' :style='"z-index:"+setZidx'
      class="set"> 
        <i @click='boxState.coreVisible=false'></i>
        <p class="top">
            倍率设置 
        </p> 
      <div class="DLUL">
        <p>提示：大型牌的倍率不能低于小牌型</p>
        <dl>
            <dt>无牛</dt>
            <dd>
                <div class="dd_radio">
                    <div v-for='d in 4' @click='test(d)'>
                        <label class="mint-radiolist-label" >
                            <span class="mint-radio">
                                <input type="radio" class="mint-radio-input" :value='d' name="Dradio" v-model="initData.zn_ext" />
                                <span class="mint-radio-core"></span>
                            </span>
                            <span class="mint-radio-label">{{oxOpen.radioValue[d-1]}}</span>
                        </label>
                    </div>
                </div>
            </dd>
        </dl>
 
        <ul>
            <li v-for='(data, index) in oxOpen.ox'>
                <span>{{data}}</span>
                <!-- <addButtion class="add" :oxNum = 'index+1' ></addButtion> -->
                <div class='addButtion add' >
                    <button @click='addButtion(index+1,0)'>+</button>
                    <input type="text"  disabled :value='JSON.parse(initData.zc_rate)[index+1]'/>
                    <button @click='addButtion(index+1,1)'>-</button>
                </div>
            </li>
        </ul>
      </div>
        <hr/>
        <mt-button @click="coreVisible" ></mt-button>
    </mt-popup >
    <mt-popup
        v-model="boxState.card"
        popup-transition="popup-fade" 
        :modal='false' :style='"z-index:"+cardZidx'
        class="card" >
        <i @click='boxState.card=false'></i>

        <p>
            房卡消耗方式 
        </p>
        <div></div>
    </mt-popup>

    <mt-popup 
    v-model="boxState.CvarRoom" 
    popup-transition="popup-fade"  
    class="Cvar" >
    <i @click='boxState.CvarRoom=false'></i>
    <mt-popup
        v-model="boxState.no"
        popup-transition="popup-fade" 
        :modal='false'
        class="no">
        <b class="close" @click="noModal"></b>
        <p>该功能暂未开放</p>
    </mt-popup>
    <!-- touchstart touchmove touchend varR_modal -->
    <h3>创建房间</h3>
    <div  class='varRoomSet'>
    <ul @click="open" v-show='showVar==0'>
        <li>
            <label  @click="card = true">
                房号：<span>{{initData.zc_number}}</span>
            </label>
            <label :judge='"open"' @click='boxNo'>
                <span>
                    <img src="../../srcImg/oxCrowd012.png" v-show='initData.zn_room_type==1' height="81" width="76" alt="" />
                </span>
                公开
            </label>
        </li>
        <li>
            <span>房名：</span>
            <input type="text" v-model.trim="initData.zc_title" :placeholder='init.plaName' :class='init.error.zc_title ? "error" : ""' @focus='init.error.zc_title = false' @change="inputChange"/>
        </li>
        <li>
            <span>新人进房确认</span>
            <mt-switch v-model="newMan" class="onOff">
            </mt-switch>
        </li>
        <li>
            <span>玩法：</span>
            <label :judge='"cardFn5"'>
                <span>
                    <img src="../../srcImg/oxCrowd012.png" v-show='initData.zn_play_type == 1' height="81" width="76" alt="" />
                </span>
                5副牌
            </label>
            <label :judge='"cardFn7"'>
                <span>
                    <img src="../../srcImg/oxCrowd012.png" v-show='initData.zn_play_type == 2' height="81" width="76" alt="" />
                </span>
                7副牌 
            </label>
        </li>
        <li>
            <p>
                房间付费模式：
                <span @click="boxSet">付费详情</span>
            </p>
            <label :judge='"bell"'>
                <span>
                    <img src="../../srcImg/oxCrowd012.png" v-show='initData.zn_pay_type == 1' height="81" width="76" alt="" />
                </span>
                钟点房 
            </label>
            <label :judge='"day"'>
                <span>
                    <img src="../../srcImg/oxCrowd012.png" v-show='initData.zn_pay_type == 2' height="81" width="76" alt="" />
                </span>
                日费房 
            </label>
            <div class="clear"></div>
        </li>
        <li>
            <p>
                倍率设置：
                <span @click="boxSet">点击设置倍率</span>
            </p>
        </li>
        <li>
            <dl>
                <dt>无牛(X1)</dt>
                <dd v-for='(cent,index) in JSON.parse(initData.zc_rate)' v-if='index!=11'>
                    {{oxOpen.ox[index]}}(X{{JSON.parse(initData.zc_rate)[index+1]}})
                </dd>
                <dd></dd>
            </dl>
        </li>
        <li>
            <p>可下注时间：</p>
            <div class="divTime">

                <label v-for='times in oxOpen.time' :judge='times' @click='initData.zn_bet_time=times'>
                    <span>
                        <img src="../../srcImg/oxCrowd012.png" v-show='initData.zn_bet_time == times'/>
                    </span>
                    {{times/60 >= 1 ? (times/60 + oxOpen.miss[1]): (times+oxOpen.miss[0])}}
                </label>
            </div>
        </li>
        <li>
            <p>
                庄家封顶预赔分或最低上庄分数：
            </p>
            <input type="text" onkeyup="this.value=this.value.replace(/\D/g, '')"  v-model.number='initData.zn_min_score' :class='init.error.minG ? "error" : ""' @focus='init.error.minG = false'/>
        </li>
        <li>
            <span>玩家下注范围：</span>
            <input type="text" onkeyup="this.value=this.value.replace(/\D/g, '')" v-model.number='initData.zn_bet_between_s' :class='init.error.minS ? "error" : ""' @focus='init.error.minS = false'/>
            <i></i>
            <input type="text" onkeyup="this.value=this.value.replace(/\D/g, '')" v-model.number='initData.zn_bet_between_e' :class='init.error.maxS ? "error" : ""' @focus='init.error.maxS = false'/>
        </li> 
        <li>
            <span>抽庄赢分比例：</span>
            <input type="text"  onkeyup="this.value=this.value.replace(/\D/g, '')" placeholder='输入数字' v-model.number='initData.zn_extract' :class='init.error.sca ? "error" : ""' @focus='init.error.sca = false'/>
            <span><span>%</span>(1-15)</span>
        </li>
        <li v-show='zao'></li>
    </ul>
     </div>
    <span @click="end" class='button12' v-show='!zao'></span>
  </mt-popup>
  
    <loading v-if='loading'></loading>
  </div>
</template>

<script>
    import Vue from 'vue';
    import http from '../../utils/httpClient.js';
    import router from '../../router/';

    import './varRoom.scss'
    import coreVisible from '../../module/homeModule/coreVisible.vue'
    // import addButtion from '../addButton/addButtion.vue';
    // Vue.component('addButtion', addButtion);
    Vue.component('coreVisible', coreVisible)

    import loading from '../../components/loading/loading.vue';
    Vue.component('loading', loading)

    export default {
        data() {
            return {
                loading: false,     // loading
                zao: false, //遮罩

                initType: 0,       //  0 是初创   1 是修改+
                showVar:0,
                zidx: -1, // 遮罩
                cardZidx: -1,  // 付费遮罩
                setZidx: -1, // 设置遮罩
                init: {
                    plaName: '请输入房间名称',
                    error: {
                        zc_title : false,
                        minG: false,
                        minS: false,
                        maxS: false,
                        sca : false,
                        inputS: false,
                    },
                },
                newMan: false,
                initData: {
                    id: null,                 // 房间id
                    zc_number : '',     // 房间号码
                    zc_title: '',       // 房间名字
                    zn_room_type: 2,    // 1公开 2不公开
                    zn_confirm: 2,      // 进房确认1需要 2不需要
                    zn_play_type: 1,    // 1=>5,2=>7;
                    zn_pay_type: 1,     // 1=>钟点房，2=>日费房
                    zn_bet_time: 30,    // 可押注时间
                    zn_min_score: 15000,// 最低上庄分
                    zn_bet_between_s: 2,// 最低下注分数
                    zn_bet_between_e: 600,// 最高下注分数
                    zn_extract: 5,      // 抽水比例
                    zn_ext: 2,     // 比j => 1  比k => 3 无牛关机=>4
                    zc_rate: "[1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 4, 5, 3]",  // 倍率-最后一个比什么
                    zn_chatid: 0,
                },
                oxOpen: {
                    time: [30, 60, 120, 180, 300, 480],
                    miss: ['秒', '分钟'],
                    radioValue: ['比J', '比Q', '比K', '无牛关机 (庄赢)'],
                    ox: ['牛一', '牛二', '牛三', '牛四', '牛五', '牛六', '牛七', '牛八', '牛九', '牛牛', '五花牛'],
                    nameLenth: 16, // 一个中文两个字节      
                },
                // 弹框状态
                boxState: {
                    CvarRoom: false,
                    coreVisible: false,
                    varModal: false,
                    no:false,
                    card:false,
                },
            };
        },
        created: function() {},
        mounted: function(){
            this.$store.dispatch('webIM')
            this.$store.dispatch('dl')
        },
        methods: {
            test(n){
                console.log(n)
                this.initData.zn_ext = n;
            },
            boxNo() {   // 功能暂未开放
                this.varMo();
                this.boxState.no = true;
                var noOpen = null;
                noOpen = setTimeout(()=>{
                    this.boxState.no = false;
                    clearTimeout(noOpen)
                }, 2000)
            },
            addButtion (idx,or) {   // 加减分
                var zc_rate = JSON.parse(this.initData.zc_rate);

                if(or==0){  // 加
                    if(zc_rate[idx]+1<=zc_rate[idx+1] || idx==11){
                        zc_rate[idx]+=1;
                        this.initData.zc_rate = JSON.stringify(zc_rate);
                    }
                } else { // 减
                    if(zc_rate[idx]-1>=zc_rate[idx-1]){
                        zc_rate[idx]-=1;
                        this.initData.zc_rate = JSON.stringify(zc_rate);
                    }
                }
            },

            open(e) {
                var [initData, judgeVal, nodeName, labelTarget, spanTarget, imgTarget] =  
                [this.initData, void 0, 
                e.target.nodeName.toLowerCase(), 
                e.target.attributes["judge"], 
                e.target.parentElement.attributes["judge"], 
                e.target.parentElement.parentElement.attributes["judge"]];
                try {
                    labelTarget ? judgeVal = labelTarget.nodeValue : 
                    nodeName == 'span' ? judgeVal = spanTarget.nodeValue : 
                    judgeVal = imgTarget.nodeValue;
                    judgeVal == 'open' ? (initData.zn_room_type == 2? initData.zn_room_type = 2 : initData.zn_room_type = 2) : 
                    judgeVal == 'cardFn5' ? initData.zn_play_type = 1 : 
                    judgeVal == 'cardFn7'? initData.zn_play_type = 2 : 
                    judgeVal == 'bell' ? initData.zn_pay_type = 1 : 
                    judgeVal == 'day' ? initData.zn_pay_type = 2 : false;


                    var initData = this.initData
                    labelTarget ? judgeVal = labelTarget.nodeValue : 
                    nodeName == 'span' ? judgeVal = spanTarget.nodeValue : 
                    judgeVal = imgTarget.nodeValue;

                } catch (er) {};
            },
            inputChange() {
                // roon过滤
                let [inp, badDI, nameSize] = [this.initData, this.$store.state.badDict, this.oxOpen.nameLenth];
                inp.zc_title = inp.zc_title.replace(badDI,'*');
                var [Val, count, ValArray] = [ [], 0, inp.zc_title.split('') ];
                for(var i=0; i<inp.zc_title.length; i++){
                    count += ValArray[i].replace(/[\u0391-\uFFE5]/g,"aa").length;
                    if(count > nameSize){
                        break;
                    } else {
                        Val.push(ValArray[i]);
                    }
                }
                inp.zc_title = Val.join('');
            },
            varMo() {
                var self = this;
                var [vModal, Cvar] = [document.getElementsByClassName('varR_modal')[0].style, 
                                      document.getElementsByClassName('Cvar')[0].style];
                this.zidx = 2000;
                1 ^ function touModal () {
                    if(self.zidx < Cvar.zIndex){
                        self.zidx++;
                        touModal()
                    } else {
                        vModal.display = 'block';
                        // Cvar.zIndex++;
                    }
                } ()
                // Cvar.zIndex = 1999;
                self.cardZidx = 3000;
                self.setZidx = 3001;
            },
            noModal() {
                let State = this.boxState;
                self.setZidx = -1;
                this.zidx = -1;
                self.cardZidx = -1;

                State.no = false ;
                State.card = false ;
                State.coreVisible = false ;
                document.getElementsByClassName('varR_modal')[0].style.display = 'none';
            },
            // 确认倍率
            coreVisible() {
                this.noModal();
                // 更新倍率最后的比什么
                var rate = JSON.parse(this.initData.zc_rate);
                rate.pop();
                rate.push(this.initData.zn_ext);
                this.initData.zc_rate = JSON.stringify(rate);
            },
            // 倍率/付费  公开
            boxSet(e) {
                e.target.innerText == '付费详情' ? this.boxState.card = true : 
                this.boxState.coreVisible = true ;
                this.varMo();
            },
            
            
            end () {
                this.init.error = {
                    zc_title : false,
                    minG: false,
                    minS: false,
                    maxS: false,
                    sca : false,
                    inputS: false,
                };


                var self = this;
                var [Err, git] = [this.init.error, this.initData];
                // 规则判断
                if(git.zc_title == ''){
                    Err.zc_title = true;
                    self.$parent.errorTips = '请输入房间名';
                    self.$parent.careTip = true;
                    return false;
                }
                Number(git.zn_min_score) <= 0 ? Err.minG = true : 
                Number(git.zn_bet_between_s) <= 0 ? Err.minS = true :
                Number(git.zn_bet_between_e) < Number(git.zn_bet_between_s) ? Err.maxS = true :
                Number(git.zn_extract) < 1 || Number(git.zn_extract) > 15 ? Err.sca = true : 
                false;


                if(!Err.zc_title && !Err.minG && !Err.minS && !Err.maxS && !Err.sca) {

                    if(self.initType == 0) {
                        var options = { // 创建聊天群组
                            data: {
                                groupname: '牛群'+localStorage.oxUid,
                                desc: '聊天室开发测试',
                                members: ['hz_niuniu_961','hz_niuniu_962'],
                                public: false,
                                approval: false,
                                allowinvites: true,
                            },
                            success: function (respData) {

                                var zn_confirm = this.newMan?1:2;
                                http.post("/Room/createRoom",{
                                    // zn_room_type : self.initData.zn_room_type,
                                    zn_room_type : 1,
                                    zc_number : self.initData.zc_number,
                                    zc_title : self.initData.zc_title,
                                    zn_confirm : zn_confirm,
                                    zn_play_type : self.initData.zn_play_type,
                                    zn_pay_type : self.initData.zn_pay_type,
                                    zn_bet_time : self.initData.zn_bet_time,
                                    zn_min_score : self.initData.zn_min_score,
                                    zn_extract : self.initData.zn_extract,
                                    zn_bet_between_s : self.initData.zn_bet_between_s,
                                    zn_bet_between_e : self.initData.zn_bet_between_e,
                                    zn_ext: self.initData.zn_ext,
                                    zc_rate : self.initData.zc_rate,


                                    zn_chatid : respData.data.groupid,      // 群聊号码
                                } , '' ,this)
                                .then(res=> {
                                    if(res.status == 1 && self.initData.zc_number > 0){
                                        router.push({path: `room/${self.initData.zc_number}`});
                                    }
                                })
                            },
                            error: function (err) {
                                self.$parent.errorTips = '创建失败';
                                self.$parent.careTip = true;
                            }
                        };
                        conn.createGroupNew(options);
                        // zc_number  zn_confirm
                    } else if(self.initType == 1){
                        var zn_confirm = this.newMan?1:2;
                        // console.log(self.initData.id)
                        // console.log(this.newMan)
                        http.post("/Room/updatedRoom",{
                            // zn_room_type : self.initData.zn_room_type,
                            zn_room_type : 1,
                            // zc_number : self.initData.zc_number,
                            zc_title : self.initData.zc_title,
                            zn_confirm : zn_confirm,
                            zn_play_type : self.initData.zn_play_type,
                            zn_pay_type : self.initData.zn_pay_type,
                            zn_bet_time : self.initData.zn_bet_time,
                            zn_min_score : self.initData.zn_min_score,
                            zn_bet_between_s : self.initData.zn_bet_between_s,
                            zn_bet_between_e : self.initData.zn_bet_between_e,
                            zn_extract : self.initData.zn_extract,
                            zn_ext: self.initData.zn_ext,
                            zc_rate : self.initData.zc_rate,
                            zn_chatid : self.initData.zn_chatid,
                            
                            roomid: self.initData.id,
                        } , '' ,this)
                        .then(res=> {
                            this.$parent.newData();
                            // if(res.status == 1 && self.initData.zc_number > 0){
                            //     self.$parent.errorTips = res.msg;
                            //     self.$parent.careTip = true;
                            // } else {
                            //     self.$parent.errorTips = res.msg;
                            //     self.$parent.careTip = true;
                            // }
                        })
                    }
                    
                    this.$store.state.setRoom = this.initData;
                    this.boxState.CvarRoom = false;
                }       // 确认创建
            },

        }
    }
</script>