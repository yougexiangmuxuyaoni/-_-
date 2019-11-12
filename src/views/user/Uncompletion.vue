<template>
  <div id="completion2">
    <el-radio-group v-model="active">
      <el-radio-button label="未接收报警"></el-radio-button>
      <el-radio-button label="未接收预警"></el-radio-button>
    </el-radio-group>
    <div class="biao" v-show="active==='未接收报警'">
      <el-table height="calc(100% - 70)" :data="tableData" style="width: 100%">
        <el-table-column prop="number" label="报警编号"></el-table-column>
        <el-table-column prop="info" label="报警信息内容"></el-table-column>
        <el-table-column prop="type" label="报警类别"></el-table-column>
        <el-table-column prop="name" label="学校名称"></el-table-column>
        <el-table-column prop="date" label="最新报警时间"></el-table-column>
        <el-table-column prop="opinion" label="接收状态"></el-table-column>
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
    <div class="biao" v-show="active==='未接收预警'">
      <el-table height="calc(100% - 70)" :data="tableData" style="width: 100%">
        <el-table-column prop="number" label="预警编号"></el-table-column>
        <el-table-column prop="info" label="预警信息内容"></el-table-column>
        <el-table-column prop="type" label="预警类别"></el-table-column>
        <el-table-column prop="name" label="学校名称"></el-table-column>
        <el-table-column prop="date" label="最新预警时间"></el-table-column>
        <el-table-column prop="opinion" label="接收状态"></el-table-column>
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
  </div>
</template>
<script>
export default {
  name: "completion",
  data() {
    return {
      isJinyong:true,
      active: "未接收报警",
      tableData: [
        {
          number: "0001",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "未接收",
          details: "查看详情"
        },
        {
          number: "0002",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "未接收",
          details: "查看详情"
        },
        {
          number: "0003",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "未接收",
          details: "查看详情"
        },
        {
          number: "0004",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "未接收",
          details: "查看详情"
        },
        {
          number: "0002",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "未接收",
          details: "查看详情"
        },
        {
          number: "0003",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "未接收",
          details: "查看详情"
        },
        {
          number: "0004",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "未接收",
          details: "查看详情"
        },
        {
          number: "0002",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "未接收",
          details: "查看详情"
        },
        {
          number: "0003",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "未接收",
          details: "查看详情"
        },
        {
          number: "0004",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "未接收",
          details: "查看详情"
        },
        {
          number: "0002",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "未接收",
          details: "查看详情"
        },
        {
          number: "0003",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "未接收",
          details: "查看详情"
        },
        {
          number: "0004",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "未接收",
          details: "查看详情"
        },
        {
          number: "0003",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "未接收",
          details: "查看详情"
        },
        {
          number: "0004",
          info: "企业无商业资格证",
          type: "证照报警",
          name: "朝阳区实验小学",
          date: "2019-09-16",
          opinion: "未接收",
          details: "查看详情"
        }
      ]
    };
  },
  methods: {}
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
