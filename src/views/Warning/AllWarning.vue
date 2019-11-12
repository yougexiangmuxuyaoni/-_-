<template>
  <div id="allwarning">
    <el-container style="height: calc(100vh - .71rem);">
      <el-aside width="250px" style>
        <el-menu
          router
          :default-openeds="['1','2', '3']"
          :default-active="$route.path"
          @select="handleSelect"
          background-color="rgba(0,0,0,0)"
          text-color="#c5d7f7"
          active-text-color="#40f1fd"
        >
          <el-submenu index="1">
            <template slot="title">
              证照预警
              <span>1265</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/header_hei">证件信息缺失</el-menu-item>
              <el-menu-item index="/header_hei/beoverdue">证照过期</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              人员预警
              <span>56</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/header_hei/personnel">证件信息丢失</el-menu-item>
              <el-menu-item index="/header_hei/personneldate">证件超期</el-menu-item>
              <el-menu-item index="/header_hei/hygiene">卫生情况</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              食材预警
              <span>13</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/header_hei/food">食材预警</el-menu-item>
              <el-menu-item index="/header_hei/packing">预包装食品</el-menu-item>
              <el-menu-item index="/header_hei/product">成品预警</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <div class="top">
          <div class="xiala">
            <div class="serch_wrap">
              <el-input class="input1" v-model="school_name" placeholder="学校名称"></el-input>
            </div>

            <div class="area_selct">
              <el-select v-model="bj_type" placeholder="报警类别">
                <el-option
                  v-for="item in bj_type_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  @change="quyu_handleChange(item)"
                ></el-option>
              </el-select>
            </div>

            <div class="yujing_selct">
              <el-select v-model="bj_value" placeholder="报警信息">
                <el-option
                  v-for="item in bj_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  @change="baojing_handleChange(item)"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="riqi">
            <el-date-picker
              v-model="value1"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
            ></el-date-picker>
          </div>
          <div class="sosuo">
            <el-button type="primary">搜索</el-button>
          </div>
        </div>
        <el-header>
          <div class="tap">
            <el-radio-group v-model="radio1">
              <el-radio-button label="全部预警"></el-radio-button>
              <el-radio-button label="未接收预警21条"></el-radio-button>
              <el-radio-button label="已接收预警"></el-radio-button>
            </el-radio-group>
          </div>
        </el-header>
        <router-view class="view"></router-view>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { log } from "util";
export default {
  name: "allwarning",
  data() {
    return {
      school_name: "", //学校名字
      activeIndex: "",
      value: "",
      options: [],
      radio1: "全部预警",
      value1: "",

      bj_type: "报警类别",
      bj_value: "报警信息",
      bj_type_options: [
        {
          value: "报警类别",
          label: "报警类别"
        },
        {
          value: "朝阳区",
          label: "朝阳区"
        },
        {
          value: "海淀区",
          label: "海淀区"
        },
        {
          value: "昌平区",
          label: "昌平区"
        },
        {
          value: "大兴区",
          label: "大兴区"
        },
        {
          value: "东城区",
          label: "东城区"
        },
        {
          value: "西城区",
          label: "西城区"
        }
      ],
      bj_options: [
        {
          value: "报警信息",
          label: "报警信息"
        },
        {
          value: "预警",
          label: "预警"
        },
        {
          value: "报警",
          label: "报警"
        }
      ]
    };
  },
  methods: {
    to(uri) {},
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(e) {
      // console.log(e);
      this.$router.push("/alertDetails");
    },
    hover(row, column, cell, event) {
      console.log(row);
    }
  },
  mounted() {}
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
            height:100%;
            border-radius: 0.4rem;
            background: #091d4c;
            border: none;
            color: #c5d7f7;
            .el-range-input {
              width: 1rem;
            }
            .el-range-separator {
              line-height: .46rem;
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
}
</style>
