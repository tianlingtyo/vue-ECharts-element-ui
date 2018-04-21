<!--
@author:york
@date:2018-04-16
@function :本组件基于iview的tree组件进行二次封装，做了自定义调整
-->
<style lang="less" >
    .c-tree-content{
        width:calc(100% - 10px);
        margin-right:10px;
        padding-top:20px;
        background:#fff;
        height:100%;
        overflow-y: auto;
    }
    .ivu-tree{
        margin-left:30px;       
        li{
            position:relative;
            .ivu-checkbox-wrapper{
                position:relative;
                top:2px;
            }
            .ivu-tree-arrow{
                position: relative;
                top: 4px;
                .ivu-icon-arrow-right-b:before{
                    font-family:"wiconfont" !important;
                    font-size:16px;
                    font-style:normal;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    content:"\e620"!important;
                }
            }
            .ivu-tree-arrow.ivu-tree-arrow-open{
                .ivu-icon-arrow-right-b:before{
                    content:"\e621"!important;
                    transform:rotate(90deg);
                }
                i.ivu-icon {
                    transform: rotate(180deg);
                }
            }
             .ivu-tree-arrow.ivu-tree-arrow-open+label+.ivu-tree-title .wiconfont.wicon-folder:before{
               content:"\e613"
             }
        }
        li:before{
            border-left: 1px dashed #999;
            bottom: 50px;
            height: 100%;
            top: -15px;
            width: 1px;
        }
        li:after{
            border-top: 1px dashed #999;
            height: 20px;
            top: 11px;
            width: 13px;
        }
        li:before,li:after{
            content: "";
            left: -11px;
            position: absolute;
            right: auto;
            border-width: 1px;
        }
    }
    

   
</style>
<template>
    <div class="c-tree-content">
        <Tree ref="tree" :data = "rootData"   :show-checkbox="isShowCheck" multiple :load-data="loadData"></Tree>
    </div>
</template>
<script>

export default {
  props:{
      isShowCheck:{
          type:Boolean,
          default:false
      },
      data:{
          type:Array,
          default:[]
      }
  },
  data(){
      return {
          select:false,
          listData:[],
          rootData:[],
          change :false
      }
  },
  watch:{
      data(){
          this.getDeepData()
      }
  },
  methods:{
    loadData(item,callback){
        let id = (item.orgId || item.orgId ==0) ? item.orgId : 
            (item.functionId || item.functionId == 0) ? item.functionId :0;
        if(this.listData[id]){
            callback(this.listData[id]);
        }
    },
    getDeepData(){
        let list = [];
        let _self = this;
        this.data.forEach((v,i) =>{
            v.title = v.orgName || v.functionName;
            let icons = false;
            if(v.orgLeafNode !=1){
            v.loading=false;
            v.children = [];
            icons = true;// 子节点
            }else{
            v.expand=true;
            }
            v.render = function(h,{root,node,data}){
                return h('span',{
                style:{
                    cursor:'pointer'
                },
                class:{
                    "ivu-tree-title":true,
                    "ivu-tree-title-selected":_self.select
                },
                on:{
                    click:function(){
                     //node.node.selected = node.node.selected ? false: true;
                    //_self.change = node.node.selected;
                    //_self.select = _self.select ? false :true;
                    _self.getSelectedNodes(data);
                    //this.$set('currentOrg',data);
                    //this.saveCurrentOrg(data);
                    }
                }
                },[
                h('span',[
                    h('i',{
                    class:{
                        "wiconfont wicon-folder":icons,
                        "wiconfont wicon-file":!icons,
                    },
                    style:{
                        dispaly:"inline-block",
                        marginRight:'5px'
                    }
                    })
                ]),
                h('span',data.title)
                ])
            };
            if(v.orgType == '-1'){
                list['-1']=[];
                list['-1'].push(v);
            return;
            }
            if(v.parentOrgId != undefined && !list[v.parentOrgId]){
                list[v.parentOrgId]=[];
            }
            list[v.parentOrgId].push(v);
        });
        if(!list["-1"]){
        list["-1"] = list[0];
        }
        
        this.rootData = list["-1"];
        this.listData = list;

    },
    getSelectedNodes(data){//获取当前选中地市信息，并提交给父组件
         this.$emit('changeOrg',data);
    },
    getSelectedOrg(){//获取选中地市信息
        this.$refs.tree.getSelectedNodes();
    }
  },
  created(){
    
  }
}
</script>


