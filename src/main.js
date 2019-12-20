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
//Vue函数添加一个原型属性$axios 指向axios,这样vue实例或组件中不用再去重复引用Axios 直接用this.$axios就能执行axios 方法
const CancelToken = axios.CancelToken;
Vue.$httpRequestList=[];
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};