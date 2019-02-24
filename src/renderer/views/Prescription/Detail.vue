<template>
  <div>
    <el-dialog title="处方用药明细" :visible.sync="isShow" width="80%" @close="close">
      <page-table :columns="detailColumns" :tableData="detailData" :pagination="false"></page-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'detail',
  props: {
    detailData: {
      required: true,
      default: () => []
    },
    showDetail: {
      required: true,
      default: false
    }
  },
  watch: {
    showDetail(newV) {
      this.isShow = newV
    }
  },
  data() {
    return {
      isShow: false,
      detailColumns: [
        // {
        //   label: '药品编号',
        //   key: 'drugCode'
        // },
        {
          label: '药品名称',
          key: 'drugName'
        },
        {
          label: '用药量',
          key: 'consumption'
        },
        {
          label: '单位',
          key: 'unit',
        },
      ],
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>