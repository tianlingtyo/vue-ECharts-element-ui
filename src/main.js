// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import 'iview/dist/styles/iview.css';
import $http from './$http'
import common from "./index"
import validate from './validate'
import 'babel-polyfill'
import 'es6-promise/auto'

Vue.use($http);
Vue.use(common);
Vue.use(validate);

Vue.config.productionTip = false;




/*router.beforeEach((to,from,next)=>{
  if(to.path==="/login"){
      window.document.title=to.name;
      next()
    }
  else{
    if(to.matched[0].meta.requiresAuth && !sessionStorage.getItem('accessToken')) {
      window.document.title=to.name;
      next({ path: '/login' })
    }
      //下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由
    else {
      if(to.path==="/"){
        window.document.title=to.name;
        next({path:'/home'});
        return ;
      }
      window.document.title=to.name;
      next()
    }//如果不需要登录验证，或者已经登录成功，则直接放行
  }
});*/

router.afterEach((to,from,next)=>{
  window.scrollTo(0,0)
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
