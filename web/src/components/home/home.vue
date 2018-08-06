<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        float: right;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>
<template>
	<div id='home' class="layout">

    <header class="header" :style="'background-color:'+header.hColor" @click='cr'>
        <!-- <ColorPicker v-model="header.hColor"  alpha class='hColor'/> -->
        <Menu mode="horizontal" theme="dark" active-name="1">
            <h2 @dblclick='setUser("hName")'>
                {{user.hName}}
                <div v-if='user.hShow'>
                <input type="text" 
                v-model="user.hName"
                @change='setUser("Update", "hName")' @blur='user.hShow = false' ref="hName">
                </div>
            </h2>
            <div class="layout-nav">
                <MenuItem name="1">
                    <Icon type="ios-navigate"></Icon>
                    Item 1
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-keypad"></Icon>
                    Item 2
                </MenuItem>
                <MenuItem name="3">
                    <Icon type="ios-analytics"></Icon>
                    Item 3
                </MenuItem>
                <MenuItem name="4">
                    <Icon type="ios-paper"></Icon>
                    Item 4
                </MenuItem>
                <MenuItem name="5">
                    <form action="http://www.baidu.com/baidu" target="_blank">
                        <Input name="word" icon="search" @on-click='hBaidu' placeholder="百度搜索" style="width: 200px"></Input>
                    </form>
                </MenuItem>
            </div>
            
        </Menu>

        
    </header>


    <main>
    <Row class-name="main">
        <mainL @urlData='urlData'></mainL>
        <mainR :dataUrl='mainR.data'></mainR>
    </Row>
    </main>
    <footer>
    </footer>
    <addUrl ref='addUrl'></addUrl>
	</div>
</template>



<script type="text/javascript">
    import './home.scss';
    import Vue from 'vue';
    import router from '../../router/';
    import userHttp from '../http/UserHttp';

    import mainL from './nav_left.vue';
    import mainR from './main_right.vue';
    import addUrl from '../../module/homeModule/addUrl.vue';

	export default {
		data: function(){
			return {
                user: {
                    uid: 1,
                    hName: '',
                    hShow: false,
                },
                dump: {}, // 转储
                header: {
                    hColor: 'rgba(73, 80, 96, 1)',     // 头部颜色
                    // hBaidu: '',     // 百度搜索
                },
                mainR: {
                    data: ''
                },
			}
        },
        components: {
            mainL,
            mainR,
            addUrl
        },
        created: function(){
            userHttp.prototype.uid=this.user.uid;
            userHttp().then( res => {
                this.user.hName = res.hName;
            })
        },
		mounted: function(){
            
        },
        methods: {
            setUser: function(type, _data){ // 设置用户参数
                let $ = this;
                if(type==="Update"){ // 修改用户资料

                    userHttp({[_data] : $.user[_data]})
                    .then( res => {if (!res) $.user.hName = $.dump.hName})
                }
                else if(type==="hName"){
                    $.dump['hName'] = $.user.hName;
                    $.user.hShow = true;
                    $.$nextTick(() => $.$refs.hName.focus()) // 修改名字
                }
            },
            urlData(exportUrl){ // 获取相应url
                this.mainR.data = exportUrl;
                console.log(exportUrl)
                
            },

            hBaidu(){
                // 手动执行点击提交表格事件
                document.querySelector("#home header .hForm").submit();
            },

            cr: function(){
                
            }

		}
	}
</script>