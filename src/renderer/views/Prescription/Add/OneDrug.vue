<template>
  <div>
    <el-form :inline="true" :model="drug">
      <el-form-item label="药品名称" prop="name">
          <el-select v-model="drug.drugName" placeholder="药品名称（可搜索）"
          @change="selected"
          clearable
          filterable>
            <el-option
              v-for="(item, index) in this.allDrug"
              :key="index"
              :label="item.drugName"
              :value="item.drugName">
            </el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="用量" prop="consumption">
        <el-input v-model="drug.consumption" placeholder="用量" clearable></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="consumption">
        {{drug.unit}}
      </el-form-item>
      <el-form-item label="当前库存" prop="inventory">
        {{drug.inventory}}
      </el-form-item>
      <el-button type="primary" circle icon="el-icon-minus" @click="minus"></el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'OneDrug',
  props: {
    drug: {
      default: () => {}
    },
    allDrug: {
      default: () => []
    }
  },
  data() {
    return {
      inventory: 0
    }
  },
  methods: {
    minus() {
      this.$emit('minus')
    },
    selected(val) {
      const ele = this.allDrug.find(item => item.drugName === val)
      this.drug.unit = ele.unit
      this.drug.inventory = ele.inventory
    }
  }
}
</script>