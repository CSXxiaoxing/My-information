import Vue from 'vue'
import VueRouter from 'vue-router'
// Component
import Login from '../components/login/login.vue'	// 登录页
import HomeComponent from '../components/home/home.vue'		// 主页



Vue.use(VueRouter)

var router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'login',
			component: Login
		},
		{
			path: '/home',
			name: 'home',
			component: HomeComponent,
		},

	]
})

export default router