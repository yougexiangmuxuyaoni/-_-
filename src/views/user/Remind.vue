<template>
  <div class="remind">
    <div class="title">消息提醒</div>
    <div class="zhuti">
      <ul>
        <!-- <div v-for="val of 5" :key="val">
          <li>
            <span>[通知中心]</span>
            <span
              class="ellipsis"
            >你的通知已下达，某某实验小学已查看校园食堂食品安全保险文件。 你的通知已下达，某某实验小学已查看校园食堂食品安全保险文件你的通知已下达，某某实验小学已查看校园食堂食品安全保险文件</span>
            <span>2019-06-18</span>
          </li>
          <li>
            <span class="yj">[预警中心]</span>
            <span>新增3条预警信息，快去看看。</span>
            <span>2019-06-18</span>
          </li>
          <li>
            <span class="bj">[报警中心]</span>
            <span>新增6条报警信息，快去看看。</span>
            <span>2019-06-18</span>
          </li>
        </div>-->
        <div v-for="val of TZList" :key="val.id">
          <li>
            <span>[通知中心]</span>
            <span class="ellipsis">{{val.title}}</span>
            <span>{{val.createTime}}</span>
          </li>
          <!-- <li>
            <span class="yj">[预警中心]</span>
            <span>新增3条预警信息，快去看看。</span>
            <span>2019-06-18</span>
          </li>
          <li>
            <span class="bj">[报警中心]</span>
            <span>新增6条报警信息，快去看看。</span>
            <span>2019-06-18</span>
          </li>-->
        </div>
      </ul>
      <el-footer class="footer">
        <div
          class="tip"
        >显示{{this.size}}项结果，共{{this.com_size}}项，当前{{this.current}}/{{this.com_current}}页</div>
        <div>
          <el-button v-show="this.current === 1" :disabled="isJinyong">上一页</el-button>
          <el-button v-show="this.current > 1" @click="previousPage()">上一页</el-button>
          <el-button @click="nextPage()" v-show="this.current < this.com_current">下一页</el-button>
          <el-button v-show="this.current === this.com_current" :disabled="isJinyong">下一页</el-button>
        </div>
      </el-footer>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "remind",
  data() {
    return {
      isJinyong: true,
      TZList: [],
      current: 1,
      size: 20,
      com_size: "",
      com_current: ""
    };
  },
  methods: {
    previousPage() {
      console.log("上一页");

      this.current = this.current - 1;

      this.getJGList();
    },
    nextPage() {
      console.log("下一页");

      this.current = this.current + 1;

      this.getJGList();
    },
    getJGList() {
      this.$http({
        url: "/api/manageWat/supervision/findPage",
        method: "get",
        params: {
          userId: 4,
          size: this.size,
          current: this.current
        }
      }).then(res => {
        console.log(res.data);
        this.com_size = res.data.data.total;
        this.com_current = res.data.data.pages;
        this.TZList = res.data.data.records;
      });
    }
  },
  mounted() {
    this.getJGList();
  }
};
</script>
<style lang="scss" scope>
@import "@/assets/css/public.scss";
.remind {
  width: 100%;
  height: 100%;
  padding: 30px 50px;
  height: calc(100% - 110px);
  .title {
    font-size: 20px;
    padding-bottom: 20px;
  }
  .zhuti {
    margin-top: 32px;
    height: 100%;
    ul {
      padding-left: 0;
      height: calc(100% - 70px);
      overflow: auto;
      @extend .gundongtiao;
      li {
        font-size: 16px;
        list-style: none;
        line-height: 52px;
        display: flex;
        align-items: center;
        margin: 15px 0;
        background: linear-gradient(90deg, #0f0d34, #05113e);
        span {
          display: inline-block;
          &.yj {
            color: #2662cf;
          }
          &.bj {
            color: #ff7070;
          }
          &:nth-of-type(1) {
            margin-right: 10px;
          }
          &:nth-of-type(2) {
            width: 600px;
            margin-right: 50px;
          }
        }
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-button {
      background: none;
      color: #37cfdc;
      border-color: #37cfdc;
    }
    .el-button.is-disabled:hover {
      background: none;
    }
  }
}
</style>
