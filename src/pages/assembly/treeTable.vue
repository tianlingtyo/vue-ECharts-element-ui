<template>
  <treeGrid
    :items='treeTab.itemData'
    :columns='columns'
    @on-row-click='rowClick'
    @on-selection-change='selectionClick'
    @on-children-show='childrenClick'
  ></treeGrid>
</template>
<script>
  import { mapGetters , mapActions } from 'vuex'
  export default {
    name:'treeTable',
    data() {
      return {
        columns: [
          {
            type: 'selection',
            width: '50',
          },
          {
            title: '功能名称',
            key: 'functionName',
            width: '100',
          },
          {
            title: '功能编码',
            key: 'functionCode',
            width: '50',
          },
          {
            title: '功能类型',
            key: 'functionType',
            state:[
              {
                state:0,
                name:"功能及菜单",
                class:''
              },
              {
                state:1,
                name:"功能",
                class:''
              },
              {
                state:2,
                name:"菜单",
                class:''
              }
            ],
            width: '50',
          },
          {
            title: '有效状态',
            key: 'state',
            state:[
              {
                state:0,
                name:"无效",
                class:''
              },
              {
                state:1,
                name:"有效",
                class:''
              }
            ],
            width: '50',
          },
          {
            title: '排序号',
            key: 'seqNum',
            width: '50',
          },
          {
            title: '地址',
            key: 'functionUrl',
            width: '200',
          },
          {
            title: '操作',
            type: 'action',
            width:'150',
            actions: {
              icon:'wiconfont wicon-user',
              text:'操作',
              suboOperation:[
                {
                  type:0,//0、修改 1、冻结、激活 2、添加人员 3、权限管理 4、密码重置
                  //5、角色变更 6、机构变更 7、新增子功能 8、编辑
                  icon:'wiconfont wicon-edit',
                  text:'修改'
                },
                {
                  type:1,
                  icon:'wiconfont wicon-dongjie',
                  text:'冻结'
                },
                {
                  type:2,
                  icon:'wiconfont wicon-edit-password',
                  text:'密码重置'
                },
                {
                  type:3,
                  icon:'wiconfont wicon-user',
                  text:'角色变更'
                },
                {
                  type:4,
                  icon:'wiconfont wicon-section',
                  text:'机构变更'
                }
              ]
            },
          }
        ],
      }
    },
    computed: {
      ...mapGetters(['treeTab'])
    },
    methods: {
      ...mapActions(['getTreeTab']),
      rowClick(data) {//当前列数据
        console.log(data)
      },
      selectionClick(arr) {//复选框返回数据
        console.log( arr)
      },
      childrenClick(item){//展开按钮
        this.getTreeTab(item.functionId);
      }
    },
    mounted(){
      this.getTreeTab();
      console.log(this.treeTab.itemData)
    }
  }
</script>
