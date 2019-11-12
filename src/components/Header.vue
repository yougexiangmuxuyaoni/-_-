<template>
  <div class="top">
    <img src="@/assets/img/logo.png" alt=""><h1> 航信食品安全监管系统</h1>
  </div>
</template>

<script>
export default {
  name: "heade"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.top {
  display: flex;
  align-items: center;
  padding: 0 4%;
  box-sizing: border-box;
  img{
    width: 160px;
    height: 40px;
  }
  h1 {
    color: #c8c8cd;
    font-size: 22px;
    // margin-bottom: 50px;
    line-height: 3em;
  }
}
</style>
