<template>
  <div class="link">
    <span>联系邮箱: yudfdf</span>
    <span>关注我们: 微信，微博</span>
    <span>航天信息园</span>
    <span>京ICP备 11046444 号</span>
    <span>京ICP证 110507 号</span>
    <span>京公网安备 11010802020134</span>
  </div>
</template>

<script>
export default {
  name: "foote"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.link {
  position: absolute;
  bottom: 20px;
  span {
    color: #bad3ff;

    &::before {
      content: "";
      display: inline-block;
      width: 1px;
      height: 10px;
      background: black;
      margin: 0 10px;
    }
    &:nth-of-type(1)::before {
      width: 0;
    }
  }
}
</style>
