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
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="名称">
                <el-input v-model="formLabelAlign.cname"></el-input>
              </el-form-item>
              <el-form-item label="公司名称">
                <el-input v-model="formLabelAlign.clabelname"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formLabelAlign.cemail"></el-input>
              </el-form-item>
              <el-form-item label="密码">
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
      }
    };
  },
  methods: {
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