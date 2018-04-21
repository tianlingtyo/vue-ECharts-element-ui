import qs from 'qs';
import axios from 'axios'
import { Message } from 'iview';

var SERVER_URL='/api/';
//全局错误处理Map
var GLOBAL_ERROR_MAP = {
    "0":{
      msg:"登录失败",
      process:function(){
        window.location.href= SERVER_URL+ "#/login";
      }
    },
    "-1":{
      msg:"程序异常。",
      process:function(){
        window.location.href= SERVER_URL+ "#/login";
      }
    },
    "-2":{
      msg:"没有该地址。",
      process:function () {
        window.location.href= SERVER_URL+ "#/login";
      }
    },
    401:{
      msg:"你还没有登录，请登录后再操作。",
      process:function(){
        window.location.href= SERVER_URL+ "#/login";
      }
    },


};
export const $http = {
	post: function(url,params) {
		return new Promise(function (resolve,reject) {
			axios.post(SERVER_URL+url,qs.stringify(params))
			.then(function(resp) {
        oSuccess(resp,resolve,reject)
			}).catch(function(error) {
        console.log(error)
      });
		});
	},
	get: function(url,params) {
		return new Promise(function (resolve,reject) {
      axios.get(SERVER_URL+url,qs.stringify(params))
			.then(function(resp) {
        oSuccess(resp,resolve,reject);
			}).catch(function(error) {
          console.log(error)
			});
		});
	},
};
//请求成功
function oSuccess(resp,resolve,reject) {
  //非正常响应
  if(resp.status != 200) {
    let errorProcess = GLOBAL_ERROR_MAP[resp.status];
    Message.error(errorProcess.msg);
    reject(false,errorProcess.msg);

  }
  if(resp.data.status===1){
    resolve(resp.data);
  }
  else{
    let errorProcess = GLOBAL_ERROR_MAP[resp.data.status];
    Message.error(errorProcess.msg);
   /* setTimeout(()=>{
      window.location.reload();
    },1000);*/
  }
}
//请求失败
function oFail(error) {

}
function install(Vue, options) {
  Vue.prototype.$http = $http;
}
export default install;
