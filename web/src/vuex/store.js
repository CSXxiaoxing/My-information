import Vue from 'vue';
import Vuex from 'vuex';
// const http = Csx.http;
import bad from './badDict.js';

Vue.use(Vuex);

export default new Vuex.Store({
    // 字符串数据存储
    // 使用demo : this.$store.state.Music.autoplay
    state: {
        // 用户信息
        user: {
            test: 'aaa',
        },
        // modal参数与状态管理
        modal: {

        },


        // 默认数据
        initRoom: {
            radioValue: ['比J', '比Q', '比K', '无牛关机 (庄赢)'],
            ox: [ '牛一', '牛二', '牛三', '牛四', '牛五', '牛六', '牛七', '牛八', '牛九', '牛牛', '五花牛' ],
            oxK: '比Q',
            time: [30, 60, 120, 180, 300, 480],
            miss: ['秒', '分钟'],
            oxNumber: [1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 5, 10],
            // 一个中文两个字节
            nameLenth: 16,
            // 最低上分数
            minG: 5000,
            cardNum:0,
        },
        idRoom: {
            id: 0,              // 房间id
            room_id: 0,         // 房间number
            roomName: '',       // 房间名字
            oxK: '',            // 比什么
            scope: [1,100],     // 下注范围
            oxNumber: [],       // 倍率
            time: 30,           // 押注时间  
            open: false,        // 是否开放
            newMan: false,      // 新人确认
            cardFn: 0,          // 玩法（几副牌）
            room: 'bell',       // 房间计费方式
            scale: 1,           // 抽水比例
            minGrade: 100,      // 最小上庄分数
            zn_chatid: 0,       // 群聊号码
            ju: '',             // 上庄局数
            ForT: 0,            // 是否房主
        },
        placard:{
             message:'健康游戏，请勿赌博，谢谢合作',             //房间公告
        },
        time: {
            initTime: 6,    // 游戏初始化准备时间
            random: 3,      // 游戏选择庄牌时间
            speed: 80,      // 随机背景的速度
            endTime: 5,     // 庄开牌后等待时间
            countTime: 10,  // 剩下全开倒计时
        }, //基础时间设置
        // 设置值
        setRoom: {},
        badDict: bad,
    },
    // 属性计算
    // 使用demo ：this.$store.getters.doneTodos
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        },
    },
    // 方法，mutations必须同步执行 onCreateGroup
    // 使用demo : this.$store.commit('increment')
    mutations: {
        increment (state) {
            // 变更状态
        },
        ls () {   // 历史history
            history.back()
        },
    },
    // 这里的方法可异步执行
    // 使用demo : this.$store.dispatch('要调用的fn', data)
    actions: {
        webIM () {

        },
    },
   // module看文档，数据繁杂时使用。
})


