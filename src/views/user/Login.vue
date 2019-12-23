<template>
  <div class="login">
    <Header class="text"></Header>
    <div class="box">
      <div class="main">
        <div class="form">
          <div class="title">用户登录</div>
          <el-input v-model="loginForm.username" placeholder="账户"></el-input>
          <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
          <div class="ma">
            <el-input v-model="loginForm.code" placeholder="验证码"></el-input>
            <img
              @click="geterweima()"
              :src="chuan+loginForm.randomStr+'&client_type=SUPERVISION_CLIENT'"
              alt
            />
          </div>

          <!-- <el-button type="primary" @click="toHome">直接登录</el-button> -->

          <el-button type="primary" @click="gohome">登录</el-button>

          <!-- <div class="wj">
            <span @click="toForget">忘记密码</span>
          </div>-->
        </div>
      </div>
    </div>
    <Foote />
  </div>
</template>
<script>
import { denglu, getUserInfo } from "@/api/denglu";
import Foote from "@/components/Foote";
import Header from "@/components/Header";
import { mapState, mapMutations } from "vuex";
import { log } from "util";
import { userInfo } from "os";
import { setInterval, clearInterval } from "timers";
export default {
  name: "login",
  components: {
    Foote,
    Header
  },
  data() {
    return {
      loginForm: {
        username: "",
        // username: "xyEduAdmin",
        password: "",
        code: "",
        redomStr: "",
        randomStr: ""
      },
      chuan: "/api/code?randomStr=",
      userInfo: {
        roleCodes: null,
        areaCode: "",
        userLevel: "",
        areaName: "",
        type: "",
        userId: ""
      }
    };
  },
  created() {
    this.geterweima();
  },
  methods: {
    ...mapMutations(["SET_USER_INFO"]),
    toForget() {
      this.$router.push("/Forget");
    },
    geterweima() {
      let random = "";
      random = Math.ceil(Math.random() * 100000000000000)
        .toString()
        .substr(0, 4);
      if (true) random = random + Date.now();
      this.loginForm.randomStr = random;
    },
    gohome() {
      const _this = this;
      denglu(this.loginForm)
        .then(res => {
          const token = res.data.access_token;
          localStorage.setItem("token", token);
          getUserInfo().then(res => {
            let json = res.data.data;
            // 1 监管 2教育
            this.geterweima();
            this.userInfo.areaName = json.sysUser.areaName;
            this.userInfo.areaCode = json.sysUser.areaCode;
            this.userInfo.userLevel = json.sysUser.level;
            this.userInfo.roleCodes = json.roleCodes;
             this.userInfo.type =  json.sysUser.userType;
            if (json.sysUser.userType !== "1" && json.sysUser.userType !== "2") {
              localStorage.removeItem("token");
              this.$message({
                showClose: true,
                message: "账号错误，请重试",
                type: "error"
              });
              return;
            }

            if (
              this.userInfo.roleCodes === null &&
              this.userInfo.roleCodes.length !== 0
            ) {
              localStorage.removeItem("token");
              this.$message({
                showClose: true,
                message: "无权限访问",
                type: "error"
              });
              return;
            }
            this.userInfo.userId = json.sysUser.userId;
            this.SET_USER_INFO(this.userInfo);
            sessionStorage.setItem("denglubiaoji", "denglubiaoji");
            this.$router.push("/");
          });
        })
        .catch(function(error) {
          const arr = error.toString().split(" ");
          let code = arr[arr.length - 1];
          let msg = "";
          if (code === "428") {
            msg = "验证码错误";
          } else if (code === "426") {
            msg = "用户密码错误";
          }
          _this.$message({
            showClose: true,
            message: msg,
            type: "error"
          });
          _this.geterweima();
        });
    }
  }
};
</script>
<style lang="scss" scope>
.login {
  font-size: 12px;
  height: 100vh;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  background: url(../../../public/static/background.png) no-repeat;
  background-size: 100% 100%;
  .text {
    width: 100%;
  }
  .box {
    height: 570px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .main {
      height: 480px;
      width: 100%;
      display: flex;
      justify-content: center;
      .form {
        margin-right: 20px;
        // padding-top: 60px;
        padding: 0.8rem;
        z-index: 3;
        width: 370px;
        background: #001459;
        color: #bad3ff;
        .title {
          font-size: 28px;
          text-align: center;
          margin-bottom: 20px;
        }
        & > .el-input {
          margin-top: 18px;
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
        .ma {
          margin-top: 18px;
          position: relative;
          border-radius: 0.5rem;
          overflow: hidden;
          input {
            background: #072777;
            border-radius: 0.5rem;
            border: none;
            color: #fff;
            &::-webkit-input-placeholder {
              color: #bad3ff !important;
            }
          }
          img {
            position: absolute;
            right: 0;
            width: 70px;
            height: 40px;
          }
        }
        button {
          margin-top: 50px;
          width: 100%;
          background: #072777;
          border-radius: 0.5rem;
          border: none;
        }
        .wj {
          margin-top: 20px;
          text-align: right;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
