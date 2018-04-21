
/**
 * @author york  2018-04-13
 * @desc 对iview 提示信息再次封装
 * @param type:提示信息框类型 info/warning/success/confrim
 * @param obj{title:提示框的标题,content:提示框展示信 html文本／字符串／组件}
 * @param sure 对confirm确认框点击“确定”执行的方法
 * @return null
 */
 import iview from 'iview/dist/iview.min.js';
 export const cModal = {
     init(type,obj){
        let _self = iview;
        switch(type){
            case "info":
            _self.Modal.info(obj);
                break;
            case "success":
            _self.Modal.success(obj);
                break;
            case "warning":
            _self.Modal.warning(obj);
                break;
            case "error":
            _self.Modal.error(obj);
                break;
            case "confirm":
            _self.Modal.confirm(obj);
        }
     }
 }

 function install(Vue, options) {
    Vue.prototype.cModal = cModal;
  }
  export default install;
  