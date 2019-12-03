<template>
  <div class="alertDetails">
    <div class="box">
      <div class="title">基础信息</div>
      <div class="row2" v-if="TYPE === '证照'">
        <div class="title_warp">
          <div class="title">学校名称:{{lishixiangqingJson.basicInformationA.schoolName}}</div>
          <div>
            <div v-show="isShow" class="btn" @click="to('/positioning')">风险定位</div>
          </div>
        </div>
        <div class="conten">
          <div>
            <div>{{lishixiangqingJson.basicInformationA.type.substr(2)}}编号：#{{lishixiangqingJson.basicInformationA.type.substr(2)==="报警"?"B":"Y"}}{{lishixiangqingJson.basicInformationA.id}}</div>
            <div>同一{{lishixiangqingJson.basicInformationA.type.substr(2)}}数量：{{lishixiangqingJson.sameWarning}}次</div>
          </div>
          <div>
            <div>{{lishixiangqingJson.basicInformationA.type.substr(2)}}类别：{{lishixiangqingJson.basicInformationA.type}}</div>
            <div>{{lishixiangqingJson.basicInformationA.type.substr(2)}}信息内容：{{lishixiangqingJson.basicInformationA.description}}</div>
          </div>
          <div>
            <div>供应商名称：{{lishixiangqingJson.basicInformationA.supplierName}}</div>
            <div>{{lishixiangqingJson.basicInformationA.type.substr(2)}}时间：{{lishixiangqingJson.basicInformationA.time}}</div>
          </div>
          <div v-if="TYPE === '食材'">
            <div>食材名称：茄子</div>
          </div>
        </div>
      </div>
      <div class="row2" v-if="TYPE === '食材'">
        <div class="title_warp">
          <div class="title">学校名称:{{shicaixiangqingJson.schoolName}}</div>
          <div>
            <div v-show="isShow" class="btn" @click="to('/positioning')">风险定位</div>
          </div>
        </div>
        <div class="conten">
          <div>
            <div>{{shicaixiangqingJson.type.substr(2)}}编号：#{{shicaixiangqingJson.type.substr(2)==="报警"?"B":"Y"}}{{shicaixiangqingJson.id}}</div>
            <div>同一{{shicaixiangqingJson.type.substr(2)}}数量：{{lishixiangqingJson.sameWarning}}次</div>
          </div>
          <div>
            <div>{{shicaixiangqingJson.type.substr(2)}}类别：{{shicaixiangqingJson.type}}</div>
            <div>{{shicaixiangqingJson.type.substr(2)}}信息内容：{{shicaixiangqingJson.description}}</div>
          </div>
          <div>
            <div>供应商名称：{{shicaixiangqingJson.supplierName}}</div>
            <div>{{shicaixiangqingJson.type.substr(2)}}时间：{{shicaixiangqingJson.time}}</div>
          </div>
          <div style="flex: inherit;">
            <div>食材名称：{{shicaixiangqingJson.foodName}}</div>
          </div>
        </div>
      </div>
      <div class="row2" v-if="TYPE === '人员'">
        <div class="title_warp">
          <div class="title">学校名称:{{renyuanxiangqingJson.schoolName}}</div>
          <div>
            <div v-show="isShow" class="btn" @click="to('/positioning')">风险定位</div>
          </div>
        </div>
        <div class="conten">
          <div>
            <div>{{renyuanxiangqingJson.type.substr(2)}}编号：#{{renyuanxiangqingJson.type.substr(2)==="报警"?"B":"Y"}}{{renyuanxiangqingJson.id}}</div>
            <div>同一{{renyuanxiangqingJson.type.substr(2)}}数量：{{lishixiangqingJson.sameWarning}}次</div>
          </div>
          <div>
            <div>{{renyuanxiangqingJson.type.substr(2)}}类别：{{renyuanxiangqingJson.type}}</div>
            <div>{{renyuanxiangqingJson.type.substr(2)}}信息内容：{{renyuanxiangqingJson.description}}</div>
          </div>
          <div>
            <div>人员名称：{{renyuanxiangqingJson.human}}</div>
            <div>{{renyuanxiangqingJson.type.substr(2)}}时间：{{renyuanxiangqingJson.time}}</div>
          </div>
        </div>
      </div>

      <div class="row5" v-if="TYPE === '证照'">
        <div class="title">供应商关联学校</div>
        <div class="conten">
          <span>{{lishixiangqingJson.schoolName.schName}}</span>
          <!-- <div class="more_wrap">
            <div class="more">
              展开更多
              <i class="el-icon-arrow-down"></i>
            </div>
          </div>-->
        </div>
      </div>

      <div class="row5" v-if="TYPE === '食材'">
        <div class="title">同一食材关联学校</div>
        <div class="conten">
          <span
            v-show="index<shicaiLength"
            v-for="(val,index) of shicaixiangqingJson.schNameFood"
            :key="index"
          >{{val.schoolName}}</span>

          <div v-show="shicaixiangqingJson.schNameFood.length>shicaiLength" class="more_wrap">
            <div class="more" @click="scMore">
              展开更多
              <i class="el-icon-arrow-down"></i>
            </div>
          </div>
          <div
            class="more_wrap"
            v-show="shicaixiangqingJson.schNameFood.length<shicaiLength&&shicaixiangqingJson.schNameFood.length>5"
          >
            <div class="more" @click="scMore">
              收起
              <i class="el-icon-arrow-down"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="row6" v-if="TYPE === '证照'">
        <div class="title">供应商关联风险</div>

        <div class="box">
          <div class="xiangguan yj">相关预警</div>
          <div class="contan">
            <span
              v-show="index<yjLength"
              v-for="(val,index) of lishixiangqingJson.historyWarning"
              :key="index"
            >
              {{val.description}}
              <i>{{val.total}}</i>
            </span>
            <div v-show="lishixiangqingJson.historyWarning.length>yjLength" class="more_wrap">
              <div class="more" @click="yjMore">
                展开更多
                <i class="el-icon-arrow-down"></i>
              </div>
            </div>
            <div
              class="more_wrap"
              v-show="lishixiangqingJson.historyWarning.length<yjLength&&lishixiangqingJson.historyWarning.length>4"
            >
              <div class="more" @click="yjMore">
                收起
                <i class="el-icon-arrow-down"></i>
              </div>
            </div>
          </div>

          <div class="xiangguan bj">相关报警</div>
          <div class="contan baojing">
            <span
              v-show="index<bjLength"
              v-for="(val,index) of lishixiangqingJson.historyAlarm"
              :key="index"
            >
              {{val.description}}
              <i>{{val.total}}</i>
            </span>

            <div class="more_wrap" v-show="lishixiangqingJson.historyAlarm.length>bjLength">
              <div class="more" @click="bjMore">
                展开更多
                <i class="el-icon-arrow-down"></i>
              </div>
            </div>

            <div
              class="more_wrap"
              v-show="lishixiangqingJson.historyAlarm.length<bjLength&&lishixiangqingJson.historyAlarm.length>5"
            >
              <div class="more" @click="bjMore">
                收起
                <i class="el-icon-arrow-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row4" v-loading="loading">
        <div class="title">监管意见下达</div>
        <el-input
          class="textarea"
          type="textarea"
          :rows="3"
          placeholder="快速补充证件信息"
          v-model="textarea"
        ></el-input>
        <div class="btn" @click="send();">发送</div>
      </div>
      <form
        action="/api/manageWat/supervision/insertRegulatoryOpinion"
        method="post"
        target="nm_iframe"
        style="    visibility: hidden;;"
      >
        <input
          v-if="TYPE === '证照'"
          type="text"
          name="alarmId"
          v-model="lishixiangqingJson.basicInformationA.id"
        />
        <input v-if="TYPE === '人员'" type="text" name="alarmId" v-model="renyuanxiangqingJson.id" />
        <input v-if="TYPE === '食材'" type="text" name="alarmId" v-model="shicaixiangqingJson.id" />

        <input type="text" name="schoolId" value="1" />
        <input type="text" name="content" v-model="textarea" />
        <input type="text" name="userId" value="4" />
        <input type="text" name="type" value="1" />
        <input type="submit" value="tijiao" ref="btn" />
      </form>
      <iframe id="id_iframe" name="nm_iframe" ref="id_frame" style="visibility: hidden;"></iframe>
    </div>
  </div>
</template>
<script>
import {
  lishixiangqing,
  renyuanxiangqing,
  shicaixiangqing
} from "@/api/jingbaoxiangqing";
import { mapState, mapMutations } from "vuex";
export default {
  name: "alertDetails",
  props: ["isShow"],
  data() {
    return {
      renyuanxiangqingJson: {
        supplierName: "叙永县供应商A",
        early_warning: "1",
        description: "营业执照即将过期",
        VALUE: "1",
        time: "2019-11-10 17:32:50",
        type: "证照预警",
        schoolName: "叙永县城西实验中学abc",
        human: null,
        SchoolId: 1,
        sup_id: 1,
        sameWarning: 1,
        id: ""
      },
      shicaiLength: 5,
      bjLength: 5,
      yjLength: 4,
      textarea: "",
      loading: false,
      lishixiangqingJson: {
        basicInformationA: {
          supplierName: "叙永县供应商A",
          early_warning: "1",
          description: "营业执照即将过期",
          VALUE: "1",
          time: "2019-11-10 17:32:50",
          type: "证照预警",
          schoolName: "叙永县城西实验中学abcdef",
          SchoolId: 1,
          sup_id: 1
        },
        historyWarning: [
          {
            total: 1,
            description: "营业执照即将过期",
            label: "营业执照预警",
            value: "1"
          },
          {
            total: 2,
            description: "许可证即将过期",
            label: "许可证预警",
            value: "2"
          },
          {
            total: 1,
            description: "营业执照即将过期",
            label: "营业执照预警",
            value: "1"
          },
          {
            total: 2,
            description: "许可证即将过期",
            label: "许可证预警",
            value: "2"
          },
          {
            total: 1,
            description: "营业执照即将过期",
            label: "营业执照预警",
            value: "1"
          },
          {
            total: 2,
            description: "许可证即将过期",
            label: "许可证预警",
            value: "2"
          }
        ],
        schoolName: {
          schName: "叙永县城西实验中学",
          id: 1
        },
        sameWarning: 1,
        historyAlarm: [
          {
            total: 1,
            description: "营业执照过期",
            label: "营业执照报警",
            value: "1"
          },
          {
            total: 3,
            description: "许可证过期",
            label: "许可证报警",
            value: "2"
          },
          {
            total: 1,
            description: "营业执照过期",
            label: "营业执照报警",
            value: "1"
          },
          {
            total: 3,
            description: "许可证过期",
            label: "许可证报警",
            value: "2"
          },
          {
            total: 1,
            description: "营业执照过期",
            label: "营业执照报警",
            value: "1"
          },
          {
            total: 3,
            description: "许可证过期",
            label: "许可证报警",
            value: "2"
          }
        ]
      },
      shicaixiangqingJson: {
        supplierName: "供应商shicai",
        foodName: "牛肉",
        foodId: 1,
        alarm: "7",
        schNameFood: [
          {
            schoolName: "叙永县城西实验中学"
          },
          {
            schoolName: "叙永县城西实验中学"
          },
          {
            schoolName: "叙永县城西实验中学"
          },
          {
            schoolName: "叙永县城西实验中学"
          },
          {
            schoolName: "叙永县城西实验中学"
          },
          {
            schoolName: "叙永县城西实验中学"
          },
          {
            schoolName: "叙永县城西实验中学"
          },
          {
            schoolName: "叙永县城西实验中学"
          },
          {
            schoolName: "叙永县城西实验中学"
          }
        ],
        description: "食材快检报告未上传",
        VALUE: "7",
        time: "2019-12-10 17:32:59",
        type: "食材报警",
        schoolName: "叙永县城西实验中学fgh",
        SchoolId: 1,
        sameWarning: 1
      }
    };
  },
  computed: {
    ...mapState(["TYPE", "TIME_NUMBER"])
  },
  watch: {
    TIME_NUMBER() {
      this.getlsxiangqing();
    }
  },
  methods: {
    scMore() {
      if (this.shicaiLength === 5) {
        this.shicaiLength = 999;
      } else {
        this.shicaiLength = 5;
      }
    },
    bjMore() {
      if (this.bjLength === 5) {
        this.bjLength = 999;
      } else {
        this.bjLength = 5;
      }
    },
    yjMore() {
      if (this.yjLength === 4) {
        this.yjLength = 999;
      } else {
        this.yjLength = 4;
      }
    },
    getlsxiangqing(e) {
      console.log("进入的类型");
      // console.log(localStorage.getItem("leixing"));
      let type = localStorage.getItem("lishixiangqingtype");
      let id = Number(localStorage.getItem("lishixiangqingid"));
      let jing = localStorage.getItem("lishixiangqingjing");
      let isBAO = 0;
      if (jing === "报警") {
        isBAO = 1;
      }
      console.log(isBAO,id);

      // warningId 可以用 e参数
      //iswarning 0预警 1预警
      if (this.TYPE === "证照") {
        lishixiangqing({
          schoolId: 1,
          iswarning: isBAO,
          warningId: id
        }).then(res => {
          console.log("证照详情");

          console.log(res.data.data.data);
          this.lishixiangqingJson = res.data.data.data;
        });
      } else if (this.TYPE === "人员") {
        renyuanxiangqing({
          schoolId: 1,
          iswarning: isBAO,
          warningId: id
        }).then(res => {
          console.log("人员详情");

          console.log(res.data.data.data);
          this.renyuanxiangqingJson = res.data.data.data;
        });
      } else if (this.TYPE === "食材") {
        shicaixiangqing({
          schoolId: 1,
          iswarning: isBAO,
          warningId: id
        }).then(res => {
          console.log("食材详情");

          console.log(res.data.data.data);
          this.shicaixiangqingJson = res.data.data.data;
        });
      }
    },
    send() {
      if (this.textarea == "") {
        this.$message.error("请输入监管意见");
        return;
      }
      this.$confirm("是否确认下达?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "下达成功!"
          });
          // this.fasong();
          this.$refs.btn.click();

          this.textarea = "";
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下达"
          });
        });
      console.log("send");
    },
    to(uri) {
      // console.log(uri);
      this.$router.push(uri);
    }
  },
  mounted() {},
  created() {
    this.getlsxiangqing();
  }
};
</script>
<style lang="scss" scope>
.el-message__icon {
  font-size: 0.2rem;
}
.alertDetails {
  display: flex;
  justify-content: center;
  font-size: 0.12rem;
  color: #bad3ff;
  // height: calc(100vh - 1.6rem);

  .border {
    border: 0.01rem solid #2458c1;
    padding: 0 0.2rem;
    border-radius: 0.02rem;
  }

  .pointer {
    cursor: pointer;
  }
  .box {
    width: 11rem;
    .xiangguan {
      line-height: 2.5em;
      font-size: 0.16rem;
    }
    span {
      padding: 0.1rem 0.3rem;
      background: #192b71;
      border-radius: 0.04rem;
      @extend .pointer;
    }
    .title {
      margin-top: 0.6rem;
      font-size: 0.18rem;
      line-height: 3em;
    }
    .btn {
      width: 1.4rem;
      height: 0.48rem;
      line-height: 0.48rem;
      text-align: center;
      border: 1px solid #647082;
      @extend .pointer;
    }
    .row1 {
      font-size: 0.18rem;
      line-height: 3em;
    }
    .row2 {
      border: 0.01rem solid #2458c1;
      border-radius: 0.02rem;
      .title_warp {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(14, 33, 87, 0.663);
        height: 0.6rem;
        padding: 0 0.2rem;
        .title {
          margin: 0;
          font-size: 0.18rem;
        }
        .btn {
          height: 0.4rem;
          width: 1.25rem;
          line-height: 0.4rem;
          font-size: 0.16rem;
          background: linear-gradient(90deg, #227de2, #0748dd);
          border: none;
          color: #c5d7f7;
          border-radius: 0.2rem;
        }
      }
      .conten {
        display: flex;
        padding: 0.3rem 0.2rem;
        & > div {
          font-size: 0.16rem;
          line-height: 2em;
          flex: 1;
        }
      }
    }
    .row4 {
      line-height: 3em;
      padding-bottom: 1rem;
      position: relative;

      .title {
        margin-bottom: 0.2rem;
      }
      .textarea {
        textarea {
          @extend .border;
          background: none;
          padding: 0.2rem;
          color: #fff;
          &::-webkit-input-placeholder {
            color: #6e6ea1;
          }
        }
      }
      .btn {
        position: absolute;
        right: 0.1rem;
        bottom: 1.1rem;
        border: 0.01rem solid #3697b6;
        color: #3697b6;
      }
    }
    .row5 {
      .conten {
        @extend .border;
        display: flex;
        flex-wrap: wrap;
        padding: 0.1rem 0rem;
        span {
          margin: 0.1rem 0.12rem;
        }
        .more_wrap {
          width: 100%;
          padding: 0.14rem;
          font-size: 0.16rem;
          display: flex;
          justify-content: center;
          .more {
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
    .row6 {
      .box {
        @extend .border;
        padding: 0.1rem 0rem;
        .yj {
          color: #2f7bff;
        }
        .bj {
          color: #ff7070;
        }
        .xiangguan {
          font-size: 0.15rem;
          line-height: 3em;
          padding-left: 0.2rem;
        }
        .contan {
          display: flex;
          flex-wrap: wrap;
          span {
            margin: 0.1rem 0.12rem;
            i {
              margin-left: 0.04rem;
              color: #00298a;
              padding: 0.02rem 0.07rem;
              background: #a6c0f2;
              font-style: normal;
              border-radius: 0.1rem;
            }
          }
          .more_wrap {
            width: 100%;
            padding: 0.14rem;
            font-size: 0.15rem;
            display: flex;
            justify-content: center;
            .more {
              &:hover {
                cursor: pointer;
              }
            }
          }
          &.baojing {
            span {
              color: #fceaea;
              background: #8f3d58;
              i {
                margin-left: 0.04rem;
                color: #ffeded;
                padding: 0.02rem 0.07rem;
                background: #f0696d;
                font-style: normal;
                border-radius: 0.1rem;
              }
            }
          }
        }
      }
      // .title {
      //   @extend .title;
      // }
    }
  }
}
</style>
