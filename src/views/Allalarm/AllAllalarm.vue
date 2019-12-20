<template>
  <div id="allwarning">
    <el-container style="height: calc(100vh - .71rem);">
      <el-aside width="250px" style>
        <el-menu
          :default-openeds="['1','2', '3']"
          :default-active="navType"
          @select="handleSelect"
          background-color="rgba(0,0,0,0)"
          text-color="#c5d7f7"
          active-text-color="#40f1fd"
        >
          <el-submenu index="1">
            <template slot="title">
              证照报警
              <span>{{baojingshuJson.alarmTotalByYear.cardTotal}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1">营业执照过期</el-menu-item>
              <el-menu-item index="2">许可证过期</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              人员报警
              <span>{{baojingshuJson.alarmTotalByYear.personTotal}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3">健康证过期</el-menu-item>
              <el-menu-item index="4">晨检出现不合格报警</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              食材报警
              <span>{{baojingshuJson.alarmTotalByYear.foodTotal}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5">索证索票未上传超过3天报警</el-menu-item>
              <el-menu-item index="6">食材快检报告不合格报警</el-menu-item>
              <el-menu-item index="7">食材快检报告未上传</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <div class="top">
          <div class="xiala">
            <div class="serch_wrap">
              <el-input class="input1" v-model="jsonval.schoolName" placeholder="学校名称"></el-input>
            </div>
          </div>
          <div class="riqi">
            <el-date-picker
              v-model="shicai_date"
              style="background: rgb(25, 38, 79);color: white;"
              type="daterange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div class="sosuo">
            <el-button type="primary" @click="search">搜索</el-button>
          </div>
        </div>
        <el-header>
          <div class="tap">
            <el-radio-group v-model="radio1">
              <el-radio-button label="全部报警"></el-radio-button>
              <el-radio-button label="未接收报警"></el-radio-button>
              <el-radio-button label="已接收报警"></el-radio-button>
            </el-radio-group>
          </div>
        </el-header>
        <el-main>
          <el-table
            v-loading="loading_yujing"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.1)"
            :data="json.records"
            row-class-name="bg"
            height="7.6rem"
          >
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="sameAlarm" label="同一报警数量"></el-table-column>
            <el-table-column prop="description" label="报警信息内容"></el-table-column>
            <el-table-column prop="type" label="报警类别"></el-table-column>

            <el-table-column prop="schoolName" label="学校名称"></el-table-column>
            <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
            <el-table-column prop="school" label="关联学校数量"></el-table-column>
            <el-table-column prop="alarm" label="关联报警数量"></el-table-column>
            <el-table-column prop="time" label="最近报警时间"></el-table-column>
            <el-table-column prop="Status" label="接收状态"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <!-- @click="showXiangqing(val.id,val.type) -->
                <el-button @click="showXiangqing(scope.row)" type="primary" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <el-footer class="footer">
          <div class="tip">显示{{json.size}}项结果，共{{json.total}}项，当前{{json.current}}/{{json.pages}}页</div>
          <div>
            <el-button v-show="json.current>1" @click="upPage" type="primary" plain>上一页</el-button>
            <el-button v-show="json.current<2" disabled class="dis" type="primary" plain>上一页</el-button>

            <el-button v-show="json.current<json.pages" @click="nextPage" type="primary" plain>下一页</el-button>
            <el-button
              v-show="!(json.current<json.pages)"
              disabled
              class="dis"
              type="primary"
              plain
            >下一页</el-button>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { baojingshu, baojingliebiao } from "@/api/warning.js";
import { log } from "util";
import { mapState, mapMutations } from "vuex";
export default {
  name: "allwarning",
  data() {
    return {
      loading_yujing: true,
      jsonval: {
        schoolName: "",
        startingTime: "",
        endTime: "",
        page: 1,
        size: 10,
        dealWith: 3,
        type: 1
      },
      json: {
        records: [
          {
            supplierName: " ",
            Status: " ",
            school: "",
            description: " ",
            warning: "",
            VALUE: "",
            time: ":",
            id: "",
            type: "",
            schoolName: "",
            SchoolId: "",
            sameWarning: ""
          }
        ],
        total: 3,
        size: 10,
        current: 1,
        searchCount: true,
        pages: 1
      },
      navType: "1",
      baojingshuJson: {
        alarmTotalByYear: {
          cardTotal: 0,
          foodTotal: 0,
          personTotal: 0
        }
      },
      activeIndex: "",
      value: "",
      options: [],
      shicai_date: [],
      radio1: "全部报警"
    };
  },
  watch: {
    shicai_date() {
      if (!this.shicai_date) {
        this.jsonval.startingTime = "";
        this.jsonval.endTime = "";
      } else {
        this.jsonval.startingTime = this.shicai_date[0];
        this.jsonval.endTime = this.shicai_date[1];
      }
    },
    radio1() {
      this.topNav();
    }
  },
  computed: {
    ...mapState(["USER_INFO"])
  },
  methods: {
    ...mapMutations(["SETTYPE", "CHANGE_TIME_NUMBER", "SET_USER_INFO"]),
    topNav() {
      this.jsonval = {
        type: this.jsonval.type,
        schoolName: this.jsonval.schoolName,
        startingTime: this.jsonval.startingTime,
        endTime: this.jsonval.endTime,
        page: 1,
        size: 10,
        dealWith: 3 //全部 1.未接收 3.已接收
      };
      if (this.radio1 === "全部报警") {
        this.jsonval.dealWith = 3;
      } else if (this.radio1 === "未接收报警") {
        this.jsonval.dealWith = 1;
      } else if (this.radio1 === "已接收报警") {
        this.jsonval.dealWith = 2;
      }
      this.getbaojingliebiao();
    },
    listInit() {
      this.jsonval = {
        schoolName: "",
        startingTime: "",
        endTime: "",
        page: 1,
        size: 10,
        dealWith: 3, //全部 1.未接收 3.已接收
        type: 1
      };
    },
    search() {
      this.radio1 = "全部报警";
      this.jsonval.dealWith = 3;
      this.jsonval.page = 1;
      this.getbaojingliebiao();
    },
    upPage() {
      this.jsonval.page--;
      this.getbaojingliebiao();
    },
    nextPage() {
      this.jsonval.page++;
      this.getbaojingliebiao();
    },
    handleSelect(key, keyPath) {
      this.radio1 = "全部报警";
      this.listInit();
      this.jsonval.type = key;
      this.getbaojingliebiao();
    },
    showXiangqing(e) {
      this.CHANGE_TIME_NUMBER();
      this.SETTYPE(e.type.substr(0, 2));
      localStorage.setItem("lishixiangqingtype",e.type.substr(0, 2));
      localStorage.setItem("SchoolId", e.SchoolId);
      localStorage.setItem("lishixiangqingid", e.id);
      localStorage.setItem("lishixiangqingjing", e.type.substr(2));
      this.$router.push("/alertDetails");
    },
    hover(row, column, cell, event) {
    },
    getbaojingshu() {
      let date = new Date();
      let year = date.getFullYear();
      baojingshu({
        year: year,
        regionalLevel: this.USER_INFO.userLevel,
        areaCode: this.USER_INFO.areaCode
      }).then(res => {
        this.baojingshuJson = res.data.data;
      });
    },
    getbaojingliebiao() {
      this.loading_yujing = true;
      baojingliebiao({
        type: this.jsonval.type, //报警类别
        regionalLevel: this.USER_INFO.userLevel,
        areaCode: this.USER_INFO.areaCode,
        dealWith: this.jsonval.dealWith,
        page: this.jsonval.page,
        size: this.jsonval.size,
        schoolName: this.jsonval.schoolName,
        startingTime: this.jsonval.startingTime,
        endTime: this.jsonval.endTime
      }).then(res => {
        this.loading_yujing = false;
        this.json = res.data.data;
      });
    }
  },
  mounted() {},
  created() {
    var user = JSON.parse(localStorage.getItem("userInfo"));
    this.SET_USER_INFO(user);

    this.getbaojingshu();
    this.getbaojingliebiao();
  }
};
</script>
<style lang="scss" scope>
@import "@/assets/css/public.scss";
#allwarning {
  color: #fff;
  height: calc(100vh - 0.71rem);
  .el-container {
    border: none;
    .el-aside {
      background: rgba(20, 13, 55, 0.4);
      border-right: 0.01rem solid #2156b9;
      .el-menu {
        border: none;
        .el-submenu {
          .el-submenu__title {
            i {
              color: #c5d7f7;
            }
            &:hover {
              background: none !important;
            }
            span {
              color: #c5d7f7;
              background: #2150ae;
              margin-left: 0.06rem;
              padding: 0 0.1rem;
              border-radius: 0.2rem;
            }
          }
          .el-menu--inline {
            .el-menu-item-group {
              .el-menu-item-group__title {
              }
              ul {
                li {
                  &:hover {
                    background: rgba(17, 35, 88, 0.767) !important;
                  }
                  &.is-active {
                    background: rgba(17, 35, 88, 0.767) !important;
                  }
                }
              }
            }
          }
        }
      }
    }
    .el-container {
      padding: 0.15rem;
      .top {
        display: flex;
        input {
          background: #091d4c;
          border: none;
          color: #c5d7f7;
          &:-ms-input-placeholder {
            color: #c5d7f7;
          }
          &::-webkit-input-placeholder {
            color: #c5d7f7;
          }
        }
        .xiala {
          display: flex;
          & > div {
            margin-right: 0.15rem;
          }
          .serch_wrap {
            position: relative;
            box-sizing: border-box;
            width: 2.4rem;
            height: 0.54rem;
            .input1 {
              z-index: 1;
              position: absolute;
              width: 100%;
              height: 100%;
              input {
                width: 100%;
                height: 100%;
                padding-right: 0.7rem;
                border-radius: 0.5rem;
              }
            }
          }
          .area_selct {
            width: 1.5rem;
            height: 0.54rem;
            .el-select {
              width: 100%;
              height: 100%;
              .el-input {
                width: 100%;
                height: 100%;
                input {
                  height: 100%;
                  border-radius: 0.5rem;
                }
              }
            }
          }
          .yujing_selct {
            width: 1.5rem;
            height: 0.54rem;
            .el-select {
              height: 100%;
              width: 100%;
              .el-input {
                height: 100%;
                width: 100%;
                input {
                  height: 100%;
                  border-radius: 0.5rem;
                }
              }
            }
          }
        }
        .riqi {
          height: 0.54rem;
          .el-date-editor {
            width: auto;
            height: 100%;
            border-radius: 0.4rem;
            background: #091d4c;
            border: none;
            color: #c5d7f7;
            .el-range-input {
              width: 1rem;
            }
            .el-range-separator {
              line-height: 0.46rem;
              color: #fff;
            }
          }
        }
        .sosuo {
          margin-left: 0.15rem;
          button {
            height: 100%;
            border-radius: 0.4rem;
            background: linear-gradient(90deg, #227de2, #0748dd);
            border: none;
            color: #c5d7f7;
            &:hover {
              background: linear-gradient(
                90deg,
                rgba(34, 124, 226, 0.769),
                rgba(6, 71, 222, 0.706)
              );
            }
          }
        }
      }
      .el-header {
        margin-top: 0.35rem;
        height: auto !important;
        padding: 0;
        .tap {
          .el-radio-group {
            label {
              margin-right: 0.06rem;
              &.is-active {
                border: none !important;
                span {
                  background: #2158c0;
                  border: none;
                }
              }
              span {
                position: relative;
                border: none !important;
                background: #0e2b6e;
                color: #c5d7f7;
                &:hover {
                  background: #184297;
                }
              }
            }
          }
        }
      }
      .view {
        height: 8.4rem;
        overflow: hidden;
      }
    }
  }
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
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    box-shadow: none;
  }
  .riqi .el-date-editor .el-range-input {
    width: 2rem !important;
  }
}
</style>
