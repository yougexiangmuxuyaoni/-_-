<template>
  <div class="notchecked">
    <div class="bg">
      <div class="back" @click="to('/abnormal')">返回</div>
      <div class="all" @click="to('/allwarning')">全部报警</div>
      <div class="xiangqing" @click="to('/alertDetails')">查看详情</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "notchecked",
  data() {
    return {};
  },
  methods: {
    to(uri) {
      this.$router.push(uri);
    }
  }
};
</script>
<style lang="scss" scope>
.notchecked {
  font-size: 0.14rem;
  .bg {
    width: 100vw;
    height: 100vh;
    // background: url("../assets/img/07.png");
    position: relative;
    & > div:hover {
      cursor: pointer;
    }
    .back {
      padding: 10px 25px;
      position: absolute;
      top: 30px;
      opacity: 0.1;
    }
    .all {
      padding: 10px 25px;
      position: absolute;
      top: 193px;
      left: 315px;
      opacity: 0;
      // background: darkgoldenrod;
    }
    .xiangqing {
      height: 620px;
      padding: 10px 25px;
      position: absolute;
      top: 290px;
      left: 1770px;
      opacity: 0;
      // background: darkgoldenrod;
    }
  }
}
</style>
