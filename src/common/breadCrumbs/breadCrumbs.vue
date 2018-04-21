<template>
    <div class="breadCrumbs" v-if="path">
        <div>
          <i class="wiconfont wicon-edit"></i>
          <span>组件</span>
          <b>	&gt;</b>
        </div>
    </div>
</template>

<script>
  import { mapGetters , mapActions } from 'vuex'
    export default {
      name: "breadCrumbs",
      props:{
        id:{
          type:Number,
          default:"",
        }
      },
      data(){
        return{
          items:[]
        }
      },
      computed: {
        ...mapGetters(['menuNav'])
      },
      mounted(){
        console.log(this.menuNav)
      }
    }
</script>
