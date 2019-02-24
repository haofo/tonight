<template>
  <div>
    <el-dialog title="处方" :visible.sync="isShow" width="80%" @close="close" @open="open">
      <el-form :inline="true" :model="add" ref="add" class="form-add">
        <el-form-item label="日期">
          <el-date-picker
            v-model="add.date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="处方编号(自动生成)">
          <el-input v-model="add.code" disabled></el-input>
        </el-form-item>
        <p>
          所用药物: 
          <el-button type="primary" circle icon="el-icon-plus" @click="plus"></el-button>
        </p>
        <section v-for="(item, index) in list" :key="index">
          <OneDrug :drug="item" :allDrug="allDrug" @minus="minus(index)"></OneDrug>
        </section>
        <el-form-item label="处方金额">
          <el-input v-model="add.amount" placeholder="处方金额" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea"
            :rows="2" v-model="add.remark" placeholder="备注" clearable></el-input>
        </el-form-item>
        <div>
          <el-button @click="confrim" type="primary">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import OneDrug from './OneDrug'

export default {
  name: 'prescription-add',
  components: {
    OneDrug
  },
  props: {
    info: {
      default: () => {}
    },
    showAdd: {
      required: true,
      default: false
    },
    newCode: {
      default: ''
    }
  },
  data() {
    return {
      isShow: this.showAdd,
      add: {
        date: dayjs().format('YYYY-MM-DD'),
        code: this.newCode,
        amount: '',
        remark: ''
      },
      list: [
        {
          name: '',
          consumption: '',
          unit: '',
          inventory: ''
        }
      ],
      allDrug: []
    }
  },
  watch: {
    showAdd(newV) {
      this.isShow = newV
    },
    newCode(newV) {
      this.add.code = newV
    }
  },
  methods: {
    queryAll() {
      this.$find(this.$db.store, {}).then((res) => {
        this.allDrug = res
      })
    },
    open() {
      this.queryAll()
    },
    close() {
      this.reset()
      this.$emit('close')
    },
    reset() {
      this.$refs.add.resetFields()
      this.list = [{
        name: '',
        consumption: '',
        unit: '',
        inventory: ''
      }]
    },
    plus() {
      this.list.push({
        name: '',
        consumption: '',
        unit: '',
        inventory: ''
      })
    },
    minus(index) {
      this.list.splice(index, 1)
    },
    async confrim() {
      const result = {
        ...this.add,
        list: this.list
      }
      const sufficient = this.list.every((val) => {
        const item = this.allDrug.find(ele => ele.drugName === val.drugName)
        return item && item.inventory * 1 > val.consumption * 1
      })
      if (sufficient) {
        this.$insert(this.$db.prescription, result).then(() => {
          this.reset()
          this.isShow = false
        })
        this.list.forEach((val) => {
          this.$findOne(this.$db.store, { drugName: val.drugName })
            .then((drug) => {
              const oldData = drug[0]
              const newInventory = oldData.inventory - (val.consumption * 1)
              this.$update(
                this.$db.store,
                { drugCode: oldData.drugCode },
                { $set: { inventory: newInventory } }
              )
              const newRecord = {
                date: dayjs().format('YYYY-MM-DD'),
                token: 0,
                inventory: val.consumption,
                drugCode: oldData.drugCode,
                drugName: oldData.drugName,
                specifications: oldData.specifications,
                unit: oldData.unit,
                remark: '处方出库'
              }
              this.$insert(
                this.$db.record,
                newRecord
              )
            })
        })
      } else {
        this.$message({
          message: '库存不足，请检查所用药物库存',
          type: 'warning'
        })
      }
    }
  }
}
</script>