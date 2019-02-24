import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout/index'
import Stock from '@/views/Stock/Stock'
import InventoryRecord from '@/views/InventoryRecord/index'
// import Purchase from '@/views/Purchase/Purchase'
import Prescription from '@/views/Prescription/Prescription'
// import Dictionaries from '@/views/Dictionaries/Dictionaries'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      redirect: '/tonight/stock',
    },
    {
      path: '*',
      redirect: '/tonight/stock',
    },
    {
      path: '/tonight',
      name: 'tonight',
      component: Layout,
      redirect: { name: 'stock' },
      children: [
        {
          name: 'stock',
          path: 'stock',
          component: Stock,
          meta: {
            title: '当前库存'
          }
        },
        {
          name: 'record',
          path: 'record',
          component: InventoryRecord,
          meta: {
            title: '出入库记录'
          }
        },
        // {
        //   name: 'purchase',
        //   path: 'purchase',
        //   component: Purchase,
        //   meta: {
        //     title: '采购管理'
        //   }
        // },
        {
          name: 'prescription',
          path: 'prescription',
          component: Prescription,
          meta: {
            title: '处方管理'
          }
        },
        // {
        //   name: 'dictionaries',
        //   path: 'dictionaries',
        //   component: Dictionaries,
        //   meta: {
        //     title: '药品字典'
        //   }
        // }
      ]
    }
  ],
});
