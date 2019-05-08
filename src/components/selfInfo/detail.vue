<template>
  <el-container>
    <el-row class="top-bar" :gutter="20">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <h2>个人中心</h2>
          <el-button @click="backToMain" round>主页</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div v-if="resumeData">
          <el-button icon="el-icon-edit" @click="reedit" type="info" circle></el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <a @click="quit">退出</a>
        </div>
      </el-col>
    </el-row>
    <!-- 上方需要保留 -->

    <div class="main-wrapper">
      <div v-if="!resumeData" style="width: 20%; margin: auto;">
        还没有你的简历~
        <el-button type="primary" @click="edit">立即创建</el-button>
      </div>

      <el-row v-if="resumeData">
        <!-- 左 -->
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <h1>{{resumeData.resume.name}}的简历</h1>
          </div>

          <div style="margin-top:30px">
            <el-tabs :tab-position="tabPosition">
              <el-tab-pane label="投递情况">
                <el-table :data="sendList" style="width: 80%">
                  <el-table-column prop="id" label="id" width="180"></el-table-column>
                  <el-table-column prop="uname" label="投递人" width="180"></el-table-column>
                  <el-table-column prop="jname" label="投递职位" width="180"></el-table-column>
                  <el-table-column prop="replay" label="状态" width="180"></el-table-column>
                  <el-table-column label="Action">
                    <template slot-scope="scope">
                      <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="简历">
                <div class="main-wrapper">
                  <div class="right-block">
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <span class="title">教育经历</span>
                      </div>
                      <div class="text">{{resumeData.resume.degree}}毕业于：{{resumeData.resume.school}}</div>
                    </el-card>
                  </div>
                  <div class="title">工作经历</div>
                  <div v-if="resumeData.workExps">
                    <div class="box-card" :key="item.name" v-for="item in resumeData.workExps">
                      <div slot="header" class="clearfix">
                        <span>{{item.name}}</span>
                        <span>{{item.opcdate}}</span>
                        <span>{{item.type}}行业</span>
                      </div>
                      <div class="text item">
                        <div>在{{item.dep}}部门担任{{item.ocp}}职位</div>
                        <div>详细职责：{{item.text}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <!-- 右 -->

        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="title">求职意向</span>
            </div>
            <div class="text">地点：{{resumeData.resume.region}}</div>
            <div class="text">薪资范围：{{resumeData.resume.pay}}</div>
            <div class="text">期望职位：{{resumeData.resume.occpation}}</div>
          </el-card>
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
      sendList: null,
      tabPosition: "left",
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
      uid: null
    };
  },
  created() {
    if (localStorage.getItem("auth") !== null) {
      this.name = JSON.parse(localStorage.getItem("auth")).name;
      this.uid = JSON.parse(localStorage.getItem("auth")).id;
    }
  },
  methods: {
    //返回主页
    backToMain() {
      this.$router.push({ path: "/" });
    },
    getResumeData: function() {
      this.axios({
        method: "get",
        url: "/resume/" + this.uid
      }).then(x => {
        this.resumeData = x.data;
      });
    },
    reedit() {
      this.$router.push({ path: "/reeditResume" });
    },
    edit: function() {
      this.$router.push({ path: "/myResume" });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //----当前页面公司的所有投递信息
    getSendData: function() {
      this.axios({
        method: "get",
        url: "/sendbyUser/" + this.uid
      }).then(x => {
        this.sendList = x.data;
        this.sendList.forEach(el => {
          switch (el.replay) {
            case -1:
              el.replay = "未查看";
              break;
            case 0:
              el.replay = "已查看";
              break;
            case 1:
              el.replay = "面试";
              break;
            case 2:
              el.replay = "已拒绝";
              break;
          }
        });
      });
    },

    //---退出
    quit() {
      localStorage.clear();
      this.$message({
        message: "已退出...即将跳转",
        type: "success"
      });
      setTimeout(() => {
        this.$router.push({ path: "/" });
      }, 3000);
    }
  },
  mounted() {
    setTimeout(() => {
      this.getResumeData();
      this.getSendData();
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
  width: 400px;
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
.text {
  font-size: 20px;
}
</style>





  



