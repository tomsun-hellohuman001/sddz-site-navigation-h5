<template>
  <div>
    <div style="margin: 20px 15px;">
      <img src="../../assets/jb.png" style="width: 55%;">
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
    created(){
      let that = this;
      this.ajax.DRIVER_IS_WAIT({data: {}
      }).then(res => {
        if(res.data.result && res.data.obj == null){
            // 跳转最终授权页面
          setTimeout(function () {
            that.$router.replace({name: 'final'});
          },"10");
        }else{
          setTimeout(function () {
            that.$router.replace({name: 'sorryPage'});
          },"10");
        }
      })


    },
    data() {
      return {
        submitLoading:false,
      }

    },
    methods:{

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
