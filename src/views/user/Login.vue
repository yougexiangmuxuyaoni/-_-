<template>
  <div class="login">
    <Header class="text"></Header>
    <div class="box">
      <div class="main">
        <div class="form">
          <div class="title">用户登录</div>
          <el-input v-model="loginForm.username" placeholder="账户"></el-input>
          <el-input v-model="loginForm.password" placeholder="密码"></el-input>
          <div class="ma">
            <el-input v-model="loginForm.code" placeholder="验证码"></el-input>
            <img @click="geterweima()" :src="chuan+loginForm.randomStr " alt />
          </div>

          <el-button type="primary" @click="toHome">登录</el-button>

          <!-- <el-button type="primary" @click="gohome">登录</el-button> -->

          <div class="wj">
            <span @click="toForget">忘记密码</span>
          </div>
        </div>
      </div>
    </div>
    <Foote />
  </div>
</template>
<script>
import { denglu } from "@/api/denglu";
import Foote from "@/components/Foote";
import Header from "@/components/Header";
import { mapState, mapMutations } from "vuex";
import { log } from "util";
export default {
  name: "login",
  components: {
    Foote,
    Header
  },
  data() {
    return {
      loginForm: {
        username: "xyCXAdmin",
        password: "123456",
        code: "",
        redomStr: "",
        randomStr: ""
      },
      chuan: "/api/code?randomStr="
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
      denglu(this.loginForm)
        .then(res => {
          console.log("=======");

          console.log(res.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toHome() {
      console.log("denglu");

      let userinfo = "";

      if (this.loginForm.username === "shengjiaoyu") {
        userinfo = "shengjiaoyu";
      } else if (this.loginForm.username === "shijiaoyu") {
        userinfo = "shijiaoyu";
      } else if (this.loginForm.username === "qujiaoyu") {
        userinfo = "qujiaoyu";
      } else if (this.loginForm.username === "shengjianguan") {
        userinfo = "shengjianguan";
      } else if (this.loginForm.username === "shijianguan") {
        userinfo = "shijianguan";
      } else if (this.loginForm.username === "qujianguan") {
        userinfo = "qujianguan";
      } else {
        // this.$message({
        //   dangerouslyUseHTMLString: true,
        //   message:
        //     "账号：<strong>shengjianguan/shijianguan/qujianguan/shengjiaoyu/shijiaoyu/qujiaoyu</strong></br>密码：<i>空</i><br/>验证码：<i>空</i>"
        // });
        return;
      }
      localStorage.setItem("user_info", userinfo);
      this.SET_USER_INFO(userinfo);
      this.$router.push("/");
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
