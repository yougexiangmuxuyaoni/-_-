import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    TYPE: '',
    TIME_NUMBER: 0,
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
      state.USER_INFO = user;
      localStorage.setItem("userInfo", JSON.stringify(user));
    },
    CHENGE_ACTIVE(state, e) {
      state.YIBANSHIXIANG_ACTIVE = e;
    },
    GO_OUT(state) {
      state.USER_INFO = null;
      localStorage.setItem("userInfo", '');
      localStorage.removeItem("token");
      // 从sessionStorage删除所有保存的数据
      sessionStorage.clear();
    },
    SETTYPE(state, type) {
      state.TYPE = type;
    },
    CHANGE_TIME_NUMBER(state) {
      state.TIME_NUMBER++;
    }
  },
  actions: {}
});
