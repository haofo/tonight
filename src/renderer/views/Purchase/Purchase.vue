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
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="query.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <section class="optr-group">
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="insert">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="del">删除</el-button>
        <el-button type="warning" icon="el-icon-view" @click="detail">明细</el-button>
        <el-button type="primary" icon="el-icon-search">查询</el-button>
        <el-button icon="el-icon-delete" @click="reset">清空</el-button>
      </section>
    </el-card>
    <page-table :columns="columns" :tableData="tableData3" @select="handleSelect"></page-table>
    <detail :showDetail="showDetail" :detailData="detailData" @close="showDetail=false"></detail>
  </div>
</template>

<script>
import parse from '@/libs/util'
import Detail from './Detail'
export default {
  name: 'Purchase',
  components: {
    Detail
  },
  data() {
    return {
      query: {
        code: '',
        name: '',
        date: '',
        status: ''
      },
      columns: [
        {
          label: '日期',
          key: 'date'
        },
        {
          label: '进货批次号',
          key: 'date'
        },
        {
          label: '进货种类数量',
          key: 'date'
        },
        {
          label: '进货金额',
          key: 'date'
        },
      ],
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        list: [
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }
        ]
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
      }],
      selectedList: [],
      showDetail: false,
      detailData: []
    }
  },
  computed: {
    activeLen() {
      return this.selectedList.length
    },
    selectedOne() {
      return this.selectedList[0]
    }
  },
  methods: {
    reset() {
      this.$refs.query.resetFields();
    },
    warning() {
      if (this.activeLen < 1) {
        this.$message({
          message: '请至少选中一条数据',
          type: 'warning'
        })
      }
      return this.activeLen > 0
    },
    del() {
      this.warning()
    },
    handleSelect(list) {
      this.selectedList = list
    },
    detail() {
      if (this.warning()) {
        this.showDetail = true
        this.detailData = this.selectedOne.list
      }
    },
    insert() {
      parse(this.$electron.remote.dialog)
    }
  },
}
</script>