import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    USER_INFO: {//用户信息
      // roleCodes: null,
      // areaCode: "",
      // userLevel: ""
    },
    YIBANSHIXIANG_ACTIVE: '',
  },
  mutations: {
    add(state, shuzi) {
      state.status = shuzi
    },
    //设置用户信息
    SET_USER_INFO(state, user) {
      console.log("保存USER_INFO");
      console.log(user);
      state.USER_INFO = user;
      localStorage.setItem("userInfo", JSON.stringify(user));
    },
    CHENGE_ACTIVE(state, e) {
      state.YIBANSHIXIANG_ACTIVE = e;
    },
    GO_OUT(state) {
      console.log("清楚USER_INFO");
      state.USER_INFO = null;
      localStorage.setItem("userInfo", '');
      console.log(localStorage.getItem('userInfo'));
    }
  },
  actions: {}
});
