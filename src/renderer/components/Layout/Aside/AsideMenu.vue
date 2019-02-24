<template>
  <div>
    <div class="menu-item" v-for="item in menuList" :key="item.icon">
      <span 
        :class="[
        !item.icontype?'iconfont':'',
        item.icon,
        'icon-menu', item.checked?'active':''
        ]"
        :title="item.name"
        @click="select(item.path)"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AsideMenu',
  data() {
    return {
      menuList: [
        {
          name: '当前库存',
          path: '/tonight/stock',
          icon: 'iconnavicon-kcgl'
        },
        {
          name: '库存记录',
          path: '/tonight/record',
          icon: 'el-icon-date',
          icontype: 'element'
        },
        // {
        //   name: '采购管理',
        //   path: '/tonight/purchase',
        //   icon: 'iconnavicon-cgrkd'
        // },
        {
          name: '处方管理',
          path: '/tonight/prescription',
          icon: 'iconnavicon-qgmxtj'
        },
        // {
        //   name: '药品字典',
        //   path: '/tonight/dictionaries',
        //   icon: 'iconnavicon-zdgl'
        // }
      ]
    }
  },
  watch: {
    '$route.matched': function routeActive(val) {
      let path = ''
      if (val && val.length > 0) {
        ({ path } = val[val.length - 1])
        this.menuList = this.menuList.map((val) => {
          val.checked = val.path === path
          return val
        })
      }
    }
  },
  methods: {
    select(path) {
      this.$router.push(path)
    }
  }
}
</script>