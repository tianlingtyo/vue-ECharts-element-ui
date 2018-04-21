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
                <Button @click = "buttonActive(0,0)"><i class="wiconfont wicon-add"></i>新增用户</Button>
                <Button @click = "buttonActive('info',0)"><i class="wiconfont wicon-dongjie"></i>冻结用户</Button>
                <Button @click = "buttonActive('info',1)"><i class="wiconfont wicon-active"></i>激活用户</Button>
            </div>
            <section>
                <Input v-model="param.userName"  placeholder="用户姓名"></Input>
                <Input v-model="param.telephone" placeholder="联系电话"></Input>
                <Select v-model="param.state" style="width:150px;">
                    <Option v-for="item in selectList" value="item.value">{{item.label}}</Option>
                </Select>
                <Button><i class="wiconfont wicon-search"></i>查询</Button> 
            </section>
            <ctitle-underline data="人员列表" ></ctitle-underline>
            <ordinaryTable :columns="columns" :items="tableData" :pageShow=false style="margin-top:10px;" @rowClick = "rowClick"></ordinaryTable>
        </Col>
   </Row>
</template>
<script>
import ctreeList from "@/common/tree/treeList.vue"
import cform from "@/common/form/formEdit.vue"
import { mapGetters , mapActions } from 'vuex'
import {Modal} from 'iview';
export default{
    components:{
        ctreeList,
        cform
    },
    data(){
        return{
            param:{
                iDisplayStart:0,
                iDisplayLength:10,
                orgId:"",
                userName:"",
                telephone:"",
                state:""
            },
            orgMsg:{},
            selectList:[
                {
                    label:"有效",
                    value:"1"
                },
                {
                    label:"无效",
                    value:"0"
                }
            ],
            columns:[
            {
                title:"用户姓名",
                key:"userName",
                width:""
            },
            {
                title:"用户账号",
                key:"userAccount",
                width:""
            },
            {
                title:"性别",
                key:"sexName",
                width:""
            },
            {
                title:"邮箱",
                key:"email",
                width:""
            },
            {
                title:"电话",
                key:"telephone",
                width:""
            },
            {
                title:"状态",
                key:"state",
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
                            type:4,
                            icon:"wiconfont wicon-user",
                            text:"密码重置"
                        },
                        {
                            type:5,
                            icon:"wiconfont wicon-user",
                            text:"角色变更"
                        },
                        {
                            type:6,
                            icon:"wiconfont wicon-edit",
                            text:"机构变更"
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
        ...mapGetters(['getListTree',"getFormData","tab"])
    },
    methods:{
        ...mapActions(['setListTree']),
        getOrgMsg(data){
            this.orgMsg = data;
            this.param.orgId = this.orgMsg.orgId;
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
        rowClick(data){
            let type = data.type,
            _self = this;
            switch(type){
             case 0: this.buttonActive(1,1);break;
             case 1: this.buttonActive('info',0,'user');break;
            }
        },
        getUserList(){
            let _self = this;
            this.$http.post("sysUser/getUserListByOrgId",this.param).then(function (res) {
               _self.tableData = res.data;
            }).catch(function (err) {
                console.log(err);
            });
        }

    },
    mounted(){

    }
}