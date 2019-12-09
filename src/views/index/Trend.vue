<template>
  <div class="trend">
    <div class="main-left">
      <div>
        <div class="xuexiao hezi">
          <div class="title" style="line-height: 3em;">
            <p class="tongji">学校统计</p>
            <p></p>
            <p>学校总量</p>
            <p>{{xuexiaotongjiJson.schoolNum}}</p>
            <p>学生总量</p>
            <p>{{xuexiaotongjiJson.stuNum}}</p>
          </div>
          <div class="tu" ref="xx" v-if="xuexiaotongjiJson.schoolArr.length >0"></div>
          <div
            v-else
            class="tu"
            style="text-align:center;font-size: .3rem;line-height: 3.6rem;color: aqua;"
          >暂无统计数据</div>
        </div>
      </div>

      <div style="display: flex;height: 57%;align-items: center;">
        <!-- 市监管/省监管/区监管/市教育/区教育  -->
        <div
          v-if="USER_INFO.type !== 'shengjiaoyu'"
          class="hezi"
          style="width: 100%;display: flex;height: 90%;justify-content: center;"
        >
          <!-- style="position:absolute;top:60%;width:4.65rem;padding:.2rem 0;" -->
          <div class="shitang">
            <div class="title">
              <p>食材供应商总量</p>
              <p>{{shitangJson.foodSupplier}}</p>
            </div>
            <div class="title">
              <p>食堂从业者数量/健康证占比</p>
              <p>{{parseInt((shitangJson.proportionHealth)*100)}}%</p>
            </div>
          </div>
          <div class="jiangguan">
            <div class="title">
              <p>学校食堂总量</p>
              <p>{{shitangJson.schoolCanteen}}</p>
            </div>
            <div class="title">
              <p>食品抽检频次总数</p>
              <p>{{shitangJson.spotCheck}}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 市教育局 -->
      <div
        class="hezi"
        v-if="USER_INFO.type === 'shijiaoyu'"
        style="display: flex;justify-content: center;"
      >
        <div class="shitang">
          <div class="title">
            <p>食材供应商总量</p>
            <p>4,498</p>
          </div>
        </div>
      </div>

      <!-- 省教育局 市教育 区教育 区监管 -->
      <div
        v-if="USER_INFO.type === 'shengjiaoyu'|| USER_INFO.type === 'shijiaoyu'|| USER_INFO.type === 'qujiaoyu' ||USER_INFO.type === 'qujianguan'"
        style="height:4.5rem;"
      >
        <div class="zhengzhao hezi" style="display: flex;flex-direction: column;">
          <div class="title">
            <p>营业证照持有率</p>
            <p>{{zhengzhaolvJson.businessLicense*100}}%</p>
          </div>
          <div class="title">
            <p>采购索证索票上传率</p>
            <p>{{zhengzhaolvJson.invoice*100}}%</p>
          </div>
          <div class="title">
            <p>快检达标率</p>
            <p>{{zhengzhaolvJson.quickCheck*100}}%</p>
          </div>
          <div class="title">
            <p>留样完成率</p>
            <p>{{zhengzhaolvJson.retentionSample*100}}%</p>
          </div>
        </div>
        <div class="gongying hezi" style="display: flex;flex-direction: column;">
          <div class="title">
            <p>陪餐记录完整率</p>
            <p>{{zhengzhaolvJson.accompany*100}}%</p>
          </div>
          <div class="title">
            <p>直播接入数</p>
            <p>{{zhengzhaolvJson.live}}</p>
          </div>
          <div class="title">
            <p>执业人员健康证率</p>
            <p>{{zhengzhaolvJson.lealthy*100}}%</p>
          </div>
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
        <div class="anniu btn" @click="find()">搜索</div>
      </div>
      <div class="map hezi">
        <div class="title">
          <span>{{USER_INFO.areaName}} 地域分布图</span>

          <span v-show="USER_INFO.areaName !== map.nameMap" class="time" @click="map_back()">返回</span>
          <!-- <span class="time">2019-08-16 18:00</span> -->
        </div>
        <div
          class="tu"
          ref="sheng"
          v-loading="loading_quyu"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.1)"
        ></div>
      </div>
    </div>
    <div class="main-right">
      <div>
        <div class="y-tongji hezi">
          <div class="title">
            <p>预警数量统计</p>
            <p>{{baojingshuJson.warningTotal}}</p>
          </div>
        </div>
        <div class="b-tongji hezi">
          <div class="title">
            <p>报警数量统计</p>
            <p>{{baojingshuJson.alarmTotal}}</p>
          </div>
        </div>
      </div>
      <div>
        <div class="y-duibi hezi">
          <div class="title">
            <p>预警环节数量对比</p>
            <!-- <div class="btn anniu">
              季度
              <i class="el-icon-arrow-down"></i>
            </div>-->
          </div>
          <div
            v-loading="loading_yujinghuanjie"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.1)"
            class="tu"
            ref="ydb"
          ></div>
        </div>
        <div class="b-duibi hezi">
          <div class="title">
            <p>报警环节数量对比</p>
            <!-- <div class="btn anniu">
              月
              <i class="el-icon-arrow-down"></i>
            </div>-->
          </div>
          <div
            v-loading="loading_baojinghuanjie"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.1)"
            class="tu"
            ref="bdb"
          ></div>
        </div>
      </div>
      <div>
        <div class="y-zongshu hezi">
          <div class="title">
            <p>学校预警总数 TOP5</p>
            <p>本月</p>
          </div>
          <div
            v-show="yujingxuexiaoArr.schoolNameArr !==[]"
            v-loading="loading_yujingtop"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.1)"
            class="tu"
            ref="yzs"
          ></div>
          <div
            v-show="yujingxuexiaoArr.schoolNameArr ==[]"
            class="tu"
            style="font-size: .3rem;color: aqua;line-height: 3rem;text-align: center;"
          >暂无统计数据</div>
        </div>
        <div class="b-zongshu hezi">
          <div class="title">
            <p>学校报警总数 TOP5</p>
            <p>本月</p>
          </div>
          <div
            v-show="baojingxuexiaoArr.schoolNameArr !=[]"
            v-loading="loading_baojingtop"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.1)"
            class="tu"
            ref="bzs"
          ></div>
          <div
            v-show="baojingxuexiaoArr.schoolNameArr ==[]"
            class="tu"
            style="font-size: .3rem;color: aqua;line-height: 3rem;text-align: center;"
          >暂无统计数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { setTimeout } from "timers";
import {
  xuexiaotongji,
  xuexiaobaojingpaiming,
  xuexiaoyujingpaiming,
  yujinghuanjie,
  baojinghuanjie,
  shitangxinxi,
  baojingshu,
  zhengzhaolv,
  quyuma
} from "@/api/qushifengxi";
import { mapState, mapMutations } from "vuex";
import { log } from "util";
export default {
  name: "trend",
  data() {
    return {
      loading_yujinghuanjie: true, //预警环节loading
      loading_baojinghuanjie: true, //报警环节loading
      loading_baojingtop: true, //报警toploading
      loading_yujingtop: true, //预警toploading
      loading_quyu: true, //预警toploading
      baojingshuJson: {
        warningTotal: "",
        alarmTotal: ""
      },
      mapOption: "",
      quyu_options: [
        // {
        //   value: "全部区域",
        //   label: "全部区域"
        // },
        // {
        //   value: "泸州市",
        //   label: "泸州市"
        // },
        // {
        //   value: "张家口市",
        //   label: "张家口市"
        // },
        // {
        //   value: "承德市",
        //   label: "承德市"
        // },
        // {
        //   value: "秦皇岛市",
        //   label: "秦皇岛市"
        // },
        // {
        //   value: "唐山市",
        //   label: "唐山市"
        // },
        // {
        //   value: "廊坊市",
        //   label: "廊坊市"
        // },
        // {
        //   value: "保定市",
        //   label: "保定市"
        // },
        // {
        //   value: "沧州市",
        //   label: "沧州市"
        // },
        // {
        //   value: "衡水市",
        //   label: "衡水市"
        // },
        // {
        //   value: "邢台市",
        //   label: "邢台市"
        // },
        // {
        //   value: "邯郸市",
        //   label: "邯郸市"
        // }
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
      area_options: [
        // {
        //   value: "zhinan",
        //   label: "指南",
        //   children: [
        //     {
        //       value: "shejiyuanze",
        //       label: "设计原则",
        //       children: [
        //         {
        //           value: "yizhi",
        //           label: "一致"
        //         },
        //         {
        //           value: "fankui",
        //           label: "反馈"
        //         },
        //         {
        //           value: "xiaolv",
        //           label: "效率"
        //         },
        //         {
        //           value: "kekong",
        //           label: "可控"
        //         }
        //       ]
        //     },
        //     {
        //       value: "daohang",
        //       label: "导航",
        //       children: [
        //         {
        //           value: "cexiangdaohang",
        //           label: "侧向导航"
        //         },
        //         {
        //           value: "dingbudaohang",
        //           label: "顶部导航"
        //         }
        //       ]
        //     }
        //   ]
        // }
      ], //学校报警top5
      baojingxuexiaoArr: {
        schoolNameArr: [],
        baiArr: [],
        kuangArr: [],
        baojingArr: []
      }, //学校预警top5
      yujingxuexiaoArr: {
        schoolNameArr: [],
        baiArr: [],
        kuangArr: [],
        baojingArr: []
      }, //预警环节
      yujinghuanjie: {
        type: [],
        total: [],
        baiArr: [],
        kuangArr: []
      }, //报警环节
      baojinghuanjie: {
        type: [],
        total: [],
        baiArr: [],
        kuangArr: []
      }, //学校统计
      xuexiaotongjiJson: {
        schoolArr: [],
        zhanbiArr: [],
        schoolNum: "",
        stuNum: ""
      },
      //食堂统计
      shitangJson: {
        proportionHealth: 0
        // foodSupplier:'',
        // schoolCanteen:"",
        // spotCheck:''
      },
      //地域图
      map: {
        nameMap: "四川省",
        mapCode: 0
      },
      myChart8: null,
      myChart7: null,
      myChart6: null,
      myChart5: null,
      myChart4: null,
      myChart3: null,
      myChart2: null,
      myChart: null,
      zhengzhaolvJson: {
        businessLicense: 1,
        accompany: 0,
        lealthy: 0,
        quickCheck: 0,
        invoice: 0,
        retentionSample: 0,
        live: 4
      }
    };
  },
  computed: {
    ...mapState(["USER_INFO"])
  },
  methods: {
    ...mapMutations(["SET_USER_INFO"]),
    map_back() {
      this.map.nameMap = this.USER_INFO.areaName;
      this.map.mapCode = this.USER_INFO.areaCode;
      this.initEcharts8();
    },
    //获取区域码
    getquyuma(name) {
      quyuma({ name }).then(res => {
        this.map.mapCode = res.data.data.code;
      });
    },
    //获取证照率
    getzhengzhaolv() {
      zhengzhaolv({
        regionalLevel: this.USER_INFO.userLevel,
        areaCode: this.USER_INFO.areaCode
      }).then(res => {
        this.zhengzhaolvJson = res.data.data[0];
      });
    },
    //获取学校统计
    getxuexiaotongji() {
      xuexiaotongji().then(res => {
        const json = res.data.data;

        this.xuexiaotongjiJson.schoolNum = json.schoolNum;
        this.xuexiaotongjiJson.stuNum = json.stuNum;
        json.place.forEach(item => {
          this.xuexiaotongjiJson.schoolArr.push(
            `${item.schoolType}(${item.schoolNum}所)`
          );
          this.xuexiaotongjiJson.zhanbiArr.push(
            parseInt((item.schoolNum / json.schoolNum) * 100)
          );
        });
        setTimeout(() => {
          this.initEcharts();
        }, 1000);
        // console.log("学校统计");
        // console.log(this.xuexiaotongjiJson);
      });
    }, // console.log("食堂");
    getshitangxinxi() {
      shitangxinxi().then(res => {
        this.shitangJson = res.data.data;
        // console.log("shitang");
        // console.log(this.shitangJson);
      });
    },
    //获取预警环节
    getyujinghuangjie() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let mydate = year.toString() + "-" + month.toString();
      yujinghuanjie({
        month: mydate,
        regionalLevel: this.USER_INFO.userLevel,
        areaCode: this.USER_INFO.areaCode
      }).then(res => {
        const json = res.data.data;
        // console.log("获取预警环节");
        // console.log(json);
        json.forEach(item => {
          this.yujinghuanjie.type.push(item.type);
          this.yujinghuanjie.total.push(item.total);
          this.yujinghuanjie.baiArr.push(99.9);
          this.yujinghuanjie.kuangArr.push(100);
        });
        this.initEcharts6();
      });
    },
    //获取报警环节
    getbaojinghuangjie() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let mydate = year.toString() + "-" + month.toString();
      baojinghuanjie({
        month: mydate,
        regionalLevel: this.USER_INFO.userLevel,
        areaCode: this.USER_INFO.areaCode
      }).then(res => {
        const json = res.data.data;
        json.forEach(item => {
          this.baojinghuanjie.type.push(item.type);
          this.baojinghuanjie.total.push(item.total);

          this.baojinghuanjie.baiArr.push(99.9);
          this.baojinghuanjie.kuangArr.push(100);
        });
        // console.log(this.yujinghuanjie);
        // console.log(json);

        this.initEcharts7();
      });
    },
    //获取预警排名
    getxuexiaoyujingpaiming() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let mydate = year.toString() + "-" + month.toString();
      xuexiaoyujingpaiming({
        month: mydate,
        regionalLevel: this.USER_INFO.userLevel,
        areaCode: this.USER_INFO.areaCode
      }).then(res => {
        const json = res.data.data;
        json.forEach(item => {
          this.yujingxuexiaoArr.schoolNameArr.push(item.schoolName);
          this.yujingxuexiaoArr.baojingArr.push(item.total);
          this.yujingxuexiaoArr.baiArr.push(99.9);
          this.yujingxuexiaoArr.kuangArr.push(100);
        });
        // console.log("预警");

        // console.log(this.yujingxuexiaoArr.schoolNameArr);
        if (!json) {
        }
        this.initEcharts4();
      });
    },
    //获取报警排名
    getxuexiaobaojingpaiming() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let mydate = year.toString() + "-" + month.toString();
      xuexiaobaojingpaiming({
        month: mydate,
        regionalLevel: this.USER_INFO.userLevel,
        areaCode: this.USER_INFO.areaCode
      }).then(res => {
        const json = res.data.data;
        json.forEach(item => {
          this.baojingxuexiaoArr.schoolNameArr.push(item.schoolName);
          this.baojingxuexiaoArr.baojingArr.push(item.total);
          this.baojingxuexiaoArr.baiArr.push(99.9);
          this.baojingxuexiaoArr.kuangArr.push(100);
        });
        // console.log(this.baojingxuexiaoArr);
        this.initEcharts5();
      });
    },
    //获取报警/预警数量
    getbaojingshu() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let mydate = year.toString() + "-" + month.toString();
      baojingshu({
        month: mydate,
        regionalLevel: this.USER_INFO.userLevel,
        areaCode: this.USER_INFO.areaCode
      }).then(res => {
        // console.log(res.data);
        this.baojingshuJson = res.data.data;
      });
    },
    handleChange(e) {
      // console.log(e);
    },
    // Echarts 的 resize 方法
    resizeHandler() {
      this.myChart.resize();
      this.myChart4.resize();
      this.myChart5.resize();
      this.myChart6.resize();
      this.myChart7.resize();
      this.myChart8.resize();
    }, //学校数量统计
    initEcharts() {
      const _this = this;
      _this.myChart = this.$echarts.init(this.$refs.xx);
      // 指定图表的配置项和数据
      var data = {
        color: "#29b4db",
        xAxis: this.xuexiaotongjiJson.schoolArr,
        wz: [
          ["25%", "25%"],
          ["75%", "25%"],
          ["25%", "70%"],
          ["75%", "70%"]
        ],
        values: this.xuexiaotongjiJson.zhanbiArr
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
          // text:'121',
          // subtext:'120人',
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
    }, //学校预警总数 top5
    initEcharts4() {
      const _this = this;
      _this.myChart4 = this.$echarts.init(this.$refs.yzs);
      // 指定图表的配置项和数据
      var dataLine = this.yujingxuexiaoArr.baojingArr;
      var option = {
        tooltip: {
          formatter: e => {
            if (e.seriesName === "条") {
              return `${e.name}:${e.value}`;
            }
            return;
          }
        },
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
            data: this.yujingxuexiaoArr.schoolNameArr
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
            data: []
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
            data: this.yujingxuexiaoArr.baiArr,
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
            data: this.yujingxuexiaoArr.kuangArr,
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
      var dataLine = this.baojingxuexiaoArr.baojingArr;
      var option = {
        // backgroundColor: "#0a1f3e",
        tooltip: {
          formatter: e => {
            if (e.seriesName === "条") {
              return `${e.name}:${e.value}`;
            }
            return;
          }
        },
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
            data: this.baojingxuexiaoArr.schoolNameArr
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
            data: []
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
            data: this.baojingxuexiaoArr.baiArr,
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
            data: this.baojingxuexiaoArr.kuangArr,
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
      var dataLine = this.yujinghuanjie.total;
      var option = {
        // backgroundColor: "#0a1f3e",
        tooltip: {
          formatter: e => {
            if (e.seriesName === "条") {
              return `${e.name}:${e.value}`;
            }
            return;
          }
        },
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
            data: this.yujinghuanjie.type
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
            data: this.yujinghuanjie.baiArr,
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
            data: this.yujinghuanjie.kuangArr,
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
      var dataLine = this.baojinghuanjie.total;
      var option = {
        tooltip: {
          formatter: e => {
            if (e.seriesName === "条") {
              return `${e.name}:${e.value}`;
            }
            return;
          }
        },
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
            data: this.baojinghuanjie.type
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
            data: this.baojinghuanjie.baiArr,
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
            data: this.baojinghuanjie.kuangArr,
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
    }, //区域分布图
    initEcharts8() {
      const _this = this;
      var i = 0;
      this.myChart8 = this.$echarts.init(this.$refs.sheng);
      //地图放大
      this.myChart8.on("click", params => {
        // if (params.componentType === "series") {
        this.map.nameMap = params.name;
        this.getquyuma(params.name);
        // console.log(this.map);
        this.myChart8 = null;
        this.initEcharts8();
        // }
      });
      let quxian = `http://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/bound/${this.map.mapCode}.json`;
      let shengshi = `https://geo.datav.aliyun.com/areas/bound/${this.map.mapCode}_full.json`;
      let uri = shengshi;

      // if (this.USER_INFO.userLevel === "4") {
      uri = quxian;
      // }
      axios.get(uri).then(response => {
        // console.log(this.map);
        // console.log(response.data);

        this.$echarts.registerMap(this.map.nameMap, response.data);
        var geoCoordMap = {
          泸州市: [105.443348, 28.889138],
          巴中市: [106.753669, 31.858809]
        };
        var b_data = [
          {
            name: "巴中市",
            value: 1
          }
        ];
        var y_data = [
          {
            name: "泸州市",
            value: 4
          }
        ];
        var convertData = function(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        };

        this.mapOption = {
          legend: {
            bottom: 10,
            borderRadius: 0,
            itemGap: 100,
            textStyle: {
              color: "white"
            }
          },
          geo: {
            map: this.map.nameMap,
            zoom: 1.1,
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#26a3d2"
              }
            },
            label: {
              normal: {
                show: true, //是否显示标签
                position: "insideTopLeft",
                align: "center",
                offset: [0, 0]
                // formatter: "{b}:"
              }
            },
            regions: []
          },
          series: [
            {
              name: "报警",
              type: "scatter",
              coordinateSystem: "geo",
              data: convertData(b_data),
              symbolSize: function(val) {
                return 60;
              },
              label: {
                normal: {
                  show: true,
                  formatter: function(value) {
                    var str = `${value.name} ${value.value[2]}个报警`;
                    return str.split(" ").join("\n");
                  },
                  align: "center",
                  textStyle: {
                    color: "white",
                    fontSize: 12,
                    lineHeight: 16
                  },
                  rich: {
                    a: {}
                  }
                }
              }
            },
            {
              name: "预警",
              type: "scatter",
              coordinateSystem: "geo",
              data: convertData(y_data),
              symbolSize: function(val) {
                return 60;
              },
              symbolOffset: [0, 0],
              label: {
                normal: {
                  show: true,
                  formatter: function(value) {
                    // console.log(value);
                    var str = `${value.name} ${value.value[2]}个预警`;
                    return str.split(" ").join("\n");
                  },
                  align: "center",
                  textStyle: {
                    color: "white",
                    fontSize: 12,
                    lineHeight: 16
                  },
                  rich: {
                    a: {}
                  }
                }
              },
              itemStyle: {
                color: "#a96c00"
              }
            }
          ]
        };
        this.myChart8.setOption(this.mapOption);
      });
    }
  },
  mounted() {
    // 没有数据时 延时播放
    setTimeout(res => {
      window.addEventListener("resize", this.resizeHandler);
      this.initEcharts8();
    }, 1000);
  },
  created() {
    var user = JSON.parse(localStorage.getItem("userInfo"));
    this.SET_USER_INFO(user);
    this.map.mapCode = user.areaCode;
    this.getxuexiaobaojingpaiming();
    this.getxuexiaoyujingpaiming();
    this.getyujinghuangjie();
    this.getbaojinghuangjie();

    this.getxuexiaotongji();
    this.getshitangxinxi();

    this.getbaojingshu();
    this.getzhengzhaolv();
  },
  beforeDestroy() {
    // 清理工作 避免内存泄漏
    // 销毁监听事件
    window.removeEventListener("resize", this.resizeHandler);
    // 销毁 Echarts 实例
    // this.myChart.dispose();
    // this.myChart4.dispose();
    // this.myChart5.dispose();
    // this.myChart6.dispose();
    // this.myChart7.dispose();
    // this.myChart8.dispose();
    this.myChart = null;
    this.myChart4 = null;
    this.myChart5 = null;
    this.myChart6 = null;
    this.myChart7 = null;
    this.myChart8 = null;
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
      // height: 1.2rem;
      height: 100%;
      .title {
        width: 100%;
        height: 50%;
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
      // height: 1.2rem;
      height: 100%;
      .title {
        width: 100%;
        height: 50%;
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
          padding: 0.1rem 0.3rem;
          border-radius: 0.1rem;
          background: linear-gradient(180deg, #227ee2 0%, #0646dd 100%);
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
