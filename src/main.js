import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import echarts from "echarts";
import "./plugins/element.js";
import Router from "vue-router";
import axios from 'axios';
import VueAMap from 'vue-amap';//高德地图


VueAMap.initAMapApiLoader({
  key: '620069ed8a9bb90077dbcc699c0d087c',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import 'videojs-flash'

Vue.use(VideoPlayer)

Vue.use(VueAMap);
// Vue.use(VueAxios, axios)

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


Vue.prototype.$echarts = echarts;
// Vue.prototype.$http = axios;
// axios.defaults.baseURL = '/api';
// Vue.prototype.$api = api; // 将api挂载到vue的原型上

Vue.config.productionTip = false;



// router.beforeEach((to, from, next) => {
//   if (to.name === "/") {
//     this.$router.push("/login");
//   }
//   vm.$store.commit("add", to.name);
//   next();
// });


Vue.prototype.$http= axios;
const CancelToken = axios.CancelToken;
let cancel;

Vue.prototype.$ajax = (type, url, data) => {
    return new Promise((resolve, reject) => {   //封装ajax
        var aa = {
            method: type,
            url: url,
            headers: { 'token': sessionStorage.getItem('token') },
            cancelToken: new CancelToken(c => {  //强行中断请求要用到的
                cancel = c
            })
        }
        var json = (type == 'get') ? Object.assign(aa, { params: data }) : Object.assign(aa, { data: data });
        var ajax = Vue.prototype.$http(json).then(res => {
            if (Object.is(res.data.code,200)) {
                resolve(res.data);
            } else {
                Vue.prototype.$message.error(res.data.msg);
            }
        }).catch(error => {   //中断请求和请求出错的处理
                if (error.message == "interrupt") {
                    console.log('已中断请求');
                    return;
                } else {
                    Vue.prototype.$message.error(res.data.msg);
                }
            })
        return ajax;
    })
};


router.beforeEach((to, from, next) => {   //路由切换检测是否强行中断，
  console.log(cancel)
	if(cancel){        //强行中断时才向下执行
		cancel('interrupt');   //给个标志，中断请求
	}
	next();	
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};