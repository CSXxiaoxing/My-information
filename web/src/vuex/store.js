import Vue from 'vue';
import Vuex from 'vuex';
import bad from './badDict.js';

Vue.use(Vuex);

export default new Vuex.Store({
    // 字符串数据存储
    // 使用demo : this.$store.state.user.test
    state: {
        // 用户信息
        user: {
            test: 'aaa',
            cr: '猪头'
        },
        // modal参数与状态管理
        modal: [
            { id: 1, text: '...', done: true },
        ],
    },
    // 属性计算
    // 使用demo ：this.$store.getters.doneTodos
    getters: {
        doneTodos: state => {
            return state.modal.filter(todo => todo.id++)
        },
    },
    // 方法，mutations必须同步执行 onCreateGroup
    // 使用demo : this.$store.commit('increment')
    mutations: {
        increment (state) {
            // 变更状态
        },
        cr2 () {  
            console.log(520)
        },
    },
    // 这里的方法可异步执行
    // 使用demo : this.$store.dispatch('要调用的fn', data)
    actions: {
        webIM () {

        },
        cr3(a){
            console.log(886)
            console.log(a)
        }
    },
   // module看文档，数据繁杂时使用。
})


