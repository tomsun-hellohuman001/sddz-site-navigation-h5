// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import routes from './router'
import myStore from './store/index'
import './style/style.css'
import { Search } from 'mint-ui';
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './js/GeoUtils.js'

Vue.component(Search.name, Search);
Vue.use(Mint);
Vue.use(Vuex)
Vue.use(VueRouter)
import {obj} from './store/axios';

import iView from 'iview'
import "iview/dist/styles/iview.css";

import { WechatPlugin } from 'vux'
import  { AlertPlugin } from 'vux'
import  { ToastPlugin } from 'vux'
import  { ConfirmPlugin } from 'vux'

/*import Vconsole from 'vconsole'
const vConsole = new Vconsole()*/

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)
Vue.use(iView)
// Vue.use(vConsole)
Vue.prototype.toast = function(Text){
	Vue.$vux.toast.show({
		text: Text,
		position: 'bottom',
		type: 'text',
		width: 'auto'
	})
}

Vue.prototype.ajax = obj
Vue.prototype.log = function(a){

	if(process.env.NODE_ENV === 'production'){

	}else{
		console.log(a)
	}

}

//console.info('路由管理长度',routes.length)
const router = new VueRouter({
	routes
});
['back','push','replace'].forEach(method=>{
	let myMehod=router[method].bind(router)
  router[method]=function(location){
    if(method==='back'){
       store.commit('updateDirection', 'reverse')
    }else{
       store.commit('updateDirection', 'forward')
    }
  	myMehod(location)
  }
})
const store = new Vuex.Store(myStore)

FastClick.attach(document.body)
router.beforeEach(function(to, from, next) {
	document.title=to.meta.title||'';
	Object.assign(to.meta,to.params,to.query)
	store.commit('updateLoadingStatus', true)
	next()
})

router.afterEach(function(to) {
	store.commit('updateLoadingStatus', false)

})
/* eslint-disable no-new */

window.windowWidth = document.documentElement.clientWidth
window.windowHeight = document.documentElement.clientHeight

 let vm= new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

FastClick.prototype.focus = function (targetElement) {
  let length;
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};


