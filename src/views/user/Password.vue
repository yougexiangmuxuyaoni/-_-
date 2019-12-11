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
          <el-button type="primary" @click="jiance">提交</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { xiugaimima } from "@/api/denglu.js";
import { mapState, mapMutations } from "vuex";
export default {
  name: "password",
  data() {
    return {
      oldmima: "",
      mima: "",
      mima2: "",
      userId: ""
    };
  },
  methods: {
    ...mapMutations(["GO_OUT"]),
    getxiugaimima() {
      xiugaimima({
        userId: this.userId,
        oldPassword: this.oldmima,
        newPassword: this.mima
      }).then(res => {
        console.log("密码");
        console.log(res.data);
        if (res.data.data) {
          this.GO_OUT();
          this.$router.push("/login");
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    jiance() {
      console.log(this.mima.length);

      if (this.mima.length < 6) {
        this.$message("密码至少6位");
      } else if (this.mima === this.mima2) {
        this.getxiugaimima();
      } else {
        this.$message("新密码不一致");
      }
    }
  },
  created() {
    var user = JSON.parse(localStorage.getItem("userInfo"));
    this.userId = user.userId;
  }
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
