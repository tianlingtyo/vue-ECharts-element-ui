<template>
  <!-- <list-tree :isShowCheck = false></list-tree> -->
  <div>
    <Button @click="saveDialog">保存数据</Button>
    <!-- <org-edit ref="orgEdit"  :param="param" :requestUrl="requestUrl"></org-edit> -->
    <form-edit ref="formEdit" :renderData ="formEditData" :requestData="requestData" :iconList = "iconList"></form-edit>
  </div>
</template>
<script>
import { mapGetters , mapActions } from 'vuex'
import formEdit from "@/common/form/formEdit.vue"
export default {
  name:"model",
  components:{  formEdit},
  data(){
    return {
      param:{
        roleId:'12'
      },
      functionId:4,
      type:"0",
      formEditData:[],//页面渲染值
      requestData:{},// 接口获取值
      iconList:[],
      getFormData:[]
    }
  },
   computed:{
     //   ...mapGetters(['getFormData'])
    },
  methods:{
   // ...mapActions(['setFormData']),
    getData(){
      console.log(this.requestData);
        this.formEditData.forEach((v,i)=>{
            this.requestData[v.name] = v.default;
        })
        console.log(this.requestData);
    },
    showModal(type){
      this.cModal.init(type,{title:"test",loading:trueo,content:"<p>this is test content</p>"},this.operate);
    },
    saveDialog(){//表单提交
      let param = this.$refs.formEdit.getParams();
      /*this.$http.post(this.requestUrl,this.param).then(function(data){
        console.log(data);
      }).catch(function(err){
        console.log(err);
      });*/
    },
    getIconList(){//获取icon列表
        /*this.$http.post(this.requestUrl,this.param).then(function(data){
          console.log(data);
          this.iconList = data.data;
        }).catch(function(err){
          console.log(err);
        });*/
        this.iconList = [
              {
                icon:'wiconfont wicon-home',
                selected:true
              },
              {
                icon:'wiconfont wicon-similar',
                selected:false
              },
              {
                icon:'wiconfont wicon-set',
                selected:false
              },
              {
                icon:'wiconfont wicon-wangluo',
                selected:false
              },
              {
                icon:'wiconfont wicon-xitongguanli',
                selected:false
              },
              {
                icon:'wiconfont wicon-menu-open',
                selected:false
              },
              {
                icon:'wiconfont wicon-edit-password',
                selected:false
              },
              {
                icon:'wiconfont wicon-add_user',
                selected:false
              },
              {
                icon:'wiconfont wicon-quanxian' ,
                selected:false
              }
          ];
    },
    getDialogData(){//
        /*this.$http.post(this.requestUrl,this.param).then(function(data){
        console.log(data);
        this.requestData = data.data;
      }).catch(function(err){
        console.log(err);
      });*/
    }
  },
  mounted(){
     this.$http.post('/static/api/formEditData').then(function(data){
        console.log(data);
        this.requestData = data.data;
      }).catch(function(err){
        console.log(err);
      });
   // this.setFormData();
    // this.$nextTick(() => {
        //let functionId = this.$route.param.functionId;
    setTimeout(()=>{
       this.formEditData = this.getFormData[this.functionId][this.type];
       console.log(this.getFormData);
       this.getData();
    },1000); // })
  }
}
</script>
