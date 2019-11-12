<template>
  <div id="header_hei" v-loading.fullscreen.lock="fullscreenLoading">
    <div id="heder">
      <div class="link">
        <span @click="to('/')" class="pointer">首页</span>
        <span class="pointer" v-show="this.$store.state.status !=='Positioning'">
          <span @click="to('/header_hei')">
            <span class="yjxx" v-show="this.$store.state.status ==='Certificates'">
              <i class="el-icon-arrow-right"></i>预警信息
            </span>
            <span v-show="this.$store.state.status ==='Allalarm'">
              <i class="el-icon-arrow-right"></i>报警信息
            </span>
          </span>

          <span v-show="this.$store.state.status ==='AlertDetails'">
            <span class @click="to('/header_hei')">
              <i class="el-icon-arrow-right"></i>预警信息
            </span>
            <span class="yjxx">
              <i class="el-icon-arrow-right"></i>报警详情页
            </span>
          </span>
        </span>
        <span class="pointer" v-show="this.$store.state.status === 'Positioning'">
          <span class="yjxx">
            <i class="el-icon-arrow-right"></i>学校详情页
          </span>
        </span>
      </div>
      <div class="title">
        <img src="/img/logo.d722d696.png" alt />
        <div>校园食品安全监测云平台</div>
      </div>
      <div class="user">
        <!-- <div class="addres">
          <span>北京</span>
        </div>-->
        <div class="message">
          <i class="el-icon-message-solid"></i>
          <!-- <ul class="tip-chuang list">
               <li @click="to('remind')">
                <span class>[通知中心]</span> 你的通知已下达，某某实验小学已查看校园食堂食品安全保险文件。
              </li>
              <li @click="to('remind')">
                <span class="yujing">[预警消息]</span> 新增25条预警消息，快去看看
              </li>
              <li @click="to('remind')">
                <span class="baojing">[报警消息]</span> 新增5条报警消息，快去看看
              </li>
              <p class="more">
                <span @click="to('remind')">查看更多</span>
              </p>
          </ul>-->

          <ul class="tip-chuang list" v-show="TZList.length>0">
            <li @click="change(val.id)" v-for="val of TZList" :key="val.id">
              <span class>[通知中心]</span>
              {{val.title}}
            </li>
            <p class="more">
              <!-- <span @click="to('remind')">查看更多</span> -->
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
            <li @click="to('/remind')">消息提醒</li>
            <li @click="to('/login')">退出</li>
          </ul>

          <form
            action="/api/manageWat/supervision/updateAnnouncement"
            method="post"
            target="nm_iframe"
            style="    visibility: hidden;;display:none;"
          >
            <input type="text" name="id" v-model="TZId" />
            <input type="submit" value="tijiao" ref="changeId" />
          </form>
          <iframe id="id_iframe" name="nm_iframe" style="visibility: hidden;display:none;"></iframe>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "header_hei",
  data() {
    return {
      TZList: [],
      TZId: Number,
      fullscreenLoading: false
    };
  },
  methods: {
    ...mapMutations(["CHENGE_ACTIVE"]),
    change(e) {
      this.fullscreenLoading = true;

      console.log("改变状态");
      this.TZId = e;
      setTimeout(() => {
        console.log(this.TZId);

        this.$refs.changeId.click();

        this.CHENGE_ACTIVE("通知公告");
      }, 0);

      setTimeout(() => {
        console.log(
          this.$el.getElementsByTagName("iframe")[0].contentWindow.document.body
            .innerText
        );
        let html = this.$el.getElementsByTagName("iframe")[0].contentWindow
          .document.body.innerText;
        let moban =
          '{"code":0,"msg":"success","data":{"code":0,"msg":"success","data":true}}';
        if (html === moban) {
          this.fullscreenLoading = false;
          this.to("completion");
        }
      }, 1000);
    },
    seeMore() {
      this.CHENGE_ACTIVE("通知公告");
      this.to("completion");
    },
    getHongList() {
      console.log(1111);

      this.$http
        .get("/api/manageWat/supervision/findForStatus", {
          params: { userId: 4, supStatus: 2 }
        })
        .then(res => {
          console.log('userId');
          
          console.log(res.data.data.records);
          this.TZList = res.data.data.records;
        });
    },
    back() {
      this.$router.go(-1);
    },
    to(uri) {
      this.$router.push(uri);
    }
  },
  mounted() {
    // console.log(this.$store.state.status);
    setTimeout(() => {
      this.getHongList();
    }, 0);

    setInterval(() => {
      console.log("新通知");

      this.getHongList();
    }, 1000 * 3);
  }
};
</script>
<style lang="scss" scope>
@import "@/assets/css/public.scss";
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
          height: 2.4rem;
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
