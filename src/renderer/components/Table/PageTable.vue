<template>
  <div>
    <section class="tonight-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        v-loading="isLoading"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :prop="item.key"
          :label="item.label">
        </el-table-column>
      </el-table>
    </section>
    <section v-if="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        @current-change="pageChange"
        :total="totalNum">
      </el-pagination>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PageTable',
  props: {
    columns: {
      // 加上 type 后 electron 抛错，版本太低？
      // Error in nextTick: "TypeError: Right-hand side of 'instanceof' is not an object"
      // type: 'Array',
      required: true,
      default: () => []
    },
    tableData: {
      // type: 'Array',
      // required: true,
      default: () => []
    },
    isLoading: {
      default: false
    },
    pagination: {
      default: true
    },
    total: {
      default: 0
    },
    current: {
      default: 1
    }
  },
  data() {
    return {
      totalNum: this.total,
      currentPage: this.current
    }
  },
  watch: {
    total(newV) {
      this.totalNum = newV
    },
    current(newV) {
      this.currentPage = newV
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('select', val)
    },
    pageChange(val) {
      this.$emit('current-change', val)
    }
  }
}
</script>