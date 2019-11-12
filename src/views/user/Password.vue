<template>
  <div class="password">
    <div class="title">修改密码</div>
    <div class="zhuti">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">请输入旧密码</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <el-input v-model="oldmima" placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">请输入新密码</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <el-input v-model="mima" placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">请确认新密码</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <el-input v-model="mima2" placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="8" :span="15">
          <el-button type="primary">提交</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "password",
  data() {
    return {
      oldmima: "",
      mima: "",
      mima2: ""
    };
  },
  methods: {}
};
</script>
<style lang="scss" scope>
.password {
  width: 100%;
  padding: 30px 50px;
  .title {
    font-size: 20px;
    padding-bottom: 20px;
    // border-bottom: 1px solid #717171;
  }
  .zhuti {
    margin: 0 auto;
    width: 460px;
    .font {
      font-size: 18px;
      padding: 80px 0 40px 0;
    }
    .el-row {
      margin-top: 20px;
      .grid-content {
        text-align: right;
        padding-right: 20px;
        line-height: 40px;
        input {
          background: #072777;
          border-radius: 0.5rem;
          border: none;
          color: #fff;
          &::-webkit-input-placeholder {
            color: #bad3ff !important;
          }
        }
      }
      button {
        width: 100%;
        background: #072777;
        border-radius: 0.5rem;
        border: none;
      }
    }
  }
}
</style>
