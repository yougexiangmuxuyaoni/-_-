<template>
  <div class="user">
    <div class="header flex">
      <h1>
        <img src="@/assets/img/logo.png" />校园食品安全监测云平台
      </h1>
      <div class="nav flex">
        <div class="li" @click="to('/')">首页</div>
        <div class="li" @click="to('/abnormal')">异常监测</div>
        <div class="li" @click="to('/risk')">风险定位</div>
      </div>
    </div>
    <div class="con flex">
      <div class="left_nav flex">
        <div class="nav_box flex">
          <div class="info">
            <img class="Avatar" src="@/assets/img/user.jpeg" />
            <div>Luke Brown</div>
          </div>
          <div class="list">
            <div
              class="li"
              :class="{active:link===val.path}"
              v-for="val of nav_list"
              :key="val.path"
              @click="to(val.path)"
            >{{val.name}}</div>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "user",
  data() {
    return {
      link: "",
      nav_list: [
        { name: "修改密码", path: "/user" },
        { name: "已办事项", path: "/completion" },
        { name: "待办事项", path: "/uncompletion" },
        { name: "通知中心", path: "/notice" },
        { name: "消息提醒", path: "/remind" }
      ]
    };
  },
  methods: {
    to(uri) {
      this.$router.push(uri);
      this.link = uri;
    }
  },
  mounted() {
    this.link = this.$route.path;
  }
};
</script>
<style lang="scss" scope>
.user {
  font-size: 12px;
  background: url(../../../public/static/background.png) no-repeat;
  background-size: 100% 100%;
  color: #dedee0;
  .header {
    color: white;
    height: 70px;
    line-height: 70px;
    justify-content: space-between;
    padding: 0 40px;
    border-bottom: 1px solid #2156bb;
    h1 {
      font-size: 18px;
      font-weight: 500;
      margin: 0;
      display: flex;
      align-items: center;
      img {
        height: 110px;
        height: 28px;
      }
    }
    .nav {
      font-size: 16px;

      .li {
        padding: 0 20px;
        color: #3fedf9;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .con {
    width: 100%;
    height: calc(100vh - 72px);
    .left_nav {
      width: 400px;
      border-right: 1px solid #2156bb;

      justify-content: center;
      .nav_box {
        width: 220px;
        align-items: center;
        flex-direction: column;
        margin-top: 130px;
        .info {
          img {
            width: 86px;
            height: 86px;
            border-radius: 43px;
            margin-bottom: 22px;
          }
          & > div {
            font-size: 14px;
            color: white;
          }
        }
        .list {
          margin-top: 35px;
          .li {
            width: 220px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 16px;
            &:hover {
              cursor: pointer;
            }
          }
          .active {
            color: #3fedf9;
            background: #1d2563c5;
            position: relative;
            &::before {
              content: "";
              display: inline-block;
              width: 10px;
              position: absolute;
              top: 20px;
              left: 60px;
              height: 10px;
              border-radius: 50%;
              background: #3fedf9;
            }
          }
        }
      }
    }
  }
}
</style>
