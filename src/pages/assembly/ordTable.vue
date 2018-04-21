<template>
    <ordinaryTable :columns="columns" :items="tab.itemData" :pageShow="false"></ordinaryTable>
</template>

<script>
  import { mapGetters , mapActions } from 'vuex'
    export default {
        name: "t-ordTable",
      data(){
          return{
            columns:[
              {
                type: 'selection',
                width: '50',
              },
               {
                 title:'用户姓名',
                 key:'userName',
                 width:''
               },
               {
                 title:'用户账号',
                 key:'userAccount',
                 width:''
               },
               {
                 title:'性别',
                 key:'sex',
                 state:[
                   {
                     state:0,
                     name:'女',
                     class:''
                   },
                   {
                     state:1,
                     name:'男',
                     class:''
                   }
                 ],
                 width:'',
               },
               {
                 title:'邮箱',
                 key:'email',
                 width:'',
               },
               {
                 title:'电话',
                 key:'telephone',
                 width:'',
               },
               {
                 title:'状态',
                 key:'state',
                 state:[
                   {
                     state:0,
                     name:'无效',
                     class:''
                   },
                   {
                     state:1,
                     name:'有效',
                     class:''
                   }
                 ],
                 width:''
               },
               {
                 title:'操作',
                 type: 'action',
                 width:150,
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
        ...mapGetters(['tab'])
      },
      methods: {
        ...mapActions(['getDataTab']),
      },
      mounted(){
        this.getDataTab();
      }
    }
</script>
