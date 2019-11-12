<template>
  <div>
    <shengjg v-if="USER_INFO === 'shengjianguan'"></shengjg>
    <shijg v-else-if="USER_INFO === 'shijianguan'"></shijg>
    <qujg v-else-if="USER_INFO === 'qujianguan'"></qujg>
    <shengjy v-else-if="USER_INFO === 'shengjiaoyu'"></shengjy>
    <shijy v-else-if="USER_INFO === 'shijiaoyu'"></shijy>
    <qujy v-else-if="USER_INFO === 'qujiaoyu'"></qujy>

    <find v-else-if="USER_INFO === 'find'"></find>
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
      active_show: ""
    };
  },
  computed: {
    ...mapState(["USER_INFO"])
  },
  methods: {
    ...mapMutations(["SET_USER_INFO"])
  },
  mounted() {
    this.SET_USER_INFO(localStorage.getItem("user_info"));
    console.log(this.USER_INFO);
    if (!this.USER_INFO) {
      this.$router.push("/login");
    }
    // 绑定监听事件
    window.addEventListener("resize", this.resizeHandler);
  }
};
</script>
<style lang="scss" scope>
</style>
