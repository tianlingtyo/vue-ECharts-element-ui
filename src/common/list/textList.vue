<!--
@author:york
@date:2018-04-19
@function:本组件主要针对【标题：信息】格式流展示
-->
<style lang="less">
    .c-textlist{
        margin:10px;
        li{
            display:inline-block;
            line-height:20px;
            margin-right:40px;
            margin-top:10px;
        }
    }
</style>
<template>
  <ul class="c-textlist">
      <li v-for="(item,key) of renderData" :key="key">
          <label for="item.name">{{item.label}}：</label>
          <span>
            <i v-if="item.icon" :class="item.icon"></i>
            {{item.ordinary ? item.ordinary[resultData[item.name]] : resultData[item.name]}}
         </span>
      </li>
  </ul>
</template>
<script>
export default {
  name:"textList",
  props:{
      resultData:{
          type:Object,
          default:{}
      },
      renderData:{
          type:Array,
          default:[]
      }
  },
  data(){
      return{
          
      }
  }
}
</script>


