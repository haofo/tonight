<template>
  <div>
    <el-card shadow="never">
      <el-form :inline="true" :model="query" ref="query" class="store-query">
        <el-form-item label="药品编码" prop="code">
          <el-input v-model="query.code" placeholder="药品编码"></el-input>
        </el-form-item>
        <el-form-item label="药品名称" prop="name">
          <el-select v-model="query.name" placeholder="药品名称">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <el-button icon="el-icon-delete" @click="reset">清空</el-button>
        </el-form-item>
      </el-form>
      <section class="optr-group">
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="addOne">新增</el-button>
        <el-button type="danger" icon="el-icon-delete">删除</el-button>
        <el-button type="warning" icon="el-icon-edit" @click="modify">修改</el-button>
        
      </section>
    </el-card>
    <page-table :columns="columns" :tableData="tableData3" @select="handSelect"></page-table>
    <add-one :showAdd="showAdd" @close="showAdd=false" :info="modifyInfo"></add-one>
  </div>
</template>

<script>
import AddOne from './AddOne'
export default {
  name: 'Dictionaries',
  components: {
    AddOne,
  },
  data() {
    return {
      query: {
        code: '',
        name: '',
        // date: '',
        status: ''
      },
      columns: [
        {
          label: '药品编码',
          key: 'date'
        },
        {
          label: '药品名称',
          key: 'date'
        },
        {
          label: '规格',
          key: 'date'
        },
        {
          label: '单位',
          key: 'date'
        },
        {
          label: '警戒值',
          key: 'date'
        },
      ],
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      selectedList: [],
      showAdd: false,
      modifyInfo: {}
    }
  },
  computed: {
    activeOne() {
      return this.selectedList[0]
    }
  },
  methods: {
    reset() {
      this.$refs.query.resetFields();
    },
    handSelect(val) {
      this.selectedList = val
    },
    warning() {
      if (!this.activeOne) {
        this.$message({
          message: '请至少选中一条数据',
          type: 'warning'
        })
      }
      return this.activeOne
    },
    addOne() {
      debugger
      this.modifyInfo = {}
      this.showAdd = true
    },
    modify() {
      if (this.warning()) {
        this.showAdd = true
        this.modifyInfo = this.activeOne
      }
    }
  },
}
</script>