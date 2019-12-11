<template>
  <div id="header_hei" v-loading.fullscreen.lock="fullscreenLoading">
    <div id="heder">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          :to="{ path: val.url }"
          v-for="val of lujing"
          :key="val.name"
        >{{val.name}}</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="title">
        <img src="/img/logo.d722d696.png" alt />
        <div>校园食品安全监测云平台</div>
      </div>
      <div class="user">
        <div class="message">
          <i class="el-icon-message-solid"></i>
          <ul class="tip-chuang list" v-show="TZList.length>0">
            <li @click="seeMore(val)" v-for="val of TZList" :key="val.id">
              <span v-show="val.type === '报警消息'" style="color:red;">[{{val.type}}]</span>
              <span v-show="val.type === '预警消息'" style="color:#03a9f4;">[{{val.type}}]</span>
              <span v-show="val.type === '通知中心'">[{{val.type}}]</span>
              {{val.title}}
            </li>
            <p class="more">
              <span @click="seeMore()">查看更多</span>
            </p>
          </ul>

          <div class="dian" v-show="TZList.length>0"></div>
        </div>
        <div class="personal">
          <img class="Avatar" src="@/assets/img/user.jpeg" />
          <div class="ellipsis">管理员</div>
          <i class="el-icon-arrow-down"></i>

          <ul class="tip-chuang list">
            <li @click="to('/user')">修改密码</li>
            <li @click="to('/completion')">已办事项</li>
            <li @click="to('/uncompletion')">待办事项</li>
            <li @click="to('/notice')">通知中心</li>
            <li @click="to('/login')">退出</li>
          </ul>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { xinxiaoxi } from "@/api/home";
export default {
  name: "header_hei",
  data() {
    return {
      lujing: [],
      TZList: [],
      TZId: Number,
      fullscreenLoading: false,
      jilu: "",
      userId: ""
    };
  },
  watch: {
    // $route(to, from) {
    //   console.log(111);
    //   console.log(from.name);
    //   this.jilu = from.name;
    //   this.mianbaioxie();
    // }
  },
  beforeRouteEnter(to, from, next) {
    // this.jilu = from.name;
    next(vm => {
      vm.jilu = from.name;
      vm.mianbaioxie();
    });
  },
  methods: {
    ...mapMutations(["SET_USER_INFO", "CHENGE_ACTIVE", "GO_OUT"]),
    mianbaioxie() {
      let path = this.$route.path;
      console.log(path, this.jilu);

      if (path === "/alertDetails") {
        if (this.jilu === "AllWarning") {
          this.lujing = [
            { url: "/abnormal", name: "首页" },
            { url: "/header_hei/allWarning", name: "预警信息" },
            { url: "", name: "预警信息详情页" }
          ];
        } else if (this.lujing === "Allalarm") {
          this.lujing = [
            { url: "/abnormal", name: "首页" },
            { url: "/header_hei/allalarm", name: "报警信息" },
            { url: "", name: "报警信息详情页" }
          ];
        } else if (this.jilu === "Uncompletion") {
          this.lujing = [
            { url: "/uncompletion", name: "返回" },
            { url: "", name: "报警信息详情页" }
          ];
        } else if (this.jilu === "abnormal") {
          this.lujing = [
            { url: "/abnormal", name: "返回" },
            { url: "", name: "预警信息详情页" }
          ];
        } else {
          this.lujing = [
            { url: "/completion", name: "返回" },
            { url: "", name: "报警信息详情页" }
          ];
        }
      } else if (path === "/positioning") {
        this.lujing = [
          { url: "/", name: "首页" },
          { url: "", name: "学校详情页" }
        ];
      } else {
        const arr = path.split("/");
        if (arr[2] === "allalarm") {
          this.lujing = [
            { url: "/", name: "首页" },
            { url: "", name: "报警信息" }
          ];
        } else {
          this.lujing = [
            { url: "/", name: "首页" },
            { url: "", name: "预警信息" }
          ];
        }
      }
    },
    seeMore(e) {
      console.log(e);
      let active = "";
      if (e.type === "报警消息") {
        active = "未接收报警";
      } else if (e.type === "预警消息") {
        active = "未接收预警";
      } else if (e.type === "通知中心") {
        active = "通知公告";
      }
      this.CHENGE_ACTIVE(active);
      localStorage.setItem("gaoliangID", e.id);
      this.to("/uncompletion");
    },
    getHongList() {
      xinxiaoxi({
        userId: this.userId,
        supStatus: 2
      }).then(res => {
        this.TZList = res.data.data.records;
      });
    },
    back() {
      this.$router.go(-1);
    },
    to(uri) {
      if (uri === "/login") {
        this.GO_OUT();
      }
      this.$router.push(uri);
    }
  },
  mounted() {
    this.getHongList();

    this.mianbaioxie();
    // setInterval(() => {
    //   // console.log("新通知");

    //   this.getHongList();
    // }, 1000 * 5);
  },
  created() {
    var user = JSON.parse(localStorage.getItem("userInfo"));
    this.SET_USER_INFO(user);
    this.userId = user.userId;
  }
};
</script>
<style lang="scss" scope>
@import "@/assets/css/public.scss";
.el-breadcrumb__inner.is-link {
  color: rgb(64, 241, 253) !important;
}
.el-breadcrumb__inner {
  color: rgb(197, 215, 247) !important;
}
#header_hei {
  font-size: 0.14rem;
  // padding: 0.3rem;
  background: url(../../public/static/background.png) no-repeat;
  background-size: 100% 100%;
  #heder {
    height: 0.7rem;
    // margin-bottom: 0.5rem;
    padding: 0 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 0.7rem;
    color: #fff;
    border-bottom: 0.01rem solid #2156b9;
    .link {
      width: 3.3rem;
      font-size: 0.12rem;
      .yjxx {
        color: #7a87ab;
      }
      span {
      }
    }
    .title {
      display: flex;
      align-items: center;
      font-size: 0.22rem;
      img {
        width: 1.5rem;
      }
    }
    .user {
      width: 20%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: $Main-color;
      text-align: right;
      font-size: 0.12rem;
      color: #fff;
      background: none;
      .addres {
        flex: 1;
        font-size: 0.14rem;
        span {
          padding: 0.1rem;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .message {
        padding: 0.15rem 0.2rem;

        // flex: 1;
        display: flex;
        justify-content: center;
        position: relative;
        i {
          font-size: 0.2rem;
          padding: 0.05rem;
        }
        &:hover {
          cursor: pointer;
        }
        &:hover .list {
          display: block;
        }
        ul {
          padding: 0;
          margin: 0;
        }
        .list {
          box-sizing: border-box;
          display: none;
          width: 3.6rem;
          position: absolute;
          top: 0.5rem;
          right: 0rem;
          padding-bottom: 0.5rem;

          list-style: none;
          font-size: 0.14rem;
          text-align: left;
          line-height: 1.6em;
          z-index: 1;
          span {
            color: #fff;
          }
          .yujing {
            color: #2f7bff;
          }
          .baojing {
            color: #ff7070;
          }

          &:hover {
            cursor: default;
          }
          li {
            line-height: 1.5em;
            padding: 0.12rem 0.2rem;
            color: #b6d0fd;
            &:hover {
              cursor: pointer;
              background: rgba(186, 211, 255, 0.2);
            }
          }
          .more {
            position: absolute;
            bottom: 0.1rem;
            right: 0;
            margin: 0;
            padding-right: 0.3rem;
            span {
              float: right;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
        .dian {
          position: relative;
          width: 0.12rem;
          height: 0.12rem;
          background: red;
          border-radius: 0.07rem;
          top: -0.04rem;
          left: -0.09rem;
        }
      }
      .personal {
        // flex: 1;
        margin-left: 0.4rem;
        width: 1.2rem;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 0.14rem;
        position: relative;
        padding: 0.1rem 0;
        z-index: 9;
        .list {
          font-size: 0.14rem;
          box-sizing: border-box;
          padding: 0;
          display: none;
          position: absolute;
          top: 0.55rem;
          left: 0rem;
          width: 1.5rem;
          height: 2rem;
          list-style: none;
          text-align: center;
          li {
            height: 0.4rem;
            line-height: 0.4rem;
            color: #b6d0fd;
            &:hover {
              cursor: pointer;
              background: rgba(186, 211, 255, 0.2);
            }
            &:last-of-type {
              border-top: 1px solid rgba(186, 211, 255, 0.3);
              margin: 0px 20px;
            }
          }
        }
        &:hover .list {
          cursor: default;
          display: block;
        }
        &:hover {
          cursor: pointer;
        }
        .Avatar {
          width: 0.34rem;
          border-radius: 50%;
          margin-right: 2%;
          img {
            height: 100%;
            widows: 100%;
          }
        }
      }
    }
  }
}
</style>
