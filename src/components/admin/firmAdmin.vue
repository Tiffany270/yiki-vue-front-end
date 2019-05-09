<template>
  <div>
    <el-table :data="data" style="width: 100%">
      <el-table-column label="id" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.cid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.cname }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="公司名称" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.clabelname }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="邮件" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.cemail }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="密码" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.cpassword }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button size="mini" type="danger" @click="openDialog(scope.row.cid)">删除</el-button>
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
  name: "firmAdmin",
  data() {
    return {
      dialogVisible: false,
      data: null,
      currentId: null
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
        url: "/AllFirm"
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
        method: "delete",
        url: "/deletFirm/" + id
      })
        .then(x => {
          this.$message.success("删除成功");
          this.getData();
        })
        .catch(error => {
          this.$message.error("网络错误");
        });
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
