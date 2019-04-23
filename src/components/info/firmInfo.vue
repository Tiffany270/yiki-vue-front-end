<template>
  <div id="info-wrapper">
    <div class="info-panel-wrapper">
      <span>
        <h2>For Company</h2>
      </span>
      <div class="step-wrapper">
        <el-steps :active="active" finish-status="success">
          <el-step title="完善您的信息"></el-step>
          <el-step title="完成"></el-step>
          <el-step title="发布JD"></el-step>
        </el-steps>
      </div>

      <el-tabs class="form-wrapper" v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <div class="form-wrapper">
            <el-form
              :model="firmForm"
              :rules="rules"
              ref="firmForm"
              label-width="100px"
              class="demo-firmForm"
            >
              <el-form-item label="公司名称" prop="name">
                <el-input v-model="firmForm.name"></el-input>
              </el-form-item>
              <el-form-item label="公司邮箱" prop="email">
                <el-input v-model="firmForm.email"></el-input>
              </el-form-item>
              <el-form-item label="公司电话" prop="phone">
                <el-input v-model="firmForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="公司所在地" prop="region">
                <el-input v-model="firmForm.region"></el-input>
              </el-form-item>
              <el-form-item label="简述" prop="intro">
                <el-input v-model="firmForm.intro"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="resetForm('firmForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司概况" name="second">
          <div class="form-wrapper">
            <el-form
              :model="firmForm"
              :rules="rules"
              ref="firmForm"
              label-width="100px"
              class="demo-firmForm"
            >
              <el-form-item label="公司类型" prop="type">
                <el-select v-model="firmForm.type" placeholder="请选择类型">
                  <el-option label="上市" value="上市"></el-option>
                  <el-option label="未融资" value="未融资"></el-option>
                  <el-option label="A轮" value="A轮"></el-option>
                  <el-option label="B轮" value="B轮"></el-option>
                  <el-option label="C轮" value="C轮"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="公司人数" prop="num">
                <el-input v-model="firmForm.num"></el-input>
              </el-form-item>
              <el-form-item label="公司简介" prop="brief">
                <el-input type="textarea" v-model="firmForm.brief"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="resetForm('firmForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="完成" name="three">
          <div style="width: 20%; margin: auto;">
            <el-button type="primary" @click="beforesubmit">提交</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="bg-1"></div>
    <div class="bg-2"></div>

    <!-- 提交确认弹窗 -->
    <el-dialog title="提示" :visible.sync="submitDialog" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="unsubmit">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "firmInfo",
  data() {
    return {
      activeName: "first",
      postData: {},
      
      //----基本信息+求职意向
      firmForm: {
        cid: null,
        name: "",
        email: "",
        phone: "",
        region: "",
        intro: "",
        type: "",
        num: "",
        brief: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入您的姓名", trigger: "blur" },
          {
            min: 1,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true, //是否必填
            message: "请输入邮箱地址", //错误提示信息
            trigger: "blur" //检验方式（blur为鼠标点击其他地方，）
          },
          {
            type: "email", //要检验的类型（number，email，date等）
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            required: true,
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        region: [
          { required: true, message: "请输入你的所在地", trigger: "blur" }
        ]
      },
      //------end ------
      active: 0, //step
      labelPosition: "right",
      //-----项目经验
      ExpDialog: false,
      workExpItems: [],
      formLabelWidth: "120px",
      //----确定
      submitDialog: false
    };
  },
  methods: {
    //---提交确认
    beforesubmit() {
      this.submitDialog = true;
      this.active = 3;
    },
    //确认dialog里的最终确定提交
    submit() {
      this.submitDialog = false;
      this.active = 3;

      console.log(this.firmForm);

      this.axios({
        method: "post",
        url: "firmInfo",
        data: this.firmForm
      })
        .then(res => {
          if (res.data == 1) {
            this.$message("登录成功，即将跳转...");
            setTimeout(() => {
              this.$router.push({ path: "/about" });
            }, 3000);
          } else {
            this.$message.error("添加失败");
          }
        })
        .catch(error => {
          this.$message.error("网络错误");
        });
    },
    //取消确认
    unsubmit() {
      this.submitDialog = false;
      this.active = 2;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  watch: {
    activeName: function(val) {
      if (val === "three") {
        this.active = 2;
      } else {
        this.active = 1;
      }
    }
  },
  created(){
     if (localStorage.getItem("auth") !== null) {
      this.firmForm.cid = JSON.parse(localStorage.getItem("auth")).id;
    }
  }
};
</script>

<style>
.form-wrapper {
  margin: auto;
  width: 600px;
}
.step-wrapper {
  padding: 2% 0 2% 0;
  width: 300px;
  margin: auto;
}
#info-wrapper {
  overflow: hidden;
}
.bg-1,
.bg-2 {
  width: 100%;
  height: 360px;
}
.bg-1 {
  background: #3f617f;
}
#left,
#right {
  padding: 5%;
}
.info-panel-wrapper {
  position: absolute;
  width: 50%;
  height: 100%;
  margin: auto;
  left: 0;
  right: 0;
  top: 40px;
  background: white;
  border: solid #bbbbbb 0.3px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 255px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-input input {
  width: 200px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin-bottom: 30px;
}
</style>