<template>
  <div id="completion">
    <el-radio-group v-model="active">
      <el-radio-button label="报警接收记录"></el-radio-button>
      <el-radio-button label="预警接收记录"></el-radio-button>
      <el-radio-button label="监管意见下达记录"></el-radio-button>
      <el-radio-button label="通知公告"></el-radio-button>
    </el-radio-group>
    <div class="biao" v-show="active==='报警接收记录'">
      <el-table
        height="calc(100% - 70)"
        :data="bjList.records"
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
        <el-table-column prop="time" label="接收时间"></el-table-column>
        <el-table-column prop="opinion" label="监管意见"></el-table-column>
        <el-table-column label="查看详情">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="showXiangqing(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="details" label="查看详情"></el-table-column> -->
      </el-table>
      <el-footer class="footer">
        <div
          class="tip"
        >显示{{bjList.size}}项结果，共{{bjList.total}}项，当前{{bjList.current}}/{{bjList.pages}}页</div>
        <div>
          <el-button v-show="bjList.current>1" @click="bjupPage" type="primary" plain>上一页</el-button>
          <el-button v-show="bjList.current<2" disabled class="dis" type="primary" plain>上一页</el-button>

          <el-button
            v-show="bjList.current<bjList.pages"
            @click="bjnextPage"
            type="primary"
            plain
          >下一页</el-button>
          <el-button
            v-show="!(bjList.current<bjList.pages)"
            disabled
            class="dis"
            type="primary"
            plain
          >下一页</el-button>
        </div>
      </el-footer>
    </div>
    <div class="biao" v-show="active==='预警接收记录'">
      <el-table
        height="calc(100% - 70)"
        :data="yjList.records"
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
        <el-table-column prop="time" label="接收时间"></el-table-column>
        <el-table-column prop="opinion" label="监管意见"></el-table-column>
        <!-- <el-table-column prop="details" label="查看详情"></el-table-column> -->
        <el-table-column label="查看详情">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="showXiangqing(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-footer class="footer">
        <div
          class="tip"
        >显示{{yjList.size}}项结果，共{{yjList.total}}项，当前{{yjList.current}}/{{yjList.pages}}页</div>
        <div>
          <el-button v-show="yjList.current>1" @click="yjupPage" type="primary" plain>上一页</el-button>
          <el-button v-show="yjList.current<2" disabled class="dis" type="primary" plain>上一页</el-button>

          <el-button
            v-show="yjList.current<yjList.pages"
            @click="yjnextPage"
            type="primary"
            plain
          >下一页</el-button>
          <el-button
            v-show="!(yjList.current<yjList.pages)"
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
        <el-table-column prop="status" label="学校查看状态"></el-table-column>
        <el-table-column prop="supStatus" label="下发人查看状态"></el-table-column>

        <el-table-column prop="viewName" label="接收人"></el-table-column>
        <!-- <el-table-column label="查看详情">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
          </template>
        </el-table-column>-->
        <!-- <el-table-column prop="details" label="查看详情"></el-table-column> -->
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
        <el-table-column prop="schName" label="学校名称"></el-table-column>
        <el-table-column prop="title" label=" 标题"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="realName" label="发布人"></el-table-column>
        <el-table-column prop="createTime" label="发布时间"></el-table-column>
        <el-table-column prop="viewTime" label="学校查看时间"></el-table-column>
        <el-table-column prop="status" label="学校查看状态"></el-table-column>
        <el-table-column prop="supStatus" label="下发人查看状态"></el-table-column>

        <!-- <el-table-column prop="details" label="查看详情"></el-table-column> -->
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
import { mapState, mapMutations } from "vuex";
import { jianguanxidajilu, tongzhigonggao, bjjieshou } from "@/api/home";
export default {
  name: "completion",
  computed: {
    ...mapState(["YIBANSHIXIANG_ACTIVE"])
  },
  data() {
    return {
      userInfo: null,
      bjval: {
        page: 1,
        size: 10,
        iswarning: 1
      },
      yjval: {
        page: 1,
        size: 10,
        iswarning: 0
      },
      loading_bj: true,
      loading_yj: true,
      isJinyong: true,
      active: "报警接收记录",
      bjList: {
        records: [],
        total: 6,
        size: 10,
        current: 1,
        searchCount: true,
        pages: 1
      },
      yjList: {
        records: [],
        total: 6,
        size: 10,
        current: 1,
        searchCount: true,
        pages: 1
      },
      tableData: [
        {
          number: "0001",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "快速补齐证件",
          details: "查看详情"
        },
        {
          number: "0002",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "快速补齐证件",
          details: "查看详情"
        },
        {
          number: "0003",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "快速补齐证件",
          details: "查看详情"
        },
        {
          number: "0004",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "快速补齐证件",
          details: "查看详情"
        },
        {
          number: "0002",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "快速补齐证件",
          details: "查看详情"
        },
        {
          number: "0003",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "快速补齐证件",
          details: "查看详情"
        },
        {
          number: "0004",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "快速补齐证件",
          details: "查看详情"
        },
        {
          number: "0002",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "快速补齐证件",
          details: "查看详情"
        },
        {
          number: "0003",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "快速补齐证件",
          details: "查看详情"
        },
        {
          number: "0004",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "快速补齐证件",
          details: "查看详情"
        },
        {
          number: "0002",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "快速补齐证件",
          details: "查看详情"
        },
        {
          number: "0003",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "快速补齐证件",
          details: "查看详情"
        },
        {
          number: "0004",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "快速补齐证件",
          details: "查看详情"
        },
        {
          number: "0003",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "快速补齐证件",
          details: "查看详情"
        },
        {
          number: "0004",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "快速补齐证件",
          details: "查看详情"
        }
      ],
      TZList: [],
      current: 1,
      size: 20,
      com_size: "",
      com_current: "",

      tz_current: 1,
      tz_size: 20,
      tz_com_size: Number,
      tz_com_current: Number
    };
  },
  watch: {
    active() {}
  },
  methods: {
    ...mapMutations(["CHANGE_TIME_NUMBER", "SETTYPE", "CHENGE_ACTIVE"]),
    showXiangqing(e) {
      this.CHANGE_TIME_NUMBER();
      this.SETTYPE(e.type.substr(0, 2));
      localStorage.setItem("SchoolId", e.SchoolId);
      localStorage.setItem("lishixiangqingid", e.id);
      localStorage.setItem("lishixiangqingjing", e.type.substr(2));
      this.$router.push("/alertDetails");
    },
    bjupPage() {
      this.bjval.page--;
      this.getbjjieshou();
    },
    bjnextPage() {
      this.bjval.page++;
      this.getbjjieshou();
    },
    yjupPage() {
      this.yjval.page--;
      this.getyjjieshou();
    },
    yjnextPage() {
      this.yjval.page++;
      this.getyjjieshou();
    },
    handleEdit(index, row) {},
    tz_previousPage() {
      this.tz_current = this.tz_current - 1;

      this.getTZ();
    },
    tz_nextPage() {
      this.tz_current = this.tz_current + 1;

      this.getTZ();
    },
    previousPage() {
      this.current = this.current - 1;

      this.getJGList();
    },
    nextPage() {
      this.current = this.current + 1;

      this.getJGList();
    },
    getTZ() {
      tongzhigonggao({
        userId: this.userInfo.userId,
        size: this.tz_size,
        current: this.tz_current,
        supStatus: 1 //1 已办 未办
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
    getJGList() {
      jianguanxidajilu({
        userId: this.userInfo.userId,
        size: this.size,
        current: this.current,
        supStatus: 1
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
        // console.log(this.tableData);
      });
    },
    getbjjieshou() {
      this.loading_bj = true;
      bjjieshou({
        regionalLevel: this.userInfo.userLevel,
        areaCode: this.userInfo.areaCode,
        page: this.bjval.page,
        size: this.bjval.size,
        iswarning: this.bjval.iswarning
      }).then(res => {
        // console.log(111);

        // console.log(res.data.data);
        this.bjList = res.data.data;
        this.loading_bj = false;
      });
    },
    getyjjieshou() {
      this.loading_yj = true;
      bjjieshou({
        regionalLevel: this.userInfo.userLevel,
        areaCode: this.userInfo.areaCode,
        page: this.yjval.page,
        size: this.yjval.size,
        iswarning: this.yjval.iswarning
      }).then(res => {
        // console.log("yujing");

        // console.log(res.data.data);
        this.yjList = res.data.data;
        this.loading_yj = false;
      });
    }
  },
  mounted() {
    this.getJGList();
    this.getTZ();
    this.getbjjieshou();
    this.getyjjieshou();
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(this.userInfo);
  }
};
</script>
<style lang="scss" scope>
@import "@/assets/css/public.scss";
#completion {
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
    .el-table {
      width: 100%;
      height: calc(100% - 50px);
      overflow: auto;
      border: 1px solid #2156bb;
      background: none !important;
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
