<style lang="less">
    .ivu-upload{
        text-align:center;
         .ivu-upload-select{
            text-align:center;
            width: 102px;
            height: 102px;
            border: 1px dashed #ddd;
            overflow: hidden;
        }
    }
    #form {
        padding:30px 10px 10px 10px;
    }
</style>
<template>
  <Form  id="form" ref="form" :label-width="80" @submit.native.prevent >
       <FormItem :label="val.label ? val.label+':' : ''" v-for="(val,key) of renderData" :key="key" >
            <Input 
             v-if="val.type ==='input'"
             :maxlength=60 
             :clearable=true 
             v-model=formData[val.name] 
             :id="val.name" 
             :name="val.name" 
             on-blur=""
             :rules = "val.rules"
             @on-change="getParams"
             :disabled = "val.disabled ? true : false"
             :placeholder="'请输入'+val.label" /></Input>
            <Select 
                v-model=formData[val.name]  
                v-else-if="val.type === 'select'" 
                :id="val.name" 
                @on-change="getParams(val.name)"
                :disabled = "val.disabled ? true : false"
                :name="val.name" >
                <Option  v-for="item in val.data" :key="item.val" :value="item.val">{{item.text}}</Option>
            </Select>                                                                                                                                                                                                                                                                               
            <Input 
                v-else-if ="val.type ==='textarea'"  
                v-model=formData[val.name]  
                :id="val.name" 
                :name="val.name" 
                @on-change="getParams"
                :disabled ="val.disabled ? true : false"
                :autosize = "{minRows: 2,maxRows: 5}" 
                :placeholder="'请输入'+val.label"
                type="textarea"></Input>
             <Upload 
                ref="upload" 
                :show-upload-list="false"
                v-else-if="(val.type==='upload')" 
                :format = "['jpg','jpeg','png','bmp']"
                :max-size = "2048"
                action = "//jsonplaceholder.typicode.com/posts/"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                @on-change="getParams"
                :on-success="handleSuccess"
                :accpet="val.accpet">
                <div style="width:100%;height:102px;text-align:center;">
                    <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%;">
                    <Icon v-else type="ios-cloud-upload" size="52" style="color: #3399ff;margin:25% 23%;" ></Icon>
                </div>
            </Upload>
            <cCarousel v-else-if=" val.name =='carousel'" ref="cCarousel" :iconList="iconList" :iconName = "requestData.iconName" v-on:changeName="getIconName"></cCarousel>  
         </FormItem>
  </Form>
</template>
<script>
import cCarousel from "@/common/carousel/carousel.vue"
//functionId:功能
//"2":[0:编辑子机构,1修改角色]组织机构,3:[0:修改|新增人员,1: 修改密码]人员管理，4:【0:新增子功能】,5:[0:新增|修改类型]
export default {
    name:"orgEdit",
    components:{cCarousel},
    props:{
        renderData:{//渲染数据源
            type:Array,
            default:[]
        },
        requestData:{
            type:Object,
            default:{}
        },
        iconList:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{
            visible:false,
            uploadList:[],
            formData:{},
            formValidate:{
                name:"",
                tel:"",
                mail:"",
                number:""
            },
            ruleValidate:{
                name:[
                    { required:true,message:"请输入内容",trigger:"blur"}
                ],
                tel:[
                    {required:false,message:"请输入手机号",trigger:"blur"}
                ]
            }
        }
    },
    watch:{
        requestData(){
            console.log(this.requestData);
            this.formData = this.requestData;
        },
        renderData(){
            console.log('渲染数据更改');
        }
    },
    methods:{
        valid(){//验证
            return;
        },
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleMaxSize(){
            this.cModal.init('warning',{title:"文件大小限制",loading:true,content:"文件太大，请选择2M以下文件！"});
        },
        handleFormatError(file){
            this.cModal.init('warning',{title:"文件类型错误",loading:true,content:"文件格式错误，请选择jpeg/jpg/bmp/png文件！"});
        },
        handleSuccess (res, file) {
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            this.handleView (file.name);
        },
        getIconName(data){//获取icon名字
            this.formData.iconName = data;
        },
        getParams(data){
            if(this.formData.iconName == "") {this.getIconName();}
            console.log(data,'1111111',this.formData);
            this.$emit('changeData',this.formData);
        }
    }
}
</script>

