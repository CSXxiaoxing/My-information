<template>
	<div id='home'> 
    <header class="header" :style="'background-color:'+header.hColor" >
        <ColorPicker v-model="header.hColor" alpha class='hColor'/>
        <h2>My information</h2>

        <form action="http://www.baidu.com/baidu" target="_blank" class="hForm">
            <Input name="word" icon="search" @on-click='hBaidu' placeholder="百度搜索" style="width: 200px"></Input>
        </form>
    </header>
    <main class="main">
        <div class="m-left">
            <ul>
                <li>
                    {{main_L.headline}}
                </li>
                <li v-for='data in main_L.Arial' :key='data'>{{data}}</li>
            </ul>
        </div>

        <div class="m-right">
            <h3>JavaScript</h3>

            <div class="weblist">
                <div class="collect clearfix collectsite">
                    <div class="head collect-head" data-subclass="collect">收藏网址<i class="glyphicon glyphicon-cog" data-name="collect" data-toggle="modal"></i></div>

                    <ul class="clearfix">
                        <li>asd</li>
                        <li>asd</li>
                    </ul>
                </div>
                <div class="collect clearfix studysite">
                    <div class="head study-head" data-subclass="study">学习资料<i class="glyphicon glyphicon-cog" data-name="study" data-toggle="modal"></i></div>
                    <ul class="clearfix">
                    </ul>
                </div>
            </div>
        </div>
        <!-- <div class="modal fade" tabindex="-1" role="dialog" id="myModal">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="hiddenbtn">&times;</span></button>
                <h4 class="modal-title" >收藏地址</h4>
              </div>
              <div class="modal-body">
              </div>
              <div class="modal-footer">
                <form class="form-inline">
                  <div class="form-group">
                    <label for="InputName">网站名称：</label>
                    <input type="text" class="form-control webname" id="InputName" placeholder="网站名称">
                  </div>
                  <div class="form-group">
                    <label for="InputUrl">网址：</label>
                    <input type="text" class="form-control weburl" id="InputUrl" placeholder="网站地址">
                  </div>
                  <button type="submit" class="btn btn-success add">添加</button>
                </form>
              </div>
            </div>
          </div>
        </div> -->
    </main>
    <footer>
        
    </footer>
	</div>
</template>

<script type="text/javascript">
    import './home.scss';
	// import './index.js';
	import Vue from 'vue';
	import http from '../../utils/httpClient.js';
	import router from '../../router/';


	export default {
		data: function(){
			return {
                header: {
                    hColor: 'rgba(53, 227, 237, 0.81)',     // 头部颜色
                    // hBaidu: '',     // 百度搜索
                },
                main_L: {   // 左侧导航条
                    headline: '分类目录',   // 头部标题
                    Arial: [ 'JavaScript', 'HTML', 'PHP', 'MySql', 'Nodejs', 'MongoDB', 'vue', 'React', 'Angular4', '前端UI', '学习资料', '快捷键', '个人', '零碎资料' ],  // 二级标题
                },
			}
		},
		mounted: function(){
            this.get('html');
        },
        methods: {
            hBaidu(){
                // 手动执行点击提交表格事件
                document.querySelector("#home header .hForm").submit();
            },
            get(param){
                http.get('http://localhost:999/LoginRouter/',{
                    class: param,
                }).then( res => {
                    console.log(res)
                    // data = JSON.parse(res);
                    

                })
            }



		}
	}
</script>