<template>
	<div class="login">
	<Button type="info" @click='login'>登录</Button>	
	</div>
</template>

<style  lang='scss' scoped>
	@import '../../utils/baseImg.scss'; // 图片总路径
	.login {
		height: 100%;
		width: 100%;
		background: $login no-repeat;
		background-size: 100% 100%;
		button {
			position: absolute;
			left: 50%;
			// top: 50%;
			bottom: 0%;
			transform: translate(-50%,-80%);
		}
	}
</style>

<script type="text/javascript">
	import Vue from 'vue';
	import http from '../../utils/httpClient.js';
	import router from '../../router/';

	export default {
		data(){
			return {

			}
		},
		mounted: function(){

		},
		methods: {
			login(){
				router.push({name: 'home'});
			}
		}
	}
</script>