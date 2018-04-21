<template>
  <tree-list v-if="getListTree" :data = "getListTree" :isShowCheck="true" v-on:changeOrg="getOrgMsg"></tree-list>
</template>
<script>
import treeList from "@/common/tree/treeList.vue"
import { mapGetters , mapActions } from 'vuex'
export default {
  components:{treeList},
  data(){
      return {
          rootTree :[],
          orgMsg:{}//当前选中地市信息
      }
  },
  computed:{
      ...mapGetters(['getListTree'])
  },
  methods:{
      ...mapActions(['setListTree','setCurrentOrg']),
      getOrgMsg(data){
          this.orgMsg = data;
      }
  },
  watch:{
    getListTree(){
        this.$nextTick(()=>{
        });
    }
  },
  mounted(){
      let param = {};//请求参数传参数
      this.setListTree(param);
  }
}
</script>
