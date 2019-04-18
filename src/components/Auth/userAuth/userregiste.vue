<template>
  <div id="login-wrapper">
    <div class="login-panel-wrapper">
      <el-row>
        <el-col :span="16" id="left">
          <el-row type="flex" class="row-bg" justify="center">
            <h2>YOUR INFORMATION <span>new for job</span></h2>
          </el-row>
          <el-row class="form-wrapper">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="名称">
                <el-input v-model="formLabelAlign.uname"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formLabelAlign.uemail"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="formLabelAlign.upassword"></el-input>
              </el-form-item>
            </el-form>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center">
            <el-button type="primary"  @click="registe">注册</el-button>
          </el-row>
        </el-col>
        <el-col :span="8" id="right">
          <div>
            已有账户？
            <router-link to="/login">点击登录</router-link>
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
  name: "userregiste",
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        uname: "",
        uemail: "",
        upassword: ""
      }
    };
  },
  methods:{
    registe: function(event) {
      this.axios({
        method: "post",
        url: "user",
        data: this.formLabelAlign
      })
        .then(response => {
          if (response.data===1) {
            this.$message("成功，即将跳转登录页...");
            setTimeout(() => {
              this.$router.push({ path: "/ulogin" });
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
#login-wrapper {
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
.login-panel-wrapper {
  position: absolute;
  width: 50%;
  height: 50%;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: white;
  border: solid #bbbbbb 0.3px;
}
</style>