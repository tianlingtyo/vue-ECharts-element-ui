import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name:'登录',
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/login',
      name: '登录',
      component: resolve => require(['@/pages/login.vue'], resolve),
    },
    {
      path: '/home',
      name: '首页',
      meta:{
        requiresAuth:true
      } ,
      component: resolve => require(['@/pages/frame.vue'], resolve),
      children: [
        {
          path:'/home',
          name:'首页',
          component: resolve => require(['@/pages/home.vue'], resolve),
        },
        {
          path: '/org',
          name:'组织机构',
          meta:{
            requiresAuth:true
          },
          component: resolve => require(['@/pages/system/org/organization.vue'], resolve),
        },
        {
          path: '/personnel',
          name:'人员管理',
          meta:{
            requiresAuth:true
          },
          component: resolve => require(['@/pages/system/org/organization.vue'], resolve),
        },
        {
          path: '/fun',
          name:'功能管理',
          meta:{
            requiresAuth:true
          },
          component: resolve => require(['@/pages/system/org/organization.vue'], resolve),
        },
        {
          path: '/type',
          name:'类型管理',
          meta:{
            requiresAuth:true
          },
          component: resolve => require(['@/pages/system/org/organization.vue'], resolve),
        },
        {
          path: '/ordTable',
          name:'类型管理',
          meta:{
            requiresAuth:true
          },
          component: resolve => require(['@/pages/assembly/treeTable.vue'], resolve),
        },
      ]
    },
  ]
})
