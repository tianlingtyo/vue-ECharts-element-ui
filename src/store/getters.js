'use strict';

//用户基本信息
export const getUser = state => state.user;


//左侧功能导航
export const menuNav = state => state.menuNav;

//普通表格
export const tab = state => state.tab;
//树形表格
export const treeTab = state => state.treeTab;
//树形树数据
export const getListTree = state => state.tree.listTree;
//功能菜单树
export const getFunTree = state => state.tree.funTree;
export const getFormData = state => state.formData;
