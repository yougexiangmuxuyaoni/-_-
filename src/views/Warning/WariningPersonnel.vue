<template>
  <div id="queshi">
    <el-main>
      <el-table :data="tableData" row-class-name="bg" height="7.6rem">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="warningNum" label="同一预警数量"></el-table-column>
        <el-table-column prop="conten" label="预警信息内容"></el-table-column>
        <el-table-column prop="type" label="预警类别"></el-table-column>
        <el-table-column prop="name" label="学校名称"></el-table-column>
        <el-table-column prop="supplier" label="供应商名称"></el-table-column>
        <el-table-column prop="schoolNum" label="关联学校数量"></el-table-column>
        <el-table-column prop="relationNum" label="关联预警数量"></el-table-column>
        <el-table-column prop="date" label="最近预警时间"></el-table-column>
        <el-table-column prop="status" label="接收状态"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="footer">
      <div class="tip">显示10项结果，共83项，当前1/9页</div>
      <div>
        <el-button :disabled="isJinyong">上一页</el-button>
        <el-button>下一页</el-button>
      </div>
    </el-footer>
  </div>
</template>
<script>
export default {
  name: "about",
  data() {
    const item = {
      warningNum: "3次",
      name: "北京朝阳实验学校",
      supplier: "某某食品有限公司",
      conten: "健康证丢失",
      type: "证件预警",
      schoolNum: "9个",
      relationNum: "6个",
      date: "2016-05-02",
      status: "未接收"
    };
    return {
      tableData: Array(20).fill(item),
      isJinyong: true
    };
  },
  methods: {
    handleClick(e) {
      //详情
      this.$router.push("/alertDetails");
    }
  }
};
</script>
<style lang="scss" scope>
#queshi {
  .el-main {
    height: 7.6rem;
    overflow: hidden;
    padding: 0;
    padding-bottom: 0.3rem;
    .el-table th.is-leaf,
    .el-table td {
      border: none;
      text-align: center;
    }
    .el-table {
      border: 0.02rem solid #2156b9;
      background: rgba($color: #000000, $alpha: 0);
      &::before {
        height: 0;
      }
      .el-table__header-wrapper {
        table {
          thead {
            tr {
              th {
                background: #0a2157;
                color: #c5d7f7;
                border: none;
                .cell {
                  background: #0a2157;
                }
              }
            }
          }
        }
      }
      .el-table__body-wrapper {
        &::-webkit-scrollbar {
          /*滚动条整体样式*/
          width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
          height: 1px;
        }
        &::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 4px;
          -webkit-box-shadow: inset 0 0 5px #fff; //40f1fd
          background: #bababa;
        }
        &::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          -webkit-box-shadow: inset 0 0 5px #2158c0; //2158c0
          border-radius: 4px;
          background: #ededed;
        }
        table {
          tr {
            color: #c5d7f7;
            background: #0a194bbb;
            &:nth-of-type(odd) {
              background: #06133c50;
              td {
                background: #06133c50;
              }
            }
            &.hover-row {
              background: #132c7cfb !important;
            }
            &:hover {
              background: #132c7cfb !important;
            }
            &:hover td {
              background: #132c7cfb !important;
            }
            td {
              border: none;
              background: #0a194bbb;
              // &:hover {
              //   background: #06133cf3;
              // }
              &:last-of-type {
                width: 4rem;
                color: red;
                background: #132c7cfb !important;
              }
            }
          }
        }
      }
    }
  }
  .el-table th {
    background: #0a2157;
    color: #c5d7f7;
  }
  .el-table tr {
    background: #0a2157;
    &.hover-row td {
      background: #0a2157 !important;
    }
  }
  .el-button--primary {
    color: #40f1fd;
    background: none;
    border-color: #40f1fd;
  }
  .el-table__fixed-right-patch {
    background: #0a2157;
    border: none;
  }
  .el-table__fixed::before,
  .el-table__fixed-right::before {
    background: none;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
