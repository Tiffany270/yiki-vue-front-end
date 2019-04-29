<template>
  <el-container>
      <el-row class="top-bar" :gutter="20">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <h2>个人中心</h2>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button icon="el-icon-edit" 
          @click="edit" type="info" circle></el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <a>
            <router-link to="/auth">退出</router-link>
          </a>
        </div>
      </el-col>
    </el-row>
    <!-- 上方需要保留 -->

    <div class="main-wrapper">
      <div v-if="!resumeData" style="width: 20%; margin: auto;">
        还没有你的简历~
        <el-button type="primary">立即创建</el-button>
      </div>

      <el-row v-if="resumeData">
        <!-- 左 -->
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>求职意向</span>
                <el-button style="float: right; padding: 3px 0" type="text">Edit</el-button>
              </div>
              <div v-for="o in 2" :key="o" class="text item">{{'列表内容 ' + o }}</div>
            </el-card>

            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <!-- 右 -->
        <el-col :span="16">
          <div class="main-wrapper">
            <div class="right-block">
              <div class="title">教育经历</div>
            </div>
            <div class="right-block">
              <div class="title">工作经历</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-header class="header-wrapper">@yiki.com</el-header>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "detail",
  data() {
    return {
      resumeData: null,
      currentDate: "xxx",
      activeName: "first",
      bannerimgurls: [
        "https://sxsimg.xiaoyuanzhao.com/1C/91/1C49B905FC50A45FCC41C53527CBB291.png",
        "https://sxsimg.xiaoyuanzhao.com/64/E8/64AC3A9EA68D67D0590E2BAF7BD485E8.png",
        "https://sxsimg.xiaoyuanzhao.com/73/DC/73A14E131C300E223BB5EEDE6D5AC7DC.png",
        "https://sxsimg.xiaoyuanzhao.com/7B/A2/7B3B8852D5C258D7AD364FE175CE56A2.png"
      ],
      name: "",
      msg: "Welcome to Your Vue.js App",
      input: "",
      uid: 2
    };
  },
  created() {
    if (localStorage.getItem("auth") !== null) {
      this.name = JSON.parse(localStorage.getItem("auth")).name;
    }
  },
  methods: {
    getResumeData: function() {
      this.axios({
        method: "get",
        url: "/resume/" + this.uid
      }).then(x => {
        this.resumeData = x.data;
      });
    },
    edit: function() {
      this.$router.push({ path: "/myResume" });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    setTimeout(() => {
      this.getResumeData();
    }, 0);
  }
};
</script>



<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-weight: bold;
}
.right-block {
     width: 500px;
    height: 140px;
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





  



