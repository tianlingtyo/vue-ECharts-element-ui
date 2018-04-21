import chartLine from "@/common/charts/line.vue"
import treeGrid from "@/common/table/treeGrid.vue"
import ordinaryTable from "@/common/table/ordTable.vue"
import operationItem from "@/common/operation/operationItem.vue"
import ctitleUnderline from "@/common/title/underline.vue"
import breadCrumbs from "@/common/breadCrumbs/breadCrumbs.vue"


import {Icon,Row,Col,Button,Menu,Submenu,MenuItem,Page,Slider,Tree,Modal,Message,Form,Input,Select,FormItem,Upload} from 'iview';
const components = {
  chartLine,
  ordinaryTable,
  operationItem,
  ctitleUnderline,
  breadCrumbs,
  treeGrid,
  Icon,
  Row,
  Col,
  Button,
  Menu,
  Submenu,
  MenuItem,
  Page,
  Slider,
  Tree,
  Modal,
  Form,
  Input,
  Select,
  FormItem,
  Upload
};
const install=function (Vue,options) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};
export default install;
