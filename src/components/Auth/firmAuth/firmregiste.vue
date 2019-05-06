<template>
  <div id="fregiste-wrapper">
    <div class="fregiste-panel-wrapper">
      <el-row>
        <el-col :span="16" id="left">
          <el-row type="flex" class="row-bg" justify="center">
            <h2>
              YOUR INFORMATION
              <span>looking for new genius</span>
            </h2>
          </el-row>
          <el-row class="form-wrapper">
            <el-form
              :rules="formrules"
              ref="formLabelAlign"
              :label-position="labelPosition"
              label-width="80px"
              :model="formLabelAlign"
            >
              <el-form-item label="名称" prop="cname">
                <el-input v-model="formLabelAlign.cname"></el-input>
              </el-form-item>
              <el-form-item label="公司名称" prop="clabelname">
                <el-input v-model="formLabelAlign.clabelname"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="cemail">
                <el-input v-model="formLabelAlign.cemail"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="formLabelAlign.cpassword"></el-input>
              </el-form-item>
            </el-form>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center">
            <el-button type="primary" @click="registe">注册</el-button>
          </el-row>
        </el-col>
        <el-col :span="8" id="right">
          <div>
            已有账户？
            <router-link to="/fregiste">点击登录</router-link>
          </div>
          <div>
            <el-button @click="back" type="text" class="button">返回</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="bg-1"></div>
    <div class="bg-2"></div>
  </div>
</template>

<script>
export default {
  name: "firmregiste",
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        clabelname: "",
        cname: "",
        cemail: "",
        cpassword: ""
      },
      formrules: {
        cname: [
          { required: true, message: "请输入您的姓名", trigger: "blur" },
          {
            min: 1,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        clabelname: [
          { required: true, message: "请输入您的姓名", trigger: "blur" },
          {
            min: 1,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        cemail: [
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
        cpassword: [
          {
            required: true,
            message: "请输入密码" //错误提示信息
          },
          {
            min: 1,
            message: "不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //----返回
    back() {
      this.$router.back(-1);
    },
    registe: function(event) {
      console.log(this.formLabelAlign.cname);
      this.axios({
        method: "post",
        url: "firm",
        data: this.formLabelAlign
      })
        .then(response => {
          if (response.data === 1) {
            this.$message("成功，即将跳转登录页...");
            setTimeout(() => {
              this.$router.push({ path: "/flogin" });
            }, 3000);
          } else {
            this.$message.error("注册失败");
          }
        })
        .catch(error => {
          this.$message.error("网络错误");
        });
    }
  }
};
</script>

<style>
#fregiste-wrapper {
  overflow: hidden;
}
.form-wrapper {
  margin: 20px;
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
.fregiste-panel-wrapper {
  position: absolute;
  width: 50%;
  height: 500px;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: white;
  border: solid #bbbbbb 0.3px;
}
</style>