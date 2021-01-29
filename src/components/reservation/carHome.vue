<template>
  <div>
    <div style="margin: 20px 15px;">
      <img src="../../assets/jb.png" style="width: 55%;">
    </div>
    <grid :show-lr-borders="false" :cols="1">
      <grid-item label="审车流程" link="/process">
        <img slot="icon" src="../../assets/images/list.png">
      </grid-item>
      <grid-item label="预约审车" link="/addApply">
        <img slot="icon" src="../../assets/edit.png">
      </grid-item>
      <grid-item label="一键导航" @click.native="openLocation">
        <img slot="icon" src="../../assets/images/hd.png">
      </grid-item>
      <grid-item label="我的预约" link="/myApply">
        <img slot="icon" src="../../assets/mine.png" >
      </grid-item>
      <grid-item label="联系我们" link="/contact">
        <img slot="icon" src="../../assets/pinglun.png" >
      </grid-item>
    </grid>

  </div>
</template>

<script>
  import { Grid, GridItem } from 'vux'

  export default {

    components: {
      Grid,
      GridItem
    },
    data() {
      return{
        demo02_list:[],
        openId: '',
        baseUrl:'',
      }
    },
    created() {
      //session获取openId
      let url = window.location.href
      this.baseUrl = url.split('index.html')[0];
      console.log(this.baseUrl)
      this.ajax.WX_OPEN_ID_EXIST({data: {state:url}, showMsg: false
        }).then(res => {
          if(res.data.obj){
            this.openId = res.data.obj
          }else{
            this.goApply()
          }
        })
    },
    methods: {

      goApply(){
        window.location.href = (this.baseUrl + '/wechat/mall/index');
      },
      openLocation () {
        wx.openLocation({
          latitude: parseFloat('37.148020'),
          longitude: parseFloat('118.211582'),
          name: '滨州京博检测',
          address: '山东省滨州市博兴县山东京博云商物流有限公司南',
          scale: 15,
          infoUrl: '',
        });
      },
    },

  }
</script>

<style scoped>


</style>
<style type="text/css" lang="less">
  .weui-grids{
    top: 30px;
    left: 0;
    .weui-grid{
      padding: 10px 10px;
    }
    .weui-grid__label{
      font-size: 16px;
      /*margin: 10px auto;*/
    }
    .weui-grid__icon{
      width: 26px;
      height: 26px;
      /*margin: 10px auto;*/
    }
  }
  </style>
