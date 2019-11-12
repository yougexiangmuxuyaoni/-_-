<template>
  <div id="completion">
    <el-radio-group v-model="active">
      <el-radio-button label="报警接收记录"></el-radio-button>
      <el-radio-button label="预警接收记录"></el-radio-button>
      <el-radio-button label="监管意见下达记录"></el-radio-button>
      <el-radio-button label="通知公告"></el-radio-button>
    </el-radio-group>
    <div class="biao" v-show="active==='报警接收记录'">
      <el-table height="calc(100% - 70)" :data="bjList" style="width: 100%">
        <el-table-column prop="number" label="报警编号"></el-table-column>
        <el-table-column prop="info" label="报警信息内容"></el-table-column>
        <el-table-column prop="type" label="报警类别"></el-table-column>
        <el-table-column prop="name" label="学校名称"></el-table-column>
        <el-table-column prop="date" label="接收时间"></el-table-column>
        <el-table-column prop="opinion" label="监管意见"></el-table-column>
        <el-table-column prop="details" label="查看详情"></el-table-column>
      </el-table>
      <el-footer class="footer">
        <div class="tip">显示10项结果，共83项，当前1/9页</div>
        <div>
          <el-button :disabled="isJinyong">上一页</el-button>
          <el-button>下一页</el-button>
        </div>
      </el-footer>
    </div>
    <div class="biao" v-show="active==='预警接收记录'">
      <el-table height="calc(100% - 70)" :data="yjList" style="width: 100%">
        <el-table-column prop="number" label="预警编号"></el-table-column>
        <el-table-column prop="info" label="预警信息内容"></el-table-column>
        <el-table-column prop="type" label="预警类别"></el-table-column>
        <el-table-column prop="name" label="学校名称"></el-table-column>
        <el-table-column prop="date" label="接收时间"></el-table-column>
        <el-table-column prop="opinion" label="监管意见"></el-table-column>
        <el-table-column prop="details" label="查看详情"></el-table-column>
      </el-table>
      <el-footer class="footer">
        <div class="tip">显示10项结果，共83项，当前1/9页</div>
        <div>
          <el-button :disabled="isJinyong">上一页</el-button>
          <el-button>下一页</el-button>
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
          <el-button v-show="this.current === 1" :disabled="isJinyong">上一页</el-button>
          <el-button v-show="this.current > 1" @click="previousPage()">上一页</el-button>
          <el-button @click="nextPage()" v-show="this.current < this.com_current">下一页</el-button>
          <el-button v-show="this.current === this.com_current" :disabled="isJinyong">下一页</el-button>
        </div>
      </el-footer>
    </div>

    <div class="biao" v-show="active==='通知公告'">
      <el-table height="calc(100% - 70)" :data="TZList" style="width: 100%">
        <el-table-column type="index" width="20"></el-table-column>
        <el-table-column prop="schName" width="100" label="学校名称"></el-table-column>
        <el-table-column prop="title" width="120" label=" 标题"></el-table-column>
        <el-table-column prop="content"  label="内容"></el-table-column>
        <el-table-column prop="realName" width="70" label="发布人"></el-table-column>
        <el-table-column prop="createTime" width="100" label="发布时间"></el-table-column>
        <el-table-column prop="viewTime" width="100" label="学校查看时间"></el-table-column>
        <el-table-column prop="status" width="70" label="学校查看状态"></el-table-column>
        <el-table-column prop="supStatus" width="80" label="下发人查看状态"></el-table-column>

        <!-- <el-table-column prop="details" label="查看详情"></el-table-column> -->
      </el-table>
      <el-footer class="footer">
        <div
          class="tip"
        >显示{{this.tz_size}}项结果，共{{this.tz_com_size}}项，当前{{this.tz_current}}/{{this.tz_com_current}}页</div>
        <div>
          <el-button v-show="this.tz_current === 1" :disabled="isJinyong">上一页</el-button>
          <el-button v-show="this.tz_current > 1" @click="tz_previousPage()">上一页</el-button>
          <el-button @click="tz_nextPage()" v-show="this.tz_current < this.tz_com_current">下一页</el-button>
          <el-button v-show="this.tz_current === this.tz_com_current" :disabled="isJinyong">下一页</el-button>
        </div>
      </el-footer>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "completion",
  computed: {
    ...mapState(["YIBANSHIXIANG_ACTIVE"])
  },
  data() {
    return {
      isJinyong: true,
      active: "报警接收记录",
      bjList: [
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
      yjList: [
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
  methods: {
    ...mapMutations(["CHENGE_ACTIVE"]),
    handleEdit(index, row) {
      console.log(index, row);
    },
    tz_previousPage() {
      console.log("上一页");

      this.tz_current = this.tz_current - 1;

      this.getTZ();
    },
    tz_nextPage() {
      console.log("下一页");

      this.tz_current = this.tz_current + 1;

      this.getTZ();
    },
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
    getTZ() {
      this.$http({
        url: "/api/manageWat/supervision/findPage",
        method: "get",
        params: {
          userId: 4,
          size: this.tz_size,
          current: this.tz_current
        }
      }).then(res => {
        console.log('userId');
        
        console.log(res.data);
        this.tz_com_size = res.data.data.total;
        this.tz_com_current = res.data.data.pages;
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
      console.log(this.current);
      console.log(this.size);
      this.$http
        .get("/api/manageWat/supervision/findPageForOp", {
          params: { userId: 4, size: this.size, current: this.current }
        })
        .then(res => {
          console.log('userId');
          
          console.log(res.data.data.records);
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
          // console.log(JSON.stringify(arr));

          this.tableData = arr;
        });
    }
  },
  mounted() {
    console.log(this.YIBANSHIXIANG_ACTIVE);

    if (this.YIBANSHIXIANG_ACTIVE) {
      this.active = this.YIBANSHIXIANG_ACTIVE;
      this.CHENGE_ACTIVE("");
    }
    this.getJGList();
    this.getTZ();
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
