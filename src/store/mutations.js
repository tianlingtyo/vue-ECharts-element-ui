'use strict';



export const getData = (state,data) => {
    state.index.success=data.success;
};


//登录
export const login=(stae,data)=>{
  stae.user.data=data;
  sessionStorage.setItem("accessToken",JSON.stringify(data));
  window.location.href= "http://localhost:8888/#/home"

};
//退出登录
export const loginOut=(stae,data)=>{
  sessionStorage.setItem("accessToken", "");
};


//获取左侧导航数据
export const setMenu=(stae,data)=>{
  stae.menuNav=data;
};

//设置列表数据
export const getDataTab=(stae,data)=>{
  stae.tab.itemData=data;
};
//设置当前表格数据
export const setCurrentData=(stae,data)=>{
  stae.tab.currentData=data
};

//设置表格树数据
export const getTreeTab=(stae,data)=>{
  if(stae.treeTab.itemData.length===0){
    stae.treeTab.itemData=data;
  }
  else{
    stae.treeTab.itemData.forEach((item, index)=>{
      if(item.functionId===data.functionId){
        if(item.children.length>0){
          item.children.forEach((childrenItem,childrenIndex)=>{
            data.newData.forEach((newItem,newIndex)=>{
              if(childrenItem.functionId != newItem.functionId){
                item.children.$set(newItem);
              }
            })
          })
        }
        else{
          data.newData.forEach((newItem,newIndex)=>{
              item.children.push(newItem);
          })
        }
      }
    });
    return stae.tab.itemData
  }
};



//设置机构树信息
export const setListTree=(stae,data)=>{
  stae.tree.listTree=data;
};
//设置功能树信息
export const setFunTree=(stae,data)=>{
  stae.tree.funTree=data;
};
// //设置表单数据
export const setFormData = ( stae , data ) => {
  console.log(data);
  stae.formData = data;
}
