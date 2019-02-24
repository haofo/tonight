<template>
  <div>
    <el-dialog title="当次采购明细" :visible.sync="isShow" width="80%" @close="close">
      <page-table :columns="detailColumns" :tableData="detailData"></page-table>
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
        {
          label: '日期',
          key: 'date'
        },
        {
          label: '进货批次号',
          key: 'date'
        },
        {
          label: '药品名称',
          key: 'date'
        },
        {
          label: '进货数量/g',
          key: 'date'
        },
        {
          label: '进货单价',
          key: 'date',
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