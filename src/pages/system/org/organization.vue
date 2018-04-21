<style lang="less">
    .ivu-modal-confirm-body-render{
        max-height:500px;
        overflow-y:auto;
    }
</style>
<template>
   <Row class="c-auto-height">
       <Col span="8" style="height:100%;">
            <ctree-list  :data = "getListTree" :isShowCheck="false" v-on:changeOrg="getOrgMsg"></ctree-list>
       </Col>
       <Col span="16" class="c-content-background c-innder-distance">
            <div>
                <Button @click = "buttonActive(0,0)"><i class="wiconfont wicon-add"></i>新增子机构</Button>
                <Button @click = "buttonActive(0,1)"><i class="wiconfont wicon-edit"></i>修改机构</Button>
                <Button @click = "buttonActive('info',0)"><i class="wiconfont wicon-dongjie"></i>冻结机构</Button>
                <Button @click = "buttonActive('info',1)"><i class="wiconfont wicon-active"></i>激活机构</Button>
                <Button @click = "buttonActive(1,0)"><i class="wiconfont wicon-add"></i>新增角色</Button>
            </div>
            <ctitle-underline data="机构信息" ></ctitle-underline>
            <ctext-list :resultData="orgMsg" :renderData="orgMsgText"></ctext-list>
            <ctitle-underline data="角色列表" ></ctitle-underline>
            <ordinaryTable :columns="columns" :items="tableData" :pageShow=false style="margin-top:10px;" @rowClick = "rowClick"></ordinaryTable>
        </Col>
   </Row>
</template>
<script>
import ctreeList from "@/common/tree/treeList.vue"
import ctextList from "@/common/list/textList.vue"
import cform from "@/common/form/formEdit.vue"
import caddUser from "@/pages/system/org/addUser.vue"
import cpower from "@/pages/system/org/power.vue"
import { mapGetters , mapActions } from 'vuex'
import {Modal} from 'iview';
export default {
  components:{
      ctreeList,
      ctextList,
      cform,
      caddUser,
      cpower
  },
  data(){
      return {
        userId : '',
        orgMsg:{},
        orgMsgText:[
            {
                label:"机构名称",
                name:"orgFullName"
            },
            {
                label:"机构状态",
                name:"state",
                icon:"wiconfont wicon-favor",
                ordinary:{
                    "1":"有效",
                    "0":"无效"
                }
            },
            {
                label:"机构类型",
                name:"orgType",
                ordinary:{
                    "1":"省",
                    "2":"市",
                    "3":"直辖市",
                    "4":"区县"
                }
            },
            {
                label:"备注",
                name:"remark"
            }
        ],
        columns:[
          {
              title:"角色名称",
              key:"roleName",
              width:""
          },
          {
              title:"角色类型",
              key:"roleType",
              width:""
          },
          {
              title:"角色状态",
              key:"state",
              width:""
          },
          {
              title:"角色数量",
              key:"userName",
              width:""
          },
          {
              title:"操作",
              type:"action",
              width:"",
              actions:{
                icon:"wiconfont wicon-user",
                text:"操作",
                suboOperation:[
                    {
                        type:0,
                        icon:"wiconfont wicon-edit",
                        text:"修改"
                    },
                    {
                        type:1,
                        icon:"wiconfont wicon-dongjie",
                        text:"冻结"
                    },
                    {
                        type:2,
                        icon:"wiconfont wicon-user",
                        text:"添加人员"
                    },
                    {
                        type:0,
                        icon:"wiconfont wicon-edit",
                        text:"权限管理"
                    }
                ]
              }
          }
        ],
        tableData:[],
        formData:{}
    }
  },
  computed:{
      ...mapGetters(['getListTree',"getFormData","getUser","tab"])
  },
  methods:{
      ...mapActions(['setListTree']),
      getOrgMsg(data){
          this.orgMsg = data;
      },
      buttonActive(formType,operateType,msg){//formType:[0:新增|编辑子机构，1新增|编辑角色]，operateType:[0:新增，1:编辑]||[0:冻结／激活]
        Modal.remove();
        let functionId = this.$root._route.query.functionId;
        setTimeout(()=>{
            if(formType != "info"){
                this.editForm(functionId,formType,operateType);
            }else{
            this.confrimForm(functionId,formType,operateType,msg); 
            }
        },300);
      },
      editForm(funId,formType,operateType){//弹出表单框
          let   formData = this.getFormData[funId][formType],
                requestData = {},
                pre = "新增",
                _self = this;
                if(operateType == 1){
                    pre = "编辑";
                    requestData = formType ===0 ? this.orgMsg : this.tab.currentData;
                }
            switch(formType){
                case 0 : pre += "机构";break;
                case 1 : pre += "角色";break;
            }
            Modal.confirm({
                scrollable:true,
                transfer:false,
                height:"500",
                okText:"保存",
                closable:true,
                title:pre,
                cancelText:"取消",
                render:(h) => {
                    return h(cform,{
                        props:{
                            renderData:formData,
                            requestData:requestData,
                            iconList:[]
                        },
                        on:{
                            changeData(data){
                                console.log(data);
                                _self.formData = data;
                            }
                        }
                    })
                },
                onOk:()=>{
                    this.deployModalLoading = false
                    this.$nextTick(() => {
                        this.deployModalLoading = true
                    })
                    console.log(_self,_self.model);
                }
            });
      },
      confrimForm(funId,formType,operateType,msg="org"){//确认提示框
          let pre = operateType == 0 ? "冻结" : "激活";
          let msgs = msg == "user" ? 
                            `<p>确定要${pre}该角色吗？</p>`:
                            `<p>是否${pre}机构的所有子部门，人员和角色？</p>`;
            Modal.confirm({
                    scrollable:true,
                    transfer:false,
                    height:"500",
                    okText:"确定",
                    closable:true,
                    title:pre+'机构',
                    content:msgs,
                    cancelText:"取消"
            });
      },
      addUser(){
          Modal.remove();
             setTimeout(()=>{
                Modal.confirm({
                    scrollable:true,
                    transfer:false,
                    okText:"保存",
                    width:"65%",
                    closable:true,
                    title:'添加人员',
                    cancelText:"取消",
                    render:(h) => {
                        return h(caddUser,{
                            props:{
                                listTree:this.getListTree,
                                orgId:this.orgMsg.orgId,
                                roleId:this.tab.currentData.roleId
                            },
                            /*on:{
                                changeData(data){
                                    console.log(data);
                                    _self.formData = data;
                                }
                            }*/
                        })
                    },
                    onOk:()=>{
                        this.deployModalLoading = false
                        this.$nextTick(() => {
                            this.deployModalLoading = true
                        })
                        console.log(_self,_self.model);
                    }
                });
            },300);
      },
      power(){
           Modal.remove();
             setTimeout(()=>{
                Modal.confirm({
                    scrollable:true,
                    transfer:false,
                    okText:"保存",
                    width:"65%",
                    closable:true,
                    title:'添加人员',
                    cancelText:"取消",
                    render:(h) => {
                        return h(cpower,{
                            props:{
                                roleId:this.tab.currentData.roleId
                            },
                            /*on:{
                                changeData(data){
                                    console.log(data);
                                    _self.formData = data;
                                }
                            }*/
                        })
                    },
                    onOk:()=>{
                        this.deployModalLoading = false
                        this.$nextTick(() => {
                            this.deployModalLoading = true
                        })
                        console.log(_self,_self.model);
                    }
                });
            },300);
      },
      rowClick(data){ //返出操作数据
         let type = data.type,
            _self = this;
         switch(type){
             case 0: this.buttonActive(1,1);break;
             case 1: this.buttonActive('info',0,'user');break;
             case 2:this.addUser();break;//添加人员;
             case 3:break;//权限管理
         }
      },
      getUserList(){
          let _self = this;
           this.$http.post("sysRole/findRoleListByOrgId",{orgId:this.orgMsg.orgId}).then(function (res) {
               _self.tableData = res.data;
               console.log(_self.tableData);
           }).catch(function (err) {
                console.log(err);
           });
      }
  },
  watch:{
      getListTree(){
          
      },
      orgMsg(){
          this.getUserList();
      }
  },
  mounted(){
      this.userId = JSON.parse(sessionStorage.getItem('accessToken')).userId;
      let param = {
          requestUrl:"sysOrg/getOrgTree",
          type:"list",
          data:{
              parentOrgId:0,
              state:1,
              userId:this.userId
          }
      };
      this.setListTree(param);
  }
}
</script>
