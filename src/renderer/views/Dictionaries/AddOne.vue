<template>
  <div>
    <el-dialog :title="title" :visible.sync="isShow" width="80%" @close="close">
      <el-form :inline="true" label-width="100px" :model="add" ref="add" class="form-add">
        <el-form-item label="药品编码">
          <el-input v-model="add.drugCode" placeholder="药品编码"></el-input>
        </el-form-item>
        <el-form-item label="药品名称">
          <el-input v-model="add.drugName" placeholder="药品名称"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="add.drugName" placeholder="规格"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="add.drugName" placeholder="单位"></el-input>
        </el-form-item>
        <el-form-item label="警戒值">
          <el-input v-model="add.drugName" placeholder="警戒值"></el-input>
        </el-form-item>
        <div class="gap-md">
          <el-button @click="confrim" type="primary">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'add-one',
  props: {
    info: {
      default: () => {}
    },
    showAdd: {
      required: true,
      default: false
    }
  },
  data() {
    return {
      title: '新增药品',
      isShow: this.showAdd,
      add: {
        drugCode: '',
        drugName: '',
      },
      modifyInfo: this.info
    }
  },
  watch: {
    showAdd(newV) {
      this.isShow = newV
    },
    info(newV) {
      const keys = Object.keys(newV)
      if (keys.length > 0) {
        this.add = this.modifyInfo
        this.title = '修改'
      }
    }
  },
  methods: {
    close() {
      this.reset()
      this.$emit('close')
    },
    reset() {
      this.$refs.add.resetFields()
    },
    confrim() {
      // let result = {
      //   ...this.add,
      //   list: this.list
      // }
    }
  }
}
</script>