<template>
  <div>
      <form-transfer ref="transfer" :userType="1" :transferList ="seletedData" v-on:changeselectData="getUserData"></form-transfer>
      <form-transfer ref="transfer" :userType="0" :transferList ="unseletedData" v-on:changeUnselectData="getUserData"></form-transfer>
  </div>
</template>
<style>
    body{background:#fff;}
</style>
<script>
import formTransfer from "@/common/form/formTransfer.vue"
export default {
    components:{formTransfer},
    data(){
        return {
            seletedData:[
              {
                  "userId":1,
                  "orgId":1,
                  "userName":"张三"
              },
              {
                  "userId":2,
                  "orgId":2,
                  "userName":"张三"
              },
              {
                  "userId":3,
                  "orgId":3,
                  "userName":"张三"
              },
              {
                  "userId":4,
                  "orgId":4,
                  "userName":"张三"
              }
          ],
          unseletedData:[
              {
                  "userId":1,
                  "orgId":1,
                  "userName":"张三1"
              },
              {
                  "userId":2,
                  "orgId":2,
                  "userName":"张三1"
              },
              {
                  "userId":3,
                  "orgId":3,
                  "userName":"张三1"
              },
          ]
        }
    },
    methods:{
        getUserData(data){
            if(data.type ===0){
                this.seletedData.push((this.unseletedData.splice(data.key,1))[0]);
                //this.$refs.transfer.add(data.deleData);
            }else{
                this.unseletedData.push((this.seletedData.splice(data.key,1))[0]);
            }
        }
    }
}
</script>

<style>

</style>
