<template>
  <el-container>
    <el-aside width="50px">
      <AsideMenu></AsideMenu>
    </el-aside>
    <el-container>
      <el-header>
        <h3>{{title}}</h3>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AsideMenu from './Aside/AsideMenu.vue'
export default {
  name: 'Layout',
  components: {
    AsideMenu
  },
  data() {
    return {
      title: '当前库存'
    }
  },
  watch: {
    '$route.matched': function routeActive(val) {
      let title = ''
      if (val && val.length > 0) {
        ({ title } = val[val.length - 1].meta)
        this.title = title
      }
    }
  },
}
</script>
