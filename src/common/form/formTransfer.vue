<!--
 @author:york
 @date : 2018-4-17
 @function :本组件主要是针对添加人员功能，一个简单的穿梭框功能
-->
<template>
  <div class="c-transfer">
      <h2>{{userType == 0? "未选用户" :"已选用户"}}</h2>
      <ul>
          <li v-for = "(item,key) in transferList" :key="key">
              <a :class="[userType ==0 ? 'unselected' : 'selected']" @click = "doChangeSelect(key)">
                  {{item.userName}}
                  <i v-if="userType != 0" class="wiconfont wicon-close"></i>
              </a>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  props:{
      userType:{
          type:Number,
          default:1
      },
      transferList:{
          type:Array,
          default:[]
      }
  },
  data(){
      return {
      }
  },
  methods:{
      selectedRmove(key){
          this.$emit('changeselectData',{
              type:this.userType,
              index:key
          });
      },
      unselectedRmove(key){
          this.$emit('changeUnselectData',{
              type:this.userType,
              index:key
          });
      },
      doChangeSelect(key){
          if(this.userType === 0){
              this.unselectedRmove(key);
          }else{
              this.selectedRmove(key);
          }
      }
  }
}
</script>

