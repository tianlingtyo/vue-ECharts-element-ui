<!-- 走马灯组件 
适用范围：系统管理功能 菜单图标滚动与选择
-->
<style>
    body{background:#fff;}
</style>
<template>
  <div class="c-carousel">
     <span class="wiconfont wicon-arrow-left" @click="moveLeft"></span>
     <div class="c-icon-list">
        <ul :style="{'width':(listData.length*41)+'px','left':leftPosition+'px'}">
            <li v-for ="item in listData" :class="item.selected ? 'active' : ''" @click="change(item.icon,'change')">
                <span :class="item.icon"></span>
            </li>
        </ul>
     </div>
     <span class="wiconfont wicon-arrow-right" @click="moveRight"></span>
  </div>
</template>
<script>
export default {
  props:{
      iconName:{
          type:String,
          default:""
      }
  },
  data(){
      return {
          leftPosition:0,
          listData :[
              {
                icon:'wiconfont wicon-home',
                selected:true
              },
              {
                icon:'wiconfont wicon-similar',
                selected:false
              },
              {
                icon:'wiconfont wicon-set',
                selected:false
              },
              {
                icon:'wiconfont wicon-wangluo',
                selected:false
              },
              {
                icon:'wiconfont wicon-xitongguanli',
                selected:false
              },
              {
                icon:'wiconfont wicon-menu-open',
                selected:false
              },
              {
                icon:'wiconfont wicon-edit-password',
                selected:false
              },
              {
                icon:'wiconfont wicon-add_user',
                selected:false
              },
              {
                icon:'wiconfont wicon-quanxian' ,
                selected:false
              }
          ]

      }
  },
  methods:{
      moveLeft(){
        this.listData.push(this.listData.shift());
      },
      moveRight(){
        this.listData.unshift(this.listData.pop());
      },
      change(item){
        if(!item){
            this.listData[0].selected  = true;
            return false;
        }
        this.listData.forEach((v,i) => {
            if(v.icon === item){
                v.selected = true;
                this.$emit('changeName',v.icon);
                return;
            }
            v.selected = false;
        })
      }
  }
}
</script>
