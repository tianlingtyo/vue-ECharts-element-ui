<template>
    <div id="wrap" class="home">
      <div id="header">
        <router-link to="/home" tag="div" class="header-left">
          <img src="static/image/common/basename.png"/>
        </router-link>
        <div class="header-right">
          <div class="header-right-user" @mouseover="headerMenuShow" @mouseout="headerMenuHide">
            <img src="static/image/common/profile_picture@3x.png"/>
            <span>管理员</span>
            <Icon type="ios-arrow-down"></Icon>
          </div>
          <ul class="header-right-menu" v-if="headerMenu" @mouseover="headerMenuShow" @mouseout="headerMenuHide">
            <li>
              <div>
                <Icon type="key"></Icon>
                <span>修改密码</span>
              </div>
            </li>
            <li>
              <div @click="loginOutBtn">
                <Icon type="power"></Icon>
                <span>退出</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div id="main">
        <div class="main-left">
          <Menu :theme="theme2"  accordion style="width: 200px">
            <Submenu :name="menuItem.seqNum" v-for="menuItem in menuNav" :key="menuItem.id">
              <template slot="title">
                <i :class="menuItem.icoName"></i>
                {{menuItem.functionName}}
              </template>
              <MenuItem :name="menuItem.seqNum+'-'+submenuItem.seqNum" v-for="submenuItem in menuItem.sysFunctionList" :key="submenuItem.id"><router-link  :to="{path:submenuItem.functionUrl,query: { functionId: submenuItem.functionId }}" tag="div">{{submenuItem.functionName}}</router-link></MenuItem>
            </Submenu>
          </Menu>
        </div>
        <div class="main-right">
          <router-view/>
        </div>
      </div>
    </div>
</template>
<script>
  import { mapGetters , mapActions } from 'vuex'
    export default {
      name: "home",
      data(){
          return{
            headerMenu:false,
            theme2: 'dark'
          }
      },
      computed: {
        ...mapGetters(['getUser','menuNav'])
      },
      methods:{
        ...mapActions(['setMenu',"loginOut"]),
        headerMenuShow(){
          this.headerMenu=true;
        },
        headerMenuHide(){
          this.headerMenu=false;
        },
        loginOutBtn(){
            this.loginOut();
            //判断登录状态
            if(!this.getUser.requiresAuth){
              this.$router.push({path:'/login'});
            }
        }
        },
      mounted(){
       this.setMenu()
      }
    }
</script>

