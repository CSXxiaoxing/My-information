
<template>
    <Modal
        v-model="modal"
        title="需要添加的网址地址"
        @on-ok="ok"
        @on-cancel="cancel">
        <Input v-model="name" placeholder="请输入网址名称" clearable style='width: 50%;margin-right:10px;'/>

        <Select v-model="model1" style="width:40%" placeholder="请选择添加位置">
            <Option v-for="item in cityList" :value="item" :key="item">{{ item }}</Option>
        </Select>

        <Input v-model="http" placeholder="请输入网址地址"  icon="ios-paw-outline"
        clearable style='width: 80%; margin-top:15px;'/>
        
    </Modal>
</template>
<script>
    export default {
        data () {
            return {
                modal: false,
                kid: '',
                name: '',
                http: '',
                cityList: [ '入门基础', '中等教程', '深入学习', '待阅读'],
                model1: ''
            }
        },
        methods: {
            ok () {
                let $ = this;
                $.$Message.info('正在为您添加');

                $Csx.http.post('/text_url',{
                    type: 'Insert', // 添加
                    kid: $.kid,
                    url: $.http,
                    name: $.name,
                    genre: $.cityList.indexOf($.model1)+1
                }).then( res => {
                    console.log(res)
                    // this.$emit('urlData', res)
                })
            },
            cancel () {
                this.$Message.info('已取消添加');
            }
        }
    }
</script>
