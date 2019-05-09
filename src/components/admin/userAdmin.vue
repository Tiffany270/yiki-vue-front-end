<template>
  <div>
    <el-table :data="data" style="width: 100%">
      <el-table-column label="id" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.uname }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="邮件" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.uemail }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="密码" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.upassword }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button size="mini" type="danger" @click="openDialog(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>确定删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="okDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "userAdmin",
  data() {
    return {
      dialogVisible: false,
      data: null,
      currentId: null,
    };
  },
  methods: {
    openDialog(id) {
      this.currentId = id;
      this.dialogVisible = true;
    },
    okDelete() {
      this.deleteItem(this.currentId);
      this.dialogVisible = false;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    getData() {
      this.axios({
        method: "GET",
        url: "/AllUser"
      })
        .then(x => {
          this.data = x.data;
        })
        .catch(error => {
          this.$message.error("网络错误");
        });
    },
    deleteItem(id) {
      this.axios({
        method: "get",
        url: "/deletUser/" + id
      })
        .then(x => {
          this.$message.success("删除成功");
          this.getData();
        })
        
    }
  },
  mounted() {
    setTimeout(() => {
      this.getData();
    }, 0);
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
