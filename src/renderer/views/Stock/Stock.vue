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
        <el-form-item label="库存状态" prop="status">
          <el-radio-group v-model="query.status">
          <el-radio :label="0">正常</el-radio>
          <el-radio :label="1">低于警戒值</el-radio>
        </el-radio-group>
        </el-form-item>
      </el-form>
      <section class="optr-group">
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="batchInsert">批量入库</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="del">删除全部</el-button>
        <el-button type="primary" icon="el-icon-search" @click="queryPages(1)">查询</el-button>
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
import { parse, compactObj } from '@/libs/util'
import dayjs from 'dayjs'
export default {
  name: 'Store',
  data() {
    return {
      query: {
        drugCode: '',
        drugName: '',
        // date: '',
        status: ''
      },
      columns: [
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
          label: '库存',
          key: 'inventory'
        },
        {
          label: '单位',
          key: 'unit'
        },
        {
          label: '警戒值',
          key: 'warningValue'
        },
        {
          label: '市场单价/元',
          key: 'price'
        },
        {
          label: '状态',
          key: 'status'
        }
      ],
      allDrug: [],
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  created() {
    this.init()
  },
  methods: {
    reset() {
      this.$refs.query.resetFields();
    },
    queryAll() {
      this.$find(this.$db.store, {}).then((res) => {
        this.total = res.length
        this.allDrug = res
      })
    },
    queryPages(page) {
      this.currentPage = page
      const option = compactObj(this.query)
      this.$paging(this.$db.store, option, { drugCode: 1 }, page).then((res) => {
        this.tableData = res
      })
    },
    init() {
      this.queryAll()
      this.queryPages()
    },
    async batchInsert() {
      const res = await parse(this.$electron.remote.dialog)
      const { data } = res[0]
      const doc = []
      await data.forEach(async (val, ind) => {
        if (ind > 0) {
          const item = {}
          val.forEach((ele, index) => {
            item[this.columns[index].key] = ele
          })
          item.status = item.inventory > item.warningValue ? 0 : 1
          const isExist = await this.$find(this.$db.store, { drugCode: item.drugCode })
          if (isExist.length > 0) {
            const oldData = isExist[0]
            const newInventory = oldData.inventory + item.inventory
            this.$update(
              this.$db.store,
              { drugCode: item.drugCode },
              { $set: { inventory: newInventory } }
            )
            this.$insert(
              this.$db.record,
              Object.assign(
                oldData,
                {
                  inventory: item.inventory,
                  date: dayjs().format('YYYY-MM-DD'),
                  token: 1,
                  remark: '批量入库'
                }
              )
            )
          } else {
            const recordItem = {
              ...item,
              date: dayjs().format('YYYY-MM-DD'),
              token: 1,
              remark: '批量入库'
            }
            this.$insert(this.$db.record, recordItem)
            doc.push(item)
          }
        }
      })
      await this.$insert(this.$db.store, doc)
      this.init()
    },
    currentChange(val) {
      this.queryPages(val)
    },
    del() {
      this.$confirm('此操作会将全部数据删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Promise.all([
          this.$remove(this.$db.store, {}),
          this.$remove(this.$db.record, {})
        ])
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.init()
      })
    }
  },
}
</script>