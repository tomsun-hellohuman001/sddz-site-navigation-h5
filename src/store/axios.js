import Promise from 'es6-promise'
import axios from 'axios'
import * as types from './type'
import Vue from 'vue'
//const querystring = require('querystring');
axios.defaults.withCredentials = true
let url=window.location.href

const baseURL = process.env.NODE_ENV === 'production'? url.split('index.html')[0]:'/wechat'

//配置axios
//添加一个请求拦截器

const obj = {}
for(let key in types) {
	obj[key] = ({data, showMsg,method,config}) => xhra({url:types[key], data,showMsg,method,config})
}


var instance = axios.create({
    baseURL:baseURL,
    timeout:20000,
    headers: {'x-requested-with': 'XMLHttpRequest'}
});
instance.interceptors.request.use(function(config){
    //在请求发送之前做一些事
//  vm.$store.commit('updateLoadingStatus', true)
    return config;
},function(error){
    //当出现请求错误是做一些事
    return Promise.reject(error);
});

//添加一个返回拦截器
instance.interceptors.response.use(function(response){
    //对返回的数据进行一些处理
//  vm.$store.commit('updateLoadingStatus', false)
    return response;
},function(error){
    //对返回的错误进行一些处理
//  vm.$store.commit('updateLoadingStatus', false)
    return Promise.reject(error);
});
function xhra({url, data,showMsg = true, method = 'post', config = {}}) {
//	console.log(11)
//	Vue.$store.commit('updateLoadingStatus', true)
	return new Promise((resolve, reject) => {
		instance[method](url, data, config)
			.then((res) => {
//				console.log('成功：',res)
//				console.log(JSON.stringify(res.data,null,1))
				if(res.status === 200 && res.data) {
					// if(!res.data.result) {
						if(!res.data) {
						if(res.data.errorCode==302) {
							Message(res.data.description)
							setTimeout(()=>{
								location.href=res.data.obj
								resolve(res)
							}, 500)
							return ;
						}else if(res.data.description) {
							showMsg && Message(res.data.description)
						}
						//
						reject({ error: true, errmsg: res.data.description })
					} else {
						if(res.data.description) {
							showMsg && Message(res.data.description)
						}
						resolve(res)
					}
				} else {
//					alert(data.showMsg)
					showMsg && Message(res.statusText);
					reject({ errmsg: res.statusText, error: true })
				}

			}).catch((err) => {
				console.log(33)
				reject(err)
			});
	})
}

function Message(Text) {
	Vue.$vux.toast.show({
		text: Text,
		position: 'bottom',
		type: 'text',
		width: 'auto'
	})
}
export { obj }
