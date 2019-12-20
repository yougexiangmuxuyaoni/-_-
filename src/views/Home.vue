<template>
  <div id="home" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="header">
      <div class="title">
        <div class="btn-box">
          <div class="Export-btn anniu" v-show="yichang">报表导出</div>
        </div>
        <h1 class="h1" style="flex-direction: column;line-height: 1.6em;margin-top: -.18rem;">
          <span>{{title}}</span>
          <div style="display:flex;">
            <!-- <img src="@/assets/img/logo.png" /> -->
            <span>校园食品安全监测云平台</span>
          </div>
        </h1>
        <div class="user">
          <!-- <div class="addres">
            <span>北京</span>
          </div>-->
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
      <div class="nav">
        <div class="nav-box">
          <div class="li" :class="linkActive=='/'?'active':''" @click="to('/')">趋势分析</div>
          <div class="li" :class="linkActive=='/abnormal'?'active':''" @click="to('/abnormal')">异常检测</div>
          <div class="li" :class="linkActive=='/risk'?'active':''" @click="to('/risk')">风险定位</div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { xinxiaoxi } from "@/api/home";
import { mapState, mapMutations } from "vuex";
import { setInterval } from "timers";
export default {
  name: "home",
  computed: {
    ...mapState(["USER_INFO"])
  },
  data() {
    return {
      linkActive: "/",
      yichang: true,
      TZList: [],
      title: "", //标题
      TZId: Number,
      fullscreenLoading: false,
      userId: ""
    };
  },
  methods: {
    ...mapMutations(["SET_USER_INFO", "CHENGE_ACTIVE", "GO_OUT"]),
    seeMore(e) {
      let active = "";
      if (e.type === "报警消息") {
        active = "未接收报警";
      } else if (e.type === "预警消息") {
        active = "未接收预警";
      } else if (e.type === "通知中心") {
        active = "通知公告";
      }
      this.CHENGE_ACTIVE(active);
      // localStorage.setItem("gaoliangID",e.id);
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
    to(url) {
      if (url === "/login") {
        this.GO_OUT();
      }

      if (url === "/abnormal") {
        this.yichang = false;
      } else {
        this.yichang = true;
      }
      this.linkActive = url;
      this.$router.push(url);
    },
    toUser() {
      this.$router.push("/user");
    }
  },
  mounted() {
    this.linkActive = this.$route.path;
    if (!this.USER_INFO.areaCode) {
      this.$router.push("/login");
      return;
    }

    if (this.USER_INFO.roleCodes[0] === "shichangjianguan") {
      this.title = this.USER_INFO.areaName + "监管局";
    } else if (this.USER_INFO.roleCodes[0] === "jiaoyujuguanli") {
      this.title = this.USER_INFO.areaName + "教育局";
    }
    setTimeout(() => {
      this.getHongList();
    }, 0);

    // setInterval(() => {
    //   this.getHongList();
    // }, 1000 * 5);
  },
  created() {
    var user = JSON.parse(localStorage.getItem("userInfo"));
    try {
      // let shijia = localStorage.getItem("denglushijian");
      // let date = new Date().getTime();
      // console.log(shijia, date);
      // if (date - shijia > 3600000) {
      //   this.$router.push("/login");
      // }
      if (sessionStorage.getItem("denglubiaoji") != "denglubiaoji") {
        // sessionStorage.setItem("denglubiaoji", "denglubiaoji");
        this.$router.push("/login");
      }
      // setTimeout(() => {
      //   this.$router.push("/login");
      // }, 30 * 60 * 1000);

      this.SET_USER_INFO(user);
      this.userId = user.userId;
    } catch {
      this.$router.push("/login");
    }
  }
};

reserSize();

// 监听窗口变化
window.onresize = function() {
  reserSize();
};
// 重置根元素字体大小
function reserSize() {
  var x = window.innerWidth;
  document.getElementsByTagName("html")[0].style.fontSize =
    (x / 1920) * 100 + "px";
}
</script>

<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
@import "@/assets/css/public.scss";
body,
html {
  background: linear-gradient(0deg, #001251 4%, #001562 98%);
  font-size: 100px;
  #home {
    box-sizing: border-box;
    height: 100%;
    background: url(../../public/static/background.png) no-repeat;
    background-size: 100% 100%;
    .header {
      height: 1.3rem;
      & > .title {
        height: 0.7rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: $border;
        padding: 0 0.35rem;

        .btn-box {
          width: 20%;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .Export-btn {
          width: 1.2rem;
          height: 0.34rem;
          text-align: center;
          line-height: 0.34rem;
          font-size: 0.14rem;
          color: rgba(255, 255, 255, 0.87);
          background-image: $btn;
          border-radius: 0.2rem;
          &:hover {
            color: $text-hover;
            background: $btn-hover;
          }
        }
        .h1 {
          font-size: 0.2rem;
          margin: 0;
          align-items: center;
          line-height: 100%;
          font-weight: 500;
          color: #dfdee3;
          display: flex;
          height: 0.46rem;
          img {
            width: 100px;
          }
        }
        .user {
          width: 20%;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          color: $Main-color;
          text-align: right;
          font-size: 0.12rem;
          color: #fff;
          // overflow: hidden;
          background: none;
          // .addres {
          //   flex: 1;
          //   font-size: 0.14rem;
          //   span {
          //     padding: 0.1rem;
          //     &:hover {
          //       cursor: pointer;
          //     }
          //   }
          // }
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

              // height: 200px;
              // overflow-y: auto;

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
                // padding:0.12rem 0.02rem;
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
            width: 1.2rem;
            height: 100%;
            margin-left: 0.4rem;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-size: 0.14rem;
            position: relative;
            padding: 0.1rem 0;
            z-index: 1;
            .list {
              font-size: 0.14rem;
              box-sizing: border-box;
              padding: 0;
              display: none;
              position: absolute;
              top: 0.5rem;
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
      .nav {
        height: 0.4rem;
        display: flex;
        justify-content: center;
        margin-top: 0.3rem;
        .nav-box {
          display: flex;
          align-items: center;
          justify-content: space-around;
          top: -0.34rem;
          height: 0.5rem;
          position: relative;
          background: #02082a;
          width: 460px;
          border-bottom: $border;
          &:before {
            content: "";
            position: absolute;
            background: #02082a;
            left: -0.3rem;
            top: 0.07rem;
            width: 0.36rem;
            height: 0.2rem;
            box-sizing: border-box;
            border-bottom: $border;
            transform-origin: bottom center;
            transform: rotateZ(66deg) scale(1.414);
          }
          &:after {
            content: "";
            position: absolute;
            background: #02082a;
            right: -0.3rem;
            top: 0.07rem;
            width: 0.36rem;
            height: 0.2rem;
            box-sizing: border-box;
            border-bottom: $border;
            transform-origin: bottom center;
            transform: rotateZ(295deg) scale(1.414);
          }

          .li {
            position: relative;
            padding: 2% 1%;
            min-width: 0.9rem;
            text-align: center;
            margin: 0 1%;
            color: $Main-color;
            font-size: 0.16rem;
            font-weight: 700;
            &:hover {
              cursor: pointer;
            }
            &.active::after {
              content: "";
              display: inline-block;
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 0.03rem;
              background-color: $text-hover !important;
            }
          }
        }
      }
    }
  }
}
</style>
