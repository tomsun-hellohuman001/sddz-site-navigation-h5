<template>
  <div>
    <div style="margin: 20px 15px;">
      <img src="../../assets/jb.png" style="width: 55%;">
    </div>
    <div class="m-content">
      <div style="margin-top: 80px">
        <h1 style="font-size: 50px;text-align: center">很抱歉</h1>
      </div>
      <div style="margin-top: 40px;padding: 16px">
        <h2 style="font-size: 25px;text-align: center">您未在排队队列中</h2>
      </div>

      <div style="margin-top: 30px;padding: 16px">
        <h3 style="font-size: 20px;text-align: center">请前往门岗进行扫码登记</h3>
      </div>

    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { dateFormat ,GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, XAddress, XTextarea, XSwitch, DatetimeRange,XButton,ToastPlugin ,Divider } from 'vux'
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
      XSwitch,DatetimeRange,XButton,Divider
    },
    data() {
      return {
        submitLoading:false
      }

    },
    methods:{
      submitFrom(){
        let that = this;
        setTimeout(function () {
          that.$router.push({name: 'register'});
        },"10");
      }
    },
        name: "add-apply"
    }
</script>
<style type="text/css" lang="less">
  .weui-cell__hd{
    width: 85px;
  }
  .pickerStyle{
    .weui-cell{
      float: left;
      border-right: 1px solid #D9D9D9;
    }
  }
  .carNoStyle{
    .weui-cell__hd{
      width: 0;
    }
  }
</style>
<style scoped>
  .m-content{
    margin: 40px 0;
  }
</style>
