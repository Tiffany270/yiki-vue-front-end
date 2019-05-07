<template>
  <el-container>
    <el-row class="top-bar" :gutter="20">
      <el-col :span="20" class="pointer">
        <div @click="backToMain">
          <h2>welcome here find your fav</h2>
        </div>
      </el-col>
      <el-col :span="2">
        <div v-if="!name">
          <a>
            <router-link to="/auth">登录</router-link>
          </a>
        </div>
        <div v-if="name">
          <a @click="gotoInfo">welcome!!!{{name}}</a>
        </div>
      </el-col>
      <el-col :span="2">
        <div v-if="!name">
          <a>
            <router-link to="/auth">注册</router-link>
          </a>
        </div>
        <div v-if="name">
          <a @click="quit">退出</a>
        </div>
      </el-col>
    </el-row>
    <!-- 上方需要保留 -->

    <el-row class="search" type="flex" justify="center">
      <el-col :span="8">
        <el-input v-model="searchKey" placeholder="搜索一下"></el-input>
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
        <el-button type="info" @click="regetData">search</el-button>
      </el-col>
    </el-row>

    <el-main v-if="JDdatalist" class="main-wrapper">
      <div v-for="item in JDdatalist" @click="toMainJD(item.jid)" :key="item.jid" class="block">
        <el-row>
          <el-col :span="12">
            <div>
              <span class="jobtitle">{{item.opc}}</span>
              {{item.relDate}}发布
            </div>
            <div>
              <span class="salary">{{item.pay}}</span>
              {{item.type}}/{{item.degree}}
            </div>
          </el-col>
          <el-col :span="12">
            <div class="Ctitle">{{item.cname}}</div>
            <div>/{{item.location}}/{{item.exp}}</div>
          </el-col>
        </el-row>

        <el-row class="bg-purple">
          <el-col :span="12">
            <el-tag type="info">{{item.tab}}</el-tag>
          </el-col>
          <el-col :span="12">
            <div>"{{item.attr}}"</div>
          </el-col>
        </el-row>
      </div>
    </el-main>

    <el-header class="header-wrapper">@yiki.com</el-header>
  </el-container>
</template>

<script>
export default {
  name: "searchPage",
  data() {
    return {
      searchKey: "",
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
      input: "",
      value: "职位",
      name: "",
      auth: null,
      JDdatalist: null
    };
  },
  created() {
    if (localStorage.getItem("auth") !== null) {
      this.auth = JSON.parse(localStorage.getItem("auth"));
      this.name = this.auth.name;
    }
  },
  methods: {
    //返回主页
    backToMain() {
      this.$router.push({ path: "/" });
    },
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
    },
    getJDdata: function() {
      this.axios({
        method: "GET",
        url: "/job/" + this.$route.params.ele
      })
        .then(x => {
          this.JDdatalist = x.data;
        })
        .catch(error => {
          this.$message.error("网络错误");
        });
    },
    regetData() {
      this.axios({
        method: "GET",
        url: "/job/" + this.searchKey
      })
        .then(x => {
          this.JDdatalist = x.data;
        })
        .catch(error => {
          this.$message.error("网络错误");
        });
    }
  },
  mounted() {
    setTimeout(() => {
      this.getJDdata();
    }, 0);
  }
};
</script>



<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
.bg-purple {
  padding: 0.5%;
  background: #d3dce6;
}
.block {
  padding: 1%;
  color: #555;
  border: 1px solid #ededed;
  margin-top: 18px;
  cursor: pointer;
}
.salary {
  font-size: 16px;
  color: #fd5f39;
}
.jobtitle {
  margin: 0;
  font-size: 16px;
  color: #00b38a;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  font-weight: bold;
}
.Ctitle {
  font-weight: bold;
  font-size: 16px;
  color: #4274a9;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
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





  



