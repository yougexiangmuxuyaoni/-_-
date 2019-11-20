<template>
  <div id="positioning">
    <div class="top">
      <div class="row1" style>
        <div class="left" style="width:6rem;">
          <img class="img" src="@/assets/school1.jpg" alt />
          <div class="neirong">
            <div class="dazi">北京市海淀区人大附中</div>
            <p>所在区域：海淀区 中关村</p>
            <p>办学性质：公办学校</p>
            <p>类型：区直中学</p>
            <p>地址：北京市海淀区颐和园路12号</p>
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
                <span>36</span>条
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
                <span>15</span>条
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
                    <td>北京市海淀区人大附中</td>
                  </tr>
                  <tr>
                    <td>所属市场监管：</td>
                    <td>北京市海淀区市场监督管理局</td>
                  </tr>
                  <tr>
                    <td>所属教育监管：</td>
                    <td>北京市海淀区教育管理局</td>
                  </tr>
                  <tr>
                    <td>学校校长：</td>
                    <td>张全德</td>
                  </tr>
                  <tr>
                    <td>联系方式：</td>
                    <td>13684759020</td>
                  </tr>
                  <tr>
                    <td>学校地址：</td>
                    <td>北京市海淀区颐和园路12号</td>
                  </tr>
                </table>
              </div>
              <div style="width:40%;float:left; margin-top: 0.3rem">
                <div>
                  <el-progress
                    type="circle"
                    :percentage="100"
                    :show-text="false"
                    style="position: absolute;"
                  ></el-progress>
                  <div
                    class="score"
                    style="width: 126px;text-align: center;font-size: 0.24rem;font-weight: bold;color: #FFFFFF;padding-top: 50px;"
                  >
                    <span>100分</span>
                  </div>
                  <div
                    class="score"
                    style="width: 126px;text-align: center;font-size: 0.16rem;color: #FFFFFF;margin-top: 65px;"
                  >
                    <span>量化评级：A级</span>
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
                    >{{gongyingshangshuJson.zongshu}}</span>家
                  </span>
                </div>
                <div style="width: 40%; float: left">
                  <div style="width: 40%; float: left;font-size: 16px; padding-top: 5px">营业执照有效率：</div>
                  <div style="width: 50%; float: left; padding-top: 6px">
                    <el-progress
                      :text-inside="true"
                      :width="20"
                      :stroke-width="18"
                      :percentage="gongyingshangshuJson.yingyeshu"
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
                      :percentage="gongyingshangshuJson.xukeshu"
                      background="#ff9900"
                    ></el-progress>
                  </div>
                </div>
              </div>
              <div
                class="box"
                style="width:100%; float:left;padding: .3rem .2rem;box-sizing:border-box;"
              >
                <div class="flex justify_between">
                  <div class="item">
                    <p class="r1">红双喜粮油食品有限公司</p>
                    <p class>食品经营许可证：7343948394544</p>
                    <div class="bot">
                      <p class="ellipsis">同时供应：第二外国语小学，清华附中</p>
                      <p class="all">查看全部学校</p>
                    </div>
                  </div>

                  <div class="item">
                    <p class="r1">红双喜粮油食品有限公司</p>
                    <p class>食品经营许可证：7343948394544</p>
                    <div class="bot">
                      <p class="ellipsis">同时供应：第二外国语小学，清华附中</p>
                      <p class="all">查看全部学校</p>
                    </div>
                  </div>

                  <div class="item">
                    <p class="r1">红双喜粮油食品有限公司</p>
                    <p class>食品经营许可证：7343948394544</p>
                    <div class="bot">
                      <p class="ellipsis">同时供应：第二外国语小学，清华附中</p>
                      <p class="all">查看全部学校</p>
                    </div>
                  </div>
                </div>
                <div class="flex justify_between">
                  <div class="item">
                    <p class="r1">红双喜粮油食品有限公司</p>
                    <p class>食品经营许可证：7343948394544</p>
                    <div class="bot">
                      <p class="ellipsis">同时供应：第二外国语小学，清华附中</p>
                      <p class="all">查看全部学校</p>
                    </div>
                  </div>

                  <div class="item">
                    <p class="r1">红双喜粮油食品有限公司</p>
                    <p class>食品经营许可证：7343948394544</p>
                    <div class="bot">
                      <p class="ellipsis">同时供应：第二外国语小学，清华附中</p>
                      <p class="all">查看全部学校</p>
                    </div>
                  </div>

                  <div class="item">
                    <p class="r1">红双喜粮油食品有限公司</p>
                    <p class>食品经营许可证：7343948394544</p>
                    <div class="bot">
                      <p class="ellipsis">同时供应：第二外国语小学，清华附中</p>
                      <p class="all">查看全部学校</p>
                    </div>
                  </div>
                </div>
                <div class="flex more xu_more">
                  <span>
                    展开更多
                    <i class="el-icon-arrow-down"></i>
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
                    <span style="color:#31c9f2; font-size: 20px;padding-right: 5px">26</span>人
                  </span>
                </div>
                <div style="width: 40%; float: left">
                  <div style="width: 35%; float: left;font-size: 16px; padding-top: 5px">健康证有效率：</div>
                  <div style="width: 50%; float: left; padding-top: 6px">
                    <el-progress
                      :text-inside="true"
                      :width="20"
                      :stroke-width="18"
                      :percentage="100"
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
                      :percentage="80"
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
                    style="padding-left: 0.2rem; font-size: 16px; border-left: 3px solid #31c9f2"
                  >厨房人员（10人）</div>
                  <div class="main" style="padding:0.2rem">
                    <div>
                      <p>理想/厨师</p>
                      <p>健康证：563434387483</p>
                    </div>

                    <div>
                      <p>理想/厨师</p>
                      <p>健康证：563434387483</p>
                    </div>

                    <div>
                      <p>理想/厨师</p>
                      <p>健康证：563434387483</p>
                    </div>
                  </div>
                  <div class="bottom more">
                    <span>
                      展开更多
                      <i class="el-icon-arrow-down"></i>
                    </span>
                  </div>
                </div>
                <div class="flex column" style="margin-bottom: 0.3rem">
                  <div
                    class="tip"
                    style="padding-left: 0.2rem; font-size: 16px; border-left: 3px solid #31c9f2"
                  >食品安全员（3人）</div>
                  <div class="main" style="padding:0.2rem">
                    <div>
                      <p>理想/食品安全员</p>
                      <p>健康证：563434387483</p>
                    </div>

                    <div>
                      <p>理想/食品安全员</p>
                      <p>健康证：563434387483</p>
                    </div>

                    <div>
                      <p>理想/食品安全员</p>
                      <p>健康证：563434387483</p>
                    </div>
                  </div>
                </div>
                <div class="flex column" style="margin-bottom: 0.3rem">
                  <div
                    class="tip"
                    style="padding-left: 0.2rem; font-size: 16px; border-left: 3px solid #31c9f2"
                  >陪餐人员（13人）</div>
                  <div class="main" style="padding:0.2rem">
                    <div>
                      <p>理想/厨师</p>
                      <p>健康证：563434387483</p>
                    </div>

                    <div>
                      <p>理想/食品安全员</p>
                      <p>健康证：563434387483</p>
                    </div>

                    <div>
                      <p>理想/厨师</p>
                      <p>健康证：563434387483</p>
                    </div>
                  </div>
                  <div class="bottom more">
                    <span>
                      展开更多
                      <i class="el-icon-arrow-down"></i>
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
                    <span style="color:#31c9f2; font-size: 20px;padding-right: 5px">5</span>类
                  </span>
                </div>
                <div style="width: 40%; float: left">
                  <div style="width: 40%; float: left;font-size: 16px; padding-top: 5px">设备运行正常率：</div>
                  <div style="width: 50%; float: left; padding-top: 6px">
                    <el-progress
                      :text-inside="true"
                      :width="20"
                      :stroke-width="18"
                      :percentage="100"
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
                      :percentage="100"
                    ></el-progress>
                  </div>
                </div>
              </div>
              <el-table
                :data="tableData"
                style="width: 100%;"
                :header-cell-style="rowClass"
                :row-style="rowClass"
                :header-row-style="rowClass"
              >
                <el-table-column prop="name" label="设备名称：" width="180"></el-table-column>

                <el-table-column prop="pinpai" label="设备品牌：" width="180"></el-table-column>

                <el-table-column prop="date" label="出厂日期：" width="180"></el-table-column>

                <el-table-column prop="nianxian" label="使用年限：" width="180"></el-table-column>

                <el-table-column prop="address" label="地址"></el-table-column>
              </el-table>
            </div>

            <div v-show="yuJing_active==='食材信息'" class="shicaixinxi">
              <div
                class="shicai"
                style="display:flex;justify-content: flex-end;height: 1rem;display: flex;align-items: center;"
              >
                <el-date-picker
                  style="background: rgb(25, 38, 79);color: white;"
                  v-model="shicai_date"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
                <el-button type="primary" style="margin:0 .2rem;">查看</el-button>
              </div>
              <div class="border main">
                <div class="r1" style="display: flex;justify-content: space-around;">
                  <div>编号</div>
                  <div>食材名称</div>
                  <div>采购日期</div>
                  <div>快检结果</div>
                </div>
                <div class="r1_box">
                  <div>
                    <div>A0001</div>
                    <div>五花肉</div>
                    <div>2019-09-22</div>
                    <div>合格</div>
                  </div>
                  <div>
                    <div>A0002</div>
                    <div>番茄</div>
                    <div>2019-09-22</div>
                    <div>合格</div>
                  </div>
                  <div class="red">
                    <div>A0003</div>
                    <div>土豆</div>
                    <div>2019-09-22</div>
                    <div>不合格</div>
                  </div>
                  <div>
                    <div>A0004</div>
                    <div>上海青</div>
                    <div>2019-09-22</div>
                    <div>合格</div>
                  </div>
                  <div>
                    <div>A0005</div>
                    <div>西兰花</div>
                    <div>2019-09-22</div>
                    <div>合格</div>
                  </div>
                  <div>
                    <div>A0006</div>
                    <div>青虾</div>
                    <div>2019-09-22</div>
                    <div>合格</div>
                  </div>
                  <div>
                    <div>A0007</div>
                    <div>鲤鱼</div>
                    <div>2019-09-22</div>
                    <div>合格</div>
                  </div>
                  <div>
                    <div>A0008</div>
                    <div>大白菜</div>
                    <div>2019-09-22</div>
                    <div>合格</div>
                  </div>
                  <div class="red">
                    <div>A0009</div>
                    <div>黄瓜</div>
                    <div>2019-09-22</div>
                    <div>不合格</div>
                  </div>
                  <div>
                    <div>A0010</div>
                    <div>茄子</div>
                    <div>2019-09-22</div>
                    <div>合格</div>
                  </div>
                  <div>
                    <div>A0007</div>
                    <div>鲤鱼</div>
                    <div>2019-09-22</div>
                    <div>合格</div>
                  </div>
                  <div>
                    <div>A0008</div>
                    <div>大白菜</div>
                    <div>2019-09-22</div>
                    <div>合格</div>
                  </div>
                  <div class="red">
                    <div>A0009</div>
                    <div>黄瓜</div>
                    <div>2019-09-22</div>
                    <div>不合格</div>
                  </div>
                  <div>
                    <div>A0010</div>
                    <div>茄子</div>
                    <div>2019-09-22</div>
                    <div>合格</div>
                  </div>
                  <div>
                    <div>A0007</div>
                    <div>鲤鱼</div>
                    <div>2019-09-22</div>
                    <div>合格</div>
                  </div>
                  <div>
                    <div>A0008</div>
                    <div>大白菜</div>
                    <div>2019-09-22</div>
                    <div>合格</div>
                  </div>
                  <div>
                    <div>A0009</div>
                    <div>黄瓜</div>
                    <div>2019-09-22</div>
                    <div>合格</div>
                  </div>
                  <div>
                    <div>A0010</div>
                    <div>茄子</div>
                    <div>2019-09-22</div>
                    <div>合格</div>
                  </div>
                </div>
              </div>
              <div class="ye">
                <span>显示12项结果</span>
                <span>共100项</span>
                <span>当前1/3页</span>

                <!-- <el-button type="primary" plain>上一页</el-button> -->
                <el-button disabled class="dis" type="primary" plain>上一页</el-button>

                <el-button type="primary" plain>下一页</el-button>
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
                    @click="showRecoedsDetail()"
                  >
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="100"></el-progress>
                  </div>
                </div>
                <div style="width:30%;float:left">
                  <div style="width:30%;float:left; text-align: center">
                    <span>陪餐记录</span>
                  </div>
                  <div
                    style="width:50%;float:left;padding-left: 0.3rem;cursor: pointer"
                    @click="showRecoedsDetail()"
                  >
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="100"></el-progress>
                  </div>
                </div>
                <div style="width:30%;float:left">
                  <div id="foodTj" style="width:40%;float:left; text-align: center">
                    <span>食品添加剂使用记录</span>
                  </div>
                  <div
                    id="foodTjP"
                    style="width:50%;float:left;padding-left: 0.3rem;cursor: pointer"
                    @click="showRecoedsDetail()"
                  >
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
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
                    @click="showRecoedsDetail()"
                  >
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="80"></el-progress>
                  </div>
                </div>
                <div style="width:30%;float:left">
                  <div style="width:30%;float:left; text-align: center">
                    <span>餐具洗消记录</span>
                  </div>
                  <div
                    style="width:50%;float:left;padding-left: 0.3rem;cursor: pointer"
                    @click="showRecoedsDetail()"
                  >
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="100"></el-progress>
                  </div>
                </div>
                <div style="width:30%;float:left">
                  <div style="width:40%;float:left; text-align: center">
                    <span>设备设施洗消记录</span>
                  </div>
                  <div
                    style="width:50%;float:left;padding-left: 0.3rem;cursor: pointer"
                    @click="showRecoedsDetail()"
                  >
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
                  </div>
                </div>
              </div>
              <div style="width:100%; float:left; " class="taizhang">
                <div id="foodAreaDiv" style="width:30%;float:left">
                  <div id="foodArea" style="width:40%;float:left; text-align: left">
                    <span>就餐区域洗消记录</span>
                  </div>
                  <div
                    id="foodAreaP"
                    style="width:50%;float:left;cursor: pointer"
                    @click="showRecoedsDetail()"
                  >
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="20"></el-progress>
                  </div>
                </div>
              </div>
            </div>

            <div class="list_box" v-show="yuJing_active==='历史报警信息'">
              <div class="list" v-for="(val,index) of activeArr" :key="index">
                <div class="logo">
                  <img class="img" :src="val.img" alt />
                  <div class="gongsi">
                    <p>{{val.title}}</p>
                    <p>
                      预警类别：
                      <span v-if="val.type.substr(2) ==='预警'" class="lan">{{val.type}}</span>
                      <span class="red" v-else>{{val.type}}</span>
                    </p>
                    <p>预警内容：采购票证信息错误</p>
                    <p>预警时间：2019-09-08 13：25</p>
                  </div>
                </div>
                <div
                  v-if="val.type==='食材预警'"
                  class="yujing_guanlian"
                  style="flex-direction: column;"
                >
                  <p>供应商：红双喜食品有限公司</p>
                  <br />
                  <p>学校名称：北京实验小学</p>
                </div>
                <div v-else class="yujing_guanlian">
                  <div>
                    <p>预警关联2项：</p>
                  </div>
                  <div>
                    <p>无供应商信息预警</p>
                    <p>采购无票证信息预警</p>
                  </div>
                </div>
                <div class="xuexiao_guanlian" style="padding-top: 0.2rem">
                  <div>
                    <p>关联学校5个：</p>
                  </div>
                  <div>
                    <p>第二外国语小学，朝阳幼儿园，超华幼儿园，光明小学，芳草地小学传媒附属幼儿园</p>
                  </div>
                </div>
                <div class="xiangqing" @click="isZhezhao = true">查看详情</div>
              </div>
              <div class="ye">
                <span>显示12项结果</span>
                <span>共100项</span>
                <span>当前1/3页</span>

                <!-- <el-button type="primary" plain>上一页</el-button> -->
                <el-button disabled class="dis" type="primary" plain>上一页</el-button>

                <el-button type="primary" plain>下一页</el-button>
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

    <div class="video_wrap" :class="{hidden:isHidden}" @click.self="hideVideo">
      <div class="video_box" style="padding: .8rem .2rem;position:relative;">
        <div
          @click="hideVideo"
          style="cursor: pointer;position:absolute;right:0;top:0;width:.6rem;height:.6rem;background:#05173c;text-align: center;line-height: .6rem;font-size: 0.3rem;"
        >x</div>
        <div class="video">
          <div style="font-size:.24rem;padding: 0 0 .1rem .1rem;">校园直播</div>
          <!-- <video controls="controls" width="100%" height="100%" :src="videoSrc"></video> -->
          <!-- <video controls="controls" width="100%" height="100%" src="/static/shi.mp4"></video> -->
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
            <li @click="changeVideo(val.eqId)" v-for="val of zhiboliebiaoJson" :key="val.id">
              <img :src="val.imageUrl" alt />
              <div class="title">{{val.eqarea}}</div>
            </li>
            <!-- <li @click="changeVideo('rtmp://58.200.131.2:1935/livetv/hunantv')">
              <img
                src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2721259920,2245504677&fm=26&gp=0.jpg"
                alt
              />
              <div class="title">洗菜区</div>
            </li>
            <li @click="changeVideo('rtmp://58.200.131.2:1935/livetv/gdtv')">
              <img
                src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2395256036,2172655875&fm=15&gp=0.jpg"
                alt
              />
              <div class="title">饮料区</div>
            </li>
            <li @click="changeVideo('rtmp://58.200.131.2:1935/livetv/dftv')">
              <img src="http://pmtb146d9.pic42.websiteonline.cn/upload/11y.jpg" alt />
              <div class="title">后厨区</div>
            </li>-->
          </ul>
        </div>
      </div>
    </div>

    <div class="records-panel" v-show="recordsPanelIsShow" @click.self="recordsPanelIsShow = false">
      <div
        style="margin-bottom:.2rem;display:flex;justify-content: flex-end;float: left; width: 100%"
      >
        <el-date-picker v-model="shicai_date" type="date" placeholder="选择日期"></el-date-picker>
        <el-button type="primary">查看</el-button>
        <i
          class="el-icon-close"
          @click.self="recordsPanelIsShow = false"
          style="float: right;font-size: 0.24rem;margin-left: 0.5rem;padding-top: 0.1rem; cursor: pointer"
        ></i>
      </div>
      <div class="border main" id="recordTableDiv">
        <div class="r1" style="display: flex;justify-content: space-around;">
          <div>留样时间</div>
          <div>留样名称</div>
          <div>留样重量</div>
          <div>留样人</div>
          <div>销毁时间</div>
          <div>快检结果</div>
          <div>是否上传留样记录</div>
          <div>操作</div>
        </div>
        <div class="r1_box">
          <div>
            <div>2019-08-22</div>
            <div>回锅肉</div>
            <div>100g</div>
            <div>张三</div>
            <div>2019-08-24</div>
            <div>合格</div>
            <div>是</div>
            <div>
              <a href="javascript:void(0);">查看留样快检报告</a>
            </div>
          </div>
        </div>
        <div class="r1_box">
          <div>
            <div>2019-08-22</div>
            <div>糖醋里脊</div>
            <div>100g</div>
            <div>张三</div>
            <div>2019-08-24</div>
            <div>合格</div>
            <div>是</div>
            <div>
              <a href="javascript:void(0);">查看留样快检报告</a>
            </div>
          </div>
        </div>
        <div class="r1_box">
          <div>
            <div>2019-08-22</div>
            <div>青椒鸡蛋</div>
            <div>100g</div>
            <div>张三</div>
            <div>2019-08-24</div>
            <div>合格</div>
            <div>是</div>
            <div>
              <a href="javascript:void(0);">查看留样快检报告</a>
            </div>
          </div>
        </div>
        <div class="r1_box">
          <div>
            <div>2019-08-22</div>
            <div>韭菜虾仁</div>
            <div>100g</div>
            <div>张三</div>
            <div>2019-08-24</div>
            <div>合格</div>
            <div>是</div>
            <div>
              <a href="javascript:void(0);">查看留样快检报告</a>
            </div>
          </div>
        </div>
        <div class="r1_box">
          <div>
            <div>2019-08-22</div>
            <div>红烧黄花鱼</div>
            <div>100g</div>
            <div>张三</div>
            <div>2019-08-24</div>
            <div>合格</div>
            <div>是</div>
            <div>
              <a href="javascript:void(0);">查看留样快检报告</a>
            </div>
          </div>
        </div>
        <div class="r1_box">
          <div>
            <div>2019-08-22</div>
            <div>正新鸡排</div>
            <div>100g</div>
            <div>张三</div>
            <div>2019-08-24</div>
            <div>合格</div>
            <div>是</div>
            <div>
              <a href="javascript:void(0);">查看留样快检报告</a>
            </div>
          </div>
        </div>
        <div class="r1_box">
          <div>
            <div>2019-08-22</div>
            <div>宫爆鸡丁</div>
            <div>100g</div>
            <div>张三</div>
            <div>2019-08-24</div>
            <div>合格</div>
            <div>是</div>
            <div>
              <a href="javascript:void(0);">查看留样快检报告</a>
            </div>
          </div>
        </div>
        <div class="r1_box">
          <div>
            <div>2019-08-22</div>
            <div>回锅肉</div>
            <div>100g</div>
            <div>张三</div>
            <div>2019-08-24</div>
            <div>合格</div>
            <div>是</div>
            <div>
              <a href="javascript:void(0);">查看留样快检报告</a>
            </div>
          </div>
        </div>
        <div class="r1_box">
          <div>
            <div>2019-08-22</div>
            <div>凉拌秋葵</div>
            <div>100g</div>
            <div>张三</div>
            <div>2019-08-24</div>
            <div>合格</div>
            <div>是</div>
            <div>
              <a href="javascript:void(0);">查看留样快检报告</a>
            </div>
          </div>
        </div>
        <div class="r1_box">
          <div>
            <div>2019-08-22</div>
            <div>土豆炖牛肉</div>
            <div>100g</div>
            <div>张三</div>
            <div>2019-08-24</div>
            <div>合格</div>
            <div>是</div>
            <div>
              <a href="javascript:void(0);">查看留样快检报告</a>
            </div>
          </div>
        </div>
        <div class="r1_box">
          <div>
            <div>2019-08-22</div>
            <div>小炒口蘑</div>
            <div>100g</div>
            <div>张三</div>
            <div>2019-08-24</div>
            <div>合格</div>
            <div>是</div>
            <div>
              <a href="javascript:void(0);">查看留样快检报告</a>
            </div>
          </div>
        </div>
        <div class="r1_box">
          <div>
            <div>2019-08-22</div>
            <div>毛血旺</div>
            <div>100g</div>
            <div>张三</div>
            <div>2019-08-24</div>
            <div>合格</div>
            <div>是</div>
            <div>
              <a href="javascript:void(0);">查看留样快检报告</a>
            </div>
          </div>
        </div>
        <div class="r1_box">
          <div>
            <div>2019-08-22</div>
            <div>西红柿炒鸡蛋</div>
            <div>100g</div>
            <div>张三</div>
            <div>2019-08-24</div>
            <div>合格</div>
            <div>是</div>
            <div>
              <a href="javascript:void(0);">查看留样快检报告</a>
            </div>
          </div>
        </div>
        <div class="r1_box">
          <div>
            <div>2019-08-22</div>
            <div>蒜蓉西兰花</div>
            <div>100g</div>
            <div>张三</div>
            <div>2019-08-24</div>
            <div>合格</div>
            <div>是</div>
            <div>
              <a href="javascript:void(0);">查看留样快检报告</a>
            </div>
          </div>
        </div>
        <div class="r1_box">
          <div>
            <div>2019-08-22</div>
            <div>清炒油麦菜</div>
            <div>100g</div>
            <div>张三</div>
            <div>2019-08-24</div>
            <div>合格</div>
            <div>是</div>
            <div>
              <a href="javascript:void(0);">查看留样快检报告</a>
            </div>
          </div>
        </div>
        <div class="r1_box">
          <div>
            <div>2019-08-22</div>
            <div>香菇油菜</div>
            <div>100g</div>
            <div>张三</div>
            <div>2019-08-24</div>
            <div>合格</div>
            <div>是</div>
            <div>
              <a href="javascript:void(0);">查看留样快检报告</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Detail from "@/components/ComAlertDetails";
import {
  zhiboliebiao,
  zhiboliu,
  gongyingshangshu,
  gongyingshang
} from "@/api/xuexiaoxiangqing";
import { log } from "util";
export default {
  name: "positioning",
  data() {
    return {
      gongyingshangJson: {},
      gongyingshangshuJson: {
        zongshu: 30,
        yingyeshu: 100,
        xukeshu: 100
      },
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
      tableData: [
        {
          date: "2016-05-02",
          nianxian: "3年",
          name: "消毒柜",
          pinpai: "新科",
          address: "第二餐厅"
        },
        {
          date: "2016-05-02",
          nianxian: "3年",
          name: "洗碗机",
          pinpai: "新飞",
          address: "第二餐厅"
        },
        {
          date: "2016-05-02",
          nianxian: "3年",
          name: "蒸箱",
          pinpai: "苏泊尔",
          address: "第二餐厅"
        },
        {
          date: "2016-05-02",
          nianxian: "3年",
          name: "烤箱",
          pinpai: "苏泊尔",
          address: "第二餐厅"
        },
        {
          date: "2016-05-02",
          nianxian: "3年",
          name: "抽油烟机",
          pinpai: "方太",
          address: "第二餐厅"
        }
      ],
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
      videoSrc:
        "//f.video.weibocdn.com/003zzxrslx07wzQN2yPu01041200ba4R0E010.mp4?label=mp4_ld&template=640x360.24.0&trans_finger=78679548d3dda0964ec12b81fbdd99c2&Expires=1568969283&ssig=alvhOzoJfy&KID=unistore,video"
    };
  },
  components: {
    Detail
  },
  methods: {
    getgongyingshang() {
      gongyingshang({
        schoolid: 1
      }).then(res => {
        console.log(res.data);
        this.gongyingshangJson = res.data;
      });
    },
    getgongyingshangshu() {
      gongyingshangshu({
        schoolid: 1
      }).then(res => {
        console.log(res.data);
        this.gongyingshangshuJson = res.data;
      });
    },
    getzhiboliebiao() {
      console.log("zhiboliebiao");

      zhiboliebiao({ schoolId: 1 }).then(res => {
        this.zhiboliebiaoJson = res.data.data;
        zhiboliu({ eqId: res.data.data[0].eqId }).then(res => {
          console.log(res.data.data);

          if (res.data.data.path) {
            this.$refs.videoPlayer.player.src(res.data.data.path);
            this.$refs.videoPlayer.player.load();
            setTimeout(res => {
              this.$refs.videoPlayer.player.play();
            }, 2000);
          }
        });
      });
    },
    rowClass({ row, rowIndex }) {
      // console.log(rowIndex); //表头行标号为0
      return "background:#6e72792a;color:#fff; font-size:16px; font-weight:normal";
    },
    hideVideo() {
      this.isHidden = true;
      try {
        document.querySelector(".vjs-control-bar").style.display = "none";
      } catch {}
    },
    getYuJing(type) {
      // console.log(type);
      this.yuJing_active = type;
    },
    changeVideo(e) {
      zhiboliu({ eqId: e }).then(res => {
        console.log(res.data.data.path);
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
      try {
        document.querySelector(".vjs-control-bar").style.display = "flex";
      } catch {}
    },
    showRecoedsDetail() {
      this.recordsPanelIsShow = true;
    }
  },
  mounted() {
    this.getzhiboliebiao();
    this.getgongyingshang();
    // this.getgongyingshangshu();
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
  // .more,
  .details,
  .all {
    color: #31c9f2;
  }
  .more {
    display: flex;
    justify-content: center;
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
    justify-content: space-between;
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
      padding: 0 0.2rem;
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
              line-height: 1.5em;
            }
            &:hover {
              background: rgba(47, 123, 255, 0.63);
              cursor: pointer;
              color: white;
            }
            img {
              width: 100%;
              height: 1rem;
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
</style>
