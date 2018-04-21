
var obj={
  message:'',
  success:'',
};
let reg='';
export const validate = {
  method:(val,reg,message1,message2)=>{
    if(val===""){
      obj.message=message1;
      obj.success=false;
    }
    else{
      if(reg===""){
        obj.message='';
        obj.success=true;
      }
      else{
        if(reg.test(val)){
          obj.message='';
          obj.success=true;
        }
        else{
          obj.message=message2;
          obj.success=false;
        }
      }
    }
  },
  prompt:()=>{
    return {
      message:obj.message,
      success:obj.success
    };
  },
  require:(key,val)=>{
    switch(key){
      case 0://用户名
        reg =/^[A-Za-z0-9]+$/;
        validate.method(val,reg,"用户名不能为空","用户名格式错误，请重新输入");
        break;
      case 1://密码
         reg=/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,20}$/;
        validate.method(val,reg,"密码不能为空","必须满足字母、数字、特殊字符三项中有两项组合");
        break;
      case 2://验证码
        validate.method(val,'',"验证码不能为空","");
        break;
    }
    return validate.prompt()
  }
};
function install(Vue, options) {
  Vue.prototype.validate = validate;
}
export default install;
