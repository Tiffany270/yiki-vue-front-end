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
          <el-button icon="el-icon-edit" @click="edit" type="info" circle></el-button>
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

    <div v-if="data&&sendList" class="main-wrapper">
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
          <el-tab-pane label="在招职位" name="third">
            <div v-if="!AllJDlist">
              还没有招聘信息？
              <el-button type="info" @click="JDdialogVisible = true">创建招聘信息</el-button>
            </div>

            <el-table :data="AllJDlist" style="width: 100%">
              <el-table-column label="ID" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.relDate }}</span>
                  <span style="margin-left: 10px">{{ scope.row.jid }}</span>
                </template>
              </el-table-column>
              <el-table-column label="职位名称" width="180">
                <template slot-scope="scope">
                  <p>{{ scope.row.opc }}</p>
                  <el-popover trigger="hover" placement="top">
                    <p>{{ scope.row.location }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.tab }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-button type="info" @click="JDdialogVisible = true">新增招聘信息</el-button>
          </el-tab-pane>
          <el-tab-pane label="投递情况" name="fourth">
            <el-table :data="sendList" style="width: 100%">
              <el-table-column prop="id" label="id" width="180"></el-table-column>
              <el-table-column prop="uname" label="投递人" width="180"></el-table-column>
              <el-table-column prop="jname" label="投递职位" width="180"></el-table-column>
              <el-table-column prop="replay" label="状态" width="180"></el-table-column>
              <el-table-column label="Action">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <el-header class="header-wrapper">@yiki.com</el-header>
    <el-dialog title="详情" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <h1>求职者信息</h1>
            <div v-if="userReusmeData">姓名：{{userReusmeData.resume.name}}</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <h1>职位信息</h1>
            <div v-if="JDData">{{JDData.opc}}</div>
          </div>
        </el-col>
      </el-row>
      <h4>----------------------------------------------------------------------------------------------------------------------------------------</h4>
      <el-button type="success" @click="sendInterview" plain>发送面试邀请</el-button>
      <el-button type="info" @click="refuseInterview" plain>拒绝</el-button>
    </el-dialog>

    <el-dialog title="新增JD" :visible.sync="JDdialogVisible" width="80%" :before-close="handleClose">
      <el-form ref="JDform" :model="JDform" label-width="80px">
        <el-form-item label="职位名称">
          <el-input v-model="JDform.opc"></el-input>
        </el-form-item>
        <el-form-item label="职业类型">
          <el-input v-model="JDform.tab"></el-input>
        </el-form-item>
        <el-form-item label="经验限制">
          <el-input v-model="JDform.exp"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-select v-model="JDform.degree" placeholder="请选择">
            <el-option label="本科" value="本科"></el-option>
            <el-option label="研究生" value="研究生"></el-option>
            <el-option label="博士" value="博士"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职业类型">
          <el-select v-model="JDform.type" placeholder="请选择">
            <el-option label="全职" value="全职"></el-option>
            <el-option label="实习" value="实习"></el-option>
            <el-option label="兼职" value="兼职"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="吸引词">
          <el-input v-model="JDform.attr"></el-input>
        </el-form-item>
        <el-form-item label="职业描述">
          <el-input type="textarea" v-model="JDform.intro"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="JDform.cname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sureButton">立即创建</el-button>
          <el-button @click="JDdialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "aboutFirm",
  data() {
    return {
      sendList: null,
      activeNames: ["1"],
      activeName: "fourth",
      auth: null,
      name: "",
      msg: "Welcome to Your Vue.js App",
      input: "",
      fid: null,
      data: null,
      dialogVisible: false,
      JDdialogVisible: false,
      userReusmeData: null,
      JDData: null,
      currentSendId: null,
      AllJDlist: null,
      JDform: {
        cid: null,
        opc: "",
        tab: "",
        pay: "",
        location: "",
        exp: "",
        degree: "",
        type: "",
        attr: "",
        intro: "",
        intv: "",
        endDate: "",
        relDate: "",
        cname: ""
      }
    };
  },
  created() {
    if (localStorage.getItem("auth") !== null) {
      this.auth = JSON.parse(localStorage.getItem("auth"));
      this.fid = JSON.parse(localStorage.getItem("auth")).id;
    }
  },
  methods: {
    //---对JD的操作
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    sureButton() {
      this.JDform.cid = this.fid;
      this.axios({
        method: "post",
        url: "/JD/",
        data: this.JDform
      })
        .then(response => {
          if (response.data === 1) {
            this.$message("成功");
            this.JDdialogVisible = false;
            this.getJDforCdata();
          } else {
            this.$message.error("失败");
          }
        })
        .catch(error => {
          this.$message.error("网络错误");
        });
    },
    getJDforCdata: function() {
      this.axios({
        method: "get",
        url: "/JDbyC/" + this.fid
      }).then(x => {
        this.AllJDlist = x.data;
      });
    },

    //----对投递信息的操作
    sendInterview() {
      this.axios({
        method: "put",
        url: "/replay/" + this.currentSendId,
        data: {
          replay: 2
        }
      }).then(x => {
        this.userReusmeData = x.data;
        this.$message({
          message: "已成功发送面试邀请",
          type: "success"
        });
      });
    },
    refuseInterview() {
      this.$message({
        message: "已发送拒绝信",
        type: "warning"
      });
    },

    handleClick(row) {
      this.dialogVisible = true;
      this.getUserResumeData(row.uid);
      this.getJDforUserData(row.jid);
      this.currentSendId = row.id;
    },
    //---点击获取当前投递者的信息
    getUserResumeData: function(uid) {
      this.axios({
        method: "get",
        url: "/resume/" + uid
      }).then(x => {
        this.userReusmeData = x.data;
      });
    },
    //---点击获取当前投递者所投岗位的信息
    getJDforUserData: function(jid) {
      this.axios({
        method: "get",
        url: "/JD/" + jid
      }).then(x => {
        this.JDData = x.data;
      });
    },

    //----当前页面公司的所有投递信息
    getSendData: function() {
      this.axios({
        method: "get",
        url: "/send/" + this.fid
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
    handleClose(done) {
      this.dialogVisible = false;
    }
  },
  mounted() {
    setTimeout(() => {
      this.getResumeData();
      this.getSendData();
      this.getJDforCdata();
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





  



