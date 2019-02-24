import Vue from 'vue';
import axios from 'axios';
import PageTable from '@/components/Table/PageTable'
import ElementUI from 'element-ui';
import '@/libs/db'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/iconfont/iconfont.css'
import './assets/css/global.scss'
import './assets/css/main.scss'

import App from './App';
import router from './router';
import store from './store';
import newdb from './libs/db'
import './libs/controller'

Vue.use(ElementUI, { size: 'mini' });
Vue.component('page-table', PageTable)
// Vue.mixin(mixins)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
// Vue.prototype.$isLoading = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  created() {
    Vue.prototype.$db = newdb(this.$electron.remote)
  },
  template: '<App/>',
}).$mount('#app');
