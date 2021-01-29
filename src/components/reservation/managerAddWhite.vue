<template>
  <div>
    <div style="margin: 20px 15px;">
      <img src="../../assets/jb.png" style="width: 55%;">
    </div>
    <div class="m-content">
      <div style="width:100%;float: left">
        <div style="float: left;width: 55%">
          <group>
            <x-input title="车牌号:" name="carno" placeholder="输入车牌号" required v-model="carno" label-width="90px;"/>
          </group>
        </div>
        <div style="float: left;width: 45%">
          <!--<group>
            <selector placeholder="请选择类型" v-model="demo01" title="类型" name="district" :options="list2"></selector>
          </group>-->
          <group>
            <selector placeholder="选择类型" title="类型:" v-model="key" :options="list2"></selector>
          </group>
        </div>
      </div>
      <div style="float: left;width:100%">
        <group>
          <x-button  @click.native="submitFrom" type="primary" :show-loading="submitLoading" class="bstyle">添加车辆</x-button>
        </group>
      </div>


      <div style="margin-left: 5%;margin-top: 25px ">
        <tr>
          <td>车牌号</td>
          <td>有效期</td>
        </tr>
        <tr v-for="site in list">
          <td>{{ site.carNo }} </td>
          <td> {{ site.validTime }} </td>

        </tr>
      </div>


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
      this.ajax.DRIVER_ALL_WHITE({data: {}
      }).then(res => {
        if(res.data.result && res.data.obj.length >0){
            this.list = res.data.obj;
        }
      })
    },
    data() {
      return {
        submitLoading:false,
        list:[],
        carno:'',
        list2: [{key: '1', value: '送货'}, {key: '2', value: '提货'}],
        demo01: null,
        demo02: '',
        key:'1',
      }

    },
    methods:{
      submitFrom(){
        if(this.carno == ''){
          this.$vux.toast.show({
            text: '请输入车牌号',
            type:'warn',
            width:'30%',
          });
          return false;
        }
        this.submitLoading = true
        let that = this;
        this.ajax.MANAGER_ADD_WHITE({data: {'deliveryType':this.key,'carNo':this.carno}
        }).then(res => {
          this.$router.go(0)
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

  td{
    width: 48%;
    font-size: 14px;
    text-align: center;
  }
  .bstyle{
    width: 300px;
  }
</style>
<style scoped>
  .m-content{
    margin: 40px 0;
  }
</style>
