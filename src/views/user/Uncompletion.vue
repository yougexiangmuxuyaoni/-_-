<template>
  <div id="completion2">
    <el-radio-group v-model="active">
      <el-radio-button label="未接收报警"></el-radio-button>
      <el-radio-button label="未接收预警"></el-radio-button>
      <el-radio-button label="监管意见下达记录"></el-radio-button>
      <el-radio-button label="通知公告"></el-radio-button>
    </el-radio-group>
    <div class="biao" v-show="active==='未接收报警'">
      <el-table
        height="calc(100% - 70)"
        :data="bjlistJson.records"
        style="width: 100%"
        v-loading="loading_bj"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
      >
        <el-table-column prop="id" label="报警编号"></el-table-column>
        <el-table-column prop="description" label="报警信息内容"></el-table-column>
        <el-table-column prop="type" label="报警类别"></el-table-column>
        <el-table-column prop="school" label="学校名称"></el-table-column>
        <el-table-column prop="time" label="最新报警时间"></el-table-column>
        <el-table-column prop="opinion" label="接收状态"></el-table-column>
        <el-table-column label="查看详情">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="showXiangqing(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-footer class="footer">
        <div
          class="tip"
        >显示{{bjlistJson.size}}项结果，共{{bjlistJson.total}}项，当前{{bjlistJson.current}}/{{bjlistJson.pages}}页</div>
        <div>
          <el-button v-show="bjlistJson.current>1" @click="bjupPage" type="primary" plain>上一页</el-button>
          <el-button v-show="bjlistJson.current<2" disabled class="dis" type="primary" plain>上一页</el-button>

          <el-button
            v-show="bjlistJson.current<bjlistJson.pages"
            @click="bjnextPage"
            type="primary"
            plain
          >下一页</el-button>
          <el-button
            v-show="!(bjlistJson.current<bjlistJson.pages)"
            disabled
            class="dis"
            type="primary"
            plain
          >下一页</el-button>
        </div>
      </el-footer>
    </div>
    <div class="biao" v-show="active==='未接收预警'">
      <el-table
        height="calc(100% - 70)"
        :data="yjlistJson.records"
        style="width: 100%"
        v-loading="loading_yj"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
      >
        <el-table-column prop="id" label="预警编号"></el-table-column>
        <el-table-column prop="description" label="预警信息内容"></el-table-column>
        <el-table-column prop="type" label="预警类别"></el-table-column>
        <el-table-column prop="school" label="学校名称"></el-table-column>
        <el-table-column prop="time" label="最新预警时间"></el-table-column>
        <el-table-column prop="opinion" label="接收状态"></el-table-column>
        <el-table-column label="查看详情">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="showXiangqing(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-footer class="footer">
        <div
          class="tip"
        >显示{{yjlistJson.size}}项结果，共{{yjlistJson.total}}项，当前{{yjlistJson.current}}/{{yjlistJson.pages}}页</div>
        <div>
          <el-button v-show="yjlistJson.current>1" @click="yjupPage" type="primary" plain>上一页</el-button>
          <el-button v-show="yjlistJson.current<2" disabled class="dis" type="primary" plain>上一页</el-button>

          <el-button
            v-show="yjlistJson.current<yjlistJson.pages"
            @click="yjnextPage"
            type="primary"
            plain
          >下一页</el-button>
          <el-button
            v-show="!(yjlistJson.current<yjlistJson.pages)"
            disabled
            class="dis"
            type="primary"
            plain
          >下一页</el-button>
        </div>
      </el-footer>
    </div>
    <div class="biao" v-show="active==='监管意见下达记录'">
      <el-table height="calc(100% - 70)" :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="realName" label="发送人"></el-table-column>
        <el-table-column prop="type" label="类别"></el-table-column>
        <el-table-column prop="content" label="监管意见"></el-table-column>
        <el-table-column prop="schName" label="学校名称"></el-table-column>
        <el-table-column prop="createTime" label="接收时间"></el-table-column>
        <el-table-column prop="viewName" label="接收人"></el-table-column>
      </el-table>

      <el-footer class="footer">
        <div
          class="tip"
        >显示{{this.size}}项结果，共{{this.com_size}}项，当前{{this.current}}/{{this.com_current}}页</div>
        <div>
          <el-button v-show="this.current === 1" :disabled="isJinyong" class="dis">上一页</el-button>
          <el-button v-show="this.current > 1" @click="previousPage()">上一页</el-button>
          <el-button @click="nextPage()" v-show="this.current < this.com_current">下一页</el-button>
          <el-button
            v-show="this.current === this.com_current"
            :disabled="isJinyong"
            class="dis"
          >下一页</el-button>
        </div>
      </el-footer>
    </div>

    <div class="biao" v-show="active==='通知公告'">
      <el-table height="calc(100% - 70)" :data="TZList" style="width: 100%">
        <el-table-column type="index" width="20"></el-table-column>
        <el-table-column prop="schName" width="100" label="学校名称"></el-table-column>
        <el-table-column prop="title" width="120" label=" 标题"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="realName" width="70" label="发布人"></el-table-column>
        <el-table-column prop="createTime" width="100" label="发布时间"></el-table-column>
        <el-table-column prop="viewTime" width="100" label="学校查看时间"></el-table-column>
        <el-table-column prop="status" width="70" label="学校查看状态"></el-table-column>
        <el-table-column prop="supStatus" width="80" label="下发人查看状态"></el-table-column>
      </el-table>
      <el-footer class="footer">
        <div
          class="tip"
        >显示{{this.tz_size}}项结果，共{{this.tz_com_size}}项，当前{{this.tz_current}}/{{this.tz_com_current}}页</div>
        <div>
          <el-button v-show="this.tz_current === 1" :disabled="isJinyong" class="dis">上一页</el-button>
          <el-button v-show="this.tz_current > 1" @click="tz_previousPage()">上一页</el-button>
          <el-button @click="tz_nextPage()" v-show="this.tz_current < this.tz_com_current">下一页</el-button>
          <el-button
            v-show="this.tz_current === this.tz_com_current"
            :disabled="isJinyong"
            class="dis"
          >下一页</el-button>
        </div>
      </el-footer>
    </div>
  </div>
</template>
<script>
import { bjweijieshou, jianguanxidajilu, tongzhigonggao } from "@/api/home";
import { mapState, mapMutations } from "vuex";
export default {
  name: "completion",
  data() {
    return {
      userInfo: null,
      isJinyong: true,
      active: "未接收报警",
      loading_bj: true,
      loading_yj: true,

      bjlistJson: {
        records: [],
        total: 12,
        size: 2,
        current: 3,
        searchCount: true,
        pages: 6
      },
      bjval: {
        page: 1,
        size: 15,
        iswarning: 1
      },
      yjlistJson: {
        records: [],
        total: 12,
        size: 2,
        current: 3,
        searchCount: true,
        pages: 6
      },
      yjval: {
        page: 1,
        size: 15,
        iswarning: 1
      },

      current: 1,
      size: 20,
      com_size: "",
      com_current: "",
      tableData: [
        {
          number: "0001",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "未接收",
          details: "查看详情"
        }
      ],

      TZList: [],
      tz_current: 1,
      tz_size: 20,
      tz_com_size: Number,
      tz_com_current: Number
    };
  },
  methods: {
    ...mapMutations(["CHANGE_TIME_NUMBER", "SETTYPE"]),
    bjupPage() {
      this.bjval.page--;
      this.getbjweijieshou();
    },
    bjnextPage() {
      this.bjval.page++;
      this.getbjweijieshou();
    },
    getbjweijieshou() {
      this.loading_bj = true;
      bjweijieshou({
        iswarning: 1,
        regionalLevel: this.userInfo.userLevel,
        areaCode: this.userInfo.areaCode,
        size: this.bjval.size,
        page: this.bjval.page
      }).then(res => {
        this.loading_bj = false;
        this.bjlistJson = res.data.data;
      });
    },
    yjupPage() {
      this.yjval.page--;
      this.getyjweijieshou();
    },
    yjnextPage() {
      this.yjval.page++;
      this.getyjweijieshou();
    },
    getyjweijieshou() {
      this.loading_yj = true;
      bjweijieshou({
        iswarning: 0,
        regionalLevel: this.userInfo.userLevel,
        areaCode: this.userInfo.areaCode,
        size: this.yjval.size,
        page: this.yjval.page
      }).then(res => {
        this.loading_yj = false;
        this.yjlistJson = res.data.data;
      });
    },
    getJGList() {
      jianguanxidajilu({
        userId: this.userInfo.userId,
        size: this.size,
        current: this.current,
        supStatus: 2
      }).then(res => {
        this.com_size = res.data.data.total;
        this.com_current = res.data.data.pages;
        let arr = [];
        res.data.data.records.forEach(val => {
          if (val.type === "1") {
            val.type = "证照预警";
          } else {
            val.type = "其他预警";
          }
          if (val.status === "1") {
            val.status = "已查看";
          } else if (val.status === "2") {
            val.status = "未查看";
          }
          arr.push(val);
        });

        this.tableData = arr;
        console.log(this.tableData);
      });
    },
    getTZ() {
      console.log("tongzhi");
      console.log(this.userInfo);

      tongzhigonggao({
        userId: this.userInfo.userId,
        size: this.tz_size,
        current: this.tz_current,
        supStatus: 2 //1 已办 2未办
      }).then(res => {
        this.tz_com_size = res.data.data.total;
        this.tz_com_current = res.data.data.pages;
        // console.log(res.data.data.records);

        let arr = [];
        res.data.data.records.forEach(val => {
          //（1已查看2未查看 ）
          if (val.status === "1") {
            val.status = "已查看";
          } else if (val.status === "2") {
            val.status = "未查看";
          }

          //（1已查看2未查看 ）
          if (val.supStatus === "1") {
            val.supStatus = "已查看";
          } else if (val.supStatus === "2") {
            val.supStatus = "未查看";
          }

          arr.push(val);
        });
        this.TZList = arr;
      });
    },
    showXiangqing(e) {
      this.CHANGE_TIME_NUMBER();
      this.SETTYPE(e.type.substr(0, 2));
      localStorage.setItem("SchoolId", e.SchoolId);
      localStorage.setItem("lishixiangqingid", e.id);
      localStorage.setItem("lishixiangqingjing", e.type.substr(2));
      this.$router.push("/alertDetails");
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(this.userInfo);

    this.getbjweijieshou();
    this.getyjweijieshou();
    this.getJGList();
    this.getTZ();
  }
};
</script>
<style lang="scss" scope>
@import "@/assets/css/public.scss";
#completion2 {
  width: 100%;
  height: calc(100% - 30px);
  padding: 30px 50px;
  padding-bottom: 0px;
  .el-radio-group {
    height: 40px;
    .el-radio-button__inner {
      background: #0e265c;
      color: #fff;
    }
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      background: #2156b9;
      color: #fff;
    }
    .el-radio-button {
      margin-right: 6px !important;

      &:first-child .el-radio-button__inner {
        border: none;
      }
      .el-radio-button__inner {
        border: none;
      }
    }
  }
  .biao {
    width: 99%;
    height: calc(100% - 50px);
    overflow: hidden;
    .el-table {
      width: 100%;
      height: calc(100% - 50px);
      overflow: auto;
      border: 1px solid #2156bb;
      background: none !important;
      // @extend .gundongtiao;
      tr {
        background: none;
        &:nth-of-type(even) {
          background: #061238;
        }
        td {
          border: none;
          color: #b7cffa;
        }
      }
      th {
        color: #fff;
        background: #0a1d4e;
        border: none;
      }
    }
    .el-row {
      margin-top: 30px;
      button {
        width: 100%;
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
        &.dis {
          background: none;
          border-color: #90939985;
          color: #90939985;
        }
      }
      .el-button.is-disabled:hover {
        background: none;
      }
    }
  }
  .el-table::before {
    height: 0px;
  }
  .el-table__header {
    width: 100% !important;
  }
  .el-table__body-wrapper {
    @extend .gundongtiao;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background: #0a1d4e;
  }
}
</style>
