<template>
  <div>
    <div style="margin: 20px 15px;">
      <img src="../../assets/jb.png" style="width: 55%;">
    </div>
    <div class="m-content">

    <!--  <group title="选择货物类型">
          <radio :selected-label-style="{color: '#FF9900'}" :options="radio001" v-model="radio001Value" @on-change="change"></radio>
      </group>-->

<!--      <group title="选择货物类型">
        <radio :options="radio001">
          <template slot-scope="props" slot="each-item">
            <p>
              {{ jc[props.index] }} &#45;&#45;   {{ props.label }}
            </p>
          </template>
        </radio>
      </group>-->

      <group title="选择货物类型">
        <radio :options="radio003" @on-change="change" v-model="key"></radio>
      </group>

    </div>
    <x-button @click.native="submitFrom" type="primary" :show-loading="submitLoading">提交</x-button>


  </div>
</template>

<script>
  import Vue from 'vue'
  import { dateFormat ,GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, XAddress, XTextarea, XSwitch, DatetimeRange,XButton,ToastPlugin ,Divider,Radio } from 'vux'
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
      XSwitch,DatetimeRange,XButton,Divider,Radio
    },
    data() {
      return {
        submitLoading:false,
        key:'A',
        radio001: [ '热轧钢卷', '冷轧钢卷', '锌锭', '催化剂', '其他'],
        jc:['A','B','C','D','E',],
        radio001Value: '热轧钢卷',
        radio003: [{

          key: 'A',
          value: 'A   热轧钢卷'
        }, {
          key: 'B',
          value: 'B   冷轧钢卷'
        },
          {
            key: 'C',
            value: 'C   锌锭'
          },
          {
            key: 'D',
            value: 'D   催化剂'
          },
          {
            key: 'E',
            value: 'E   其他'
          },

        ]

      }

    },
    methods:{
      change (value, label) {
        // console.log('change:', value, label);
      },
      submitFrom(){

        // console.log(this.key)

       /* if(this.radio001Value == ''){
          this.$vux.toast.show({
            text: '请选择运载货物类型',
            type:'text'
          });
          return false;
        }
        this.submitLoading = true
        this.ajax.DRIVER_CONFIRM_GOODS({
          data: {"goodsType":this.key},
        }).then(res => {
          let that = this;
          if(res.data.obj){
            that.submitLoading = false;
            // 显示
            that.$vux.toast.show({
              text: '提交成功',
              type: 'success',
              time: 2000
            });
            setTimeout(function () {
              that.$router.push({name: 'inOrOut'});
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
        })*/
        this.submitLoading = true
        let that = this;
        setTimeout(function () {
          that.$router.push({
            name: 'inOrOut',
            query: { goodsType2: that.key },
            params:{goodsType:that.key}
          });
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
