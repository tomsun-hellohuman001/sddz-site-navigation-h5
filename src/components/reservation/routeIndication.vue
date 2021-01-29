<template>
  <div>
    <div style="margin: 20px 15px;">
      <img src="../../assets/jb.png" style="width: 55%;">
    </div>
    <img src="../../assets/images/zhishitu.png" style="width: 100%;"/>

    <x-button @click.native="submitFrom1" type="primary" :show-loading="submitLoading">确认</x-button>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { dateFormat ,GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, XAddress, XTextarea, XSwitch, DatetimeRange,XButton,ToastPlugin ,Divider,XTable,LoadMore } from 'vux'
  Vue.use(ToastPlugin)
  export default {
    components: {
      Group,
      GroupTitle,
      Cell,
      XInput,
      Selector,
      PopupPicker,
      XAddress,
      Datetime,
      XNumber,
      XTextarea,
      XTable,LoadMore,
      XSwitch,DatetimeRange,XButton,Divider
    },

    data() {
      return {
        submitLoading:false
      }

    },
    methods:{
      submitFrom1(){
        let that = this;
        setTimeout(function () {
          that.$router.push({name: 'final'});
        },"10");
      }
    },
    name: "add-apply"
  }
</script>

<style scoped>

</style>
