<template>
  <div id="positioning">
    <div class="top">
      <div class="row1" style>
        <div class="left">
          <img class="img" :src="xuexiaoxinxiJson.schoolInformation.pic" alt />
          <div class="neirong">
            <div class="dazi">{{xuexiaoxinxiJson.schoolInformation.schoolName || "暂无"}}</div>
            <p>所在区域：{{xuexiaoxinxiJson.schoolInformation.schArea || "暂无"}}</p>
            <p>办学性质：{{xuexiaoxinxiJson.schoolInformation.officeNature || "民办" }}学校</p>
            <p>类型：{{xuexiaoxinxiJson.schoolInformation.schoolType || "暂无"}}</p>
            <p>地址：{{xuexiaoxinxiJson.schoolInformation.schAddress || "暂无"}}</p>
            <div @click="VideShow" class="btn">查看视频直播</div>
          </div>
        </div>
        <div class="right" style="width:auto;justify-content: center;padding:0;">
          <div>
            <div>
              <img src="@/assets/img/yujing.png" alt />
            </div>
            <div class="shu">
              <div class="shu1">
                <span>{{xuexiaoxinxiJson.warningNumber.warningNumber}}</span>条
              </div>
            </div>
            <div>学校预警数量汇总</div>
          </div>
        </div>

        <div class="right" style="width:auto;justify-content: center;padding:0;">
          <div>
            <div>
              <img src="@/assets/img/baojing.png" alt />
            </div>

            <div class="shu">
              <div class="shu1 red">
                <span>{{xuexiaoxinxiJson.alarmNumber.alarmNumber}}</span>条
              </div>
            </div>
            <div>学校报警数量汇总</div>
          </div>
        </div>
      </div>

      <div id="yujing_baojing" style="min-height: calc(100vh - 4.15rem);">
        <div id="yujing_wrap">
          <div class="yujin_type">
            <div :class="{yujin_type_active:yuJing_active==='资质信息'}" @click="getYuJing('资质信息')">资质信息</div>
            <div
              :class="{yujin_type_active:yuJing_active==='供应商信息'}"
              @click="getYuJing('供应商信息')"
            >供应商信息</div>
            <div :class="{yujin_type_active:yuJing_active==='人员信息'}" @click="getYuJing('人员信息')">人员信息</div>
            <div :class="{yujin_type_active:yuJing_active==='设备信息'}" @click="getYuJing('设备信息')">设备信息</div>
            <div :class="{yujin_type_active:yuJing_active==='食材信息'}" @click="getYuJing('食材信息')">食材信息</div>
            <div :class="{yujin_type_active:yuJing_active==='台账信息'}" @click="getYuJing('台账信息')">台账信息</div>
            <div
              :class="{yujin_type_active:yuJing_active==='历史报警信息'}"
              @click="getYuJing('历史报警信息')"
            >历史报警信息</div>
          </div>
          <div class="gs_lis" style="padding:0;margin-bottom:.5rem;">
            <div
              v-show="yuJing_active==='资质信息'"
              style="width:100%;float:left;padding: .3rem 0rem 0;"
            >
              <div style="width:45%;float:left; padding-left: 15%">
                <table style="line-height:2.5em;">
                  <tr>
                    <td>学校名称：</td>
                    <td>{{zizhixinxiJson.sch_name}}</td>
                  </tr>
                  <tr>
                    <td>所属市场监管：</td>
                    <td>{{zizhixinxiJson.reg_name}}</td>
                  </tr>
                  <tr>
                    <td>所属教育监管：</td>
                    <td>{{zizhixinxiJson.reg_name}}</td>
                  </tr>
                  <tr>
                    <td>学校校长：</td>
                    <td>{{zizhixinxiJson.principal}}</td>
                  </tr>
                  <tr>
                    <td>联系方式：</td>
                    <td>{{zizhixinxiJson.tel}}</td>
                  </tr>
                  <tr>
                    <td>学校地址：</td>
                    <td>{{zizhixinxiJson.address}}</td>
                  </tr>
                </table>
              </div>
              <div style="width:40%;float:left; margin-top: 0.3rem">
                <div>
                  <el-progress
                    type="circle"
                    :percentage="Number(zizhixinxiJson.ratingScore)"
                    :show-text="false"
                    style="position: absolute;"
                  ></el-progress>
                  <div
                    class="score"
                    style="width: 126px;text-align: center;font-size: 0.24rem;font-weight: bold;color: #FFFFFF;padding-top: 50px;"
                  >
                    <span>{{zizhixinxiJson.ratingScore}}分</span>
                  </div>
                  <div
                    class="score"
                    style="width: 126px;text-align: center;font-size: 0.16rem;color: #FFFFFF;margin-top: 65px;"
                  >
                    <span>量化评级：{{zizhixinxiJson.quantitative}}级</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-show="yuJing_active==='供应商信息'" class="gys" style="float: left; width: 100%">
              <div
                style="width:100%; float: left;padding: 0 .2rem; margin:0 0 2% 0;height: 1rem;display: flex;background:#0b1c54;align-items: center;"
              >
                <div style="width: 20%; float: left">
                  <span style="font-size: 16px">
                    供应商总数：
                    <span
                      style="color:#31c9f2; font-size: 20px;padding-right: 5px"
                    >{{gongyingshangJson.total.Total}}</span>家
                  </span>
                </div>
                <div style="width: 40%; float: left">
                  <div style="width: 40%; float: left;font-size: 16px; padding-top: 5px">营业执照有效率：</div>
                  <div style="width: 50%; float: left; padding-top: 6px">
                    <el-progress
                      :text-inside="true"
                      :width="20"
                      :stroke-width="18"
                      :percentage="parseInt((Number(gongyingshangJson.open.OpenTotal)/Number(gongyingshangJson.total.Total))*100)"
                    ></el-progress>
                  </div>
                </div>
                <div style="width: 40%; float: left">
                  <div style="width: 35%; float: left;font-size: 16px; padding-top: 5px">许可证有效率：</div>
                  <div style="width: 50%; float: left; padding-top: 6px">
                    <el-progress
                      :text-inside="true"
                      :width="20"
                      :stroke-width="18"
                      :percentage="parseInt((Number(gongyingshangJson.license.LicenseTotal)/Number(gongyingshangJson.total.Total))*100)"
                      background="#ff9900"
                    ></el-progress>
                  </div>
                </div>
              </div>
              <div
                class="box"
                style="width:100%; float:left;padding: .3rem .2rem;box-sizing:border-box;"
              >
                <div class="flex justify_between" style="flex-wrap: wrap;">
                  <div
                    class="item"
                    style="width:30%;padding-bottom: 20px;"
                    v-show="index < gongyingshangLength"
                    v-for="(val,index) of gongyingshangJson.supplierInformation"
                    :key="index"
                  >
                    <p class="r1">{{val.name}}</p>
                    <p class>食品经营许可证：{{val.license_number}}</p>
                    <div class="bot">
                      <p class="ellipsis">
                        同时供应：{{val.school.schName}}
                        <!-- <span v-for="val of val.school" :key="val.id">{{val.schName}}</span> -->
                      </p>
                      <!-- <p class="all">查看全部学校</p> -->
                    </div>
                  </div>
                </div>

                <div
                  v-show="gongyingshangJson.supplierInformation.length>gongyingshangLength"
                  @click="gongyingshangMore"
                  class="flex more xu_more"
                >
                  <span>
                    展开更多
                    <i class="el-icon-arrow-down"></i>
                  </span>
                </div>

                <div
                  v-show="gongyingshangJson.supplierInformation.length<gongyingshangLength && gongyingshangJson.supplierInformation.length>3"
                  @click="gongyingshangMore"
                  class="flex more xu_more"
                >
                  <span>
                    收起
                    <i class="el-icon-arrow-up"></i>
                  </span>
                </div>
              </div>
            </div>

            <div v-show="yuJing_active==='人员信息'" class="ryxx" style="float:left; width:100%">
              <div
                style="width:100%; float: left;padding: 0 .2rem; margin:0 0 2% 0;height: 1rem;display: flex;background:#0b1c54;align-items: center;"
              >
                <div style="width: 20%; float: left">
                  <span style="font-size: 16px">
                    人员总数：
                    <span
                      style="color:#31c9f2; font-size: 20px;padding-right: 5px"
                    >{{renyuanxinxiJson.chefInformation.length+renyuanxinxiJson.foodSafetyInformation.length+renyuanxinxiJson.foodEscortInformation.length}}</span>人
                  </span>
                </div>
                <div style="width: 40%; float: left">
                  <div style="width: 35%; float: left;font-size: 16px; padding-top: 5px">健康证有效率：</div>
                  <div style="width: 50%; float: left; padding-top: 6px">
                    <el-progress
                      :text-inside="true"
                      :width="20"
                      :stroke-width="18"
                      :percentage="parseInt((Number(renyuanxinxiJson.healthCheck.healthCard)/Number(renyuanxinxiJson.morningCheck.total))*100) ||0"
                    ></el-progress>
                  </div>
                </div>
                <div style="width: 40%; float: left">
                  <div style="width: 35%; float: left;font-size: 16px; padding-top: 5px">晨检合格率：</div>
                  <div style="width: 50%; float: left; padding-top: 6px">
                    <el-progress
                      :text-inside="true"
                      :width="20"
                      :stroke-width="18"
                      :percentage="parseInt(Number(renyuanxinxiJson.morningCheck.eqRatio))*100"
                    ></el-progress>
                  </div>
                </div>
              </div>
              <div
                class="box flex column justify_between"
                style="width:100%; float:left;padding:0 .1rem;box-sizing: border-box;"
              >
                <div class="flex column" style="margin-bottom: 0.3rem">
                  <div
                    class="tip"
                    style="padding-left: 0.2rem; font-size: 16px; border-left: 3px solid #31c9f2;"
                  >厨房人员（{{renyuanxinxiJson.chefInformation.length}}人）</div>
                  <div class="main" style="padding:0.2rem;flex-wrap: wrap;">
                    <div
                      style="width:30%;text-align: center;padding-bottom: 20px;"
                      v-show="index < chufangLength"
                      v-for="(val,index) of renyuanxinxiJson.chefInformation"
                      :key="index"
                    >
                      <p>{{val.realName}}/厨师</p>
                      <p>健康证：{{val.healthNumber}}</p>
                    </div>
                  </div>

                  <div
                    v-show="renyuanxinxiJson.chefInformation.length>chufangLength"
                    @click="chufangMore"
                    class="flex more xu_more"
                  >
                    <span>
                      展开更多
                      <i class="el-icon-arrow-down"></i>
                    </span>
                  </div>

                  <div
                    v-show="renyuanxinxiJson.chefInformation.length<chufangLength &&renyuanxinxiJson.chefInformation.length>3"
                    @click="chufangMore"
                    class="flex more xu_more"
                  >
                    <span>
                      收起
                      <i class="el-icon-arrow-up"></i>
                    </span>
                  </div>
                </div>
                <div class="flex column" style="margin-bottom: 0.3rem">
                  <div
                    class="tip"
                    style="padding-left: 0.2rem; font-size: 16px; border-left: 3px solid #31c9f2"
                  >食品安全员（{{renyuanxinxiJson.foodSafetyInformation.length}}人）</div>
                  <div class="main" style="padding:0.2rem;flex-wrap: wrap;">
                    <div
                      style="width:30%;text-align: center;padding-bottom: 20px;"
                      v-show="index<shipinLength"
                      v-for="(val,index) of renyuanxinxiJson.foodSafetyInformation"
                      :key="index"
                    >
                      <p>{{val.realName}}/食品安全员</p>
                      <p>健康证：{{val.healthNumber}}</p>
                    </div>
                  </div>
                  <div
                    v-show="renyuanxinxiJson.foodSafetyInformation.length>shipinLength"
                    @click="shipinMore"
                    class="flex more xu_more"
                  >
                    <span>
                      展开更多
                      <i class="el-icon-arrow-down"></i>
                    </span>
                  </div>

                  <div
                    v-show="renyuanxinxiJson.foodSafetyInformation.length<shipinLength &&renyuanxinxiJson.foodSafetyInformation.length>3"
                    @click="shipinMore"
                    class="flex more xu_more"
                  >
                    <span>
                      收起
                      <i class="el-icon-arrow-up"></i>
                    </span>
                  </div>
                </div>
                <div class="flex column" style="margin-bottom: 0.3rem">
                  <div
                    class="tip"
                    style="padding-left: 0.2rem; font-size: 16px; border-left: 3px solid #31c9f2"
                  >陪餐人员（{{renyuanxinxiJson.foodEscortInformation.length}}人）</div>
                  <div class="main" style="padding:0.2rem;flex-wrap: wrap;">
                    <div
                      style="width:30%;text-align: center;padding-bottom: 20px;"
                      v-show="index < peicanLength"
                      v-for="(val,index) of renyuanxinxiJson.foodEscortInformation"
                      :key="index"
                    >
                      <p>{{val.realName}}/配餐人员</p>
                      <p>健康证：{{val.healthNumber}}</p>
                    </div>
                  </div>

                  <div
                    v-show="renyuanxinxiJson.foodEscortInformation.length>peicanLength"
                    @click="peicanMore"
                    class="flex more xu_more"
                  >
                    <span>
                      展开更多
                      <i class="el-icon-arrow-down"></i>
                    </span>
                  </div>

                  <div
                    v-show="renyuanxinxiJson.foodEscortInformation.length<peicanLength &&renyuanxinxiJson.foodEscortInformation.length>3"
                    @click="peicanMore"
                    class="flex more xu_more"
                  >
                    <span>
                      收起
                      <i class="el-icon-arrow-up"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div v-show="yuJing_active==='设备信息'" class="shebei">
              <div
                style="width:100%; float: left;padding: 0 .2rem; margin:0 0 2% 0;height: 1rem;display: flex;background:#0b1c54;align-items: center;"
              >
                <div style="width: 20%; float: left">
                  <span style="font-size: 16px">
                    设备总数：
                    <span
                      style="color:#31c9f2; font-size: 20px;padding-right: 5px"
                    >{{shebeixinxiJson.eqOperationRatio.total}}</span>类
                  </span>
                </div>
                <div style="width: 40%; float: left">
                  <div style="width: 40%; float: left;font-size: 16px; padding-top: 5px">设备运行正常率：</div>
                  <div style="width: 50%; float: left; padding-top: 6px">
                    <el-progress
                      :text-inside="true"
                      :width="20"
                      :stroke-width="18"
                      :percentage="shebeixinxiJson.eqOperationRatio.eqWell*100"
                    ></el-progress>
                  </div>
                </div>
                <div style="width: 40%; float: left">
                  <div style="width: 40%; float: left;font-size: 16px; padding-top: 5px">设备检查合格率：</div>
                  <div style="width: 50%; float: left; padding-top: 6px">
                    <el-progress
                      :text-inside="true"
                      :width="20"
                      :stroke-width="18"
                      :percentage="shebeixinxiJson.eqOperationRatio.eqWell*100"
                    ></el-progress>
                  </div>
                </div>
              </div>
              <el-table
                :data="shebeixinxiJson.deviceInformation"
                style="width: 100%;"
                :header-cell-style="rowClass"
                :row-style="rowClass"
                :header-row-style="rowClass"
              >
                <el-table-column prop="label" label="设备名称：" width="180"></el-table-column>

                <el-table-column prop="brand" label="设备品牌：" width="180"></el-table-column>

                <el-table-column prop="start_date" label="出厂日期：" width="180"></el-table-column>

                <el-table-column :formatter="geshihua" prop="use_year" label="使用年限：" width="180"></el-table-column>

                <el-table-column prop="restaurant_name" label="地址"></el-table-column>
              </el-table>
            </div>

            <div v-show="yuJing_active==='食材信息'" class="shicaixinxi">
              <div
                class="shicai"
                style="display:flex;justify-content: flex-end;height: 1rem;display: flex;align-items: center;"
              >
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
                <el-button @click="clear" type="primary" style="margin:0 .2rem;">清空</el-button>

                <el-button @click="see" type="primary" style="margin:0 .2rem;">查看</el-button>
              </div>
              <div class="border main">
                <div class="r1">
                  <div style="width:25%;text-align:center;">编号</div>
                  <div style="width:25%;text-align:center;">食材名称</div>
                  <div style="width:25%;text-align:center;">采购日期</div>
                  <div style="width:25%;text-align:center;">快检结果</div>
                </div>
                <div class="r1_box">
                  <div v-for="(val,index) of shicaixinxiJson.records" :key="index">
                    <div style="width:25%;text-align:center;">{{val.food_id}}</div>
                    <div style="width:25%;text-align:center;">{{val.foodName}}</div>
                    <div
                      style="width:25%;text-align:center;"
                    >{{val.time | formatTime('yyyy-MM-dd')}}</div>
                    <div style="width:25%;text-align:center;">{{val.qualified}}</div>
                  </div>
                </div>
              </div>
              <div class="ye">
                <span>显示10项结果</span>
                <span>共{{shicaixinxiJson.total}}项</span>
                <span>当前{{shicaixinxiJson.current}}/{{shicaixinxiJson.pages}}页</span>

                <!-- <el-button type="primary" plain>上一页</el-button> -->
                <el-button
                  v-show="shicaixinxiJson.current>0&&shicaixinxiJson.current<2"
                  disabled
                  class="dis"
                  type="primary"
                  plain
                >上一页</el-button>
                <el-button
                  v-show="shicaixinxiJson.current>1"
                  type="primary"
                  @click="upPageshicai"
                  plain
                >上一页</el-button>

                <el-button
                  v-show="shicaixinxiJson.current<shicaixinxiJson.pages"
                  type="primary"
                  @click="nextPageshicai"
                  plain
                >下一页</el-button>
                <el-button
                  v-show="!(shicaixinxiJson.current<shicaixinxiJson.pages)"
                  disabled
                  class="dis"
                  type="primary"
                  plain
                >下一页</el-button>
              </div>
            </div>

            <div v-show="yuJing_active==='台账信息'" style="width:100%;float:left">
              <div style="width:100%; float:left; " class="taizhang">
                <div style="width:30%;float:left">
                  <div style="width:30%;float:left; text-align: center">
                    <span>留样记录</span>
                  </div>
                  <div
                    style="width:50%;float:left;padding-left: 0.3rem;cursor: pointer"
                    @click="showRecoedsDetail(1)"
                  >
                    <el-progress
                      :text-inside="true"
                      :stroke-width="18"
                      :percentage="parseInt(Number(taizhangxinxiJson.sampleRecord)*100)"
                    ></el-progress>
                  </div>
                </div>
                <div style="width:30%;float:left">
                  <div style="width:30%;float:left; text-align: center">
                    <span>陪餐记录</span>
                  </div>
                  <div
                    style="width:50%;float:left;padding-left: 0.3rem;cursor: pointer"
                    @click="showRecoedsDetail(2)"
                  >
                    <el-progress
                      :text-inside="true"
                      :stroke-width="18"
                      :percentage="parseInt((Number(taizhangxinxiJson.accompanyDinner)/Number(taizhangxinxiJson.meal))*100)"
                    ></el-progress>
                  </div>
                </div>

                <div style="width:30%;float:left">
                  <div style="width:30%;float:left; text-align: center">
                    <span>洗消记录</span>
                  </div>
                  <div
                    style="width:50%;float:left;padding-left: 0.3rem;cursor: pointer"
                    @click="showRecoedsDetail(3)"
                  >
                    <el-progress
                      :text-inside="true"
                      :stroke-width="18"
                      :percentage="parseInt((Number(taizhangxinxiJson.decontamination)/Number(taizhangxinxiJson.meal))*100)"
                    ></el-progress>
                  </div>
                </div>
              </div>
              <div style="width:100%; float:left; " class="taizhang">
                <div style="width:30%;float:left">
                  <div style="width:30%;float:left; text-align: center">
                    <span>厨余处理记录</span>
                  </div>
                  <div
                    style="width:50%;float:left;padding-left: 0.3rem;cursor: pointer"
                    @click="showRecoedsDetail(4)"
                  >
                    <el-progress
                      :text-inside="true"
                      :stroke-width="18"
                      :percentage="parseInt(Number(taizhangxinxiJson.kitwasteTreatment)*100)"
                    ></el-progress>
                  </div>
                </div>
              </div>
            </div>

            <div class="list_box" v-show="yuJing_active==='历史报警信息'">
              <div class="list" v-for="(val,index) of lishibaojingJson.records" :key="index">
                <div class="logo">
                  <!-- compared alarm：报警 early_warning：预警 -->
                  <!-- health_pic：健康证照片 food_pic：食材照片 permit_pic：许可证照片 bulicense_pic：营业执照照片 identity_pic:身份证照片 -->
                  <img
                    v-if="val.value==1"
                    class="img"
                    :src="val.bulicense_pic || 'http://shenning.oss-cn-beijing.aliyuncs.com/test333f6191-82d8-4e92-92e1-07df174aa7aa.png'"
                    alt
                  />
                  <img
                    v-else-if="val.value==2"
                    class="img"
                    :src="val.permit_pic || 'http://shenning.oss-cn-beijing.aliyuncs.com/test333f6191-82d8-4e92-92e1-07df174aa7aa.png'"
                    alt
                  />
                  <img
                    v-else-if="val.value==3"
                    class="img"
                    :src="val.health_pic || 'http://shenning.oss-cn-beijing.aliyuncs.com/test333f6191-82d8-4e92-92e1-07df174aa7aa.png'"
                    alt
                  />
                  <img
                    v-else-if="val.value==4"
                    class="img"
                    :src="val.identity_pic || 'http://shenning.oss-cn-beijing.aliyuncs.com/test333f6191-82d8-4e92-92e1-07df174aa7aa.png'"
                    alt
                  />
                  <img
                    v-else-if="val.value==4 && val.compared == 'early_warning'|| val.value==5  || val.value==6 ||val.value==7"
                    class="img"
                    :src="val.food_pic || 'http://shenning.oss-cn-beijing.aliyuncs.com/test333f6191-82d8-4e92-92e1-07df174aa7aa.png'"
                    alt
                  />

                  <div class="gongsi">
                    <p>{{val.tital || "暂无"}}</p>
                    <p>
                      {{val.type.substr(2)}}类别：
                      <span
                        v-if="val.type.substr(2) ==='预警'"
                        class="lan"
                      >{{val.type}}</span>
                      <span class="red" v-else>{{val.type}}</span>
                    </p>
                    <p>{{val.type.substr(2)}}内容：{{val.description}}</p>
                    <p>{{val.type.substr(2)}}时间：{{val.time}}</p>
                  </div>
                </div>
                <div
                  v-if="val.type==='食材预警'"
                  class="yujing_guanlian"
                  style="flex-direction: column;"
                >
                  <p>供应商：{{val.supplier}}</p>
                  <br />
                  <p>学校名称：{{val.schoolName}}</p>
                </div>
                <div v-else class="yujing_guanlian">
                  <div>
                    <p>{{val.type.substr(2)}}关联项：</p>
                  </div>
                  <div>
                    <p>{{val.label}}</p>
                  </div>
                </div>
                <div v-if="val.type==='食材预警'" class="xuexiao_guanlian" style="padding-top: 0.2rem">
                  <div>
                    <p>供应学校：</p>
                  </div>
                  <div>
                    <p>{{val.school.schName}}</p>
                  </div>
                </div>
                <div v-else class="xuexiao_guanlian" style>
                  <div>
                    <p>{{val.type.substr(2)}}学校：</p>
                  </div>
                  <div>
                    <p>{{val.school.schName}}</p>
                  </div>
                </div>
                <div class="xiangqing" @click="showXiangqing(val.id,val.type)">查看详情</div>
              </div>

              <div class="ye">
                <span>显示{{lishibaojingJson.size}}项结果</span>
                <span>共{{lishibaojingJson.total}}项</span>
                <span>当前{{lishibaojingJson.current}}/{{lishibaojingJson.pages}}页</span>

                <!-- <el-button type="primary" plain>上一页</el-button> -->
                <el-button
                  v-show="lishibaojingJson.current>1"
                  @click="upPagelishi"
                  type="primary"
                  plain
                >上一页</el-button>
                <el-button
                  v-show="lishibaojingJson.current<2"
                  disabled
                  class="dis"
                  type="primary"
                  plain
                >上一页</el-button>

                <el-button
                  v-show="lishibaojingJson.current<lishibaojingJson.pages"
                  @click="nextPagelishi"
                  type="primary"
                  plain
                >下一页</el-button>
                <el-button
                  v-show="!(lishibaojingJson.current<lishibaojingJson.pages)"
                  disabled
                  class="dis"
                  type="primary"
                  plain
                >下一页</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="zhezhao" v-show="isZhezhao" @click.self="isZhezhao = false">
      <div>
        <div class="guanbi" @click="isZhezhao = false">
          <i class="el-icon-close"></i>
        </div>
        <Detail :isShow="false"></Detail>
      </div>
    </div>

    <div
      class="video_wrap"
      :class="{hidden:isHidden}"
      style="display:none;"
      @click.self="hideVideo"
    >
      <div class="video_box" style="padding: .8rem .2rem;position:relative;">
        <div
          @click="hideVideo"
          style="cursor: pointer;position:absolute;right:0;top:0;width:.6rem;height:.6rem;background:#05173c;text-align: center;line-height: .6rem;font-size: 0.3rem;"
        >x</div>
        <div class="video">
          <div style="font-size:.24rem;padding: 0 0 .1rem .1rem;">校园直播</div>

          <video-player
            :class="{hidden:isHidden}"
            class="video-player vjs-custom-skin"
            style="height:100%;"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
          ></video-player>
        </div>
        <div class="video_list">
          <ul>
            <li @click="changeVideo(val.eqId)" v-for="(val,index) of zhiboliebiaoJson" :key="index">
              <img
                :src="val.imageUrl || 'http://shenning.oss-cn-beijing.aliyuncs.com/test333f6191-82d8-4e92-92e1-07df174aa7aa.png'"
                alt
              />
              <div class="title">{{val.eqarea || "暂无"}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      class="records-panel no_padding"
      v-show="recordsPanelIsShow"
      @click.self="recordsPanelIsShow = false"
    >
      <div
        style="margin-bottom:.2rem;display:flex;justify-content: flex-end;float: left; width: 100%;box-sizing:border-box;padding:.2rem;"
      >
        <el-date-picker
          v-model="jiluval.jilu_date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button @click="jilusee()" type="primary">查看</el-button>
        <el-button type="primary" @click="jiluseeall">全部记录</el-button>

        <i
          class="el-icon-close"
          @click.self="recordsPanelIsShow = false"
          style="float: right;font-size: 0.24rem;margin-left: 0.5rem;padding-top: 0.1rem; cursor: pointer"
        ></i>
      </div>

      <!-- 留样 -->
      <div class="pad" v-show="tzActive == 1">
        <el-table
          :data="lylistJson.records"
          style="width: 100%"
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="srNumber" label="留样编号"></el-table-column>
          <el-table-column prop="rdDate" label="食谱日期"></el-table-column>
          <el-table-column prop="isSampleZ" label="留样状态"></el-table-column>
          <el-table-column prop="schoolName" label="学校名称"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <div class="xiangqing" @click="handleEdit(scope.row)">查看详情</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="ye">
          <span>显示{{lylistJson.size}}项结果</span>
          <span>共{{lylistJson.total}}项</span>
          <span>当前{{lylistJson.current}}/{{lylistJson.pages}}页</span>
          <el-button v-show="lylistJson.current>1" @click="upPagejilu" type="primary" plain>上一页</el-button>
          <el-button v-show="lylistJson.current<2" disabled class="dis" type="primary" plain>上一页</el-button>
          <el-button
            v-show="lylistJson.current<lylistJson.pages"
            @click="nextPagejilu"
            type="primary"
            plain
          >下一页</el-button>
          <el-button
            v-show="!(lylistJson.current<lylistJson.pages)"
            disabled
            class="dis"
            type="primary"
            plain
          >下一页</el-button>
        </div>
      </div>
      <!-- 陪餐 -->
      <div class="pad" v-show="tzActive == 2">
        <el-table
          :data="pclistJson.records"
          style="width: 100%"
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="man" label="陪餐人员"></el-table-column>
          <el-table-column prop="time" label="陪餐日期"></el-table-column>
          <el-table-column prop="label" label="用餐餐次"></el-table-column>
          <el-table-column prop="meals" label="陪餐情况"></el-table-column>
          <el-table-column prop="happening" label="是否存在问题"></el-table-column>
          <el-table-column prop="sch_name" label="学校名称"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <div class="xiangqing" @click="handleEdit(scope.row)">查看详情</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="ye">
          <span>显示{{pclistJson.size}}项结果</span>
          <span>共{{pclistJson.total}}项</span>
          <span>当前{{pclistJson.current}}/{{pclistJson.pages}}页</span>
          <el-button v-show="pclistJson.current>1" @click="upPagejilu" type="primary" plain>上一页</el-button>
          <el-button v-show="pclistJson.current<2" disabled class="dis" type="primary" plain>上一页</el-button>
          <el-button
            v-show="pclistJson.current<pclistJson.pages"
            @click="nextPagejilu"
            type="primary"
            plain
          >下一页</el-button>
          <el-button
            v-show="!(pclistJson.current<pclistJson.pages)"
            disabled
            class="dis"
            type="primary"
            plain
          >下一页</el-button>
        </div>
      </div>
      <!-- 洗消 -->
      <div class="pad" v-show="tzActive == 3">
        <el-table
          :data="xxlistJson.records"
          style="width: 100%"
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="date" label="消毒日期"></el-table-column>
          <el-table-column prop="start" label="开始时间"></el-table-column>
          <el-table-column prop="end" label="结束时间"></el-table-column>
          <el-table-column prop="dislength" label="消毒时长(分钟)"></el-table-column>
          <el-table-column prop="sch_name" label="学校名称"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <div class="xiangqing" @click="handleEdit(scope.row)">查看详情</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="ye">
          <span>显示{{xxlistJson.size}}项结果</span>
          <span>共{{xxlistJson.total}}项</span>
          <span>当前{{xxlistJson.current}}/{{xxlistJson.pages}}页</span>
          <el-button v-show="xxlistJson.current>1" @click="upPagejilu" type="primary" plain>上一页</el-button>
          <el-button v-show="xxlistJson.current<2" disabled class="dis" type="primary" plain>上一页</el-button>
          <el-button
            v-show="xxlistJson.current<xxlistJson.pages"
            @click="nextPagejilu"
            type="primary"
            plain
          >下一页</el-button>
          <el-button
            v-show="!(xxlistJson.current<xxlistJson.pages)"
            disabled
            class="dis"
            type="primary"
            plain
          >下一页</el-button>
        </div>
      </div>
      <!-- 厨余 -->
      <div class="pad" v-show="tzActive == 4">
        <el-table
          :data="cylistJson.records"
          style="width: 100%"
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="time" label="收运时间"></el-table-column>
          <el-table-column prop="man" label="处理人"></el-table-column>
          <el-table-column prop="label" label="回收类别"></el-table-column>
          <el-table-column prop="unit" label="处置单位"></el-table-column>
          <el-table-column prop="number" label="收运车辆号"></el-table-column>
          <el-table-column prop="person" label="收运人"></el-table-column>
          <el-table-column prop="sch_name" label="学校名称"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <div class="xiangqing" @click="handleEdit(scope.row)">查看详情</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="ye">
          <span>显示{{cylistJson.size}}项结果</span>
          <span>共{{cylistJson.total}}项</span>
          <span>当前{{cylistJson.current}}/{{cylistJson.pages}}页</span>
          <el-button v-show="cylistJson.current>1" @click="upPagejilu" type="primary" plain>上一页</el-button>
          <el-button v-show="cylistJson.current<2" disabled class="dis" type="primary" plain>上一页</el-button>
          <el-button
            v-show="cylistJson.current<cylistJson.pages"
            @click="nextPagejilu"
            type="primary"
            plain
          >下一页</el-button>
          <el-button
            v-show="!(cylistJson.current<cylistJson.pages)"
            disabled
            class="dis"
            type="primary"
            plain
          >下一页</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="详情" :visible.sync="dialogVisible" width="40%">
      <!-- 留样 -->
      <div v-show="tzActive == 1">
        <el-row>
          <el-col :span="12">
            <span>留样编号:</span>
            <span>LY201912261</span>
          </el-col>
          <el-col :span="12">
            <span>食谱日期:</span>
            <span>2019-12-26</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>留样时间:</span>
            <span>2019-11-11</span>
          </el-col>
          <el-col :span="12">
            <span>留样人:</span>
            <span>东方</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>处理时间:</span>
            <span>2019-11-11</span>
          </el-col>
          <el-col :span="12">
            <span>处理人:</span>
            <span>李地方</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>食谱餐次:</span>
            <span>LY201912261</span>
          </el-col>
          <el-col :span="12">
            <span>重量:</span>
            <span>12kg</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>储存方法及温度:</span>
            <span>20°</span>
          </el-col>
          <el-col :span="12">
            <span>审核人:</span>
            <span>张三</span>
          </el-col>
        </el-row>
        <el-row>
          <img
            src="https://img.jjkaifa.com/uploads1/allimg/191206/073ee46c76a9c17e.png"
            style="width:100%;"
            alt
          />
        </el-row>
      </div>
      <!-- 陪餐 -->
      <div v-show="tzActive == 2">
        <el-row>
          <el-col :span="12">
            <span>陪餐人员:</span>
            <span>{{jiluxiangqingJson.ad_person || "暂无"}}</span>
          </el-col>
          <el-col :span="12">
            <span>陪餐日期:</span>
            <span>{{jiluxiangqingJson.ad_time || "暂无"}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>用餐餐次:</span>
            <span v-show="jiluxiangqingJson.parameter ==1">早餐</span>
            <span v-show="jiluxiangqingJson.parameter ==2">上午加餐</span>
            <span v-show="jiluxiangqingJson.parameter ==3">午餐</span>
            <span v-show="jiluxiangqingJson.parameter ==4">下午加餐</span>
            <span v-show="jiluxiangqingJson.parameter ==5">晚餐</span>
          </el-col>
          <el-col :span="12">
            <span>陪餐情况:</span>
            <span v-show="jiluxiangqingJson.ad_ams == '1'">差</span>
            <span v-show="jiluxiangqingJson.ad_ams == '2'">一般</span>
            <span v-show="jiluxiangqingJson.ad_ams == '3'">满意</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>是否存在问题:</span>
            <span v-show="jiluxiangqingJson.ad_isproblem == '1'">不存在</span>
          </el-col>
          <el-col :span="12" v-show="jiluxiangqingJson.ad_isproblem == '2'">
            <span>备注信息:</span>
            <span>{{jiluxiangqingJson.remarks || "暂无"}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span>陪餐实照</span>
          </el-col>
          <img
            v-for="(val,index) of jiluxiangqingJson.ad_pic"
            :key="index"
            :src="val"
            style="width:100%;"
            alt
          />
          <span v-show="!jiluxiangqingJson.ad_pic">暂无</span>
        </el-row>
      </div>
      <!-- 洗消 -->
      <div v-show="tzActive == 3">
        <el-row>
          <el-col :span="12">
            <span>消毒日期:</span>
            <span>{{jiluxiangqingJson.dn_date}}</span>
          </el-col>
          <el-col :span="12">
            <span>餐次:</span>
            <span v-show="jiluxiangqingJson.meal_time ==1">早餐</span>
            <span v-show="jiluxiangqingJson.meal_time ==2">上午加餐</span>
            <span v-show="jiluxiangqingJson.meal_time ==3">午餐</span>
            <span v-show="jiluxiangqingJson.meal_time ==4">下午加餐</span>
            <span v-show="jiluxiangqingJson.meal_time ==5">晚餐</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>洗消列表:</span>
            <span>{{jiluxiangqingJson.dn_name}}</span>
          </el-col>
          <el-col :span="12">
            <span>陪餐情况:</span>
            <span>满意</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>是否存在问题:</span>
            <span>是</span>
          </el-col>
          <el-col :span="12">
            <span>备注信息:</span>
            <span>菜炒的有点辣</span>
          </el-col>
        </el-row>
        <el-row>
          <img
            src="https://img.jjkaifa.com/uploads1/allimg/191206/073ee46c76a9c17e.png"
            style="width:100%;"
            alt
          />
        </el-row>
      </div>
      <!-- 厨余 -->
      <div v-show="tzActive == 4">
        <el-row>
          <el-col :span="12">
            <span>收运时间:</span>
            <span>{{jiluxiangqingJson.recover_time || "暂无"}}</span>
          </el-col>
          <el-col :span="12">
            <span>产生量:</span>
            <span>{{jiluxiangqingJson.yield || "暂无"}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>处理人:</span>
            <span>{{jiluxiangqingJson.disposer || "暂无"}}</span>
          </el-col>
          <el-col :span="12">
            <span>回收类别:</span>
            <span v-show="jiluxiangqingJson.rec_category=='1'">厨余垃圾</span>
            <span v-show="jiluxiangqingJson.rec_category=='2'">废弃油脂</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>收运量:</span>
            <span>{{jiluxiangqingJson.shipping_volume || "暂无"}}</span>
          </el-col>
          <el-col :span="12">
            <span>处理单位:</span>
            <span>{{jiluxiangqingJson.disposal_unit || "暂无"}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>收运车辆号:</span>
            <span>{{jiluxiangqingJson.car_number || "暂无"}}</span>
          </el-col>
          <el-col :span="12">
            <span>收运人:</span>
            <span>{{jiluxiangqingJson.kt_person || "暂无"}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span>备注信息:</span>
            <span>{{jiluxiangqingJson.remarks || "暂无"}}</span>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Detail from "@/components/schoolDetails/GYSDetails";
import {
  zhiboliebiao,
  zhiboliu,
  gongyingshangshu,
  gongyingshang,
  zizhixinxi,
  xuexiaoxinxi,
  renyuanxinxi,
  shebeixinxi,
  shicaixinxi,
  taizhangxinxi,
  lishibaojing,
  jilulist,
  jiluxiangqing
} from "@/api/xuexiaoxiangqing";
import { log } from "util";
import { mapState, mapMutations } from "vuex";
export default {
  name: "positioning",
  data() {
    return {
      dialogVisible: false,
      tzActive: 1,
      jiluxiangqingJson: {
        update_id: null,
        del_flag: "0",
        shipping_volume: null,
        create_time: "2019-11-10 17:25:38",
        disposal_unit: "叙永县厨余垃圾回收站",
        rec_category: "1",
        recover_time: "2019-11-11 21:00:00",
        disposer: "李贺",
        updateName: null,
        kt_pic:
          "http://shenning.oss-cn-beijing.aliyuncs.com/test3f9d917a-f28d-447f-8593-969fba5f97f4.png",
        update_time: "2019-11-11 14:56:51",
        school_id: 1,
        create_id: null,
        kt_num: "8",
        contact: "13687903568",
        car_number: "京A85001",
        yield: null,
        id: 1,
        schoolName: "叙永县城西实验中学",
        labelName: "厨余垃圾",
        kt_person: "张培",
        remarks: "",
        createName: null
      },
      cylistJson: {
        records: [],
        total: 4,
        size: 10,
        current: 1,
        searchCount: true,
        pages: 1
      },

      xxlistJson: {
        records: [],
        total: 2,
        size: 10,
        current: 1,
        searchCount: true,
        pages: 1
      },

      lylistJson: {
        records: [],
        total: 4,
        size: 10,
        current: 1,
        searchCount: true,
        pages: 1
      },

      pclistJson: {
        records: [],
        total: 6,
        size: 10,
        current: 1,
        searchCount: true,
        pages: 1
      },
      jiluval: {
        page: 1,
        size: 10,
        jilu_date: ""
      },
      lishival: {
        page: 1,
        size: 5
      },
      shicaival: {
        page: 1,
        size: 10,
        startingTime: null,
        endTime: null
      },
      //历史报警信息
      lishibaojingJson: {
        records: [
          {
            health_pic: null,
            description: "食材快检报告未上传",
            food_pic:
              "http://shenning.oss-cn-beijing.aliyuncs.com/test7717c152-57a4-400f-9222-30232b0a52c7.png",
            label: "食材快检报告未上传报告",
            type: "食材报警",
            permit_pic:
              "http://shenning.oss-cn-beijing.aliyuncs.com/testafe36fa8-0da9-4279-9bb0-cccb9c80337e.jpg",
            bulicense_pic:
              "http://shenning.oss-cn-beijing.aliyuncs.com/test40e100ba-e888-4a8c-86de-f0385cb05cee.jpg",
            school: {
              schName: "无",
              id: 0
            },
            supplier: "供应商A",
            schoolId: 1,
            alarm: "7",
            time: "2019-12-10 17:32:59",
            identity_pic: null,
            id: 8,
            schoolName: "叙永县城西实验中学",
            value: "7",
            tital: "牛肉"
          },
          {
            health_pic: null,
            description: "营业执照过期",
            food_pic: null,
            label: "营业执照报警",
            type: "证照报警",
            permit_pic: null,
            bulicense_pic: null,
            school: {
              schName: "叙永县城西实验中学",
              id: 1
            },
            supplier: "供应商A",
            schoolId: 1,
            alarm: "1",
            time: "2019-11-10 17:32:59",
            identity_pic: null,
            id: 4,
            schoolName: "叙永县城西实验中学",
            value: "1",
            tital: "营业执照"
          },
          {
            health_pic: null,
            description: "健康证过期",
            food_pic: null,
            label: "健康证报警",
            type: "人员报警",
            permit_pic:
              "http://shenning.oss-cn-beijing.aliyuncs.com/testafe36fa8-0da9-4279-9bb0-cccb9c80337e.jpg",
            bulicense_pic:
              "http://shenning.oss-cn-beijing.aliyuncs.com/test40e100ba-e888-4a8c-86de-f0385cb05cee.jpg",
            school: {
              schName: "叙永县城西实验中学",
              id: 1
            },
            supplier: "供应商A",
            schoolId: 1,
            alarm: "3",
            time: "2019-11-10 17:32:59",
            identity_pic: null,
            id: 1,
            schoolName: "叙永县城西实验中学",
            value: "3",
            tital: "和撒"
          },
          {
            health_pic: null,
            description: "健康证过期",
            food_pic: null,
            label: "健康证报警",
            type: "人员报警",
            permit_pic: null,
            bulicense_pic: null,
            school: {
              schName: "叙永县城西实验中学",
              id: 1
            },
            supplier: "供应商A",
            schoolId: 1,
            alarm: "3",
            time: "2019-11-10 17:32:59",
            identity_pic: null,
            id: 2,
            schoolName: "叙永县城西实验中学",
            value: "3",
            tital: null
          },
          {
            health_pic: null,
            description: "健康证过期",
            food_pic: null,
            label: "健康证报警",
            type: "人员报警",
            permit_pic: null,
            bulicense_pic: null,
            school: {
              schName: "叙永县城西实验中学",
              id: 1
            },
            supplier: "供应商A",
            schoolId: 1,
            alarm: "3",
            time: "2019-10-10 17:32:59",
            identity_pic: null,
            id: 3,
            schoolName: "叙永县城西实验中学",
            value: "3",
            tital: null
          },
          {
            health_pic: null,
            description: "采购时未上传索证索票",
            food_pic:
              "http://shenning.oss-cn-beijing.aliyuncs.com/test3e01f7a7-567f-4502-ae2c-89be965e2dac.jpg",
            label: "采购时未上传索证索票",
            type: "食材预警",
            permit_pic:
              "http://shenning.oss-cn-beijing.aliyuncs.com/testafe36fa8-0da9-4279-9bb0-cccb9c80337e.jpg",
            bulicense_pic:
              "http://shenning.oss-cn-beijing.aliyuncs.com/test40e100ba-e888-4a8c-86de-f0385cb05cee.jpg",
            school: {
              schName: "测试",
              id: 2
            },
            supplier: "叙永县供应商b",
            schoolId: 1,
            alarm: "4",
            time: "2019-11-10 17:32:50",
            identity_pic: null,
            id: 8,
            schoolName: "test",
            value: "4",
            tital: "2019-11-25"
          },
          {
            health_pic: null,
            description: "营业执照即将过期",
            food_pic: null,
            label: "营业执照即将过期",
            type: "证照预警",
            permit_pic:
              "http://shenning.oss-cn-beijing.aliyuncs.com/testafe36fa8-0da9-4279-9bb0-cccb9c80337e.jpg",
            bulicense_pic:
              "http://shenning.oss-cn-beijing.aliyuncs.com/test40e100ba-e888-4a8c-86de-f0385cb05cee.jpg",
            school: {
              schName: "叙永县城西实验中学",
              id: 1
            },
            supplier: "叙永县供应商A",
            schoolId: 1,
            alarm: "1",
            time: "2019-11-10 17:32:50",
            identity_pic: null,
            id: 1,
            schoolName: "叙永县城西实验中学",
            value: "1",
            tital: "营业执照"
          },
          {
            health_pic: null,
            description: "许可证即将过期",
            food_pic: null,
            label: "许可证即将过期",
            type: "证照预警",
            permit_pic:
              "http://shenning.oss-cn-beijing.aliyuncs.com/testafe36fa8-0da9-4279-9bb0-cccb9c80337e.jpg",
            bulicense_pic:
              "http://shenning.oss-cn-beijing.aliyuncs.com/test40e100ba-e888-4a8c-86de-f0385cb05cee.jpg",
            school: {
              schName: "叙永县城西实验中学",
              id: 1
            },
            supplier: "叙永县供应商A",
            schoolId: 1,
            alarm: "2",
            time: "2019-11-10 17:32:50",
            identity_pic: null,
            id: 2,
            schoolName: "叙永县城西实验中学",
            value: "2",
            tital: "许可证"
          },
          {
            health_pic: null,
            description: "许可证即将过期",
            food_pic: null,
            label: "许可证即将过期",
            type: "证照预警",
            permit_pic:
              "http://shenning.oss-cn-beijing.aliyuncs.com/testb05e02a6-49f5-479b-ada0-2555c2e0d97b.jpg",
            bulicense_pic:
              "http://shenning.oss-cn-beijing.aliyuncs.com/testdd3fb457-3133-4d47-ae6b-a92da3f18e2d.jpg",
            school: {
              schName: "叙永县城西实验中学",
              id: 1
            },
            supplier: "叙永县供应商b",
            schoolId: 1,
            alarm: "2",
            time: "2019-11-10 17:32:50",
            identity_pic: null,
            id: 4,
            schoolName: "test",
            value: "2",
            tital: "许可证"
          },
          {
            health_pic: null,
            description: "健康证即将过期",
            food_pic: null,
            label: "健康证即将过期",
            type: "人员预警",
            permit_pic:
              "http://shenning.oss-cn-beijing.aliyuncs.com/testafe36fa8-0da9-4279-9bb0-cccb9c80337e.jpg",
            bulicense_pic:
              "http://shenning.oss-cn-beijing.aliyuncs.com/test40e100ba-e888-4a8c-86de-f0385cb05cee.jpg",
            school: {
              schName: "叙永县城西实验中学",
              id: 1
            },
            supplier: "叙永县供应商b",
            schoolId: 1,
            alarm: "3",
            time: "2019-11-10 17:32:50",
            identity_pic: null,
            id: 6,
            schoolName: "test",
            value: "3",
            tital: ""
          }
        ],
        total: 10,
        size: 10,
        current: 1,
        searchCount: true,
        pages: 1
      },
      //食材信息
      shicaixinxiJson: [
        {
          qualified: "合格",
          foodName: "韭菜",
          time: "2019-11-22 00:00:00",
          food_id: "18"
        }
      ],
      //台账信息
      taizhangxinxiJson: {
        meal: 3,
        sampleRecord: 1,
        decontamination: 1,
        kitwasteTreatment: 1,
        accompanyDinner: 1
      },
      //设备信息
      shebeixinxiJson: {
        eqOperationRatio: {
          eqWell: 1,
          total: 5,
          eqRatio: 1
        },
        deviceInformation: [
          {
            use_year: "5",
            label: "消毒柜",
            brand: "美的",
            start_date: "2017-01-22",
            restaurant_name: "A餐厅"
          }
        ]
      },
      //人员信息
      renyuanxinxiJson: {
        morningCheck: {
          total: 6,
          eqRatio: 0.17
        },
        manNumber: [
          {
            number: 2,
            label: "厨师"
          },
          {
            number: 1,
            label: "食品安全管理员"
          },
          {
            number: 1,
            label: "陪餐人员"
          },
          {
            number: 1,
            label: "校长"
          },
          {
            number: 1,
            label: "超级管理员"
          }
        ],
        foodEscortInformation: [
          {
            realName: "张勇",
            healthNumber: "43554657676776",
            label: "陪餐人员",
            userId: 12
          }
        ],
        healthCheck: {
          healthCard: 4
        },
        foodSafetyInformation: [
          {
            realName: "张勇",
            healthNumber: "43554657676776",
            label: "食品安全管理员",
            userId: 22
          }
        ],
        chefInformation: [
          {
            realName: "张三",
            healthNumber: "464556456",
            label: "厨师",
            userId: 13
          }
        ]
      }, //资质信息
      zizhixinxiJson: {
        principal: "策校长",
        area: "510104",
        address: "四川省泸州市叙永县G321(广成线)",
        sch_name: "叙永县城西实验中学",
        quantitative: "A",
        reg_name: "泸州市叙永县市场监管局",
        tel: "0830－6800552",
        edu_name: "泸州市叙永县教育局",
        ratingScore: 100
      }, //学校信息
      xuexiaoxinxiJson: {
        warningNumber: {
          warningNumber: 100
        },
        alarmNumber: {
          alarmNumber: 100
        },
        schoolInformation: {
          schArea: "四川省成都市锦江区",
          schAddress: "四川省泸州市叙永县G321(广成线)",
          officeNature: "民办",
          schoolType: "小学",
          id: 1,
          schoolName: "叙永县城西实验中学abc"
        }
      },
      //供应商信息
      gongyingshangJson: {
        license: {
          LicenseTotal: 3
        },
        total: {
          Total: 3
        },
        supplierInformation: [
          {
            school: {
              schName: "叙永县城西实验中学",
              id: 1
            },
            name: "叙永县供应商A",
            id: 1,
            license_number: "123123123"
          }
        ],
        open: {
          OpenTotal: 3
        }
      },
      gongyingshangLength: 3,
      chufangLength: 3,
      peicanLength: 3,
      shipinLength: 3,
      zhiboliebiaoJson: [],
      playerOptions: {
        // height: "500",
        sources: [
          {
            type: "rtmp/mp4",
            src: ""
          }
        ],
        techOrder: ["flash"],
        autoplay: true,
        controls: true,
        // preload: 'auto', // 视频预加载
        notSupportedMessage: "此视频暂无法播放，请切换视频",
        poster:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572970305962&di=acd0edc70f15012acd5078e46d7a8e33&imgtype=0&src=http%3A%2F%2Fimg01.cztv.com%2F201903%2F22%2Ff27ad9f1c0c7819a885a7190b96d726c.jpg"
      },
      shicai_date: "",

      activeArr: [
        {
          title: "辣椒",
          img:
            "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=36d68c68d339b6004dce08b1d16b5217/962bd40735fae6cd589124ea09b30f2442a70f17.jpg",
          type: "食材预警"
        },
        { title: "营业执照", img: "/static/zhengzhao.jpg", type: "证照报警" },
        { title: "苦瓜", img: "/static/shicai.jpg", type: "食材报警" },
        {
          title: "苦瓜",
          img:
            "https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=939629403af33a879e6d071cfe677705/34fae6cd7b899e51491c906442a7d933c8950d2b.jpg",
          type: "食材报警"
        },
        {
          title: "丁方/食品安全员",
          img:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1112845355,3446301139&fm=26&gp=0.jpg",
          type: "证照预警"
        },
        {
          title: "秦超/切菜师",
          img:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534390145,2107709878&fm=26&gp=0.jpg",
          type: "证照预警"
        },
        {
          title: "茄子",
          img:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1536952701,2166650769&fm=26&gp=0.jpg",
          type: "食材预警"
        },
        {
          title: "西红柿",
          img:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4050908148,177600855&fm=26&gp=0.jpg",
          type: "食物预警"
        },
        { title: "苦瓜", img: "/static/shicai.jpg", type: "食材预警" },
        {
          title: "健康证",
          img: "/static/jiankangzhewng.jpg",
          type: "人员预警"
        },
        {
          title: "辣椒",
          img:
            "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=36d68c68d339b6004dce08b1d16b5217/962bd40735fae6cd589124ea09b30f2442a70f17.jpg",
          type: "食材预警"
        }
      ],
      shicai_img: "/static/shicai.jpg",
      title: "营业执照",
      isZhezhao: false,
      recordsPanelIsShow: false,
      yuJing_active: "资质信息",
      isHidden: true,
      videoSrc: "rtmp://58.200.131.2:1935/livetv/hunantv",
      schoolId: 1
    };
  },
  components: {
    Detail
  },
  watch: {
    shicai_date() {
      this.shicaival.startingTime = this.shicai_date[0];
      this.shicaival.endTime = this.shicai_date[1];
      // console.log(this.shicaival);
    }
  },
  methods: {
    ...mapMutations(["SETTYPE", "CHANGE_TIME_NUMBER"]),
    jiluseeall() {
      jiluval.jilu_date = "";
      jiluval.page = 1;
      getjilulist();
    },
    getjilulist() {
      jilulist({
        page: this.jiluval.page,
        size: this.jiluval.size,
        schoolId: this.schoolId,
        time: this.jiluval.jilu_date,
        isWho: this.tzActive
      }).then(res => {
        if (this.tzActive === 1) {
          this.lylistJson = res.data.data.data;
          // console.log(res.data.data.data);
        } else if (this.tzActive === 2) {
          this.pclistJson = res.data.data.data;
        } else if (this.tzActive === 3) {
          this.xxlistJson = res.data.data.data;
        } else if (this.tzActive === 4) {
          this.cylistJson = res.data.data.data;
        }
      });
    },
    jilusee() {
      this.jiluval.page = 1;
      this.getjilulist();
    },
    upPagejilu() {
      this.jiluval.page--;
      this.getjilulist();
    },
    nextPagejilu() {
      this.jiluval.page++;
      this.getjilulist();
    },
    handleEdit(e) {
      this.getjiluxiangqing(e);
      this.dialogVisible = true;
    },
    getjiluxiangqing(e) {
      jiluxiangqing({
        ledgerId: e.id,
        schoolId: this.schoolId,
        isWho: e.isWho
      }).then(res => {
        console.log(res.data.data);
        if (res.data.data.data.length > 0) {
          if (this.tzActive === 2) {
            this.jiluxiangqingJson = res.data.data.data[0];
            console.log(this.jiluxiangqingJson.ad_pic);

            if (this.jiluxiangqingJson.ad_pic) {
              if (this.jiluxiangqingJson.ad_pic.indexOf != -1) {
                this.jiluxiangqingJson.ad_pic = this.jiluxiangqingJson.ad_pic.split(
                  ","
                );
              } else {
                this.jiluxiangqingJson.ad_pic = [this.jiluxiangqingJson.ad_pic];
              }
            }
          } else if (this.tzActive === 4) {
            this.jiluxiangqingJson = res.data.data.data[0];
          }
        }
      });
    },
    //设置表格行的样式
    tableRowStyle({ row, rowIndex }) {
      if (rowIndex % 2) {
        return "background-color:#0a194bbb;color:#fff;border:none;";
      } else {
        return "background-color:#06133c50;color:#fff;border:none;";
      }
      // #132c7cfb
    },
    //设置表头行的样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return "background-color:#133073;color:#fff;";
    },
    showXiangqing(id, type) {
      this.CHANGE_TIME_NUMBER();
      this.SETTYPE(type.substr(0, 2));
      localStorage.setItem("lishixiangqingtype", type.substr(0, 2));
      localStorage.setItem("lishixiangqingid", id);
      localStorage.setItem("lishixiangqingjing", type.substr(2));
      this.isZhezhao = true;
    },
    clear() {
      this.shicaival.startingTime = null;
      this.shicaival.endTime = null;
      this.shicai_date = [];
    },
    see() {
      this.shicaival.page = 1;
      this.getshicaixinxi();
    },
    nextPageshicai() {
      this.shicaival.page++;
      this.getshicaixinxi();
    },
    upPageshicai() {
      this.shicaival.page--;
      this.getshicaixinxi();
    },
    nextPagelishi() {
      this.lishival.page++;
      this.getlishibaojing();
    },
    upPagelishi() {
      this.lishival.page--;
      this.getlishibaojing();
    },
    gongyingshangMore() {
      if (this.gongyingshangLength === 3) {
        this.gongyingshangLength = 99;
      } else {
        this.gongyingshangLength = 3;
      }
    },
    chufangMore() {
      if (this.chufangLength === 3) {
        this.chufangLength = 99;
      } else {
        this.chufangLength = 3;
      }
    },
    peicanMore() {
      if (this.peicanLength === 3) {
        this.peicanLength = 99;
      } else {
        this.peicanLength = 3;
      }
    },
    shipinMore() {
      if (this.shipinLength === 3) {
        this.shipinLength = 99;
      } else {
        this.shipinLength = 3;
      }
    },
    //历史报警
    getlishibaojing() {
      let date = new Date();
      let y = date.getFullYear();
      lishibaojing({
        schoolId: this.schoolId,
        year: y,
        page: this.lishival.page,
        size: this.lishival.size
      }).then(res => {
        // console.log("历史报警");
        // console.log(res.data);
        if (res.data.data) {
          this.lishibaojingJson = res.data.data.data;
        }
      });
    },
    //食材信息
    getshicaixinxi() {
      shicaixinxi({
        schoolId: this.schoolId,
        startingTime: this.shicaival.startingTime,
        endTime: this.shicaival.endTime,
        page: this.shicaival.page
      }).then(res => {
        // console.log("食材信息");
        // console.log(res.data.data.data);
        this.shicaixinxiJson = res.data.data.data;
      });
    }, //台账信息
    gettaizhangxinxi() {
      taizhangxinxi({ schoolId: this.schoolId }).then(res => {
        // console.log("台账");
        // console.log(res.data.data.data);

        this.taizhangxinxiJson = res.data.data.data;
        if (res.data.data.data.meal == "0") {
          this.taizhangxinxiJson.meal = 1;
        }
      });
    }, //设备信息
    getshebeixinxi() {
      shebeixinxi({ schoolId: this.schoolId }).then(res => {
        // console.log(res.data.data.data);
        this.shebeixinxiJson = res.data.data.data;
      });
    },
    //人员信息
    getrenyuanxinxi() {
      renyuanxinxi({ schoolId: this.schoolId }).then(res => {
        this.renyuanxinxiJson = res.data.data.data;
      });
    },
    //学校信息
    getxuexiaoxinxi() {
      xuexiaoxinxi({ schoolId: this.schoolId }).then(res => {
        this.xuexiaoxinxiJson = res.data.data.data;
        if (!this.xuexiaoxinxiJson.schoolInformation.pic) {
          this.xuexiaoxinxiJson.schoolInformation.pic =
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575433139634&di=b58e3b4e630cbd116f3842d9d38e4b84&imgtype=0&src=http%3A%2F%2Fwww.zjg12345.com%2Fzjg12345%2FZJG12345%2FPages%2FService%2FHomeService%2F%25E6%259A%2582%25E6%2597%25A0%25E5%259B%25BE%25E7%2589%2587.jpg";
        }
      });
    }, //供应商信息
    getgongyingshang() {
      gongyingshang({
        schoolId: this.schoolId
      }).then(res => {
        this.gongyingshangJson = res.data.data.data;
      });
    }, //直播
    getzhiboliebiao() {
      zhiboliebiao({ schoolId: this.schoolId }).then(res => {
        this.zhiboliebiaoJson = res.data.data;
        zhiboliu({ eqId: res.data.data[res.data.data.length - 1].eqId }).then(
          res => {
            // console.log(res.data.data);
            if (res.data.data.path) {
              this.$refs.videoPlayer.player.src(res.data.data.path);
              this.$refs.videoPlayer.player.load();
              document.querySelector(".video_wrap").style.display = "none";
            }
          }
        );
      });
    },
    rowClass({ row, rowIndex }) {
      // console.log(rowIndex); //表头行标号为0
      return "background:#6e72792a;color:#fff; font-size:16px; font-weight:normal";
    },
    hideVideo() {
      this.isHidden = true;
      document.querySelector(".vjs-control-bar").style.display = "none";
    },
    getYuJing(type) {
      // console.log(type);
      this.yuJing_active = type;
    },
    geshihua(row, column, ceLLValue) {
      return row.use_year + "年";
    },
    changeVideo(e) {
      zhiboliu({ eqId: e }).then(res => {
        // console.log(res.data.data.path);
        if (res.data.data.path) {
          this.$message("直播切换中请稍等");
          this.$refs.videoPlayer.player.src(res.data.data.path);
          this.$refs.videoPlayer.player.load();
        } else {
          this.$message("该直播本时段暂未开放");
        }
      });
    },
    back() {
      this.$router.go(-1);
    },
    to(uri) {
      this.$router.push(uri);
    },
    VideShow() {
      this.isHidden = false;
      document.querySelector(".video_wrap").style.display = "flex";

      try {
        document.querySelector(".vjs-control-bar").style.display = "flex";
      } catch {}
    },
    showRecoedsDetail(e) {
      this.tzActive = e;
      this.jiluval.page = 1;
      this.getjilulist();
      this.recordsPanelIsShow = true;
    },
    getzizhixinxi() {
      zizhixinxi({
        schoolId: this.schoolId
      }).then(res => {
        const json = res.data.data.data;
        // console.log("资质信息");
        // console.log(json);
        if (json) {
          this.zizhixinxiJson = json;
        }
      });
    }
  },
  filters: {
    formatTime: function(date, fmt) {
      var date = new Date(date);
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
      };
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          var str = o[k] + "";
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
          );
        }
      }
      return fmt;
    }
  },
  mounted() {
    this.getzhiboliebiao();
    this.getxuexiaoxinxi();
    this.getzizhixinxi();
    this.getgongyingshang();
    this.getrenyuanxinxi();
    this.getshebeixinxi();
    this.gettaizhangxinxi();
    this.getshicaixinxi();
    this.getlishibaojing();
  },
  created() {
    let id = localStorage.getItem("yichangId");

    // console.log("学校id");
    this.schoolId = id;
    if (!this.schoolId || this.schoolId === "null") {
      this.schoolId = 1;
    }
    // console.log(this.schoolId);
  }
};
</script>
<style lang="scss" scope>
@import "@/assets/css/public.scss";
.hidden {
  visibility: hidden;
}
.video-js {
  height: 100%;
}
.el-table__row {
  background-color: #1b1f2b;
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  /*background-color: #141722;*/
  background: none !important;
}
.shebei .el-table {
  background: none;
  th,
  td {
    text-align: center;
  }
}
#positioning .ye {
  margin-right: 0.2rem;
  height: 6em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > span {
    margin-left: 0.16rem;
  }
  button {
    margin-left: 0.16rem;
    padding: 0.1rem;
    border-color: #225ac3;
    background: none;
    &.dis {
      background: none;
      border-color: #90939985;
      color: #90939985;
    }
  }
}
.taizhang {
  box-sizing: border-box;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
}
.shebei .el-table .el-table__body tr:hover td {
  background: linear-gradient(0deg, #001251 4%, #001562 50%);
}
#positioning .shebei .el-table table tr:nth-of-type(odd) {
  /*background: #15217cbd !important;*/
  background: none !important;
}
#positioning .shebei .el-table table tr:nth-of-type(even) {
  /*background: linear-gradient(0deg, #1033b1a2 50%, #001562 98%) !important;*/
  background: #6e72792a !important;
}
.shicai input {
  background: rgb(25, 38, 79);
  color: white;
}
.shicai .el-range-separator {
  color: white !important;
}
#positioning {
  display: flex;
  font-size: 0.14rem;
  flex-direction: column;
  align-items: center;
  color: #bad3ff;
  padding-top: 0.5rem;
  .details,
  .all {
    color: #31c9f2;
  }
  .more {
    display: flex;
    justify-content: center;
    padding-top: 24px;
    span {
      &:hover {
        cursor: pointer;
      }
    }
  }
  .pointer {
    cursor: pointer;
  }
  .title {
    font-size: 0.22rem;
    line-height: 3em;
  }
  .border {
    border: 0.01rem solid #225ac3 !important;
    border-radius: 0.04rem;
    background: #0e20575d;
  }
  .lan {
    color: #0646dd;
  }
  .red {
    color: red;
  }
  @mixin border($width, $height) {
    width: $width;
    height: $height;
    border: 0.01rem solid #647082;
    border-radius: 0.06rem;
    box-sizing: border-box;
  }
  .ryxx .main {
    display: flex;
    // justify-content: space-between;
  }
  .gys .ellipsis {
    width: 2.5rem;
  }
  .main .r1 {
    height: 0.5rem;
    line-height: 0.5rem;
    background: rgba(110, 114, 121, 0.165);
    display: flex;
    justify-content: space-around;
    font-size: 0.16rem;
    height: 0.5rem;
    line-height: 0.5rem;
  }
  .r1_box {
    display: flex;
    flex-direction: column;
    overflow: auto;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 4px;
      -webkit-box-shadow: inset 0 0 5px #616e97; //40f1fd
      background: #616e97;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      // -webkit-box-shadow: inset 0 0 5px #2159c00c; //2158c0
      border-radius: 4px;
      // background: #ededed0c;
    }
    & > div {
      // padding: 0 0.2rem;
      display: flex;
      justify-content: space-between;
      height: 0.5rem;
      line-height: 0.5rem;
      &:nth-of-type(even) {
        background: #192752;
      }
      &.red {
        color: #d25d64;
      }
    }
  }
  .top {
    display: flex;
    flex-direction: column;
    width: 12rem;
    .row1 {
      display: flex;
      justify-content: space-between;
      .left {
        width: 7.12rem;
        display: flex;
        @extend .border;
        padding: 0.2rem;
        .img {
          width: 3.6rem;
          height: 2rem;
          border-radius: 0.04rem;
        }
        .btn {
          margin-top: 0.1rem;
          width: 1.2rem;
          padding: 0.05rem 0.1rem;
          background: #2758c2;
          color: white;
          text-align: center;
          border-radius: 4px;
          &:hover {
            cursor: pointer;
          }
        }
        .neirong {
          padding-left: 0.2rem;
          height: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .dazi {
            font-size: 0.22rem;
          }
          p {
            line-height: 2em;
            margin: 0;
          }
        }
      }
      .right {
        display: flex;
        @include border(4.4rem, 2rem);
        padding: 0.2rem;
        height: auto;
        @extend .border;
        & > div {
          // width: 50%;
          padding: 0.4rem;
          height: 2rem;
          display: flex;
          text-align: center;
          flex-direction: column;
          justify-content: center;
        }
        img {
          width: 0.6rem;
        }
        .shu {
          text-align: center;
          color: #2f7bff;
          .shu1 {
            line-height: 4em;
            font-size: 0.16rem;
            span {
              padding-right: 0.04rem;
              font-size: 0.36rem;
            }
            &.red {
              color: #ff7070;
            }
          }
        }
      }
    }
    .row2 {
      margin-top: 0.3rem;
      display: flex;
      justify-content: space-between;
      height: 6.4rem;
      .tip {
        font-size: 0.16rem;
      }
      .title {
        font-size: 0.22rem;
        line-height: 3em;
      }
      .left {
        width: 7.12rem;
        .box {
          @include border(100%, 6.2rem);
          padding: 0.2rem;
          line-height: 4em;
          @extend .border;
          .main {
            display: flex;
            justify-content: space-between;
            & > div {
              p {
                margin: 0;
                line-height: 2em;
              }
            }
          }
          .bottom {
            text-align: right;
            span {
              @extend .pointer;
            }
          }
        }
      }
      .right {
        width: 4.4rem;
        .title {
          text-align: center;
        }
        .main {
          @include border(100%, 6.2rem);
          display: flex;
          flex-direction: column;
          font-size: 0.16rem;
          overflow: hidden;
        }
      }
    }
    .row3 {
      margin-top: 0.8rem;
      .box {
        display: flex;
        padding: 0.2rem;
        flex-direction: column;
        @include border(100%, 1.8rem);
        @extend .border;
        .xu_more {
          line-height: 4em;
        }
        .item {
          .all {
            @extend .pointer;
          }
          p {
            margin: 0;
            line-height: 2em;
          }
          .bot {
            display: flex;
            .ellipsis {
              width: 1.6rem;
            }
          }
          .r1 {
            font-size: 0.18rem;
          }
        }
      }
    }
  }
  #yujing_baojing {
    width: 12rem;
    margin-top: 0.5rem;
    position: relative;
    .hui_zong {
      // width: 5.7rem;
      width: 9.7rem;

      .hui_zong_box {
        width: 2.6rem;
        height: 1rem;
        border: 0.01rem solid #727d8d;
        &.yujing_bg {
          background: #2c1138;
          border: 0.01rem solid #c0535e;
        }
        &.shipin_bg {
          background: #f5bf815b;
          border: 0.01rem solid #f5be81;
          color: #fff;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .huizong_box_active {
        border: none;
        background: #2757c1;
        color: #bad3ff;
      }
    }
    .yue {
      position: absolute;
      right: 0.1rem;
      top: 1.44rem;
      align-self: flex-end;
      background-image: linear-gradient(180deg, #227ee2 0%, #0646dd 100%);
      border-radius: 0.16rem;
      width: 1rem;
      height: 0.36rem;
      line-height: 0.36rem;
      text-align: center;
      color: white;
      .el-icon-arrow-down {
      }
    }
    #yujing_wrap {
      margin-top: 0.4rem;
      & > div {
        border-bottom: 0.01rem solid #647082;
      }
      .yujin_type {
        display: flex;
        // justify-content: space-between;
        font-size: 0.16rem;
        color: white;
        line-height: 3em;
        border-bottom: none;
        & > div {
          padding: 0 0.4rem;
          background: #1e2971;
          margin-right: 0.06rem;
          @extend .pointer;
          span {
            padding: 0.02rem 0.08rem;
            background: #2b6de6;
            border-radius: 0.14rem;
            margin-left: 0.05rem;
          }
        }
        .yujin_type_active {
          // border-bottom: 0.04rem solid #fff;
          background: #2758c2;
        }
      }
      .gs_lis {
        @extend .border;
        overflow: hidden;
        .list_box {
          &:nth-of-type(even) {
            background: #1c1550bd;
          }
          .list {
            color: $color_fff;
            display: flex;
            justify-content: space-between;
            padding: 0.2rem 0.2rem;
            align-items: center;

            & > div > div {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              font-size: 0.12rem;
            }
            p {
              margin: 0;
              line-height: 2em;
            }
            .logo {
              display: flex;
              .img {
                width: 1.8rem;
                height: 1.1rem;
                background: $bg_logo;
                margin-right: 0.2rem;
              }
              .gongsi {
                & > p:nth-of-type(1) {
                  font-size: $font_20;
                }
              }
            }
            .yujing_guanlian {
              display: flex;
              width: 1.9rem;
              & > div:first-of-type {
                width: 0.8rem;
              }
            }
            .xuexiao_guanlian {
              width: 2.7rem;
              display: flex;
              & > div:nth-of-type(1) {
                width: 0.9rem;
              }
              & > div:nth-of-type(2) {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
                width: 1.6rem;
              }
            }
            .xiangqing {
              padding: 0.1rem 0.38rem;
              border: 0.01rem solid #31c9f2;
              color: #31c9f2;
              border-radius: 0.04rem;
              @extend .pointer;
            }
          }
        }
      }
    }
    .yewei {
      display: flex;
      justify-content: space-between;
      margin: 0.2rem 0;
      .next {
        @include border(1rem, 0.35rem);
        text-align: center;
        line-height: 0.35rem;
        border-color: #31c9f2;
        @extend .pointer;
      }
    }
  }
  .zhezhao {
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #000210, $alpha: 0.7);
    .guanbi {
      position: absolute;
      top: 0;
      right: 0;
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.4rem;
      background: #092969;
      @extend .pointer;
    }
    & > div {
      position: relative;
      width: 10.8rem;
      height: 8rem;
      padding: 0.6rem;
      background-color: #001444;
      overflow: auto;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 5px #616e97; //40f1fd
        background: #616e97;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        // -webkit-box-shadow: inset 0 0 5px #2159c00c; //2158c0
        border-radius: 4px;
        // background: #ededed0c;
      }
    }
    .alertDetails {
      height: 100%;
    }
  }

  .video_wrap {
    position: fixed;
    top: 0;
    background: #00021098;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .video_box {
      width: 63%;
      height: 60%;
      display: flex;
      background: #092969;
      .video {
        width: 80%;
        height: 100%;
        video {
          width: 100%;
          height: 100%;
          background: #0f0f0f;
        }
      }
      .video_list {
        width: 20%;
        height: 100%;
        box-sizing: border-box;
        padding: 2% 0;
        ul {
          margin: 0;
          padding: 0;
          height: 100%;
          margin-top: 0.36rem;
          list-style: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-y: auto;
          /*滚动条样式*/
          &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
          }
          &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: rgba(0, 0, 0, 0.2);
          }
          &::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 0;
            background: rgba(0, 0, 0, 0.1);
          }
          li {
            width: 80%;
            height: 120px;
            display: flex;
            box-sizing: border-box;
            flex-direction: column;
            align-items: center;
            margin: 5px 0;
            @extend .hezi;
            border-color: #31c9f2;
            color: white;
            .title {
              height: 40px;
              line-height: 40px;
            }
            &:hover {
              background: rgba(47, 123, 255, 0.63);
              cursor: pointer;
              color: white;
            }
            img {
              width: 100%;
              height: 80px;
            }
          }
        }
      }
    }
  }
}
.el-progress-bar__outer {
  background-color: #6c86c1 !important;
}
.records-panel {
  padding: 0.2rem 0.2rem 0.5rem 0.2rem;
  background: #092969;
  position: absolute;
  width: 12rem;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &.no_padding {
    padding: 0;
    .el-row {
      line-height: 3em;
    }
  }
  .pad {
    padding: 0.2rem;
  }
}

.records-panel a {
  color: #ffffff;
}

#recordTableDiv {
  width: 100%;
  height: 6rem;
  overflow-x: hidden;
  overflow-y: auto;
}
.xiangqing {
  // padding: 0.1rem 0.38rem;
  padding: 0.04rem 0.08rem;
  text-align: center;
  border: 0.01rem solid #31c9f2;
  color: #31c9f2;
  border-radius: 0.04rem;
  @extend .pointer;
}
@media screen and (max-device-width: 1600px) {
  .score {
    width: 1.8rem !important;
    margin-top: 0.78rem !important;
  }

  #foodTj {
    width: 45% !important;
  }
  #foodTjP {
    width: 45% !important;
  }
  #foodAreaDiv {
    width: 45% !important;
  }
  #foodArea {
    width: 26% !important;
  }
  #foodAreaP {
    padding-left: 0.3rem !important;
  }
}
.el-table {
  background: none !important;
}
.el-table::before {
  height: 0 !important;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #132c7cfb !important;
}
.el-table th.is-leaf,
.el-table td {
  border: none !important;
}
.el-dialog {
  background: #092969 !important;
  span {
    color: #fff;
    line-height: 3em;
    padding-right:1em; 
  }
  // span:nth-of-type(2) {
  //   color: #9E9E9E;
  // }
}
</style>
