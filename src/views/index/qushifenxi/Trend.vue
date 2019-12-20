<template>
  <div>
    <shengjg v-if="USER_INFO.userLevel === 'shengjianguan'"></shengjg>
    <shijg v-else-if="USER_INFO.userLevel === 'shijianguan'"></shijg>
    <qujg v-else-if="USER_INFO.userLevel === 'qujianguan'"></qujg>
    <shengjy v-else-if="USER_INFO.userLevel === 'shengjiaoyu'"></shengjy>
    <shijy v-else-if="USER_INFO.userLevel === 'shijiaoyu'"></shijy>
    <qujy v-else-if="USER_INFO.userLevel === 'qujiaoyu'"></qujy>

    <find v-else-if="USER_INFO.userLevel === 'find'"></find>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import shengjg from "./jianguan/Sheng";
import shijg from "./jianguan/Shi";
import qujg from "./jianguan/Qu";
import shengjy from "./jiaoyu/Sheng";
import shijy from "./jiaoyu/Shi";
import qujy from "./jiaoyu/Qu";
import find from "./Find";

export default {
  components: {
    shengjg,
    shijg,
    qujg,
    shengjy,
    shijy,
    qujy,
    find
  },
  data() {
    return {
      active_show: "",
      user: null
    };
  },
  computed: {
    ...mapState(["USER_INFO"])
  },
  methods: {
    ...mapMutations(["SET_USER_INFO"])
  },
  mounted() {
    // let user = localStorage.getItem("userInfo");


    // if (!this.USER_INFO) {
    //   this.$router.push("/login");
    // }

    // 绑定监听事件
    window.addEventListener("resize", this.resizeHandler);
  },
  created() {
    // this.user = localStorage.getItem("userInfo");
  }
};
</script>
<style lang="scss" scope>
</style>
