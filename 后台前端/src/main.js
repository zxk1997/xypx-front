import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
Vue.use(VueRouter);
Vue.use(VueResource);

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)


import index from './view/index.vue'
/*
const routes =[
  {path:'/main',component:_main}
]

const router =new VueRouter({
  routes:routes,
  mode: 'history',
});*/

Vue.http.interceptors.push((request) => {
  request.url="http://localhost:8070"+request.url;
});

new Vue({
  el: '#app',
  render: h => h(index)
})
