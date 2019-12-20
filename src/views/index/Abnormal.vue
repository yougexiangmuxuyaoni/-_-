<template>
  <div id="abnormal">
    <div class="top">
      <div class="advance">
        <div class="title">
          <div class="t-left">
            <span class="tit">预警列表</span>
          </div>
          <div class="t-right">
            <span @click="to('/header_hei/allWarning')">
              预警总数
              <span class="btn" v-if="yujinglistJson.earlyTotal">{{yujinglistJson.earlyTotal}}</span>
            </span>
            <span @click="to('/header_hei/allWarning')">全部预警</span>
          </div>
        </div>
        <div
          class="group"
          v-loading="loading_yujing"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.1)"
        >
          <div
            class="item"
            @click="to('/alertDetails',val)"
            v-for="(val,index) of yujinglistJson.earlyList"
            :key="index"
          >
            <div class="top">
              <div class="t-left">{{val.title || "暂无"}}</div>
            </div>
            <div class="bot">
              <p class="ellipsis">{{val.content || "暂无"}}</p>
              <p>{{val.type}}</p>
              <p class="ellipsis">{{val.schoolName || "暂无"}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="warning">
        <div class="title">
          <div class="t-left">
            <span class="tit">报警信息</span>
          </div>
          <div class="t-right">
            <span @click="to('/header_hei/allalarm')">
              待处理
              <span class="btn" v-if="baojinglistJson.alarmTotal">{{baojinglistJson.alarmTotal}}</span>
            </span>
            <span @click="to('/header_hei/allalarm')">全部报警</span>
          </div>
        </div>
        <div
          class="group"
          v-loading="loading_baojing"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.1)"
        >
          <div
            class="item"
            @click="to('/alertDetails',val)"
            v-for="(val,index) of baojinglistJson.alarmList"
            :key="index"
          >
            <div class="top">
              <div class="t-left">{{val.label || "暂无"}}</div>
            </div>
            <div class="bot">
              <p class="ellipsis">{{val.content || "暂无"}}</p>
              <p>{{val.type}}</p>
              <p class="ellipsis">{{val.schoolName || "暂无"}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="echarts">
      <div
        class="item"
        ref="shuliang"
        v-loading="loading_shuliang"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
      ></div>
      <div
        class="item"
        ref="leibie"
        v-loading="loading_leibie"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
      ></div>
      <div
        class="item"
        ref="quyu"
        v-loading="loading_quyu"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
      ></div>
      <div
        v-show="!ISxuexiao"
        class="item"
        ref="paiming"
        v-loading="loading_xuexiao"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
      ></div>
      <div
        v-show="ISxuexiao"
        class="item"
        style="text-align:center;color:#30eee9;font-size:.3rem;font-weight:900;line-height: 10em;"
      >暂无学校报警统计数据</div>
    </div>
    <div class="baogao">
      <div class="report">
        <div class="top">
          <div class="title">
            <span>监测报告</span>
            <span>全部报告</span>
          </div>
        </div>
        <div class="bot">
          <div class="item">
            <div class="jiao">月报</div>
            <div class="item-k">
              <div class="icon">
                <i class="iconfont iconpdf"></i>
                <i class="iconfont iconyunxiazai"></i>
              </div>
            </div>
            <div class="item-z">八月 月报</div>
          </div>
          <div class="item">
            <div class="item-k">
              <div class="icon">
                <i class="iconfont iconpdf"></i>
                <i class="iconfont iconyunxiazai"></i>
              </div>
            </div>
            <div class="item-z">第一周</div>
          </div>
          <div class="item">
            <div class="item-k">
              <div class="icon">
                <i class="iconfont iconpdf"></i>
                <i class="iconfont iconyunxiazai"></i>
              </div>
            </div>
            <div class="item-z">第二周</div>
          </div>
          <div class="item">
            <div class="item-k">
              <div class="icon">
                <i class="iconfont iconpdf"></i>
                <i class="iconfont iconyunxiazai"></i>
              </div>
            </div>
            <div class="item-z">第三周</div>
          </div>
          <div class="item">
            <div class="item-k">
              <div class="icon">
                <i class="iconfont iconpdf"></i>
                <i class="iconfont iconyunxiazai"></i>
              </div>
            </div>
            <div class="item-z">第四周</div>
          </div>
          <div class="item">
            <div class="jiao">月报</div>
            <div class="item-k">
              <div class="icon">
                <i class="iconfont iconpdf"></i>
                <i class="iconfont iconyunxiazai"></i>
              </div>
            </div>
            <div class="item-z">七月 月报</div>
          </div>
          <div class="item">
            <div class="item-k">
              <div class="icon">
                <i class="iconfont iconpdf"></i>
                <i class="iconfont iconyunxiazai"></i>
              </div>
            </div>
            <div class="item-z">第一周</div>
          </div>
          <div class="item">
            <div class="item-k">
              <div class="icon">
                <i class="iconfont iconpdf"></i>
                <i class="iconfont iconyunxiazai"></i>
              </div>
            </div>
            <div class="item-z">第二周</div>
          </div>
          <div class="item">
            <div class="item-k">
              <div class="icon">
                <i class="iconfont iconpdf"></i>
                <i class="iconfont iconyunxiazai"></i>
              </div>
            </div>
            <div class="item-z">第三周</div>
          </div>
          <div class="item">
            <div class="item-k">
              <div class="icon">
                <i class="iconfont iconpdf"></i>
                <i class="iconfont iconyunxiazai"></i>
              </div>
            </div>
            <div class="item-z">第四周</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  yujingList,
  baojingList,
  baojingshuliang,
  baojingleibie,
  xuexiaobaojing,
  quyubaojing
} from "@/api/yichangjiance";
export default {
  name: "abnormal",
  data() {
    return {
      yujinglistJson: {},
      baojinglistJson: {},
      baojingshuliangJson: [],
      baojingleibieJson: {},
      xuexiaobaojingJson: [],
      quyubaojingJson: [],
      ISxuexiao: false,
      nameArr: [],
      yujingArr: [],
      yujingArr: [],

      loading_yujing: true,
      loading_baojing: true,
      loading_shuliang: true,
      loading_leibie: true,
      loading_quyu: true,
      loading_xuexiao: true,
      parmes: {
        //全局参数
        year: "2010",
        areaCode: "510000",
        regionalLevel: "2"
      },
      myChart4: null,
      myChart3: null,
      myChart2: null,
      myChart: null
    };
  },
  methods: {
    to(uri, e) {
      if (uri === "/alertDetails") {
        localStorage.setItem("SchoolId", e.schoolId);
        localStorage.setItem("lishixiangqingtype", e.type.substr(0, 2));
        localStorage.setItem("lishixiangqingjing", e.type.substr(2));
        if (e.alarmId) {
          localStorage.setItem("lishixiangqingid", e.alarmId);
        } else {
          localStorage.setItem("lishixiangqingid", e.earlyId);
        }
      }
      this.$router.push(uri);
    },
    // Echarts 的 resize 方法
    resizeHandler() {
      this.myChart.resize();
      this.myChart2.resize();

      this.myChart3.resize();
      this.myChart4.resize();
    },
    initEcharts() {
      const _this = this;
      _this.myChart = this.$echarts.init(this.$refs.shuliang);
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "报警数量统计",
          top: 10,
          textStyle: {
            color: "#30eee9"
          }
        },
        backgroundColor: "#00265f",
        grid: {
          left: "2%",
          right: "2%",
          top: "20%",
          bottom: ".5%",
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: "item"
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              color: "#30eee9"
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#397cbc"
              }
            },
            splitLine: {
              show: false
            },
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#2ad1d2"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#27b4c2"
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "",
            type: "line",
            stack: "总量",
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#0092f6",
                lineStyle: {
                  color: "#0092f6",
                  width: 1
                }
              }
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(7,44,90,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(0,146,246,0.9)" // 100% 处的颜色
                  }
                ]
              }
            },
            data: this.baojingshuliangJson
          }
        ]
      };
      _this.myChart.setOption(option);
    },
    initEcharts2() {
      const _this = this;
      _this.myChart2 = this.$echarts.init(this.$refs.leibie);
      // 指定图表的配置项和数据
      let option = (option = {
        title: {
          text: "报警类别统计",
          top: 10,
          x: "left",
          textStyle: {
            color: "#30eee9"
          }
        },
        backgroundColor: "#00265f",
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          data: ["人员", "食材", "证件"],
          textStyle: {
            color: "#30eee9"
          }
        },
        color: ["#0092f6", "#005193", "#3972a0"],
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            startAngle: -90,
            data: [
              { value: this.baojingleibieJson.personTotal, name: "人员" },
              { value: this.baojingleibieJson.foodTotal, name: "食材" },
              { value: this.baojingleibieJson.cardTotal, name: "证件" }
            ],
            label: {
              show: true,
              formatter: "{b}:{d}%"
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });

      _this.myChart2.setOption(option);
    },
    initEcharts3() {
      const _this = this;
      _this.myChart3 = this.$echarts.init(this.$refs.quyu);
      // 指定图表的配置项和数据
      let option = {
        backgroundColor: "#00265f",
        title: {
          text: "报警区域统计",
          top: 10,
          textStyle: {
            color: "#30eee9"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["预警", "报警"],
          top: 20,
          right: 0,
          textStyle: {
            color: "#fff"
          },
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 35
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "20%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.nameArr,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#00c7ff",
                width: 1,
                type: "solid"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#00c7ff",
                width: 1,
                type: "solid"
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "报警",
            type: "bar",
            data: this.baojingArr,
            barWidth: 5, //柱子宽度
            barGap: 0, //柱子之间间距
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#00C7E1" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#005193" // 100% 处的颜色
                    }
                  ]
                },
                barBorderRadius: 12
              }
            }
          },
          {
            name: "预警",
            type: "bar",
            data: this.yujingArr,
            barWidth: 5,
            barGap: 1,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#00da9c" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#007a55" // 100% 处的颜色
                  }
                ]
              },
              barBorderRadius: 12
            }
          }
        ]
      };
      _this.myChart3.setOption(option);
    },
    initEcharts4() {
      const _this = this;
      _this.myChart4 = this.$echarts.init(this.$refs.paiming);
      let arr = [["学校", "预警", "报警"]];
      for (let i = 0; i < this.xuexiaobaojingJson.length; i++) {
        let name = this.xuexiaobaojingJson[i].schoolName;
        let yujing = this.xuexiaobaojingJson[i].warningTotal;
        let baojing = this.xuexiaobaojingJson[i].alarmTotal;
        arr.push([name, yujing, baojing]);
      }
      // 指定图表的配置项和数据
      let option = {
        backgroundColor: "#00265f",
        title: {
          text: "学校报警统计",
          top: 10,
          textStyle: {
            color: "#30eee9"
          }
        },
        color: ["#0092f6", "#005193"],
        dataset: {
          source: arr
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "20%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#30eee9",
              fontSize: 12,
              fontWeight: "normal"
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            axisLabel: {
              color: "#30eee9",
              fontSize: 12,
              fontWeight: "normal"
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          show: true,
          type: "scroll",
          top: 15,
          left: "right",
          textStyle: {
            color: "white"
          }
        },
        series: [
          {
            type: "bar",
            name: "预警",
            barWidth: 10,
            barGap: 1,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#00da9c" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#007a55" // 100% 处的颜色
                  }
                ]
              }
            },
            stack: "total",
            label: {
              color: "",
              fontSize: 12,
              fontWeight: "normal",
              show: false
            },
            animation: true
          },
          {
            type: "bar",
            name: "报警",
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#00C7E1" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#005193" // 100% 处的颜色
                    }
                  ]
                },
                barBorderRadius: [0, 12, 12, 0]
              }
            },
            barGap: "50%",
            stack: "total",
            label: {
              color: "",
              fontSize: 12,
              fontWeight: "normal",
              show: false
            },
            barMaxWidth: 22.22222222222222,
            barWidth: 22.22222222222222,
            animation: true
          }
        ]
      };
      _this.myChart4.setOption(option);
    },
    //预警列表
    getYuJingList() {
      yujingList({
        year: this.parmes.year,
        areaCode: this.parmes.areaCode,
        regionalLevel: this.parmes.regionalLevel
      }).then(res => {
        this.yujinglistJson = res.data.data;
        this.loading_yujing = false;
      });
    },
    //报警列表
    getBaoJingList() {
      baojingList({
        year: this.parmes.year,
        areaCode: this.parmes.areaCode,
        regionalLevel: this.parmes.regionalLevel
      }).then(res => {
        this.baojinglistJson = res.data.data;
        this.loading_baojing = false;
      });
    },
    //1-2月报警数量统计
    getBaoJingShuLiang() {
      baojingshuliang({
        year: this.parmes.year,
        areaCode: this.parmes.areaCode,
        regionalLevel: this.parmes.regionalLevel
      }).then(res => {
        this.baojingshuliangJson = res.data.data;
        this.initEcharts();
      });
    },
    //报警类别统计
    getBaoJingleibie() {
      baojingleibie({
        year: this.parmes.year,
        areaCode: this.parmes.areaCode,
        regionalLevel: this.parmes.regionalLevel
      }).then(res => {
        this.baojingleibieJson = res.data.data;
        this.initEcharts2();
      });
    }, //学校报警统计
    getxXueXiaoBaoJing() {
      xuexiaobaojing({
        year: this.parmes.year,
        areaCode: this.parmes.areaCode,
        regionalLevel: this.parmes.regionalLevel,
        limit: "5"
      }).then(res => {
        this.xuexiaobaojingJson = res.data.data;
        if (this.xuexiaobaojingJson.length === 0) {
          this.ISxuexiao = true;
        } else {
          this.ISxuexiao = false;
          this.initEcharts4();
        }
      });
    }, //区域报警统计
    getxQuYuBaoJing() {
      quyubaojing({
        year: this.parmes.year,
        areaCode: this.parmes.areaCode,
        regionalLevel: this.parmes.regionalLevel,
        limit: "5"
      }).then(res => {
        let json = res.data.data;
        let nameArr = [];
        let yujingArr = [];
        let baojingArr = [];
        json.forEach(item => {
          nameArr.push(item.NAME);
          yujingArr.push(item.warningTotal);
          baojingArr.push(item.alramTotal);
        });
        this.nameArr = nameArr;
        this.yujingArr = yujingArr;
        this.baojingArr = baojingArr;
        console.log(json);
        
        this.initEcharts3();
      });
    }
  },
  mounted() {
    var date = new Date();
    this.parmes.year = date.getFullYear();
    let user = JSON.parse(localStorage.getItem("userInfo"));
    // 登录后取得 个人信息 动态赋值
    this.parmes.areaCode = user.areaCode;
    this.parmes.regionalLevel = user.userLevel;

    this.getYuJingList();
    this.getBaoJingList();
    this.getBaoJingShuLiang();
    this.getBaoJingleibie();
    this.getBaoJingleibie();
    this.getxXueXiaoBaoJing();
    this.getxQuYuBaoJing();
    // 绑定监听事件
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    // 清理工作 避免内存泄漏
    // 销毁监听事件
    window.removeEventListener("resize", this.resizeHandler);
    // 销毁 Echarts 实例
    // this.myChart.dispose();
    // this.myChart2.dispose();
    // this.myChart3.dispose();
    // this.myChart4.dispose();
    this.myChart = null;
    this.myChart2 = null;
    this.myChart3 = null;
    this.myChart4 = null;
  }
};
</script>
<style lang="scss" scope>
@import "@/assets/css/public.scss";
#abnormal {
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  font-size: 0.12rem;
  padding: 0.2rem 0.1rem;
  padding-top: 0.17rem;
  .group > .item:hover {
    cursor: pointer;
  }
  & > .top {
    height: 2.54rem;
    display: flex;
    justify-content: space-between;
    .advance {
      @extend .border;
      width: 9.09rem;
      padding: 0.18rem;
      .title {
        height: 20%;
        display: flex;
        justify-content: space-between;
        line-height: 2em;
        .t-left {
          color: white;
          width: 34%;
          display: flex;
          justify-content: space-between;
          span {
            font-size: 0.14rem;
          }
          .tit {
            font-size: 0.2rem;
          }
        }
        .t-right {
          display: flex;
          justify-content: space-between;
          color: #31d0f7;
          span {
            margin-right: 0.2rem;
            .btn {
              padding: 0.05rem 0.06rem;
              background: #154f66;
              border-radius: 0.2rem;
            }
            &:hover {
              cursor: pointer;
            }
            &:nth-of-type(2) {
              margin: 0;
            }
          }
        }
      }
      .group {
        height: 80%;
        display: flex;
        justify-content: space-between;
        background: rgba(47, 123, 255, 0.1);
        border-radius: 0.02rem;
        .item {
          width: 1.55rem;
          background: rgba(47, 123, 255, 0.14);
          border-radius: 0.02rem;

          .top {
            padding: 0 0.1rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            height: 50%;
            background: linear-gradient(90deg, #0640c7, #5c70ff);
            color: #fff;
            line-height: 1.5em;
          }
          .bot {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 0 0.04rem;
            height: 50%;
            p {
              width: 100%;
              margin: 0;
              color: #bad3ff;
              font-size: 0.12rem;
              &:nth-of-type(1) {
                font-size: 0.14rem;
              }
            }
          }
        }
      }
    }
    .warning {
      @extend .border;
      width: 9.09rem;
      padding: 0.18rem;
      .title {
        height: 20%;
        display: flex;
        justify-content: space-between;
        line-height: 2em;
        .t-left {
          color: white;
          width: 34%;
          display: flex;
          justify-content: space-between;
          span {
            font-size: 0.14rem;
          }
          .tit {
            font-size: 0.2rem;
          }
        }
        .t-right {
          display: flex;
          justify-content: space-between;
          color: #31d0f7;
          span {
            margin-right: 0.2rem;
            .btn {
              padding: 0.05rem 0.06rem;
              background: #154f66;
              border-radius: 0.2rem;
            }
            &:hover {
              cursor: pointer;
            }
            &:nth-of-type(2) {
              margin: 0;
            }
          }
        }
      }
      .group {
        height: 80%;
        display: flex;
        justify-content: space-between;
        background: rgba(47, 123, 255, 0.1);
        border-radius: 0.02rem;
        .item {
          width: 1.55rem;
          background: rgba(47, 123, 255, 0.14);
          border-radius: 0.02rem;
          .top {
            padding: 0 0.1rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-around;
            height: 50%;
            background: linear-gradient(90deg, #ff5757 0%, #ff9647 100%);
            color: #fff;
            line-height: 1.5em;
            .t-right {
              display: flex;
              justify-content: center;
              i {
                font-size: 0.28rem;
              }
            }
          }
          .bot {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 0 0.04rem;
            height: 50%;
            p {
              width: 100%;
              margin: 0;
              color: #bad3ff;
              font-size: 0.12rem;
              &:nth-of-type(1) {
                font-size: 0.14rem;
              }
            }
          }
        }
      }
    }
  }
  .baogao {
    display: flex;
    justify-content: space-between;
    margin-top: 0.32rem;
    height: 2.5rem;
    .report {
      @extend .border;
      padding: 0.18rem;
      width: 19rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .top {
        height: 0.54rem;
        font-size: 0.2rem;
        color: #fff;
        .title {
          display: flex;
          justify-content: space-between;
          span:last-of-type {
            color: $Main-color;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
      .bot {
        display: flex;
        justify-content: space-between;
        .item {
          position: relative;
          width: 1.67rem;
          height: 1.67rem;
          display: flex;
          box-sizing: border-box;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(47, 123, 255, 0.14);
          border-radius: 0.02rem;
          padding-bottom: 0.1rem;
          .jiao {
            width: 0.46rem;
            height: 0.2rem;
            color: #fff;
            text-align: center;
            line-height: 0.2rem;
            font-size: 0.12rem;
            background: rgba(47, 123, 255, 0.6);
            border-radius: 0.1rem;
            position: absolute;
            top: 0.1rem;
            right: 0.1rem;
          }
          .iconyunxiazai {
            display: none;
          }
          &:hover {
            cursor: pointer;
          }
          &:hover .iconpdf {
            display: none;
          }
          &:hover .iconyunxiazai {
            display: block;
          }
          .item-k {
            height: 1.56rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 0.2rem;
            .icon {
              color: #fff;
              display: flex;
              flex-direction: column;
              align-items: center;
              i {
                font-size: 0.6rem;
              }
            }
          }
          .item-z {
            color: #fff;
            text-align: center;
          }
        }
      }
    }
  }
  .echarts {
    display: flex;
    justify-content: space-between;
    height: 3.45rem;

    margin-top: 0.32rem;
    .item {
      width: 4.6rem;
      @extend .border;
    }
  }
}
</style>
