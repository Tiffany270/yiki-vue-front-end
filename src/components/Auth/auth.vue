<template>
  <div id="login-wrapper">
    <div class="login-panel-wrapper">
      <el-row>
        <el-col :span="12" id="left">
           <div>
           <h3>您要找工作？</h3>
            <router-link to="/ulogin">点击登录</router-link>           
            <router-link to="/uregiste">点击注册</router-link>           
          </div>
        </el-col>
        <el-col :span="12" id="right">
          <div>
           <h3>您是企业</h3>
            <router-link to="/flogin">点击登录</router-link>           
            <router-link to="/fregiste">点击注册</router-link>           
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
  name: "auth",
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      }
    };
  }
};
</script>

<style>
.form-wrapper {
  margin: 20px;
}
#login-wrapper {
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