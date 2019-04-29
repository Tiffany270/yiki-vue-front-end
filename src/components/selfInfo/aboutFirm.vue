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
      <div class="main-header">
        <el-row>
          <el-col :span="6">
            <div>logo</div>
          </el-col>
          <el-col :span="18">
            <div class="main-header-right-block">
              <div>{{data.name}}</div>
            </div>
            <div class="main-header-right-block" style="font-size:15px;">
              <div>{{data.intro}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="main-content">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane class="main-wrapper" label="公司主页" name="first">
            <el-row>
              <el-col :span="18">
                <div class="right-block">
                  <div class="title">公司介绍</div>
                  <div class="text">{{data.brief}}</div>
                </div>
              </el-col>
              <el-col :span="6">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <div class="title">基本信息</div>
                  </div>
                  <div class="right-block">
                    <div class="title">
                      <el-tag type="info">类型</el-tag>
                      {{data.type}}
                    </div>
                  </div>
                  <div class="right-block">
                    <div class="title">
                      <el-tag type="info">规模</el-tag>
                      {{data.num}}
                    </div>
                  </div>
                  <div class="right-block">
                    <div class="title">
                      <el-tag type="info">所在地</el-tag>
                      {{data.region}}
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane class="main-wrapper" label="公司详情" name="second">
            <div class="right-block">
              <div class="title">联系电话</div>
              <div class="text">{{data.phone}}</div>
            </div>
            <div class="right-block">
              <div class="title">联系邮箱</div>
              <div class="text">{{data.email}}</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="在招职位" name="third">在招职位</el-tab-pane>
          <el-tab-pane label="常见问题" name="fourth">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="一致性 Consistency" name="1">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              </el-collapse-item>
              <el-collapse-item title="反馈 Feedback" name="2">
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              </el-collapse-item>
              <el-collapse-item title="效率 Efficiency" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              </el-collapse-item>
              <el-collapse-item title="可控 Controllability" name="4">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <el-header class="header-wrapper">@yiki.com</el-header>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "aboutFirm",
  data() {
    return {
      activeNames: ["1"],
      activeName: "first",
      auth: null,
      name: "",
      msg: "Welcome to Your Vue.js App",
      input: "",
      fid: null,
      data: null
    };
  },
  created() {
    if (localStorage.getItem("auth") !== null) {
      this.auth = JSON.parse(localStorage.getItem("auth"));
      this.fid = JSON.parse(localStorage.getItem("auth")).id;
    }
  },
  methods: {
    edit() {
      this.$router.push({ path: "/firmInfo" });
    },
    handleChange(val) {
      console.log(val);
    },
    getResumeData: function() {
      this.axios({
        method: "get",
        url: "/firmInfo/" + this.fid
      }).then(x => {
        this.data = x.data;
      });
    },
    gotoResume: function() {
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
.main-header {
  height: 200px;
  width: 100%;
  background: #3a4858;

  .main-header-right-block {
    color: white;
    font-weight: bold;
    padding: 4% 3% 2% 1%;
    font-size: 30px;
  }
}
.el-tabs__item {
  padding: 0 30px;
  font-size: 18px;
}
.title {
  font-size: 15px;
  font-weight: bold;
}
.main-content {
  height: 600px;
}
.text {
  font-size: 16px;
  line-height: 16px;
}
.right-block {
  height: 50px;
}
.main-wrapper {
  padding: 5% 10% 5% 10%;
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
</style>





  



