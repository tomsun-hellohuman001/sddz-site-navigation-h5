<template>
  <div>
    <div style="margin: 20px 15px;">
      <img src="../../assets/jb.png" style="width: 55%;">
    </div>
    <div class="m-content">
      <group>
      <x-input title="用户名" name="username" placeholder="请输入用户名" required v-model="username" label-width="80px;"/>
      </group>
      <group>
      <x-input title="密码" name="password" placeholder="请输入密码" required v-model="password" label-width="80px;"/>
      </group>


    </div>
    <x-button @click.native="submitFrom" type="primary" :show-loading="submitLoading">登录</x-button>


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
        username:'',
        password:'',
        submitLoading:false,
      }

    },
    methods:{
      submitFrom(){
        if(this.username == ''){
          this.$vux.toast.show({
            text: '请输入姓名',
            type:'warn',
            width:'30%'
          });
          return false;
        }
        if(this.password == ''){
          this.$vux.toast.show({
            text: '请输入密码',
            type:'warn',
            width:'30%'
          });
          return false;
        }

        this.submitLoading = true
        let data = {
          username:this.username,
          password:this.password,
        };
        this.ajax.MANAGER_LOGIN({
          data: data,
          showMsg: false,
        }).then(res => {
          let that = this;
          if(res.data.result && res.data.description == ''){
            that.submitLoading = false;
            //跳转页面
            setTimeout(function () {
              that.$router.push({name: 'managerAddWhite'});
            },"10");
          }else{
            that.submitLoading = false;
            that.$vux.toast.show({
              text: '用户名或密码错误',
              type: 'warn',
              width:'40%'
            });
          }

        }).catch(msg =>{
          that.$vux.toast.show({
            text: '提交失败',
            type: 'cancel',
            time: 2000
          });
          this.submitLoading = false
        })
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
