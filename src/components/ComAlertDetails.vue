<template>
  <div class="alertDetails">
    <div class="box">
      <div class="title">基础信息</div>
      <div class="row2">
        <div class="title_warp">
          <div class="title">学校名称:某某某外国语小学</div>
          <div>
            <div v-show="isShow" class="btn" @click="to('/positioning')">风险定位</div>
          </div>
        </div>
        <div class="conten">
          <div>
            <div>预警编号：0001</div>
            <div>同一预警数量：3次</div>
          </div>
          <div>
            <div>预警类别：证件预警</div>
            <div>预警信息内容：证件信息缺失</div>
          </div>
          <div>
            <div>供应商名称：某某某有限公司</div>
            <div>预警时间：2019-09-16</div>
          </div>
        </div>
      </div>

      <div class="row5">
        <div class="title">供应商关联学校</div>
        <div class="conten">
          <span>北京市昌平区天通苑小学</span>
          <span>北京市通州区宋庄镇中心小学</span>
          <span>北京市昌平区天通苑小学</span>
          <span>史各庄中心小学</span>
          <span>育祥小学</span>

          <span>中国人民大学附属小学</span>
          <span>育祥小学（阳光校区）</span>
          <span>北京师范大学-实验小学</span>
          <span>育祥小学（阳光校区）</span>
          <span>北京市昌平区天通苑小学</span>

          <div class="more_wrap">
            <div class="more">
              展开更多
              <i class="el-icon-arrow-down"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="row6">
        <div class="title">供应商关联风险</div>

        <div class="box">
          <div class="xiangguan yj">相关预警</div>
          <div class="contan">
            <span>
              营业执照信息缺失
              <i>2</i>
            </span>
            <span>
              个体工商户身份证信息缺失
              <i>3</i>
            </span>
            <span>
              许可证信息过期
              <i>20</i>
            </span>
            <span>
              健康证信息超期
              <i>21</i>
            </span>
            <span>
              高风险食材
              <i>7</i>
            </span>

            <span>
              许可证信息过期
              <i>10</i>
            </span>
            <span>
              营业执照信息缺失
              <i>2</i>
            </span>
            <span>
              健康证信息超期
              <i>21</i>
            </span>
            <span>
              个体工商户身份证信息缺失
              <i>3</i>
            </span>
            <span>
              营业执照信息缺失
              <i>2</i>
            </span>

            <div class="more_wrap">
              <div class="more">
                展开更多
                <i class="el-icon-arrow-down"></i>
              </div>
            </div>
          </div>

          <div class="xiangguan bj">相关报警</div>
          <div class="contan baojing">
            <span>
              营业执照信息缺失
              <i>2</i>
            </span>
            <span>
              个体工商户身份证信息缺失
              <i>3</i>
            </span>
            <span>
              许可证信息过期
              <i>20</i>
            </span>
            <span>
              健康证信息超期
              <i>21</i>
            </span>
            <span>
              高风险食材
              <i>7</i>
            </span>

            <span>
              许可证信息过期
              <i>10</i>
            </span>
            <span>
              营业执照信息缺失
              <i>2</i>
            </span>
            <span>
              健康证信息超期
              <i>21</i>
            </span>
            <span>
              个体工商户身份证信息缺失
              <i>3</i>
            </span>
            <span>
              营业执照信息缺失
              <i>2</i>
            </span>

            <div class="more_wrap">
              <div class="more">
                展开更多
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
        <input type="text" name="schoolId" value="1" />
        <input type="text" name="content" v-model="textarea" />
        <input type="text" name="userId" value="11" />
        <input type="text" name="type" value="1" />
        <input type="submit" value="tijiao" ref="btn" />
      </form>
      <iframe id="id_iframe" name="nm_iframe" ref="id_frame" style="visibility: hidden;"></iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: "alertDetails",
  props: ["isShow"],
  data() {
    return { textarea: "", loading: false };
  },
  methods: {
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
    // fasong() {
    //   this.$refs.btn.click();
    //   setTimeout(() => {
    //     console.log(
    //       this.$el.getElementsByTagName("iframe")[0].contentWindow.document.body
    //         .innerText
    //     );
    //     let html = this.$el.getElementsByTagName("iframe")[0].contentWindow
    //       .document.body.innerText;
    //     let moban =
    //       '{"code":0,"msg":"success","data":{"code":0,"msg":"success","data":true}}';
    //     if (html === moban) {
    //       this.textarea = "";
    //       this.$message({
    //         showClose: true,
    //         message: "监管意见下达成功",
    //         type: "success"
    //       });
    //     }
    //   }, 2000);
    // }
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
