<template>
 <button  class="ivu-btn" type="Button"
  :class='[computedSize, computedShape, 
        computedType,computedLong]' @click="vclick" >
    <i class="ivu-icon" :class="computedIcon"></i>
   <span>{{ text }}</span>
 </button> 
</template>
 <script>
export default {
  name: "Button",
  props: {
    text: { type: String, default: "" },
    type: { type: String, default: "" },
    size: { type: String, default: "" },
    shape: { type: String, default: "" },
    loading: { type: Boolean, default: false },
    long: { type: Boolean, default: false },
    icon: { type: String, default: "" }
  },
  computed: {
    // 控制按钮的类型
    computedType: function() {
      return this.type ? `ivu-btn-${this.type}` : "";
    },
    // 控制按钮大小尺寸
    computedSize: function() {
      return this.size ? `ivu-btn-${this.size}` : "";
    },
    //控制长按钮
    computedLong: function() {
      return this.long === false ? "" : "ivu-btn-long";
    },
    // 控制按钮是否为加载状态
    computedLoading: function() {
      return this.loading === false ? "" : "ivu-btn-loading";
    },
    //控制按钮形状
    computedShape: function() {
      return this.shape ? `ivu-btn-${this.shape}` : "";
    },
    //设置按钮的图标类型
    computedIcon: function() {
      return this.icon ? `ivu-icon-${this.icon}` : "";
    }
  },
  methods: {
    vclick() {
      this.$emit("click"); // 触发 `click` 事件
    }
  }
};
</script>
 <style scoped>

</style> 