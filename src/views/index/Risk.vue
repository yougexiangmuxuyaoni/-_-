<template>
  <div class="risk">
    <div class="main" id="container">
      <el-row type="flex" class="top">
        <div class="serch_wrap">
          <el-input class="input1" v-model="keys" placeholder="请输入关键字查找"></el-input>
          <i @click="search" class="el-icon-search"></i>
          <div v-show="isSearch" class="school_wrap">
            <div class="jie_wrap">
              <p>叙永县食品药品监督管理所</p>
              <p>
                <span>预警：30次</span>
                <span>报警：30次</span>
                <span>学校：30次</span>
              </p>
              <p>G312（广成线）</p>
            </div>
            <div class="school_list_wrap">
              <div class="tap">
                <el-radio-group v-model="jingbao_type" size="mini">
                  <el-radio-button label="全部警报"></el-radio-button>
                  <el-radio-button label="预警"></el-radio-button>
                  <el-radio-button label="报警"></el-radio-button>
                </el-radio-group>
              </div>
              <div class="list">
                <ul>
                  <li v-for="(val,index) of activeMarers" :key="index" @click="to('/positioning')">
                    <div class="icon">
                      <span>{{++index}}</span>
                      <img v-if="index<5" class="icon" src="@/assets/img/map_blue.png" />
                      <img v-else class="icon" src="@/assets/img/map_red.png" />
                    </div>
                    <img :src="val.img" />
                    <div class="alt">
                      <p>{{val.name}}</p>
                      <p>
                        <span>预警：{{val.yj}}次</span>
                        <span>报警：{{val.bj}}次</span>
                      </p>
                      <p>{{val.add}}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="area_selct">
          <el-select v-model="area_value" placeholder="全部区域">
            <el-option
              v-for="item in quyu_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @change="quyu_handleChange(item)"
            ></el-option>
          </el-select>
        </div>

        <div class="yujing_selct">
          <el-select v-model="yj_value" placeholder="全部警报">
            <el-option
              v-for="item in yj_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @change="baojing_handleChange(item)"
            ></el-option>
          </el-select>
        </div>
      </el-row>
      <el-amap class="amap-box" vid="amap-vue" :zoom="zoom" :center="center">
        <el-amap-marker
          v-for="(marker, index) in activeMarers"
          :position="marker.position"
          :content="marker.content"
          :events="marker.events"
          :key="index"
          :vid="index"
        ></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>
 

<script type="text/javascript">
import axios from 'axios';
export default {
  name: "risk",
  data() {
    return {
      jingbao_type: "全部警报",
      isSearch: false, //是否显示搜索结果
      search_type: "街道", //搜索结果的类型 （街道/学校）
      isClick: 1,
      zoom: 7,
      center: [104.069855,30.658281],
      shiMarkers: [],
      jieMarkers: [],
      xueMarkers: [],
      activeMarers: [],
      events: {
        // init(o) {
        //   console.log(o.getCenter());
        //   // console.log(this.$refs.map.$$getInstance());
        //   o.getCity(result => {
        //     console.log(result);
        //   });
        // },
        // click(e) {
        // console.log(e);
        // console.log(e.$$getExtData());
        // console.log((vm.isClick = false));
        // vm.isClick = 2;
        // },
        // mouseover(e) {
        // console.log(e);
        // }
      },
      keys: "",
      area_value: "全部区域",
      yj_value: "全部警报",
      quyu_options: [
        {
          value: "全部区域",
          label: "全部区域"
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
      yj_options: [
        {
          value: "全部警报",
          label: "全部警报"
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
    to(e) {
      if (this.search_type === "学校") {
        this.$router.push(e);
      } else if (this.search_type === "街道") {
        this.search_type = "学校";
        this.search();
      }
    },
    search() {
      this.isSearch = true;
      if (this.search_type === "街道") {
        axios.get("/static/jiedao.json").then(res => {
          let searchData = res.data;
          searchData.forEach((val, index) => {
            val.content = `<div class='xuexiao'>
                          <div class="name"> <div class="icon">${++index}</div> <div>${
              val.name
            }</div> </div>
                          <div class="tip">
                            <div>
                              <img src="${val.img}"/>
                            </div>
                            <div class="">
                              <p>${val.name}</p>
                              <p class="">
                                <span>预警: ${val.yj}次</span>
                                <span>报警: ${val.bj}次</span>
                                <span>学校: ${val.xx}所</span>
                              </p>
                              <p>${val.add}</p>
                            </div>
                          </div>
                        </div>
                      `;
            val.events = {
              click(e) {
                vm.zoom = 14;
                vm.search_type = "学校";
                vm.search();
                 
              }
            };
            this.activeMarers = searchData;
            this.center = this.activeMarers[0].position;
          });
        });
      } else if (this.search_type === "学校") {
        axios.get("/static/xuexiao.json").then(res => {
          let searchData = res.data;
          searchData.forEach((val, index) => {
            val.content = `<div class='xuexiao'>
                          <div class="name"> <div class="icon">${++index}</div> <div>${
              val.name
            }</div> </div>
                          <div class="tip">
                            <div>
                              <img src="${val.img}"/>
                            </div>
                            <div class="">
                              <p>${val.name}</p>
                              <p>
                                <span>预警: ${val.yj}次</span>
                                <span>报警: ${val.bj}次</span>
                              </p>
                              <p>${val.add}</p>
                            </div>
                          </div>
                        </div>
                      `;
            val.events = {
              click(e) {
                vm.$router.push("/positioning");
              }
            };
            this.activeMarers = searchData;
            this.center = this.activeMarers[0].position;
          });
        });
      }
    },
    xiaZuan(e) {
      console.log(e);
    },
    baojing_handleChange(e) {
      console.log(e);
    },
    quyu_handleChange(e) {
      console.log(e);
    },
    getshi() {
      axios.get("/static/shi.json").then(res => {
        let searchData = res.data;

        searchData.forEach((val, index) => {
          val.content = `<div class='qu'>
                        <div class="item">${val.name}</div>
                        <div class="item">警报 1283次</div>
                        <div class="item">356所 学校</div>
                      </div>
            `;
          val.events = {
            click(e) {
              vm.zoom = 9;
              console.log(e);
              vm.search();
            }
          };
          this.activeMarers = searchData;
        });

        window.vm = this;
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.getshi();
    }, 0);
  }
};
</script>
<style lang="scss" scope>
.risk {
  font-size: 0.14rem;
  height: 84.3vh;
  padding: 0.2rem;
  .main {
    width: 100%;
    height: 9.1rem;
    position: relative;
    .top {
      z-index: 1;
      position: absolute;
      top: 0.4rem;
      left: 0.4rem;
      height: 0.5rem;
      & > div {
        margin-right: 0.1rem;
      }
      .serch_wrap {
        position: relative;
        box-sizing: border-box;
        width: 4rem;
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
          }
        }
        i {
          z-index: 1;
          position: absolute;
          // top: 0.14rem;
          right: 0.1rem;
          color: #666;
          display: inline-block;
          // height: .54rem;
          line-height: 0.54rem;
          font-size: 0.28rem;
          padding-left: 0.1rem;
          border-left: 0.01rem dashed #ddd;
          &:hover {
            cursor: pointer;
          }
        }

        .school_wrap {
          position: absolute;
          top: 0.6rem;
          width: 100%;
          box-sizing: border-box;
          // display: none;
          // left: 0rem;
          .jie_wrap {
            box-sizing: border-box;

            background: #fff;
            width: 100%;
            padding: 0.16rem 0.18rem;
            p {
              margin: 0;
              font-size: 0.12rem;
              line-height: 1.8em;
              &:first-of-type {
                font-size: 0.16rem;
              }
              &:last-of-type {
                color: #6b6b6b;
              }
            }
          }
          .school_list_wrap {
            box-sizing: border-box;
            width: 100%;
            padding: 0.16rem 0.18rem;
            background: #f5f5f5;
            .tap {
            }
            .list {
              height: 5.1rem;
              overflow: auto;
              &::-webkit-scrollbar {
                /*滚动条整体样式*/
                width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
                height: 1px;
              }
              &::-webkit-scrollbar-thumb {
                /*滚动条里面小方块*/
                border-radius: 4px;
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                background: #bababa;
              }
              &::-webkit-scrollbar-track {
                /*滚动条里面轨道*/
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                border-radius: 4px;
                background: #ededed;
              }

              ul {
                list-style: none;
                margin: 0;
                padding: 0;
                li {
                  display: flex;
                  align-items: center;
                  height: 1rem;
                  border-bottom: 0.01rem solid #ddd;
                  &:hover {
                    cursor: pointer;
                    background: rgba(221, 221, 221, 0.548);
                  }
                  &:last-of-type {
                    border: none;
                  }
                  .icon {
                    position: relative;
                    width: 0.2rem;
                    height: 0.28rem;
                    margin-right: 0.1rem;
                    span {
                      z-index: 1;
                      position: absolute;
                      left: 0.05rem;
                      color: white;
                    }
                  }
                  img {
                    width: 0.8rem;
                    height: 0.45rem;
                    margin-right: 0.1rem;
                  }
                  .alt {
                    p {
                      margin: 0;
                      &:last-of-type {
                        color: #707070;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      .area_selct {
        width: 1.5rem;
        height: 0.54rem;
        .el-select {
          height: 100%;
          .el-input {
            height: 100%;
            input {
              height: 100%;
            }
          }
        }
      }
      .yujing_selct {
        width: 1.5rem;
        height: 0.54rem;
        .el-select {
          height: 100%;
          .el-input {
            height: 100%;
            input {
              height: 100%;
            }
          }
        }
      }
    }

    .qu {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #2f7bff;
      color: #fff;
      position: relative;
      top: 0;
      right: 0;
      height: 86px;
      width: 86px;
      border-radius: 50%;
      line-height: 1.5em;
      text-align: center;
      .item {
        font-size: 0.12rem;
        &:first-of-type {
          font-size: 0.16rem;
        }
      }
    }
  }
  .amap-marker {
    z-index: 0 !important;
    &:hover {
      z-index: 1 !important;
    }
    .jie {
      position: relative;
      height: 0.5rem;
      .name {
        background: #2289ec;
        color: white;
        padding: 0.08rem 0.12rem;
        border-radius: 0.16rem;
        word-break: keep-all;
      }
      &:hover .tip {
        visibility: visible;
      }
      & > .tip {
        visibility: hidden;
        position: absolute;
        top: 0.5rem;
        left: 60%;
        box-shadow: 0px 1px 6px 0px #909399;
        background: #fff;
        padding: 0.1rem;
        word-break: keep-all;

        display: flex;
        align-items: center;
        border-radius: 0.1rem;
        &:after {
          position: absolute;
          top: -0.1rem;
          left: 0.3rem;
          content: "";
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          transform: rotate(45deg);
          background: #fff;
        }
        & > div img {
          width: 0.8rem;
          height: 0.5rem;
          padding-right: 0.1rem;
        }
        p {
          color: #060606;
          margin: 0;
          line-height: 1.5em;
          word-break: keep-all;

          span {
            padding: 0 0.02rem;
          }
          &:last-of-type {
            color: #7a7a7a;
          }
        }
      }
    }
    .xuexiao {
      position: relative;
      height: 0.5rem;
      .icon {
        position: absolute;
        top: 0rem;
        left: -0.36rem;
        width: 0.26rem;
        height: 0.36rem;
        text-align: center;
        background: url("../../assets/img/serch_blue.png") no-repeat;
        background-size: 100% 100%;
      }
      .name {
        background: #2289ec;
        color: white;
        padding: 0.08rem 0.12rem;
        border-radius: 0.16rem;
        word-break: keep-all;
      }
      &:hover .tip {
        visibility: visible;
      }
      & > .tip {
        visibility: hidden;
        position: absolute;
        top: 0.5rem;
        left: 30%;
        box-shadow: 0px 1px 6px 0px #909399;
        background: #fff;
        padding: 0.1rem;
        word-break: keep-all;

        display: flex;
        align-items: center;
        border-radius: 0.1rem;
        &:after {
          position: absolute;
          top: -0.1rem;
          left: 0.3rem;
          content: "";
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          transform: rotate(45deg);
          background: #fff;
        }
        & > div img {
          width: 0.8rem;
          height: 0.5rem;
          padding-right: 0.1rem;
        }
        p {
          color: #060606;
          margin: 0;
          line-height: 1.5em;
          min-width: 3rem;
          word-break: keep-all;
          span {
            padding: 0 0.02rem;
          }
          &:last-of-type {
            color: #7a7a7a;
          }
        }
      }
    }
  }
}
</style>
