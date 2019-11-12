import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import Trend from "./views/index/qushifenxi/Trend.vue";//趋势分析 1
import Abnormal from "./views//index/Abnormal.vue";//异常检测 2
import Risk from "./views//index/Risk.vue";//风险定位 3

import Login from "./views/user/Login.vue";//登录
import Forget from "./views/user/Forget.vue";//忘记密码
import User from "./views/user/User.vue";//个人中心
import Password from "./views/user/Password.vue";//修改密码
import Completion from "./views/user/Completion.vue";//已办事项
import Uncompletion from "./views/user/Uncompletion.vue";//待办事项
import Notice from "./views/user/Notice.vue";//通知中心
import Remind from "./views/user/Remind.vue";//消息提示


import Header_hei from "./views/Header_hei.vue";//预警头部

import AllWarning from "./views/Warning/AllWarning.vue";//全部预警
import Certificates from "./views/Warning/WarningCertificates.vue";//证件信息缺失
import WarningBeoverdue from "./views/Warning/WarningBeoverdue.vue";//证照过期
import WariningPersonnel from "./views/Warning/WariningPersonnel.vue";//证件信息丢失
import WariningPersonDate from "./views/Warning/WariningPersonDate.vue";//证件超期
import WariningHygiene from "./views/Warning/WariningHygiene.vue";//证件超期
import WariningFood from "./views/Warning/WariningFood.vue";//食材预警
import WariningPacking from "./views/Warning/WariningPacking.vue";//预包装食品预警
import WariningProduct from "./views/Warning/WariningProduct.vue";//成品预警





import Allalarm from "./views/Allalarm.vue";//全部报警



// import NotChecked from "./views/NotChecked.vue";//未查收预警信息
// import Com_AlertDetails from "@/views/Com_AlertDetails.vue";//预警详情模板
import AlertDetails from "./views/AlertDetails.vue";//预警详情页
import Positioning from "./views/Positioning.vue";//学校详情
import CompanyDetails from "./views/CompanyDetails.vue";//公司详情






Vue.use(Router);

const vueRouter = new Router({
  routes: [
    {//主页3个导航
      path: "/",
      component: Home,
      children: [
        {
          path: "/",
          name: "trend",
          component: Trend
        },
        {
          path: "/abnormal",
          name: "abnormal",
          component: Abnormal
        },
        {
          path: "/risk",
          name: "risk",
          component: Risk
        }
      ]
    },
    {//登录
      path: "/login",
      name: "login",
      component: Login
    },
    {//注册
      path: "/forget",
      name: "Forget",
      component: Forget
    }, {
      path: "/header_hei",
      name: "Header_hei",
      component: Header_hei,
      children: [{
        path: '/header_hei',
        name: 'AllWarning',
        component: AllWarning,
        children: [
          {
            path: '/header_hei',
            name: 'Certificates',
            component: Certificates
          }, {
            path: 'beoverdue',
            name: 'Beoverdue',
            component: WarningBeoverdue
          }, {
            path: 'personnel',
            name: 'Personnel',
            component: WariningPersonnel
          }, {
            path: 'personneldate',
            name: 'personneldate',
            component: WariningPersonDate
          }, {
            path: 'hygiene',
            name: 'hygiene',
            component: WariningHygiene
          }, {
            path: 'food',
            name: 'food',
            component: WariningFood
          }, {
            path: 'packing',
            name: 'packing',
            component: WariningPacking
          }, {
            path: 'product',
            name: 'product',
            component: WariningProduct
          }
        ]
      }, {
        path: '/allalarm',
        name: 'Allalarm',
        component: Allalarm

        // }, {
        //   path: '/companydetails',
        //   name: 'CompanyDetails',
        //   component: CompanyDetails
        // }, {
        //   path: '/notchecked',
        //   name: 'NotChecked',
        //   component: NotChecked
      }, , {
        path: '/alertDetails',
        name: 'AlertDetails',
        component: AlertDetails
      },
      {
        path: '/positioning',
        name: 'Positioning',
        component: Positioning
      },]
    },
    {//用户中心
      path: "/user",
      name: "User",
      component: User,
      children: [
        {
          path: "/user",
          name: "Password",
          component: Password
        },
        {
          path: "/completion",
          name: "Completion",
          component: Completion
        },
        {
          path: "/uncompletion",
          name: "Uncompletion",
          component: Uncompletion
        },
        {
          path: "/notice",
          name: "Notice",
          component: Notice
        },
        {
          path: "/remind",
          name: "Remind",
          component: Remind
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

export default vueRouter;
