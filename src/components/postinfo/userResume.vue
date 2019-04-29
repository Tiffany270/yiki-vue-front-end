<template>
  <div id="info-wrapper">
    <div class="info-panel-wrapper">
      <div class="step-wrapper">
        <el-steps :active="active" finish-status="success">
          <el-step title="完善您的简历"></el-step>
          <el-step title="完成"></el-step>
          <el-step title="进行投递"></el-step>
        </el-steps>
      </div>

      <el-tabs class="form-wrapper" v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <div class="form-wrapper">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="phone">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="所在地" prop="region">
                <el-input v-model="ruleForm.region"></el-input>
              </el-form-item>
              <el-form-item label="院校" prop="school">
                <el-input v-model="ruleForm.school"></el-input>
              </el-form-item>
              <el-form-item label="学历" prop="degree">
                <el-select v-model="ruleForm.degree" placeholder="请选择学历">
                  <el-option label="本科" value="本科"></el-option>
                  <el-option label="研究生" value="研究生"></el-option>
                  <el-option label="博士" value="博士"></el-option>
                  <el-option label="专科" value="专科"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input v-model="ruleForm.age"></el-input>
              </el-form-item>
              <el-form-item label="自我评价" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="求职意向" name="second">
          <div class="form-wrapper">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="期望职位" prop="occupation">
                <el-input v-model="ruleForm.occupation"></el-input>
              </el-form-item>
              <el-form-item label="期望薪资" prop="pay">
                <el-input v-model="ruleForm.pay"></el-input>
              </el-form-item>
              <el-form-item label="职业类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择职业类型">
                  <el-option label="全职" value="全职"></el-option>
                  <el-option label="兼职" value="兼职"></el-option>
                  <el-option label="实习" value="实习"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="目前状态" prop="status">
                <el-input type="textarea" v-model="ruleForm.status"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="工作经历" name="third">
          <div v-if="workExpItems.length!==0">
            <el-card :key="item.name" v-for="item in workExpItems" class="box-card">
              <div slot="header" class="clearfix">
                <span>{{item.name}}</span>
                <span>{{item.opcDate}}</span>
                <span>{{item.type}}行业</span>
                <el-button style="float: right; padding: 3px 10px" type="text">编辑</el-button>
                <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
              </div>
              <div class="text item">
                <div>在{{item.dep}}部门担任{{item.ocp}}职位</div>
                <div>详细职责：{{item.desc}}</div>
              </div>
            </el-card>
          </div>

          <el-button type="primary" @click="openExpDialog" icon="el-icon-circle-plus-outline">新增工作经历</el-button>
        </el-tab-pane>

        <el-tab-pane label="项目经验" name="fourth">...</el-tab-pane>

        <el-tab-pane label="完成" name="five">
          <div style="width: 20%; margin: auto;">
            <el-button type="primary" @click="beforesubmit">立即创建</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="bg-1"></div>
    <div class="bg-2"></div>

    <!-- 项目经验弹窗 -->
    <el-dialog title="工作经验" :visible.sync="ExpDialog">
      <el-form :model="form">
        <el-form-item label="任职公司名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="任职公司行业" :label-width="formLabelWidth">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="任职公司职位" :label-width="formLabelWidth">
          <el-input v-model="form.ocp" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="任职公司部门" :label-width="formLabelWidth">
          <el-input v-model="form.dep" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="就职时间" :label-width="formLabelWidth">
          <div class="block">
            <span class="demonstration">-</span>
            <el-date-picker
              v-model="form.opcDate"
              type="monthrange"
              value-format="yyyy-MM"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
            ></el-date-picker>
          </div>
          <el-form-item label="详细" prop="desc">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ExpDialog = false">取 消</el-button>
        <el-button type="primary" @click="addExp">确 定</el-button>
      </div>
    </el-dialog>

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
  name: "userResume",
  data() {
    return {
      activeName: "first",
      postData: {},
      //----基本信息+求职意向
      ruleForm: {
        name: "",
        email: "",
        phone: "",
        region: "",
        school: "",
        degree: "",
        age: "",
        desc: "",
        occupation: "",
        type: "",
        status: "",
        pay: ""
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
        ],
        desc: [{ message: "请填写自我评价" }]
      },
      //------end ------
      active: 0, //step
      labelPosition: "right",
      //-----项目经验
      ExpDialog: false,
      workExpItems: [],
      form: {
        name: "",
        type: "",
        ocp: "",
        dep: "",
        opcDate: "",
        desc: ""
      },
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
    //---增加工作经验的dialog
    addExp() {
      const item = {
        name: this.form.name,
        type: this.form.type,
        ocp: this.form.ocp,
        dep: this.form.dep,
        opcDate: this.form.opcDate[0] + "至" + this.form.opcDate[0],
        desc: this.form.desc
      };
      this.ExpDialog = false;
      this.workExpItems.push(item);
      console.log(item);
    },
    openExpDialog() {
      if (this.workExpItems.length < 3) {
        this.ExpDialog = true;
        this.form.name = "";
        this.form.type = "";
        this.form.ocp = "";
        this.form.dep = "";
        this.form.opcDate = "";
        this.form.desc = "";
      } else {
        this.$message.error("工作经验不能超过三条");
      }
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
      if (val === "five") {
        this.active = 2;
      } else {
        this.active = 1;
      }
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