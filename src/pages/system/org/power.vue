<template>
   <Row class="c-auto-height">
       <Col span="12" style="height:100%;">
            <ctree-list  :data ="orgList" :isShowCheck="true" v-on:changeOrg="getOrgMsg"></ctree-list>
       </Col>
       <Col span="12" class="c-content-background c-innder-distance">
            <ctree-list  :data ="funList" :isShowCheck="true" v-on:changeOrg="getFunMsg"></ctree-list>
       </Col>
   </Row>
</template>
<script>
import ctreeList from "@/common/tree/treeList.vue"
export default {
  components:{ctreeList},
  props:{
      roleId:{
          type:Number,
          default:0
      }
  },
  data(){
      return{
          orgList:[],
          funList:[]
      }
  },
  methods:{
      getTreeData(requestUrl,cDataName){
        let _self = this;
        this.$http.post(requestUrl,{roleId:this.roleId}).then(function (res) {
            _self[cDataName] = res.data;
        }).catch(function (err) {
            console.log(err);
        });
      },
      getOrgMsg(data){
          console.log(data);
      },
      getFunMsg(data){
          console.log(data);
      }
  },
  mounted(){
       this.getTreeData('sysPermission/getOrgTreeAll','orgList');
       this.getTreeData('sysPermission/getFunctionTreeAll','funList');
  }
}
</script>
