<template>
  <Form  id="roleEdit" :label-width="80" @submit.native.prevent>
        <input v-if="param.roleId" type="hidden" id="orgId" name="orgId" v-model="param.roleId"/>
        <FormItem :label="val.label+':'" v-for="(val,key) of FormItem" :key="key" >
            <Input 
             v-if="val.type ==='input'"
             :maxlength=60 
             :clearable=true 
             v-model=formData[val.name] 
             :id="val.name" 
             :name="val.name" 
             on-blur=""
             :placeholder="val.placeholder" /></Input>
            <Select 
                v-model=formData[val.name]  
                v-else-if="val.type === 'select'" 
                :id="val.name" 
                :name="val.name" >
                <Option  v-for="item in val.default" :key="item.val" :value="item.val">{{item.text}}</Option>
            </Select>                                                                                                                                                                                                                                                                               
            <Input 
                v-else-if ="val.type ==='textarea'"  
                v-model=formData[val.name]  
                :id="val.name" 
                :name="val.name" 
                :autosize = "{minRows: 2,maxRows: 5}" 
                :placeholder="val.placeholder"
                type="textarea"></Input>
         </FormItem>
  </Form>
</template>
<script>
//接收s-functionId
export default {
    name:"orgEdit",
    props:{
        param:{
            type:Object,
            default:()=>{
                return {
                    roleId:""
                }
            }
        },
        requestUrl:{
            type:String,
            default:""
        }},
    data(){
        return{
            formData:{
                roleName:"",
                roleType:2,
            },
            FormItem:[
                {
                    label:'角色名称',
                    type:"input",
                    name:"roleName",
                    placeholder:"请输入角色名称"
                },
                {
                    label:"角色类型",
                    type:"select",
                    name:"roleType",
                    default:[
                        {
                            val:1,
                            text:"管理角色"
                        },
                        {
                            val:2,
                            text:"普通角色"
                        }
                    ]
                }
            ]
        }
    },
    methods:{
        getParams(){//获取表单数据
            this.valid();
            return this.formData;
        },
        valid(){//验证
            return;
        },
        renderData(data){//渲染
            for(let i in this.formData){
                this.formData[i] = data[i];
            }
        }
    },
    mounted(){
        if(this.param){
            //请求获取数据
            this.$http.post(this.requestUrl,this.param).then(function(data){
                console.log(data);
            }).catch(function(err){
                console.log(err);
            });
        }
    }
}
</script>

