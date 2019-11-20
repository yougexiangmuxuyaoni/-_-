import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    USER_INFO: '',
    YIBANSHIXIANG_ACTIVE: '',
  },
  mutations: {
    add(state, shuzi) {
      state.status = shuzi
    },
    SET_USER_INFO(state, user) {
      state.USER_INFO = user;
      // console.log('state');

      // console.log(user);

    },
    CHENGE_ACTIVE(state, e) {
      // console.log('jinglaile');

      state.YIBANSHIXIANG_ACTIVE = e;
      // console.log(e);

    }
  },
  actions: {}
});
