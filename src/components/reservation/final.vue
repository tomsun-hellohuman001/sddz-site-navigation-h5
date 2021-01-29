<template>
  <div>
    <div style="margin: 20px 15px;">
      <img src="../../assets/jb.png" style="width: 55%;">
    </div>
    <div class="m-content">
      <div>
        <span>您的编号: {{ no }}</span>
      </div>
      <div>
        <span>您前面有 {{ carts }} 辆 <span style="margin-left: 0px;font-size: 20px;font-weight: bold"> {{ goodsName }} </span> 车在等候</span>

      </div>

      <div>
        <span>您前面排队车辆总数为 {{ sumCarts }} 辆</span>

      </div>
      <div style="margin-top: 80px">
        <h1 style="text-align: center">已授权进入</h1>
      </div>
      <div style="margin-top: 20px">
        <span style="margin-left: 27%">{{ intime }}</span>
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
    created(){
      this.ajax.DRIVER_FINAL_MESSAGE({data: {}
      }).then(res => {
        if(res.data.result && res.data.obj){
            this.no = res.data.obj.no;
          this.carts = res.data.obj.carts;
          this.goodsName = res.data.obj.goodsName;
          this.sumCarts = res.data.obj.sumCarts;
          this.intime = res.data.obj.intime;
        }
      })

     if(this.timer){
       clearInterval(this.timer)
     }else{
       this.timer = setInterval(()=>{
         this.ajax.DRIVER_FINAL_MESSAGE({data: {}
         }).then(res => {
           if(res.data.result && res.data.obj){
             this.no = res.data.obj.no;
             this.carts = res.data.obj.carts;
             this.goodsName = res.data.obj.goodsName;
             this.sumCarts = res.data.obj.sumCarts;
             this.intime = res.data.obj.intime;
           }
         })
       },60000)
     }

    },
    destroyed(){
        clearInterval(this.timer);
    },
    data() {
      return {
          no:'',
          carts:'0',
          goodsName:'',
          sumCarts:'0',
          intime:''
      }

    },
    methods:{
      submitFrom(){
        setTimeout(function () {
          that.$router.push({name: 'selectGoodsType'});
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
  span{
    margin-left: 16%;
    margin-top: 150px;
    font-size: 19px;
  }
</style>
