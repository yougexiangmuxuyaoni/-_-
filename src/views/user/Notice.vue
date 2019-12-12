<template>
  <div class="notice">
    <div class="title">通知下达</div>
    <div class="zhuti flex">
      <div class="upload">
        <!-- <el-upload
          class="upload-demo"
          drag
          :file-list="fileList"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <em>上传文件</em>
          </div>
        </el-upload>-->
        <div
          @click="btn()"
          style="width:1.5rem;height:2rem;display: flex;flex-direction: column;justify-content: space-around;align-items: center;"
          class="hezi file"
        >
          <i class="el-icon-upload" style="font-size:1rem;"></i>
          <em>上传文件</em>
        </div>
        <ul style="padding:0;list-style: decimal-leading-zero;">
          <li v-for="val of file_list" :key="val.size">{{val.name}}</li>
        </ul>
        <!-- <el-upload
          class="upload-demo"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
           action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>-->
      </div>
      <div class="from">
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">发送学校</div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content bg-purple-light">
              <!-- <el-input v-model="xuexiao" placeholder="请输入学校名称"></el-input> -->
            </div>
          </el-col>
          <el-col :span="6">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- <i class="el-icon-plus"></i> 添加学校 -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">主题</div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content bg-purple-light">
              <el-input v-model="zhuti" placeholder="请输入标题"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">内容</div>
          </el-col>
          <el-col :span="14">
            <el-input type="textarea" :rows="7" placeholder="请输入内容描述，不超过300字" v-model="neirong"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="12" :span="5">
            <el-button type="primary" @click="send()">发送通知</el-button>
          </el-col>
        </el-row>
      </div>

      <form
        action="/api/manageWat/supervision/insertAnnouncement"
        method="post"
        target="nm_iframe"
        style="visibility:hidden;display:none;"
      >
        <!-- <form action="/manageWat/supervision/insertAnnouncement" method="post"> -->
        <input type="text" name="schoolId" v-model="SchoolId" />
        <input type="file" name="file" multiple="multiple" @change="tirggerFile($event)" ref="btn" />
        <input type="text" name="title" v-model="zhuti" />
        <input type="text" name="content" v-model="neirong" />
        <input type="text" name="userId" v-model="userId" />
        <input type="submit" value="tijiao" ref="fa" />
      </form>
      <iframe id="id_iframe" name="nm_iframe" style="visibility: hidden;display:none;"></iframe>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { allSchools } from "@/api/home.js";
export default {
  name: "notice",
  data() {
    return {
      options: [
        {
          value: "1",
          label: "叙永县西城实验中学"
        },
        {
          value: "2",
          label: "北京大学"
        },
        {
          value: "3",
          label: "北京航空航天大学"
        },
        {
          value: "4",
          label: "北京邮电大学"
        }
      ],
      value: "",
      file_list: [],
      xuexiao: "",
      zhuti: "",
      neirong: "",
      SchoolId: 1,
      userId: 4,
      areaCode: ""
    };
  },
  methods: {
    btn() {
      this.$refs.btn.click();
    },
    tirggerFile: function(event) {
      var file = event.target.files; // (利用console.log输出看file文件对象)
      console.log(file);
      this.file_list = file;
      // do something...
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    send() {
      console.log("发送");

      if (this.zhuti == "") {
        this.$message.error("请输入标题");
        return;
      } else if (this.neirong == "") {
        this.$message.error("请输入内容");
        return;
      }

      this.$refs.fa.click();
      setTimeout(() => {
        console.log(
          this.$el.getElementsByTagName("iframe")[0].contentWindow.document.body
            .innerText
        );
        let html = this.$el.getElementsByTagName("iframe")[0].contentWindow
          .document.body.innerText;
        let moban =
          '{"code":0,"msg":"success","data":{"code":0,"msg":"success","data":true}}';
        if (html === moban) {
          this.zhuti = "";
          this.neirong = "";
          this.file_list = [];
          this.value ='';
          this.$message({
            showClose: true,
            message: "通知下达成功",
            type: "success"
          });
        }
      }, 1000);
    },
    /**
     * 获取本地区 所有学校
     * **/

    getAllSchools() {
      allSchools({
        areaCode: this.areaCode
      }).then(res => {
        console.log(res.data.data);
        this.options = res.data.data;
      });
    }
  },
  created() {
    this.SchoolId = localStorage.getItem("SchoolId");
    var user = JSON.parse(localStorage.getItem("userInfo"));
    this.userId = user.userId;
    this.areaCode = user.areaCode;
    this.getAllSchools();
  }
};
</script>
<style lang="scss" scope>
.el-message__icon {
  font-size: 0.2rem;
}
.notice {
  width: 100%;
  padding: 30px 50px;
  .border {
    background: #13297091;
    border: 1px solid #2259c1;
  }
  .title {
    font-size: 20px;
    padding-bottom: 20px;
  }
  .file:hover {
    cursor: pointer;
  }
  .zhuti {
    margin-top: 32px;
    .font {
      font-size: 18px;
      padding: 80px 0 40px 0;
    }
    .upload {
      margin-right: 30px;
      .el-upload-dragger {
        width: 140px;
        height: 200px;
        @extend .border;
      }
    }
    .from {
      width: 70%;
      .el-row {
        margin-top: 20px;
        &:nth-of-type(1) {
          line-height: 40px;
          margin: 0;
        }
        input {
          @extend .border;
        }
        .el-textarea {
          width: 96%;
          textarea {
            @extend .border;
          }
        }
        .grid-content {
          text-align: right;
          padding-right: 20px;
          line-height: 40px;
        }
        button {
          margin-left: 10%;
          width: 100%;
          background: #072777;
          border-radius: 0.5rem;
          border: none;
        }
      }
    }
  }
}
</style>
