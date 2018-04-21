<template>
  <Row class="c-auto-height">
       <Col span="8" style="height:100%;">
            <ctree-list  :data ="listTree" :isShowCheck="false" v-on:changeOrg="getOrgMsg"></ctree-list>
       </Col>
       <Col span="16" class="c-content-background c-innder-distance">
            <form-transfer ref="transfer" :userType="0" :transferList ="unseletedData" v-on:changeUnselectData="getUserData"></form-transfer>
            <form-transfer ref="transfer" :userType="1" :transferList ="seletedData" v-on:changeselectData="getUserData"></form-transfer>
       </Col>
   </Row>
</template>
<script>
import ctreeList from "@/common/tree/treeList.vue"
import formTransfer from "@/common/form/formTransfer.vue"
export default {
   components:{formTransfer,ctreeList},
   props:{
       listTree:{
           type:Array,
           default:[]
       },
       orgId:{
           type:Number,
           default:""
       },
       roleId:{
           type:Number,
           default:""
       }
   },
   data(){
       return {
           orgMsg:{},
           seletedData:[],
           unseletedData:[]
       }
   },
   methods:{
        getUserData(data){
            if(data.type ===0){
                this.seletedData.push((this.unseletedData.splice(data.key,1))[0]);
                //this.$refs.transfer.add(data.deleData);
            }else{
                this.unseletedData.push((this.seletedData.splice(data.key,1))[0]);
            }
        },
        getOrgMsg(data){
            this.orgMsg = data;
        },
        getUserData(param,cDataName){
            let _self = this;
            this.$http.post("sysUser/findUserListByOrgIdOrRoleId",param).then(function (res) {
                _self[cDataName] = res.data;
            }).catch(function (err) {
                    console.log(err);
            });
        }
    },
    mounted(){
        this.getUserData({orgId:this.orgId},'seletedData');
        this.getUserData({orgId:this.orgId,roleId:this.roleId},'unseletedData');
    }
}
</script>
