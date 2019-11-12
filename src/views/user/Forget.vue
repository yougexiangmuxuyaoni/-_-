<template>
  <div class="forget">
    <Header class="text"></Header>
    <div class="main">
      <el-row>
        <div class="font text-center">忘记密码</div>
      </el-row>
      <el-row>
        <div class="grid-content bg-purple-light">
          <el-input v-model="zhanghu" placeholder="请输入用户名"></el-input>
        </div>
      </el-row>
      <el-row>
        <div class="grid-content bg-purple-light">
          <el-input v-model="zhanghu" placeholder="请输入新密码"></el-input>
        </div>
      </el-row>
      <el-row>
        <div class="grid-content bg-purple-light">
          <el-input v-model="zhanghu" placeholder="请确认新密码"></el-input>
        </div>
      </el-row>
      <el-row>
        <div class="grid-content bg-purple-light">
          <el-input v-model="zhanghu" placeholder="请输入验证码"></el-input>
          <img src="@/assets/yanzhengma.jpg" />
        </div>
      </el-row>
      <el-row>
        <el-button type="primary" @click="to('/login')">确定</el-button>
      </el-row>
    </div>
    <Foote />
  </div>
</template>
<script>
import Foote from "@/components/Foote";
import Header from "@/components/Header";

export default {
  components: {
    Foote,
    Header
  },
  name: "about",
  data() {
    return {
      zhanghu: ""
    };
  },
  methods: {
    to(uir) {
      this.$router.push(uir);
    }
  }
};
</script>
<style lang="scss" scope>
.forget {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  background: url(../../../public/static/background.png) no-repeat;
  background-size: 100% 100%;
  color: #bad3ff;
  height: 100vh;
  .text {
    width: 100%;
  }
  .main {
    width: 483px;
    background: #001459;
    padding: 0.8rem;
    box-sizing: border-box;
    .font {
      font-size: 30px;
      margin-bottom: 60px;
    }
    .el-row {
      margin-bottom: 18px;
      input {
        background: #072777;
        border-radius: 0.5rem;
        border: none;
        color: #fff;
        &::-webkit-input-placeholder {
          color: #bad3ff !important;
        }
      }
      .grid-content {
        position: relative;
        text-align: right;
        padding-right: 10px;
        line-height: 40px;
        border-radius: 0.5rem;
        overflow: hidden;
      }
      button {
        margin-top: 60px;
        width: 100%;
        background: #072777;
        border-radius: 0.5rem;
        border: none;
        color: #bad3ff;
      }
      img {
        position: absolute;
        right: 0px;
        width: 70px;
        height: 40px;
      }
    }
  }
}
</style>
