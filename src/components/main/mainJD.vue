<template>
  <el-container>
    <el-row class="top-bar" :gutter="20">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <h2>个人中心</h2>
        </div>
      </el-col>
      <el-col :span="2">
        <div v-if="!auth" class="grid-content bg-purple">
          <a>
            <router-link to="/auth">登录</router-link>
          </a>
        </div>
        <div v-if="auth" class="grid-content bg-purple">
          <a @click="gotoResume">我的简历</a>
        </div>
      </el-col>
      <el-col :span="2">
        <div v-if="!auth" class="grid-content bg-purple">
          <a>
            <router-link to="/auth">注册</router-link>
          </a>
        </div>
        <div v-if="auth" class="grid-content bg-purple">
          <a>
            <router-link to="/auth">退出</router-link>
          </a>
        </div>
      </el-col>
    </el-row>
    <!-- 上方需要保留 -->

    <div v-if="JDdatalist" class="main-wrapper">
      <div class="main-header">
        <el-row>
          <el-col :span="6">
            <div class="center">
              <el-button v-if="alreadypost" type="success" plain disabled>已投递</el-button>
              <el-button v-if="!alreadypost" @click="makesurePost" plain>投递简历</el-button>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="main-header-right-block">
              <div>{{JDdatalist.opc}}</div>
            </div>
            <div class="main-header-right-block" style="font-size:15px;">
              <div>{{JDdatalist.tab}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="main-content">
        薪资：{{JDdatalist.pay}}
        薪资：{{JDdatalist.exp}}
        薪资：{{JDdatalist.location}}
        薪资：{{JDdatalist.type}}

      </div>
    </div>

    <el-dialog title="提示" :visible.sync="okdialog" width="30%" :before-close="handleClose">
      <span>确认投递该职位？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="okdialog = false">取 消</el-button>
        <el-button type="primary" @click="postResume">确 定</el-button>
      </span>
    </el-dialog>

    <el-header class="header-wrapper">@yiki.com</el-header>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "mainJD",
  data() {
    return {
      alreadypost: false,
      okdialog: false,
      activeNames: ["1"],
      activeName: "first",
      auth: null,
      msg: "Welcome to Your Vue.js App",
      input: "",
      fid: null,
      JDdatalist: null
    };
  },
  created() {
    if (localStorage.getItem("auth") !== null) {
      this.auth = JSON.parse(localStorage.getItem("auth"));
    }
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    getJDdata: function() {
      this.axios({
        method: "GET",
        url: "/JD/" + this.$route.params.id
      })
        .then(x => {
          this.JDdatalist = x.data;
        })
        .catch(error => {
          this.$message.error("网络错误");
        });
    },
    gotoResume: function() {
      this.$router.push({ path: "/myResume" });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(done) {
      this.$confirm("确认投递？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    makesurePost() {
      if (!this.auth) {
        this.$message.error("请先登录");
      } else {
        this.okdialog = true;
      }
    },

    postResume() {
      this.submitResume();
      this.okdialog = false;
    },
    submitResume() {
      this.axios({
        method: "post",
        url: "/send/",
        data: {
          uid: this.auth.id,
          uname:this.auth.name,
          cid: this.JDdatalist.cid,
          jid: this.$route.params.id,
          jname:this.JDdatalist.opc,
          replay: -1
        }
      })
        .then(x => {
          console.log(x, typeof x);
          if (x.data === 1) {
            this.$message.success("投递成功");
          } else {
            this.$message.error("投递失败;或许您已经投递过了");
          }
        })
        .catch(error => {
          this.$message.error("网络错误");
        });
    },
    checkAlredyPost() {
      this.axios({
        method: "post",
        url: "/checkPost",
        data: {
          uid: parseInt(this.auth.id),
          jid: parseInt(this.$route.params.id)
        }
      })
        .then(x => {
          if (x.data === 1) {
            this.alreadypost = true;
          } else {
            this.alreadypost = false;
          }
        })
        .catch(error => {
          this.$message.error("网络错误");
        });
    }
  },
  mounted() {
    setTimeout(() => {
      this.getJDdata();
      this.checkAlredyPost();
    }, 0);
  }
};
</script>



<style lang="scss" scoped>
.main-header {
  height: 200px;
  width: 80%;
  background: #3a4858;
  margin: auto;
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
  width: 80%;
  border: #d3dce6 1px solid;
  margin: auto;
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
.center {
  margin: auto;
  height: 100px;
  width: 100px;
  margin-top: 50px;
}
</style>





  



