<template>
  <el-container>
    <el-row class="top-bar" :gutter="20">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <h2>welcome here find your fav</h2>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <a>
            <router-link to="/auth">登录</router-link>
          </a>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <a>
            <router-link to="/auth">注册</router-link>
          </a>
        </div>
      </el-col>
    </el-row>
    <el-row class="search" type="flex" justify="center">
      <el-col :span="8">
        <el-input v-model="input" placeholder="搜索一下"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="info">search</el-button>
      </el-col>
    </el-row>
   
    <!-- 头部分割线-----don't know why~ -->
    <el-main class="main">
      <!-- main的顶部 -->
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="homebanner">xxxx</div>
        </el-col>
        <el-col :span="8">
          <div class="homesiderbar">xx</div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "webMain",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      input: ""
    };
  }
};
</script>



<style lang="scss" scoped>
.main {
  padding-left: 4%;
  padding-right: 4%;
  background: beige;
}
.top-bar {
  padding: 5px;
  background: black;
  color: white;
  a {
    color: white;
  }
}
.search {
  padding: 2%;
  background: gainsboro;
}
</style>





  



