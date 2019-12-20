<template>
  <div class="trend">
    <div class="main-left">
      <div>
        <div class="xuexiao hezi">
          <div class="title">
            <p class="tongji">学校统计</p>
            <p></p>
            <p>学校总量</p>
            <p>45,498</p>
            <p>学生总量</p>
            <p>5,264,498</p>
          </div>

          <div class="tu" ref="xx"></div>
        </div>
      </div>

      <!-- 区监管 -->
      <div class="hezi">
        <div class="shitang">
          <div class="title">
            <p>食材供应商总量</p>
            <p>4,498</p>
            <p>食堂从业者数量/健康证占比</p>
            <p>56%</p>
          </div>
        </div>
        <div class="jiangguan">
          <div class="title">
            <p>学校食堂总量</p>
            <p>2,356</p>
            <p>食品抽检频次总数</p>
            <p>28,615</p>
          </div>
        </div>
      </div>
      <div>
        <div class="zhengzhao hezi">
          <div class="title">
            <p>营业证照持有率</p>
            <p>80%</p>
          </div>
          <div class="title">
            <p>采购索证索票上传率</p>
            <p>83%</p>
          </div>
          <div class="title">
            <p>快检达标率</p>
            <p>88%</p>
          </div>
          <div class="title">
            <p>留样完成率</p>
            <p>84%</p>
          </div>
          <div class="title">
            <p>陪餐记录完整率</p>
            <p>90%</p>
          </div>
          <!-- <div class="tu" ref="zhengzhao"></div> -->
        </div>
        <div class="gongying hezi">
          <div class="title">
            <p>自查完成率</p>
            <p>96%</p>
          </div>
          <div class="title">
            <p>直播接入率</p>
            <p>95%</p>
          </div>
          <div class="title">
            <p>执业人员健康证率</p>
            <p>92%</p>
          </div>
          <div class="title">
            <p>执业培训完成率</p>
            <p>96%</p>
          </div>
          <!-- <div class="tu" ref="gys"></div> -->
        </div>
      </div>
    </div>
    <div class="main-mid">
      <div class="top hezi">
        <el-input class="el-input1" v-model="keys" placeholder="请输入关键字查找"></el-input>
        <el-cascader
          v-model="area_value"
          placeholder="区域查找"
          :options="quyu_options"
          @change="handleChange"
        ></el-cascader>
        <el-select v-model="yj_value" placeholder="预警程度">
          <el-option
            v-for="item in yj_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="anniu btn">搜索</div>
      </div>
      <div class="map hezi">
        <div class="title">
          <span>四川省地域分布图</span>
          <span class="time" @click="back_url()" v-show="user!== 'qujianguan'">返回</span>
        </div>
        <div class="tu" ref="beijing"></div>
      </div>
    </div>
    <div class="main-right">
      <div>
        <div class="y-tongji hezi">
          <div class="title">
            <p>预警数量统计</p>
            <p>45,498</p>
          </div>
        </div>
        <div class="b-tongji hezi">
          <div class="title">
            <p>报警数量统计</p>
            <p>28,615</p>
          </div>
        </div>
      </div>
      <div>
        <div class="y-duibi hezi">
          <div class="title">
            <p>预警环节数量对比</p>
            <div class="btn anniu">
              季度
              <i class="el-icon-arrow-down"></i>
            </div>
          </div>
          <div class="tu" ref="ydb"></div>
        </div>
        <div class="b-duibi hezi">
          <div class="title">
            <p>报警环节数量对比</p>
            <div class="btn anniu">
              月
              <i class="el-icon-arrow-down"></i>
            </div>
          </div>
          <div class="tu" ref="bdb"></div>
        </div>
      </div>
      <div>
        <div class="y-zongshu hezi">
          <div class="title">
            <p>学校预警总数 TOP5</p>
            <p>本月</p>
          </div>
          <div class="tu" ref="yzs"></div>
        </div>
        <div class="b-zongshu hezi">
          <div class="title">
            <p>学校报警总数 TOP5</p>
            <p>本月</p>
          </div>
          <div class="tu" ref="bzs"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import { setTimeout } from "timers";
export default {
  name: "trend",
  computed: { ...mapState(["USER_INFO"]) },
  data() {
    return {
      user: "",
      mapOption: "",
      quyu_options: [
        {
          value: "全部区域",
          label: "全部区域"
        },
        {
          value: "泸州市",
          label: "泸州市"
        },
        {
          value: "张家口市",
          label: "张家口市"
        },
        {
          value: "承德市",
          label: "承德市"
        },
        {
          value: "秦皇岛市",
          label: "秦皇岛市"
        },
        {
          value: "唐山市",
          label: "唐山市"
        },
        {
          value: "廊坊市",
          label: "廊坊市"
        },
        {
          value: "保定市",
          label: "保定市"
        },
        {
          value: "沧州市",
          label: "沧州市"
        },
        {
          value: "衡水市",
          label: "衡水市"
        },
        {
          value: "邢台市",
          label: "邢台市"
        },
        {
          value: "邯郸市",
          label: "邯郸市"
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
      ],
      value: "",
      keys: "",
      area_value: "",
      yj_value: "",
      active_show: ""
    };
  },
  methods: {
    ...mapMutations(["SET_USER_INFO"]),
    back_url() {
      let user = localStorage.getItem("user_info");
      this.SET_USER_INFO(user);
    },
    init1() {
      this.initEcharts();
      // this.initEcharts2();
      // this.initEcharts3();
      this.initEcharts4();
      this.initEcharts5();
      this.initEcharts6();
      this.initEcharts7();
      this.initEcharts8();
    },
    handleChange(e) {
    },
    // Echarts 的 resize 方法
    resizeHandler() {
      this.myChart.resize();
      // this.myChart2.resize();
      // this.myChart3.resize();
      this.myChart4.resize();
      this.myChart5.resize();
      this.myChart6.resize();
      this.myChart7.resize();
    }, //学校数量统计
    initEcharts() {
      const _this = this;

      _this.myChart = this.$echarts.init(this.$refs.xx);
      // 指定图表的配置项和数据

      var data = {
        color: "#29b4db",
        xAxis: ["幼儿园", "小学", "中学", "大学"],
        wz: [["25%", "25%"], ["75%", "25%"], ["25%", "70%"], ["75%", "70%"]],
        values: ["56", "25", "20", "9"]
      };

      var seriesData = [];
      var titleData = [];
      data.values.forEach(function(item, index) {
        titleData.push({
          text: data.xAxis[index],
          left: (index + 1) % 2 ? "23%" : "73%",
          top: index + 1 < 3 ? "43%" : "90%",

          textAlign: "center",
          textStyle: {
            fontSize: "14",
            color: "#29b4db",
            fontWeight: "400"
          }
        });
        seriesData.push({
          type: "pie",
          radius: ["30%", "35%"],
          center: data.wz[index],
          hoverAnimation: false,
          label: {
            normal: {
              position: "center"
            }
          },
          data: [
            {
              value: item,
              name: data.text,
              itemStyle: {
                normal: {
                  color: data.color
                }
              },
              label: {
                normal: {
                  show: false
                }
              }
            },
            {
              value: 100 - item,
              name: "占位",
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: "#91d5ff"
                }
              },
              label: {
                normal: {
                  formatter: item + `{a|%}`,
                  textStyle: {
                    fontSize: 22,
                    color: "white"
                  },
                  rich: {
                    a: {
                      color: "white",
                      fontSize: 10
                    }
                  }
                }
              }
            }
          ]
        });
      });

      let value = data.value || 0;
      let option = {
        // backgroundColor: "#0a1f3e",
        title: titleData,
        series: seriesData
      };
      _this.myChart.setOption(option);
    }, //证照数量
    initEcharts2() {
      const _this = this;
      _this.myChart2 = this.$echarts.init(this.$refs.zhengzhao);
      // 指定图表的配置项和数据
      let option = {
        // backgroundColor: "#0a1f3e",
        legend: {
          bottom: "6%",
          itemWidth: 14,
          textStyle: {
            color: "white"
          },
          data: ["许可证", "身份证", "营业执照"]
        },
        color: ["#0c6c9f", "#248384", "#1890ff"],
        series: [
          {
            name: "证照数量统计",
            type: "pie",
            radius: "74%",
            center: ["50%", "40%"],
            startAngle: 116,
            data: [
              {
                value: 16,
                name: "许可证"
              },
              {
                value: 42,
                name: "身份证"
              },
              {
                value: 42,
                name: "营业执照"
              }
            ],
            label: {
              normal: {
                formatter: params => {
                  return `${params.value}{a|%}`;
                },
                position: "inner",
                textStyle: {
                  fontSize: 22,
                  color: "white",
                  lineHeight: 16
                },
                rich: {
                  a: {
                    color: "white",
                    fontSize: 12,
                    verticalAlign: "bottom"
                  }
                }
              }
            }
          }
        ]
      };
      _this.myChart2.setOption(option);
    }, //供应商数量
    initEcharts3() {
      const _this = this;
      _this.myChart3 = this.$echarts.init(this.$refs.gys);
      // 指定图表的配置项和数据
      let option = {
        // backgroundColor: "#0a1f3e",
        legend: {
          bottom: "6%",
          itemWidth: 14,
          textStyle: {
            color: "white"
          },
          data: ["个体工商", "企业工商"]
        },
        color: ["#248384", "#1890ff", "#0c6c9f"],
        series: [
          {
            name: "供应商数量统计",
            type: "pie",
            radius: "74%",
            center: ["50%", "40%"],
            startAngle: 116,
            data: [
              {
                value: 66,
                name: "个体工商"
              },
              {
                value: 38,
                name: "企业工商"
              }
            ],
            label: {
              normal: {
                formatter: params => {
                  return `${params.value}{a|%}`;
                },
                position: "inner",
                textStyle: {
                  fontSize: 22,
                  color: "white",
                  lineHeight: 16
                },
                rich: {
                  a: {
                    color: "white",
                    fontSize: 12,
                    verticalAlign: "bottom"
                  }
                }
              }
            }
          }
        ]
      };
      _this.myChart3.setOption(option);
    }, //学校预警总数 top5
    initEcharts4() {
      const _this = this;
      _this.myChart4 = this.$echarts.init(this.$refs.yzs);
      // 指定图表的配置项和数据
      var dataLine = [50, 66, 33, 25];
      var option = {
        // backgroundColor: "#0a1f3e",
        grid: [
          {
            left: "6%",
            top: "1%",
            right: "1%",
            bottom: "6%",
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: "value",
            axisLabel: {
              color: "white",
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
            axisTick: "none",
            axisLine: "none",
            offset: "0",
            axisLabel: {
              textStyle: {
                color: "white",
                fontSize: "12"
              }
            },
            data: ["学校名称", "学校名称", "学校名称", "学校名称"]
          },
          {
            axisTick: "none",
            axisLine: "none",
            show: false,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12"
              }
            },
            data: [1, 1, 1, 1]
          },
          {
            axisLine: {
              lineStyle: {
                color: "rgba(0,0,0,0)"
              }
            },
            data: []
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            stack: "b",
            yAxisIndex: 0,
            data: dataLine,
            barWidth: 12,
            itemStyle: {
              normal: {
                color: "#3de7c9",
                barBorderRadius: 12
              }
            },
            z: 2
          },
          {
            name: "白框",
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [99.8, 99.9, 99.9, 99.9],
            barWidth: 12,
            itemStyle: {
              normal: {
                color: "#0e2147",
                barBorderRadius: 12
              }
            },
            z: 1
          },
          {
            name: "外框",
            type: "bar",
            yAxisIndex: 2,
            barGap: "-100%",
            data: [100, 100, 100, 100],
            barWidth: 12,
            label: {
              normal: {
                show: true,
                position: "right",
                distance: 10,
                formatter: function(data) {
                  return "";
                },
                textStyle: {
                  color: "#ffffff",
                  fontSize: "16"
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#3de7c9",
                barBorderRadius: 12
              }
            },
            z: 0
          }
        ]
      };
      _this.myChart4.setOption(option);
    }, //学校报警总数 top5
    initEcharts5() {
      const _this = this;
      _this.myChart5 = this.$echarts.init(this.$refs.bzs);
      // 指定图表的配置项和数据
      var dataLine = [50, 66, 33, 25];
      var option = {
        // backgroundColor: "#0a1f3e",
        grid: [
          {
            left: "6%",
            top: "1%",
            right: "1%",
            bottom: "6%",
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: "value",
            axisLabel: {
              color: "white",
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
            axisTick: "none",
            axisLine: "none",
            offset: "0",
            axisLabel: {
              textStyle: {
                color: "white",
                fontSize: "12"
              }
            },
            data: ["学校名称", "学校名称", "学校名称", "学校名称"]
          },
          {
            axisTick: "none",
            axisLine: "none",
            show: false,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12"
              }
            },
            data: [1, 1, 1, 1]
          },
          {
            axisLine: {
              lineStyle: {
                color: "rgba(0,0,0,0)"
              }
            },
            data: []
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            stack: "b",
            yAxisIndex: 0,
            data: dataLine,
            barWidth: 12,
            itemStyle: {
              normal: {
                color: "#a02000",
                barBorderRadius: 12
              }
            },
            z: 2
          },
          {
            name: "白框",
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [99.8, 99.9, 99.9, 99.9],
            barWidth: 12,
            itemStyle: {
              normal: {
                color: "#0e2147",
                barBorderRadius: 12
              }
            },
            z: 1
          },
          {
            name: "外框",
            type: "bar",
            yAxisIndex: 2,
            barGap: "-100%",
            data: [100, 100, 100, 100],
            barWidth: 12,
            label: {
              normal: {
                show: true,
                position: "right",
                distance: 10,
                formatter: function(data) {
                  return "";
                },
                textStyle: {
                  color: "#ffffff",
                  fontSize: "16"
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#3de7c9",
                barBorderRadius: 12
              }
            },
            z: 0
          }
        ]
      };
      _this.myChart5.setOption(option);
    }, //预警环节数量对比
    initEcharts6() {
      const _this = this;
      _this.myChart6 = this.$echarts.init(this.$refs.ydb);
      // 指定图表的配置项和数据
      var dataLine = [50, 66, 33];
      var option = {
        // backgroundColor: "#0a1f3e",
        grid: [
          {
            left: "6%",
            top: "10%",
            right: "1%",
            bottom: "2%",
            containLabel: true
          }
        ],
        yAxis: [
          {
            name: "单位",
            type: "value",
            axisLabel: {
              color: "white",
              fontSize: 12,
              fontWeight: "normal"
            },
            nameTextStyle: {
              padding: [0, 0, 4, -30]
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "white"
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        xAxis: [
          {
            axisTick: "none",
            axisLine: "none",
            offset: "0",
            axisLine: {
              show: true,
              lineStyle: {
                color: "white"
              }
            },
            axisLabel: {
              rotate: 45,
              location: "end",
              textStyle: {
                color: "white",
                fontSize: "12"
              }
            },
            data: ["人员预警", "证照预警", "食材预警"]
          },
          {
            axisTick: "none",
            axisLine: "none",
            show: false,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12"
              }
            },
            data: [1, 1, 1]
          },
          {
            axisLine: {
              lineStyle: {
                color: "rgba(0,0,0,0)"
              }
            },
            data: []
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            stack: "b",
            xAxisIndex: 0,
            data: dataLine,
            barWidth: 12,
            itemStyle: {
              normal: {
                color: "#3de7c9"
              }
            },
            z: 2
          },
          {
            name: "白框",
            type: "bar",
            xAxisIndex: 1,
            barGap: "-100%",
            data: [99.8, 99.9, 99.9],
            barWidth: 12,
            itemStyle: {
              normal: {
                color: "#0e2147"
              }
            },
            z: 1
          },
          {
            name: "外框",
            type: "bar",
            xAxisIndex: 2,
            barGap: "-100%",
            data: [100, 100, 100],
            barWidth: 12,
            label: {
              normal: {
                show: true,
                position: "right",
                distance: 10,
                formatter: function(data) {
                  return "";
                },
                textStyle: {
                  color: "#ffffff",
                  fontSize: "16"
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#3de7c9"
              }
            },
            z: 0
          }
        ]
      };
      _this.myChart6.setOption(option);
    }, //报警环节数量对比
    initEcharts7() {
      const _this = this;
      _this.myChart7 = this.$echarts.init(this.$refs.bdb);
      // 指定图表的配置项和数据
      var dataLine = [50, 66, 33];
      var option = {
        // backgroundColor: "#0a1f3e",
        grid: [
          {
            left: "6%",
            top: "10%",
            right: "1%",
            bottom: "2%",
            containLabel: true
          }
        ],
        yAxis: [
          {
            name: "单位",
            type: "value",
            axisLabel: {
              color: "white",
              fontSize: 12,
              fontWeight: "normal"
            },
            nameTextStyle: {
              padding: [0, 0, 4, -30]
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "white"
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        xAxis: [
          {
            axisTick: "none",
            axisLine: "none",
            offset: "0",
            axisLine: {
              show: true,
              lineStyle: {
                color: "white"
              }
            },
            axisLabel: {
              rotate: 45,
              location: "end",
              textStyle: {
                color: "white",
                fontSize: "12"
              }
            },
            data: ["人员预警", "证照预警", "食材预警"]
          },
          {
            axisTick: "none",
            axisLine: "none",
            show: false,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12"
              }
            },
            data: [1, 1, 1]
          },
          {
            axisLine: {
              lineStyle: {
                color: "rgba(0,0,0,0)"
              }
            },
            data: []
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            stack: "b",
            xAxisIndex: 0,
            data: dataLine,
            barWidth: 12,
            itemStyle: {
              normal: {
                color: "#a02000"
              }
            },
            z: 2
          },
          {
            name: "白框",
            type: "bar",
            xAxisIndex: 1,
            barGap: "-100%",
            data: [99.8, 99.9, 99.9],
            barWidth: 12,
            itemStyle: {
              normal: {
                color: "#0e2147"
              }
            },
            z: 1
          },
          {
            name: "外框",
            type: "bar",
            xAxisIndex: 2,
            barGap: "-100%",
            data: [100, 100, 100],
            barWidth: 12,
            label: {
              normal: {
                show: true,
                position: "right",
                distance: 10,
                formatter: function(data) {
                  return "";
                },
                textStyle: {
                  color: "#ffffff",
                  fontSize: "16"
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#3de7c9"
              }
            },
            z: 0
          }
        ]
      };
      _this.myChart7.setOption(option);
    }, //北京市区域分布图
    initEcharts8() {
      const _this = this;
      var i = 0;
      let nameMap = "叙永县";
      _this.myChart8 = this.$echarts.init(this.$refs.beijing);
      axios
        .get(`/static/四川省/泸州市/${nameMap}/datas.json`)
        .then(response => {
          this.$echarts.registerMap(nameMap, response.data);
          var schoolMap = {
            长安东路小学: [114.55699, 38.047193],
            建明小学: [114.573175, 38.045653],
            谈固小学: [114.580126, 38.056306],
            国际城小学: [114.575537, 38.064222],
            金马小学: [114.568085, 38.071685]
          };
          var b_list = [
            {
              name: "长安东路小学",
              value:
                "1 20 和平路20号 https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4277716146,1964854247&fm=26&gp=0.jpg"
            },
            {
              name: "建明小学",
              value:
                "1 20 和平路20号 https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4277716146,1964854247&fm=26&gp=0.jpg"
            },
            {
              name: "国际城小学",
              value:
                "1 20 和平路20号 https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4277716146,1964854247&fm=26&gp=0.jpg"
            }
          ];
          var y_list = [
            {
              name: "谈固小学",
              value:
                "1 20 和平路20号 https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4277716146,1964854247&fm=26&gp=0.jpg"
            },
            {
              name: "金马小学",
              value:
                "1 20 和平路20号 https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4277716146,1964854247&fm=26&gp=0.jpg"
            }
          ];

          var schollData = function(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
              var geoCoord = schoolMap[data[i].name];
              if (geoCoord) {
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value)
                });
              }
            }
            return res;
          };

          this.mapOption2 = {
            tooltip: {
              formatter: function(params) {
                var tipHtml = "";
                tipHtml = `<div style="width: 280px;height: 80px;;display: flex;justify-content: space-around;align-items: center;border-radius: 10px;">
                          <div style="width: 80px;height: 50px;">
                            <img width="100%" height="100%" src="${
                              params.value[2].split(" ")[3]
                            }" />
                          </div>
                          <div style="width: 160px;font-size: 12px;line-height: 22px">
                            <div style="font-weight: 700">${params.name}</div>
                            <div style="display: flex;">
                              <div style="font-weight: 700;margin-right: 12px;">报警：${
                                params.value[2].split(" ")[0]
                              }次</div>
                              <div style="font-weight: 700">预警：${
                                params.value[2].split(" ")[1]
                              }次</div>
                            </div>
                            <span style="color: #848484">${
                              params.value[2].split(" ")[2]
                            }</span>
                          </div>
                        </div>`;
                return tipHtml;
              }
            },
            legend: {
              bottom: 10,
              borderRadius: 0,
              itemGap: 100,
              textStyle: {
                color: "white"
              }
            },
            geo: {
              map: nameMap,
              zoom: 1,
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: "#26a3d2"
                }
              },
              label: {
                normal: {
                  show: true //是否显示标签
                }
              },
              regions: []
            },
            series: [
              {
                name: "报警",
                type: "scatter",
                coordinateSystem: "geo",
                data: schollData(b_list),
                symbolSize: function(val) {
                  return 30;
                },
                label: {
                  normal: {
                    show: true,
                    formatter: function(value) {
                      i++;
                      var str = `{a|${i}}{k|} {b|${value.name}}`;
                      return str;
                    },
                    // align: "center",
                    textStyle: {
                      color: "white",
                      fontSize: 12,
                      lineHeight: 16
                    },
                    rich: {
                      a: {
                        backgroundColor: "red",
                        color: "white",
                        padding: 2,
                        borderRadius: 10
                      },
                      b: {
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: 5,
                        padding: 5
                      },
                      k: {
                        width: 5
                      }
                    }
                  }
                }
              },
              {
                name: "预警",
                type: "scatter",
                coordinateSystem: "geo",
                data: schollData(y_list),
                symbolSize: function(val) {
                  return 30;
                },
                symbolOffset: ["-60%", 0],
                label: {
                  normal: {
                    show: true,

                    formatter: function(value) {
                      i++;
                      var str = `{a|${i}}{k|} {b|${value.name}}`;
                      return str;
                    },
                    align: "center",
                    textStyle: {
                      color: "white",
                      fontSize: 12,
                      lineHeight: 16
                    },
                    rich: {
                      a: {
                        backgroundColor: "#a96c00",
                        color: "white",
                        padding: 2,
                        borderRadius: 10
                      },
                      b: {
                        backgroundColor: "#a96c00",
                        color: "white",
                        borderRadius: 5,
                        padding: 5
                      },
                      k: {
                        width: 5
                      }
                    }
                  }
                },
                itemStyle: {
                  color: "#a96c00"
                }
              }
            ]
          };
          _this.myChart8.setOption(this.mapOption2);

          //点击事件,根据点击某个省份计算出这个省份的数据
          this.myChart8.on("click", function(params) {
            if (params.data.name !== "通州区") {
              _this.$router.push("/header_hei");
            }
          });
        });
    }
  },
  mounted() {
    if (!this.USER_INFO) {
      this.$router.push("/login");
    }
    this.user = localStorage.getItem("user_info");
    if (this.$echarts) {
      this.init1();
    } else {
      setTimeout(() => {
        this.init1();
      }, 0);
    }
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
    // this.myChart5.dispose();
    // this.myChart6.dispose();
    // this.myChart7.dispose();
    // this.myChart8.dispose();
    // this.myChart = null;
    // this.myChart2 = null;
    // this.myChart3 = null;
    // this.myChart4 = null;
    // this.myChart5 = null;
    // this.myChart6 = null;
    // this.myChart7 = null;
    // this.myChart8 = null;
  }
};
</script>
<style lang="scss" scope>
@import "@/assets/css/public.scss";
.trend {
  box-sizing: border-box;
  font-size: 0.16rem;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
  margin-top: 0.02rem;
  .main-left {
    width: 4.65rem;
    height: 8.88rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > div {
      display: flex;
      justify-content: space-between;
    }
    .xuexiao {
      width: 100%;
      height: 3.61rem;
      display: flex;
      .title {
        text-align: center;
        flex: 1;
        padding-top: 0.15rem;
        .tongji {
          font-size: 0.26rem;
          font-weight: 700;
        }
        p {
          margin-top: 0.15rem;
          margin: 0;
          color: $Main-color;
          &:nth-of-type(even) {
            font-size: 0.26rem;
            font-weight: 700;
          }
        }
      }
      .tu {
        width: 3.26rem;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        padding-right: 0.067rem;
        & > div {
          width: 100%;
          height: 100%;
        }
      }
    }
    .shitang {
      width: 2.22rem;
      height: 1.2rem;
      .title {
        width: 100%;
        height: 100%;
        text-align: center;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;

        p {
          margin: 0;
          padding: 0.02rem;
          color: $Main-color;
          &:nth-of-type(even) {
            font-size: 0.26rem;
            font-weight: 700;
          }
        }
      }
    }
    .jiangguan {
      width: 2.22rem;
      height: 1.2rem;
      .title {
        width: 100%;
        height: 100%;
        text-align: center;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        p {
          margin: 0;
          padding: 0.02rem;
          color: $Main-color;
          &:nth-of-type(even) {
            font-size: 0.26rem;
            font-weight: 700;
          }
        }
      }
    }
    .zhengzhao {
      width: 2.22rem;
      height: 3.66rem;
      .title {
        text-align: center;
        flex: 1;
        padding-top: 0.15rem;
        p {
          margin-top: 0.15rem;
          margin: 0;
          color: $Main-color;
          &:nth-of-type(2) {
            font-size: 0.26rem;
            font-weight: 700;
          }
        }
      }
      .tu {
        height: 78%;
        width: 100%;
      }
    }
    .gongying {
      width: 2.22rem;
      height: 3.66rem;
      .title {
        text-align: center;
        flex: 1;
        padding-top: 0.15rem;
        p {
          margin-top: 0.15rem;
          margin: 0;
          color: $Main-color;
          &:nth-of-type(2) {
            font-size: 0.26rem;
            font-weight: 700;
          }
        }
      }
      .tu {
        height: 78%;
        width: 100%;
      }
    }
  }
  .main-mid {
    width: 7.6rem;
    height: 8.88rem;
    border-radius: 0.12rem;
    .top {
      width: 100%;
      height: 0.45rem;
      border: 0.01rem solid rgba(47, 123, 255, 0.7);
      border-bottom: none;
      // border-radius: 0.1rem 0.1rem 0 0;
      display: flex;
      align-items: center;
      .btn {
        margin-top: 0.05rem;
        font-size: 0.14rem;
        height: 0.4rem;
        width: 1rem;
        line-height: 0.4rem;
        text-align: center;
      }
      input {
        font-size: 0.12rem;
        width: 2rem;
        height: 0.4rem;
        color: #666;
        border-radius: 0.17rem;
      }
      .el-input {
        width: 2rem;
      }
      .el-input1 {
        margin-top: 0.04rem;
      }
      .el-select {
        margin-top: 0.03rem;
        .el-input__suffix {
          top: 5px;
          .is-reverse {
            position: relative;
            top: -11px;
          }
        }
      }
      // & > .el-input {
      //   margin-top: 4px;
      //   width: 2rem;
      //   height: 0.26rem;
      //   background: white;
      //   margin-left: 0.2rem;
      //   margin-right: 0.26rem;
      //   input {
      //     height: 0.26rem;
      //     background: white;
      //     border: none;
      //   }
      // }
      // & > .el-cascader {
      //   width: 1.2rem;
      //   height: 0.26rem;
      //   margin-right: 0.26rem;
      //   .el-input {
      //     width: 1.2rem;
      //     top: -0.06rem;
      //     input {
      //       background: white;
      //       border: none;
      //       height: 0.26rem;
      //     }
      //   }
      // }
      // & > .el-select {
      //   .el-input {
      //     width: 1rem;
      //     input {
      //       background: white;
      //       border: none;
      //       height: 0.26rem;
      //       margin-top: 0.03rem;
      //     }
      //     .el-input__suffix {
      //       i {
      //         margin-top: 0.08rem;
      //       }
      //       .is-reverse {
      //         margin-top: -0.06rem;
      //       }
      //     }
      //   }
      // }
    }
    .map {
      width: 100%;
      height: calc(100% - 0.45rem);
      border: 0.01rem solid rgba(47, 123, 255, 0.7);
      // border-radius: 0 0 0.12rem 0.12rem;
      border-top: none;
      .title {
        display: flex;
        height: 0.5rem;
        overflow: hidden;
        padding: 0.2rem 0.25rem 0;
        justify-content: space-between;
        align-items: flex-end;
        color: white;
        font-size: 0.24rem;
        .time {
          font-size: 0.14rem;
        }
      }
      .tu {
        width: 99.9%;
        padding: 0.1%;
        overflow: hidden;
        height: calc(100% - 0.62rem);
      }
    }
  }
  .main-right {
    width: 6.2rem;
    height: 8.88rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > div {
      display: flex;
      justify-content: space-between;
    }
    .y-tongji {
      height: 1.22rem;
      width: 3rem;
      .title {
        width: 100%;
        height: 100%;
        text-align: center;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        p {
          margin: 0;
          padding: 0.02rem;
          color: $Main-color;
          &:nth-of-type(2) {
            font-size: 0.26rem;
            font-weight: 700;
          }
        }
      }
    }
    .b-tongji {
      height: 1.22rem;
      width: 3rem;
      .title {
        width: 100%;
        height: 100%;
        text-align: center;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        p {
          margin: 0;
          padding: 0.02rem;
          color: $Main-color;
          &:nth-of-type(2) {
            font-size: 0.26rem;
            font-weight: 700;
          }
        }
      }
    }
    .y-duibi {
      height: 3.6rem;
      width: 3rem;
      overflow: hidden;
      .title {
        text-align: center;
        flex: 1;
        padding-top: 0.15rem;
        display: flex;
        justify-content: space-around;
        p {
          margin-top: 0.15rem;
          margin: 0;
          color: $Main-color;
        }
        .btn {
          font-size: 0.14rem;
          padding: 0.01rem 0.1rem;
          i {
            color: #7a8b9c;
          }
        }
      }
      .tu {
        left: 2%;
        width: 99%;
        height: 89%;
        overflow: hidden;
      }
    }
    .b-duibi {
      height: 3.6rem;
      width: 3rem;
      .title {
        text-align: center;
        flex: 1;
        padding-top: 0.15rem;
        display: flex;
        justify-content: space-around;
        p {
          margin-top: 0.15rem;
          margin: 0;
          color: $Main-color;
        }
        .btn {
          font-size: 0.14rem;
          padding: 0.01rem 0.1rem;
          i {
            color: #7a8b9c;
          }
        }
      }
      .tu {
        left: 2%;
        width: 99%;
        height: 89%;
        overflow: hidden;
      }
    }
    .y-zongshu {
      height: 3.6rem;
      width: 3rem;
      overflow: hidden;
      .title {
        text-align: center;
        flex: 1;
        padding-top: 0.15rem;
        display: flex;
        justify-content: space-around;
        p {
          margin-top: 0.15rem;
          margin: 0;
          color: $Main-color;
          &:nth-of-type(2) {
            font-size: 0.12rem;
          }
        }
      }
      .tu {
        left: 2%;
        width: 99%;
        height: 89%;
        overflow: hidden;
      }
    }
    .b-zongshu {
      height: 3.6rem;
      width: 3rem;
      .title {
        text-align: center;
        flex: 1;
        padding-top: 0.15rem;
        display: flex;
        justify-content: space-around;
        p {
          margin-top: 0.15rem;
          margin: 0;
          color: $Main-color;
          &:nth-of-type(2) {
            font-size: 0.12rem;
          }
        }
      }
      .tu {
        left: 2%;
        width: 99%;
        height: 89%;
        overflow: hidden;
      }
    }
  }
}
</style>
