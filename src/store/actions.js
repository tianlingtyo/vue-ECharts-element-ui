'use strict';
import qs from 'qs';
import axios from 'axios'
import { $http } from '../$http'

var Mock = require('mockjs');


export const getData = ({commit, state}) => {
  $http.post("mk/index/v1/student").then(function(data){
    commit("getData",data)
  }).catch(function(err){
    console.log(err);
  });
};
//登录
export const  login=({commit,state},{userAccount,userPwd,authorizeCode})=>{
  $http.post("login/userLogin",{userAccount:userAccount,userPwd:userPwd,authorizeCode:authorizeCode}).then(function (res) {
    commit("login",res.data);
  }).catch(function (err) {
    console.log(err);
  });
};
//退出登录
export const  loginOut=({commit,state})=>{
  let  data={accessToken:false,account:"",pwd:""};
  commit("loginOut",data);
};



//获取左侧导航数据
export const setMenu = ({commit, state}) => {
  if(state.menuNav.length>0){
    return ;
  }
  $http.post("sysFunction/getPermFunctionTree").then(function (res) {
    console.log(res);
    commit('setMenu',res.data)
  }).catch(function (err) {
    console.log(err);
  })
};

//获取表格数据
export const getDataTab =({commit, state}) => {
  axios.get("static/api/aa.json").then(function (data) {
       let datas=data.data;
      commit('getDataTab',datas)

  }).catch(function (err) {
    console.log(err);
  })
};
//设置当前表格数据
export const setCurrentData =({commit, state},data) => {
    commit("setCurrentData",data)
};

//获取表格树数据
export const getTreeTab =({commit, state},functionId) => {
  if(state.treeTab.itemData.length===0){
    axios.get("static/api/treeTab.json").then(function (success) {
      let data=success.data;
      commit('getTreeTab',data)

    }).catch(function (err) {
      console.log(err);
    })
  }
  else{
    axios.get("static/api/treeTaba.json").then(function (success) {
      let data={
        newData:success.data,
        functionId:functionId,
      };
      commit('getTreeTab',data)
    }).catch(function (err) {
      console.log(err);
    })
  }
};


//获取树结构
export const setListTree = ({commit, state},param)=>{//param:{requestUrl:,type:fun|list,data:{请求参数}}
  $http.post(param.requestUrl,param.data).then(function (res) {
    if(param.type === "list"){
       commit('setListTree',res.data);
    }else{
       commit('setFunTree',res.data);
    }
  }).catch(function (err) {
     console.log(err);
  })
};
//获取表单渲染
export const setFormData = ({commit, state}) => {
  treeFunction.json
};
