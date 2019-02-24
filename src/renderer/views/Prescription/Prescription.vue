<template>
  <div>
    <el-card shadow="never">
      <el-form :inline="true" :model="query" ref="query" class="store-query">
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="query.date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
          <el-button type="primary" icon="el-icon-search" @click="queryPages(1)">查询</el-button>
          <el-button icon="el-icon-delete" @click="reset">清空</el-button>
        </el-form-item>
      </el-form>
      <section class="optr-group">
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="add">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="del">删除</el-button>
        <el-button type="warning" icon="el-icon-view" @click="detail">用药明细</el-button>
      </section>
    </el-card>
    <page-table
      :columns="columns"
      :tableData="tableData"
      :total="total"
      :current="currentPage"
      @select="handleSelect"
      @current-change="currentChange">
    </page-table>
    <detail :showDetail="showDetail" :detailData="detailData" @close="showDetail=false"></detail>
    <prescription-add :showAdd="showAdd" @close="closeAdd" :newCode="newCode"></prescription-add>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { compactObj } from '@/libs/util'
import Detail from './Detail'
import PrescriptionAdd from './Add/Add'


export default {
  name: 'Prescription',
  components: {
    Detail,
    PrescriptionAdd
  },
  data() {
    return {
      query: {
        drugCode: '',
        drugName: '',
        date: '',
      },
      columns: [
        {
          label: '日期',
          key: 'date'
        },
        {
          label: '处方编号',
          key: 'code'
        },
        {
          label: '总金额',
          key: 'amount'
        },
        {
          label: '备注',
          key: 'remark'
        },
      ],
      tableData: [],
      selectedList: [],
      showDetail: false,
      detailData: [],
      allPrescription: [],
      showAdd: false,
      total: 0,
      currentPage: 1
    }
  },
  computed: {
    activeLen() {
      return this.selectedList.length
    },
    selectedOne() {
      return this.selectedList[0]
    },
    newCode() {
      const theDayFirstCode = `${parseFloat(dayjs().format('YYYYMMDD'))}1`
      const firstRecord = this.allPrescription.sort((a, b) => b.code - a.code)[0]
      return (firstRecord && firstRecord.code >= theDayFirstCode) ?
        `${parseFloat(firstRecord.code) + 1}` :
        theDayFirstCode
    }
  },
  created() {
    this.init()
  },
  methods: {
    reset() {
      this.$refs.query.resetFields();
    },
    init() {
      this.queryAll()
      this.queryPages()
    },
    queryAll() {
      this.$find(this.$db.prescription, {}, { code: -1 }).then((res) => {
        this.allPrescription = res
        this.total = res.length
      })
    },
    queryPages(page) {
      this.currentPage = page
      const option = compactObj(this.query)
      this.$paging(this.$db.prescription, option, { date: -1, code: -1 }, page)
        .then((res) => {
          this.tableData = res
        })
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
    add() {
      this.showAdd = true
    },
    async del() {
      if (this.warning()) {
        await this.selectedList.forEach(async (val) => {
          await this.$remove(this.$db.prescription, val)
          val.list.forEach(async (ele) => {
            const drug = await this.$findOne(this.$db.store, { drugName: ele.drugName })
            const oldData = drug[0]
            const newInventory = oldData.inventory + (ele.consumption * 1)
            const updateStore = this.$update(
              this.$db.store,
              { drugCode: oldData.drugCode },
              { $set: { inventory: newInventory } }
            )
            const newRecord = {
              date: dayjs().format('YYYY-MM-DD'),
              token: 1,
              inventory: ele.consumption,
              drugCode: oldData.drugCode,
              drugName: oldData.drugName,
              specifications: oldData.specifications,
              unit: oldData.unit,
              remark: '处方删除，重新入库'
            }
            const insertRecord = this.$insert(
              this.$db.record,
              newRecord
            )
            await Promise.all([updateStore, insertRecord])
          })
        })
        this.init()
      }
    },
    handleSelect(list) {
      this.selectedList = list
    },
    detail() {
      if (this.warning()) {
        if (this.selectedList.length > 1) {
          this.$message({
            message: '暂不支持查看多个处方详情，请选中一条记录',
            type: 'warning'
          })
          return
        }
        this.showDetail = true
        this.detailData = this.selectedOne.list
      }
    },
    closeAdd() {
      this.showAdd = false
      this.queryPages(1)
      this.queryAll()
    },
    currentChange(val) {
      this.queryPages(val)
    },
  },
}
</script>