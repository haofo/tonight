<template>
  <div>
    <el-card shadow="never">
      <el-form :inline="true" :model="query" ref="query" class="store-query">
        <el-form-item label="药品编码" prop="drugCode">
          <el-input v-model="query.drugCode" placeholder="药品编码"></el-input>
        </el-form-item>
        <el-form-item label="药品名称" prop="drugName">
          <el-select v-model="query.drugName" placeholder="药品名称（可搜索）" 
          filterable>
            <el-option
              v-for="(item, index) in this.allDrug"
              :key="index"
              :label="item.drugName"
              :value="item.drugName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="query.date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="库存操作" prop="token">
          <el-radio-group v-model="query.token">
          <el-radio :label="0">出库</el-radio>
          <el-radio :label="1">入库</el-radio>
        </el-radio-group>
        </el-form-item>
      </el-form>
      <section class="optr-group">
        <el-button type="primary" icon="el-icon-search" @click="queryPages(0)">查询</el-button>
        <el-button icon="el-icon-delete" @click="reset">清空</el-button>
      </section>
    </el-card>
    <page-table
      :columns="columns"
      :tableData="tableData"
      :total="total"
      :current="currentPage"
      @current-change="currentChange">
    </page-table>
  </div>
</template>

<script>
import { compactObj } from '@/libs/util'
export default {
  name: 'Store',
  data() {
    return {
      query: {
        drugCode: '',
        drugName: '',
        date: '',
        token: undefined
      },
      columns: [
        {
          label: '日期',
          key: 'date'
        },
        {
          label: '药品编码',
          key: 'drugCode'
        },
        {
          label: '药品名称',
          key: 'drugName'
        },
        {
          label: '规格',
          key: 'specifications'
        },
        {
          label: '当次操作数量',
          key: 'inventory'
        },
        {
          label: '单位',
          key: 'unit'
        },
        {
          label: '出入库标识',
          key: 'token'
        },
        {
          label: '备注',
          key: 'remark'
        }
      ],
      allDrug: [],
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  created() {
    this.queryAll()
    this.queryPages()
  },
  methods: {
    reset() {
      this.$refs.query.resetFields();
      // this.$remove(this.$db.record, {}).then(res => console.log(res))
    },
    queryAll() {
      this.$find(this.$db.record, {}).then((res) => {
        this.total = res.length
      })
      this.$find(this.$db.store, {}).then((res) => {
        this.allDrug = res
      })
    },
    queryPages(page) {
      this.currentPage = page
      const option = compactObj(this.query)
      this.$paging(this.$db.record, option, { drugCode: 1, date: -1 }, page).then((res) => {
        this.tableData = res
      })
    },
    currentChange(val) {
      this.queryPages(val)
    },
  },
}
</script>