<template>
  <div id="login-wrapper">
    <div class="login-panel-wrapper">
      <el-row>
        <el-col :span="12" id="left">
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://www.lgstatic.com/passport/static/pc/page/register-land/img/hr_28c09fa.png"
              class="image"
            >
            <div style="padding: 14px;">
              <h3>您要找工作？</h3>
              <div class="bottom clearfix">
                <time class="time">
                  <router-link to="/ulogin">点击登录</router-link>
                </time>
                <time class="time">
                  <router-link to="/uregiste">点击注册</router-link>
                </time>
                <el-button @click="back" type="text" class="button">返回</el-button>
              </div>
            </div>
          </el-card>

          <div></div>
        </el-col>
        <el-col :span="12" id="right">
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://www.lgstatic.com/passport/static/pc/page/register-land/img/worker_ba429d5.png"
              class="image"
            >
            <div style="padding: 14px;">
              <h3>您是企业</h3>
              <div class="bottom clearfix">
                <time class="time">
                  <router-link to="/flogin">点击登录</router-link>
                </time>
                <time class="time">
                  <router-link to="/fregiste">点击注册</router-link>
                </time>
                <el-button @click="back" type="text" class="button">返回</el-button>
              </div>
            </div>
          </el-card>
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
  },
  methods: {
    //----返回
    back() {
      this.$router.back(-1);
    }
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
  height: 65%;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
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
</style>