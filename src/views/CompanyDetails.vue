<template>
  <div class="companydetails">
    <div class="bg">
      <div class="back" @click="to('/Positioning')">返回</div>
      <div class></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "companydetails",
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
.companydetails {
  font-size: 0.14rem;
  overflow: hidden;
  .bg {
    width: 1920px;
    height: 2221px;
    // background: url("../assets/img/18.png");
    position: relative;
    .back {
      padding: 26px 30px;
      position: absolute;
      left: 1414px;
      top: 652px;
      background: darkgoldenrod;
      opacity: 0;
      &:hover{
        cursor: pointer;
      }
    }
  }
}
</style>
