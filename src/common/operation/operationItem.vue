<template>
    <div class="operationItem">
        <a href="javascript:void(0)" class="operation-btn">
          <i :class="[operationData.icon]"></i>
          <span>{{operationData.text}}</span>
        </a>
        <div class="operation-box">
          <a href="javascript:void(0)" v-for="subOperation in operationData.suboOperation" @click="rowClick(rowData,subOperation.type)">
            <i :class="[subOperation.icon]"></i>
            <span>{{subOperation.text}}</span>
          </a>
        </div>
    </div>
</template>

<script>
  import {mapActions } from 'vuex'
    export default {
      name: "operationItem",
      props:{
        rowData:{
          type:Object,
          default(){
            return {}
          }
        },
        operationData:{
          type:Object,
          default(){
            return {}
          }
        }
      },
      methods:{
        ...mapActions(['setCurrentData']),
        rowClick(rowData,type){ //返回 当前页的functionId，当前数据、按钮标题
            let _self=this;
           _self.setCurrentData(rowData);
            _self.$emit('rowClick',{
                type:type
            });
            /*switch (type){
            case 0://修改
              _self.setCurrentData(rowData);
              _self.$emit('rowClick',{
               // title:'修改',
                type:type
              });
              break;
            case 1://冻结、激活
              _self.$emit('rowClick',{
                title:'',
                type:type
              });
              break;
            case 2://添加人员
              break;
            case 3://权限管理
              break;
            case 4://密码重置
              break;
            case 5://角色变更
              break;
            case 6://机构变更
              break;
            case 7://新增子功能
              break;
            case 8://编辑
              break;
          }*/
        }
      },
    }
</script>
<style scoped lang="less">
  .operationItem{
    text-align: center;
    .operation-btn{
      display: inline-block;
      border: 1px solid #e5e5e5;
      font-size: 12px;
      line-height: 20px;
      padding: 1px 5px;
      color: #333;
      background-color: #fff;
      i{
        display: inline-block;
        vertical-align: top;
        margin-top: 1px;
      }
    }
    .operation-btn:hover{
      background-color: #2898e0;
      border: 1px #2898e0 solid;
      color: #ffffff;
    }
    .operation-box{
      display: none;
      position: absolute;
      background-color: #fff;
      right: 20px;
      line-height: 35px;
      height: 35px;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
      border: 1px solid #ccc;
      border: 1px solid rgba(0, 0, 0, .15);
      border-radius: 4px;
      -webkit-box-shadow: 0 3px 5px rgba(0, 0, 0, .175);
      box-shadow: 0 3px 5px rgba(0, 0, 0, .175);
      font-size: 0;
      a{
        display: inline-block;
        font-size: 14px;
        padding-right: 5px;
        padding-left: 5px;
        height: 33px;
        i{
          display: inline-block;
          vertical-align: top;
          margin-top: 1px;
        }
      }
    }
  }
  .operationItem:hover .operation-box{
    display: block;
  }

</style>
