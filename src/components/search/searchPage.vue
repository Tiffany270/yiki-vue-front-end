<template>
  <el-container>
    <el-row class="top-bar" :gutter="20">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <h2>welcome here find your fav</h2>
        </div>
      </el-col>
      <el-col :span="2">
        <div v-if="!name" class="grid-content bg-purple">
          <a>
            <router-link to="/auth">登录</router-link>
          </a>
        </div>
        <div v-if="name" class="grid-content bg-purple">
          <a @click="gotoInfo">welcome!!!{{name}}</a>
        </div>
      </el-col>
      <el-col :span="2">
        <div v-if="!name" class="grid-content bg-purple">
          <a>
            <router-link to="/auth">注册</router-link>
          </a>
        </div>
        <div v-if="name" class="grid-content bg-purple">
          <a @click="quit">退出</a>
        </div>
      </el-col>
    </el-row>
    <!-- 上方需要保留 -->

    <el-row class="search" type="flex" justify="center">
      <el-col :span="8">
        <el-input v-model="input" placeholder="搜索一下"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="info">search</el-button>
      </el-col>
    </el-row>

    <el-main class="main-wrapper"></el-main>

    <el-header class="header-wrapper">@yiki.com</el-header>
  </el-container>
</template>

<script>
export default {
  name: "searchPage",
  data() {
    return {
      options: [
        {
          value: "职位",
          label: "职位"
        },
        {
          value: "公司",
          label: "公司"
        },
        {
          value: "行业",
          label: "行业"
        }
      ],
      value: "职位",
      name: "",
      auth: null
    };
  },
  created() {
    if (localStorage.getItem("auth") !== null) {
      this.auth = JSON.parse(localStorage.getItem("auth"));
      this.name = this.auth.name;
    }
  },
  methods: {
    //---退出
    quit() {
      localStorage.clear();
      this.$message({
        message: "已退出...",
        type: "success"
      });
      setTimeout(() => {
        location.reload();
      }, 3000);
    },
    toMainFirm: function(id) {
      this.$router.push({ path: "/mainFirm/" + id });
    },
    toMainJD: function(id) {
      this.$router.push({ path: "/mainJD/" + id });
    },
    gotoInfo: function() {
      if (this.auth.auth === 1) {
        //企业
        this.$router.push({ path: "/about" });
      }
      if (this.auth.auth === 0) {
        this.$router.push({ path: "/detail" });
      }
    }
  },
  mounted() {
    setTimeout(() => {}, 0);
  }
};
</script>



<style lang="scss" scoped>
.inline {
  position: relative;
  height: 20px;
}
.pay {
  right: 0;
  top: 0;
  position: absolute;
  font-size: 16px;
  color: #fa6041;
}
.padding-enable {
  padding: 0;
}

.main-wrapper {
  padding: 2% 4% 2% 4%;
}
a {
  cursor: pointer;
}
.panel-wrapper {
  padding-bottom: 5%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
img {
  width: 100%;
}

.header-wrapper {
  padding: 2% 4% 0 4%;
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





  



