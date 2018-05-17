<template>
<div>
<mt-popup 
  width="80%"
  :visible.sync="set"
  append-to-body center class="set">

  <span class="top">倍率设置 <b class="close" v-on:click="set = false">×</b></span>
    <hr/>
  <div>
    <p>提示：大型牌的倍率不能低于小牌型</p>
    <dl>
        <dt>无牛</dt>
        <dd><span></span><span></span> 比J</dd>
        <dd><span></span><span></span> 比Q</dd>
        <dd><span></span><span></span> 比K</dd>
        <dd><span></span><span></span>无牛关机（庄赢）</dd>
    </dl>
  </div>
   <hr/>
    <div>
        <ul>
            <li>牛一<addButtion class="add"></addButtion></li>
            <li>牛二<addButtion class="add"></addButtion></li>
            <li>牛三<addButtion class="add"></addButtion></li>
            <li>牛四<addButtion class="add"></addButtion></li>
            <li>牛五<addButtion class="add"></addButtion></li>
            <li>牛六<addButtion class="add"></addButtion></li>
            <li>牛七<addButtion class="add"></addButtion></li>
            <li>牛八<addButtion class="add"></addButtion></li>
            <li>牛九<addButtion class="add"></addButtion></li>
            <li>牛牛<addButtion class="add"></addButtion></li>
            <li>五花牛<addButtion class="add"></addButtion></li>
        </ul>
        
    </div>
    <hr/>
    <mt-button type="success" round v-on:click="idMessage = false">更换账号</mt-button>
</mt-popup >
<loading v-if='loading'></loading>
</div>
</template>

<style lang='scss' scoped>
</style>

<script>
    import Vue from 'vue';
    import loading from '../../components/loading/loading.vue';
    Vue.component('loading', loading)
    export default {
        data() {
            return {
                loading: false,     // loading
            };
        },
        mounted: function(){
            // var self = this;
            // http.post({
            //     url: 'sel',vm:this
            // }).then(res => {
            //     self.datagrid = res.data;
            //     console.log(res.data)
            // })
        },
        methods: {

        }
    }
</script>