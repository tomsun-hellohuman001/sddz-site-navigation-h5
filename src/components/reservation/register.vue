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
      <x-input title="电话" name="phone" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" required v-model="phone" label-width="80px;"/>
      </group>
      <group>
        <x-input title="身份证号" :max="18" :min="18" name="idcard" placeholder="请输入身份证号" required v-model="idcard" label-width="80px;"/>
      </group>

      <group>
        <!--<selector :options="select" ></selector>-->
        <popup-picker title="车牌号" :data="select" v-model="value2" class="pickerStyle"/>
        <x-input  name="carNo" placeholder="" required v-model="carNo" label-width="80px;" class="carNoStyle"/>
      </group>

    </div>
    <x-button @click.native="submitFrom" type="primary" :show-loading="submitLoading">提交</x-button>


  </div>

</template>

<i18n>
  show me code:
  zh-CN: 距离门岗超过1km.
</i18n>

<script>
  import Vue from 'vue'
  import gps from '../../util/gps';
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
        }
      })


    },
    mounted(){
      this.ajax.DRIVER_GETBYID({data: {}
      }).then(res => {
        if(res.data.result){
          this.name = res.data.obj[0].name,
            this.phone = res.data.obj[0].phone,
            this.carNo = res.data.obj[0].carNo.substr(2),
            this.idcard = res.data.obj[0].idcard,
            this.value2 = this.splitCarNumber(res.data.obj[0].carNo);
        }
      })
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
        idcard:'',
        submitLoading:false,
        end: ((parseInt(dateFormat(new Date(), 'YYYY')))+ 1)+ '-' + dateFormat(new Date(), 'MM-DD'),
        start:dateFormat(new Date(), 'YYYY-MM-DD'),
        dateValue:[dateFormat(new Date(), 'YYYY-MM-DD'),dateFormat(new Date(), 'MM'),dateFormat(new Date(), 'DD')],
        position:{},
        targetLocation:{lat:37.149624,lng:118.210788},
        //targetLocation:{lat:36.659491,lng:117.145960},
        distance:0,
      }

    },
    methods:{

      getPositionLocation(){
        let self = this;
          this.$wechat.getLocation({
            type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: (res) => {
              self.$store.commit({
                type: 'updatelocation',
                location: {lat: res.latitude, lng: res.longitude},
              });
              self.position = {lat: res.latitude, lng: res.longitude};
              console.log("location----"+JSON.stringify(self.position))
              //扫码距离校验
              var distance = (gps.distance(this.position, this.targetLocation)/1000).toFixed(2);
              if(isNaN(distance)){
                this.submitLoading = false;
                return false;
              }

              console.log("距离门岗距离------"+distance)

              if(distance >50){
                this.submitLoading = false;
                this.$vux.toast.show({
                  text: '请进入博兴县域后登记',
                  type:'warn',
                  width:'60%',
                })
                return false;
              }else{

                //跳转页面
                this.submitLoading = true
                let data = {
                  name:this.name,
                  phone:this.phone,
                  carNo:this.value2[0]+this.value2[1]+this.carNo,
                  idcard:this.idcard,
                };
                this.ajax.DRIVER_APPLY({

                  data: data,
                  showMsg: false,
                }).then(res => {
                  let that = this;
                  if(res.data.obj){
                    that.submitLoading = false;
                    //跳转页面
                    setTimeout(function () {
                      that.$router.push({name: 'clause'});
                    },"10");
                  }else{
                    that.submitLoading = false
                    setTimeout(function () {
                      that.$router.push({name: 'unapproved'});
                    },"10");
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
            error: (res) => {
              console.log("res-----------error------"+JSON.stringify(res))
              this.$vux.toast.show({
                text: '获取位置信息失败',
                type:'warn',
                width:'50%',
              })
              return false;
            },
            fail: (res) => {
              console.log("res-----------fail------"+JSON.stringify(res))
              this.$vux.toast.show({
                text: '获取位置信息失败',
                type:'warn',
                width:'50%',
              })
              return false;
            },
          })

      },

      splitCarNumber(data){
          var listsp = data.split('');
          return [listsp[0],listsp[1]];
      },

      submitFrom(){
        if(this.name == ''){
          this.$vux.toast.show({
            text: '请输入姓名',
            type:'warn',
            width:'50%'
          });
          return false;
        }
        if(this.phone == ''){
          this.$vux.toast.show({
            text: '请输入手机号',
            type:'warn',
            width:'50%'
          });
          return false;
        }
        if(this.idcard == ''){
          this.$vux.toast.show({
            text: '请输入身份证号',
            type:'warn',
            width:'50%'
          });
          return false;
        }
        if(this.carNo == ''){
          this.$vux.toast.show({
            text: '请补全完整车牌号',
            type:'warn',
            width:'50%'
          });
          return false;
        }
        //位置校验
        this.getPositionLocation();

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
