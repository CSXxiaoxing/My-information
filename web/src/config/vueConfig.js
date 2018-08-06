import Vue from 'vue';
const key = true;   // 开发环境为true ; 生产环境为false

// 1.silent
// 默认：false , true => 取消 Vue 所有的日志与警告。
Vue.config.silent = !key;



// 2.optionMergeStrategies
// Vue.config.optionMergeStrategies.testCsx = function (parent, child, vm) {
//     return child + 1
// }
// 父子参数的合并政策，相当于vuex的默认计算
// const Profile = Vue.extend({
//     testCsx: 5
// })
// console.log(Profile.options.testCsx) // 2

// 3.devtools
// vue-devtools是一款基于chrome游览器的插件
// 配置是否允许 vue-devtools 检查代码。开发版本默认为 true，生产版本默认为 false
Vue.config.devtools = key;

// 4.errorHandler
// 捕获项目线程错误（如无该变量），以免线程奔溃
Vue.config.errorHandler = function (err, vm, info) {
    console.error(err)
    console.warn('错误发生在：%c'+ info, "color:#58bc58")
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    // 只在 2.2.0+ 可用
}

// 5.warnHandler
// 捕获项目结构性错误（如标签或标签属性等代码写错）
Vue.config.warnHandler = function (msg, vm, trace) {
    console.error(msg+trace)
    trace = trace.match(/at (\S*)/)[1]
    console.warn('首要错误路径：%c'+ trace, "color:#58bc58")
    // `trace` 是组件的继承关系追踪
}

// 6.ignoredElements
Vue.config.ignoredElements = [
    // 用字符串定义一个标签名 如：
    // 'my-custom-web-component',
    // 'csx', // 任意命名标签
    // 用一个 `RegExp` 忽略所有“ion-”开头的元素：
    // 仅在 2.5+ 支持
    // 不忽略则抛出一个关于 Unknown custom element 的警告
    // /^ion-/
]

// 7.keyCodes
// 给键盘事件添加别名
Vue.config.keyCodes = {
    "hc": 13, // 回车
    // up: [38, 87]
}
/* <input type="text" @keyup.hc="test"> */
// 回车键弹起时执行自己在下面定义的test方法

// 8.performance
// true 时，在控制台的performance上的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪
Vue.config.performance = key;

// 9.productionTip
// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = key;

export default Vue