<template>
  <div class="app-container">
    <el-form ref="templateForm" :model="templateForm" class="template-form">
      <el-form-item>
        <el-input
          v-model="templateForm.date"
          prop="date"
          placeholder="选择时间"
          autocomplete="true"
          class="input-template-id"
        />
        <el-button type="primary" size="medium" @click="query">查 询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格列表页 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      fit
      highlight-current-row
      :header-row-style="{ color: '#56585b', order: 'descending' }"
      element-loading-text="加载中"
    >
      <el-table-column prop="id" label="车辆编号" align="center" />
      <el-table-column prop="carName" label="车辆名称" align="center" />
      <el-table-column prop="line" label="所属路线" align="center" />
      <el-table-column prop="status" label="状态" align="center" />
      <el-table-column prop="operation" label="操控方式" align="center" />
      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleView(scope.row.id)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page-block">
      <el-pagination
        background
        :current-page="currentPage"
        :page-sizes="[10, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 车辆详情弹出框 -->
    <el-dialog :title="'车辆详情'" :visible.sync="dialogVisible" width="65%">
      <el-form :model="detailData" disabled>
        <el-row>
          <el-col :span="12">
            <el-form-item label="车辆编号" :label-width="labelWidth">
              <el-input v-model="detailData.id" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车辆名称" :label-width="labelWidth">
              <el-input v-model="detailData.carName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="行使里程" :label-width="labelWidth">
              <el-input v-model="detailData.distance" width="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="油耗" :label-width="labelWidth">
              <el-input v-model="detailData.gas" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="作业量" :label-width="labelWidth">
              <el-input v-model="detailData.programs" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作时间" :label-width="labelWidth">
              <el-input v-model="detailData.time" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="利用率" :label-width="labelWidth">
              <el-input v-model="detailData.output" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import programAPI from "@/api/program";

export default {
  data() {
    return {
      templateForm: {
        code: ""
      },
      list: [],
      listLoading: true,
      currentPage: 1,
      dialogVisible: false,
      labelWidth: "100px",
      detailData: {
        id: "",
        carName: "",
        distance: "",
        gas: "",
        programs: "",
        time: "",
        output: ""
      }
    };
  },
  created() {
    this.query();
  },
  methods: {
    reset(formName) {
      this.$refs[formName].resetFields();
    },
    // 查询施工作业
    query() {
      programAPI
        .getCarInfoList(this.templateForm.id)
        .then(response => {
          this.list = response.data.items;
          this.listLoading = false;
        })
        .catch(() => {
          this.$message.error("查询车辆列表错误");
          this.listLoading = true;
        });
    },
    // 查看施工作业详情
    handleView(id) {
      programAPI
        .getCarDetails(id)
        .then(response => {
          this.detailData = response.data.items;
          this.dialogVisible = true;
        })
        .catch(() => {
          this.$message.error("查询车辆详情错误");
          this.detailData = {};
        });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped>
.template-form {
  margin-left: 0;
  margin-top: 20px;
}
.input-template-id {
  width: 180px;
  margin-right: 20px;
}
.page-block {
  margin-top: 20px;
}
.headerclass {
  color: #56585b;
}
.dialog-footer {
  text-align: center;
}
.el-dialog__body {
  padding-right: 100px;
  padding-left: 100px;
}
</style>
