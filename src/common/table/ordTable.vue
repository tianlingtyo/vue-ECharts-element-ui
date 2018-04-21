<template>
    <div class="ordTable">
      <div class="table-box">
          <table cellspacing="0" cellpadding="0" border="0">
            <thead>
              <tr>
                <th v-for="(column,index) in cloneColumns" :style="{width:column.width+'px'}" :key="column.key">
                  <div class="selection" v-if="column.type === 'selection'">
                    <label  class="ivu-checkbox-wrapper" @click="checkedAll">
                      <input type="checkbox" class="ivu-checkbox-input" :class="[checked?'ivu-checkbox-wrapper-checked':'']">
                      <span class="ivu-checkbox" :class="[checked?'ivu-checkbox-checked':'']">
                      <span class="ivu-checkbox-inner"></span>
                    </span>
                    </label>
                  </div>
                  <div v-else>
                    {{column.title}}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tdItem in initItems" :key="tdItem.key">
                <td v-for="column in columns" :key="column.key">
                  <div v-if="column.type === 'selection'" class="selection">
                      <label  class="ivu-checkbox-wrapper" @click="checkedSingle(tdItem.userId)">
                          <input type="checkbox" class="ivu-checkbox-input" :class="[checkedId.indexOf(tdItem.userId)>=0?'ivu-checkbox-wrapper-checked':'']">
                          <span class="ivu-checkbox" :class="[checkedId.indexOf(tdItem.userId)>=0?'ivu-checkbox-checked':'']">
                          <span class="ivu-checkbox-inner"></span>
                        </span>
                      </label>
                  </div>
                  <div v-if="column.type === 'action'">
                    <operation-item :rowData="tdItem" :operationData="column.actions"  @rowClick="rowClick"></operation-item>
                  </div>
                  <div v-if="column.state">
                    <div :class="[column.state[tdItem[column.key]].class]">{{column.state[tdItem[column.key]].name}}</div>
                  </div>
                  <div v-else>{{tdItem[column.key]==""?'-':tdItem[column.key]}}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      <div class="page-box" v-if="pageShow">
        <Page :total="100"></Page>
      </div>
    </div>
</template>
<script>
    export default {
      name: "ordTable",
      props:{
        columns:{
          type:Array,
          default(){
            return []
          },
        },
        items:{
          type:Array,
          default(){
            return []
          },
        },
        pageShow:{
          type:Boolean,
          default:true
        }
      },
      data(){
        return{
          initItems: [], //处理后数据数组
          cloneColumns: [], //处理后的表头数据
          checkedId:[],
          checked:false,
        }
      },
      methods:{
        rowClick(data){ //返出操作数据
          this.$emit('rowClick',data);
        },
        checkedAll(){
          let _self=this;
          if(_self.checked){
            _self.checkedId=[];
          }
          else{

            _self.checkedId=[];
            _self.initItems.forEach(function(item) {
              _self.checkedId.push(item.userId)
            });
          }
          _self.$emit('checkedAll', _self.checkedId);
        },
        checkedSingle(userId){
          let _self=this;
          let idIndex = _self.checkedId.indexOf(userId)
          if (idIndex >= 0) {
            // 如果已经包含了该id, 则去除(单选按钮由选中变为非选中状态)
            _self.checkedId.splice(idIndex, 1)
          } else {
            // 选中该checkbox
            _self.checkedId.push(userId)
          }
          _self.$emit('checkedSingle', _self.checkedId);
        }
      },
      watch: {//深度 watcher
        items(val){
          this.initItems=val;
        },
        'checkedId': {
          handler: function (val, oldVal) {
            if (this.checkedId.length === this.initItems.length) {
              this.checked=true;
            }else{
              this.checked=false;
            }
          },
          deep: true
        }
      },
      mounted() {
        this.cloneColumns=this.columns;
        this.initItems=this.items;
        console.log();

      },
    }
</script>

