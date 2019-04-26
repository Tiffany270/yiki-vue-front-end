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
          <a @click="gotoInfo">welcome!!!</a>
        </div>
      </el-col>
      <el-col :span="2">
        <div v-if="!name" class="grid-content bg-purple">
          <a>
            <router-link to="/auth">注册</router-link>
          </a>
        </div>
        <div v-if="name" class="grid-content bg-purple">
          <a>
            <router-link to="/auth">退出</router-link>
          </a>
        </div>
      </el-col>
    </el-row>
    <!-- 上方需要保留 -->

    <el-row class="search" type="flex" justify="center">
      <el-col :span="8">
        <el-input v-model="input" placeholder="搜索一下"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="info">search</el-button>
      </el-col>
    </el-row>
    <!-- 头部导航和bannner分割线-----don't know why~ -->
    <div class="header-wrapper">
      <div>
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="homebanner">
              <el-carousel :interval="5000" arrow="always">
                <el-carousel-item v-for=" pic in bannerimgurls" :key="pic">
                  <img :src="pic">
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="homesiderbar">
              <el-tabs tab-position="right">
                <el-tab-pane label="技术">
                  <el-card class="box-card" style="height: 300px;">
                    <div slot="header" class="clearfix">
                      <span>技术</span>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
                    <el-progress :percentage="100" status="success"></el-progress>
                  </el-card>
                </el-tab-pane>
                <el-tab-pane label="设计">设计</el-tab-pane>
                <el-tab-pane label="产品">产品</el-tab-pane>
                <el-tab-pane label="运营">运营</el-tab-pane>
                <el-tab-pane label="市场">市场</el-tab-pane>
                <el-tab-pane label="销售">销售</el-tab-pane>
                <el-tab-pane label="游戏">游戏</el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-main class="main-wrapper">
      <el-tabs class="panel-wrapper" v-model="activeName">
        <el-tab-pane label="热门公司" name="first">
          <el-row>
            <el-col :span="4" v-for="(item) in firmInfoListData" :key="item.cid" :offset=" 1 ">
              <el-card style="cursor:pointer" :body-style="{ padding: '0px' }">
                <img
                  @click="toMainFirm(item.cid)"
                  src="https:////www.lgstatic.com/thumbnail_160x160/i/image2/M01/8D/84/CgotOVubY2uAQ2pWAAIHadcTOGA593.png"
                  class="image"
                >
                <div style="padding: 14px;">
                  <span>{{item.name }}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{item.brief }}</time>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-tabs class="panel-wrapper" v-model="activeName">
        <el-tab-pane label="热门职位" name="first">
          <el-row>
            <el-col :span="4" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 2 : 0">
              <el-card :body-style="{ padding: '0px' }">
                <img
                  src="https:////www.lgstatic.com/thumbnail_160x160/i/image2/M01/8D/84/CgotOVubY2uAQ2pWAAIHadcTOGA593.png"
                  class="image"
                >
                <div style="padding: 14px;">
                  <span>好吃的汉堡</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button">操作按钮</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 2 : 0">
              <el-card :body-style="{ padding: '0px' }">
                <img
                  src="https:////www.lgstatic.com/thumbnail_160x160/i/image2/M01/8D/84/CgotOVubY2uAQ2pWAAIHadcTOGA593.png"
                >
                <div style="padding: 14px;">
                  <span>好吃的汉堡</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button">操作按钮</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-main>

    <el-header class="header-wrapper">@yiki.com</el-header>
  </el-container>
</template>

<script>
export default {
  name: "webMain",
  data() {
    return {
      currentDate: "xxx",
      activeName: "first",
      bannerimgurls: [
        "https://sxsimg.xiaoyuanzhao.com/1C/91/1C49B905FC50A45FCC41C53527CBB291.png",
        "https://sxsimg.xiaoyuanzhao.com/64/E8/64AC3A9EA68D67D0590E2BAF7BD485E8.png",
        "https://sxsimg.xiaoyuanzhao.com/73/DC/73A14E131C300E223BB5EEDE6D5AC7DC.png",
        "https://sxsimg.xiaoyuanzhao.com/7B/A2/7B3B8852D5C258D7AD364FE175CE56A2.png"
      ],
      firmInfoListData: null,
      name: "",
      msg: "Welcome to Your Vue.js App",
      input: ""
    };
  },
  created() {
    if (localStorage.getItem("auth") !== null) {
      this.name = JSON.parse(localStorage.getItem("auth")).name;
    }
  },
  methods: {
    toMainFirm: function(id) {
      console.log("xxxxx");
      this.$router.push({ path: "/mainFirm/" + id });
    },
    gotoInfo: function() {
      this.$router.push({ path: "/userInfo" });
    },
    getAllFirmInfo: function() {
      this.axios({
        method: "get",
        url: "/allFirmInfo"
      }).then(x => {
        this.firmInfoListData = x.data;
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.getAllFirmInfo();
    }, 0);
  }
};
</script>



<style lang="scss" scoped>
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





  



