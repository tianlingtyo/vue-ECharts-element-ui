<!--
 * @Author: 黄龙
 * @pageName: 'tree-grid  树型表格'
 * @Date: 2017-07-17 16:48:44
 * @Last Modified by:   黄龙
 * @Last Modified time: 2017-07-17 16:48:44
 * @events  @on-row-click 单击行或者单击操作按钮方法
            @on-selection-change  多选模式下 选中项变化时触发
            @on-sort-change  排序时有效，当点击排序时触发
   @props   items 显示的结构化数据
            columns 表格列的配置描述 sortable:true 开启排序功能
            type: 'selection'为多选功能 type: 'action' 为操作功能 actions:[{}] 操作按钮
 -->
<template>
    <div class='autoTbale'>
      <div class="table-box">
        <table cellspacing="0" cellpadding="0" border="0" id='hl-tree-table'>
          <thead>
          <tr>
            <th v-for="(column,index) in cloneColumns" :style=tdStyle(column)>
              <div v-if="column.type === 'selection'" class="selection">
                <label  class="ivu-checkbox-wrapper" @click="handleCheckAll">
                  <input type="checkbox" class="ivu-checkbox-input" :class="[checks?'ivu-checkbox-wrapper-checked':'']">
                  <span class="ivu-checkbox" :class="[checks?'ivu-checkbox-checked':'']">
                    <span class="ivu-checkbox-inner"></span>
                  </span>
                </label>
              </div>
              <div v-else>
                {{ renderHeader(column, index) }}
              </div>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in initItems" :key="item.functionId" v-show="show(item)" :class="{'child-tr':item.parent}">
            <td v-for="(column,snum) in columns" :key="column.key">
              <div class="selection"  v-if="column.type === 'selection'">
                <label  class="ivu-checkbox-wrapper" @click="checkedSingle(item.functionId)">
                  <input type="checkbox" class="ivu-checkbox-input" :class="[checkGroup.indexOf(item.functionId)>=0?'ivu-checkbox-wrapper-checked':'']">
                  <span class="ivu-checkbox" :class="[checkGroup.indexOf(item.functionId)>=0?'ivu-checkbox-checked':'']">
                  <span class="ivu-checkbox-inner"></span>
                </span>
                </label>
              </div>
              <div v-if="column.type === 'action'">
                <operation-item :rowData="item" :operationData="column.actions" @rowClick="rowClick"></operation-item>
              </div>
              <label @click="toggle(index,item)" v-if="!column.type">
                <span v-if='snum==iconRow()'>
                    <i v-if="item.functionLeafNode===1" class="wiconfont" :class="{'wicon-tree-close':!item.expanded,'wicon-tree-open':item.expanded }"></i>
                    <i v-else class="ms-tree-space"></i>
                </span>
                <span v-if="column.state">
                  <span :class="[column.state[item[column.key]].class]">{{column.state[item[column.key]].name}}</span>
                </span>
                <span v-else>{{item[column.key]==""?'-':item[column.key]}}</span>
              </label>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>
<script>
  import {mapActions } from 'vuex'
export default {
    name: 'treeGrid',
    props: {
      columns: Array,
      items: {
          type: Array,
          default: function() {
              return [];
          }
      },
    },
    data() {
        return {
            initItems: [], //处理后数据数组
            cloneColumns: [], //处理后的表头数据
            checkGroup: [], //复选框数组
            checks: false, //全选
            tdsWidth: 0, //td总宽
            dataLength: 0, //树形数据长度
        }
    },
  watch: {
      items:{
        deep: true,
        handler () {
          this.dataLength = this.Length(this.items);
          this.initData(this.deepCopy(this.items), 1, null);
          if (this.checkGroup.length == this.dataLength) {
            this.checks = true
          }
          else {
            this.checks = false
          }
          console.log(this.initItems)
        }
      },
      columns: {
          handler() {
              this.cloneColumns = this.makeColumns();
          },
          deep: true
      },
      checkGroup(data) {
          this.checkAllGroupChange(data)
      },
  },
  methods: {
    //checkbox 全选 选择事件
    handleCheckAll() {
      this.checks = !this.checks;
      if (this.checks) {
        this.checkGroup = this.getArray(this.checkGroup.concat(this.All(this.items)))
      } else {
        this.checkGroup = []
      }
    },
    //单选事件
    checkedSingle(id){
      let _self=this;
      let idIndex = _self.checkGroup.indexOf(id);
      if (idIndex >= 0) {
        // 如果已经包含了该id, 则去除(单选按钮由选中变为非选中状态)
        _self.checkGroup.splice(idIndex, 1)
      } else {
        // 选中该checkbox
        _self.checkGroup.push(id)
      }
    },
    // 点击某一行事件
    rowClick(data) {
      this.$emit('on-row-click', data)
    },
    // 有无多选框折叠位置优化
    iconRow() {
      for (var i = 0, len = this.columns.length; i < len; i++) {
        if (this.columns[i].type == 'selection') {
          return 1
        }
      }
      return 0
    },
      // 设置td宽度,td的align
      tdStyle(column) {
          var style = {}
          if (column.align) {
              style["text-align"] = column.align;
          }
          if (column.width) {
              style["width"] = column.width + 'px';
          }
          return style;
      },

      // 点击事件 返回数据处理
      makeData(data) {
          const t = this.type(data);
          let o;
          if (t === 'array') {
              o = [];
          } else if (t === 'object') {
              o = {};
          } else {
              return data;
          }

          if (t === 'array') {
              for (let i = 0; i < data.length; i++) {
                  o.push(this.makeData(data[i]));
              }
          } else if (t === 'object') {
              for (let i in data) {
                  if (i != 'parent' && i != 'level' && i != 'expanded' && i != 'isShow' && i !=
                      'load') {
                      o[i] = this.makeData(data[i]);
                  }
              }
          }
          return o;
      },
      // 处理表头数据
      makeColumns() {
          let columns = this.deepCopy(this.columns);
          this.tdsWidth = 0
          columns.forEach((column, index) => {
              column._index = index;
              column._width = column.width ? column.width : '';
              this.tdsWidth += column.width ? parseFloat(column.width) : 0;
          });
          return columns;
      },
      // 数据处理 增加自定义属性监听
      initData(items, level, parent) {
          this.initItems = [];
          items.forEach((item, index) => {
              item = Object.assign({}, item, {
                  "parent": parent,
                  "level": level,
              });
              if ((typeof item.expanded) == "undefined") {
                  item = Object.assign({}, item, {
                      "expanded": false
                  });
              }
              if ((typeof item.show) == "undefined") {
                  item = Object.assign({}, item, {
                      "isShow": false
                  });
              }
              item = Object.assign({}, item, {
                  "load": (item.expanded ? true : false)
              });
              this.initItems.push(item);
              if (item.children && item.expanded) {
                  this.initData(item.children, level + 1, item);
              }
          })
      },
      //  隐藏显示
      show(item) {
          return ((item.level == 1) || (item.parent && item.parent.expanded && item.isShow));
      },
      toggle(index, item) {
          let level = item.level + 1;
          if (item.children) {
              if (item.expanded) {
                  item.expanded = !item.expanded;
                  this.close(index, item);
              } else {
                this.$emit('on-children-show',item);
                  item.expanded = !item.expanded;
                  if (item.load) {
                      this.open(index, item);
                  } else {
                      item.load = true;
                      item.children.forEach((child, childIndex) => {
                          this.initItems.splice((index + childIndex + 1), 0, child);
                          //设置监听属性
                          this.$set(this.initItems[index + childIndex + 1], 'parent', item);
                          this.$set(this.initItems[index + childIndex + 1], 'level', level);
                          this.$set(this.initItems[index + childIndex + 1], 'isShow', true);
                          this.$set(this.initItems[index + childIndex + 1], 'expanded', false);
                      })
                  }
              }
          }
      },
      open(index, item) {
          if (item.children) {
              item.children.forEach((child, childIndex) => {
                  child.isShow = true;
                  if (child.children && child.expanded) {
                      this.open(index + childIndex + 1, child);
                  }
              })
          }
      },
      close(index, item) {
          if (item.children) {
              item.children.forEach((child, childIndex) => {
                  child.isShow = false;
                  child.expanded = false;
                  if (child.children) {
                      this.close(index + childIndex + 1, child);
                  }
              })
          }
      },
      // 数组去重
      getArray(a) {
          var hash = {},
              len = a.length,
              result = [];
          for (var i = 0; i < len; i++) {
              if (!hash[a[i]]) {
                  hash[a[i]] = true;
                  result.push(a[i]);
              }
          }
          return result;
      },
      checkAllGroupChange(data) {
          if (this.dataLength > 0 && data.length === this.dataLength) {
              this.checks = true;
          } else {
              this.checks = false;
          }
          this.$emit('on-selection-change', this.checkGroup)
      },
      All(data) {
          let arr = []
          data.forEach((item) => {
              arr.push(item.functionId);
              if (item.children && item.children.length > 0) {
                  arr = arr.concat(this.All(item.children));
              }
          })
          return arr
      },
      // 返回树形数据长度
      Length(data) {
          let length = data.length
          data.forEach((child) => {
              if (child.children) {
                  length += this.Length(child.children)
              }
          })
          return length;
      },
      // 返回表头
      renderHeader(column, $index) {
          if ('renderHeader' in this.columns[$index]) {
              return this.columns[$index].renderHeader(column, $index);
          } else {
              return column.title || '#';
          }
      },
      // 深度拷贝函数
      deepCopy(data) {
          var t = this.type(data),
              o, i, ni;
          if (t === 'array') {
              o = [];
          } else if (t === 'object') {
              o = {};
          } else {
              return data;
          }
          if (t === 'array') {
              for (i = 0, ni = data.length; i < ni; i++) {
                  o.push(this.deepCopy(data[i]));
              }
              return o;
          } else if (t === 'object') {
              for (i in data) {
                  o[i] = this.deepCopy(data[i]);
              }
              return o;
          }

      },
      type(obj) {
          var toString = Object.prototype.toString;
          var map = {
              '[object Boolean]': 'boolean',
              '[object Number]': 'number',
              '[object String]': 'string',
              '[object Function]': 'function',
              '[object Array]': 'array',
              '[object Date]': 'date',
              '[object RegExp]': 'regExp',
              '[object Undefined]': 'undefined',
              '[object Null]': 'null',
              '[object Object]': 'object'
          };
          return map[toString.call(obj)];
      }
  },
  mounted() {
    if (this.items) {
      this.dataLength = this.Length(this.items);
      this.initData(this.deepCopy(this.items), 1, null);
      this.cloneColumns = this.makeColumns();
      if (this.checkGroup.length == this.dataLength) {
        this.checks = true
      } else {
        this.checks = false
      }
    }
  },
}
</script>

