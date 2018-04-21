<!--
@author:york
@date:2018-04-19
@function:本组件主要为展示带下划线标题
-->
<template>
  <h2 class="c-title-underLine">
      <span>{{data}}</span>
  </h2>
</template>
<script>
export default {
  props:{
      data:{
          type:String,
          default:""
      },
      color:{
          type:String,
          default:''
      }
  },
  data(){
      return {
      }
  }
}
</script>
