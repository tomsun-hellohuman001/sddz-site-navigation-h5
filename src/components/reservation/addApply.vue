<template>
  <div>
    <div style="margin: 20px 15px;">
      <img src="../../assets/jb.png" style="width: 55%;">
    </div>
    <div class="m-content">
      <group>
      <x-input title="姓名" name="name" placeholder="请输入姓名" is-type="china-name" required v-model="name" label-width="80px;"/>
      </group>
      <group>
      <x-input title="手机号码" name="phone" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" required v-model="phone" label-width="80px;"/>
      </group>
      <group>
        <!--<selector :options="select" ></selector>-->
        <popup-picker title="车牌号" :data="select" v-model="value2" class="pickerStyle"/>
        <x-input  name="carNo" placeholder="" required v-model="carNo" label-width="80px;" class="carNoStyle"/>
      </group>
      <group>
        <datetime-range title="预约时间" :start-date="start" :end-date="end" placeholder="请选择日期" v-model="dateValue" />
      </group>
      <div style="text-align: center;margin-top: 25px;font-size: 15px;">
      预约咨询电话: <a href="tel:0543-2877453"> 0543-2877453</a>
      </div>




    </div>
    <x-button @click.native="submitFrom" type="primary" :show-loading="submitLoading">提交</x-button>


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
        select:[['京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '桂', '琼',
          '渝', '川', '黔', '滇', '藏', '陕', '甘', '青', '宁', '新', '台', '港', '澳'],
          ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']],
        value2:['鲁', 'M'],
        name:'',
        phone:'',
        carNo:'',
        submitLoading:false,
        end: ((parseInt(dateFormat(new Date(), 'YYYY')))+ 1)+ '-' + dateFormat(new Date(), 'MM-DD'),
        start:dateFormat(new Date(), 'YYYY-MM-DD'),
        dateValue:[dateFormat(new Date(), 'YYYY-MM-DD'),dateFormat(new Date(), 'MM'),dateFormat(new Date(), 'DD')]
      }

    },
    methods:{
      submitFrom(){
        if(this.name == ''){
          this.$vux.toast.show({
            text: '请输入姓名',
            type:'text'
          });
          return false;
        }
        if(this.phone == ''){
          this.$vux.toast.show({
            text: '请输入手机号',
            type:'text'
          });
          return false;
        }
        if(this.carNo == ''){
          this.$vux.toast.show({
            text: '请补全完整车牌号',
            type:'text'
          });
          return false;
        }
        this.submitLoading = true
        let data = {
          name:this.name,
          phone:this.phone,
          carNo:this.value2[0]+this.value2[1]+this.carNo,
          applyTime:this.dateValue[0]+' '+this.dateValue[1]+':'+ this.dateValue[1] +':00'
        };
        this.ajax.INSERT_CAR_APPLY({
          data: data,
          showMsg: false,
        }).then(res => {
          let that = this;
          if(res.data.obj){
            that.submitLoading = false;
            // 显示
            that.$vux.toast.show({
              text: '预约成功',
              type: 'success',
              time: 2000
            });
            setTimeout(function () {
              that.$router.push({name: 'carHome'});
            },"2000");
          }else{
            that.submitLoading = false
            that.$vux.toast.show({
              text: '提交失败 CODE:500',
              type: 'cancel',
              time: 2000
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
