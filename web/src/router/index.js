import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginComponent from '../components/login/login.vue'	// 登录页
import HomeComponent from '../components/home/home.vue'		// 主页
// import oxCrowd from '../components/home/oxCrowd.vue'		// 牛群主页
// import Room from '../components/room/room.vue'	// 游戏房间



Vue.use(VueRouter)

var router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'login',
			component: LoginComponent
		},
		{
			path: '/home',
			name: 'home',
			component: HomeComponent,
		},
		// {
		// 	path: '/oxCrowd',
		// 	name: 'oxCrowd',
		// 	component: oxCrowd,
		// },
		// {
		// 	path: '/room/:id',
		// 	name: 'room',
		// 	component: Room
		// },

	]
})

export default router