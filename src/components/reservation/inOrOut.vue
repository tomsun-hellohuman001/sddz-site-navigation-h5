<template>
  <div>
    <div style="margin: 20px 15px;">
      <img src="../../assets/jb.png" style="width: 55%;">
    </div>
    <div class="m-content">
      <load-more tip="目前园区内车辆数量" :show-loading="false" background-color="#fbf9fe"></load-more>
      <div style="margin-left: 25%">
        <tr v-for="site in list">
          <td>{{ site.goodsName }} </td>
          <td> {{ site.cars }} </td>

        </tr>
      </div>


    </div>
    <div style="text-align: center">
      <x-button style="width: 39%;float: left;margin-left: 7%" @click.native="submitFrom1" type="primary" :show-loading="submitLoading1" class="bstyle">确认进入</x-button>
      <x-button style="width: 39%;float: left;margin-left:10%;margin-top: 1px" @click.native="submitFrom2" type="primary" :show-loading="submitLoading2" class="bstyle">暂不进入</x-button>

    </div>

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
    created(){
      let that = this;
      this.ajax.DRIVER_IS_WAIT({data: {}
      }).then(res => {
        if(res.data.result && res.data.obj == null){
          // 跳转最终授权页面
          setTimeout(function () {
            that.$router.push({name: 'final'});
          },"10");
        }
      })

    },
    mounted(){
      var goodsType1 =  this.$route.params.goodsType;
      var goodsType2 = this.$route.query.goodsType2;
      this.goodsType = goodsType2;
      this.ajax.DRIVER_WAITCAR_BY_GOODS({data: {'goodsType':goodsType2}
      }).then(res => {
        if(res.data.result && res.data.obj.length >0){
          this.list = res.data.obj;
        }
      })
    },
    data() {
      return {
        submitLoading1:false,
        submitLoading2:false,
        list:[],
        goodsType:'',
      }

    },
    methods:{
      submitFrom1(){
        let that = this;
        this.submitLoading1 = true;
        this.ajax.DRIVER_CONFIRM_IN({data: {'goodsType':that.goodsType}
        }).then(res => {

        })
        setTimeout(function () {
          that.$router.push({name: 'routeIndication'});
        },"10");
      },
      submitFrom2(){
        this.submitLoading2 = true;
        let that2 = this;
        setTimeout(function () {
          that2.$router.push({name: 'register'});
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
  .bstyle{
    width: 220px;
  }
  td{
    width: 220px;
    font-size: 13px;
  }
</style>
<style scoped>
  .m-content{
    margin: 40px 0;
  }
</style>
