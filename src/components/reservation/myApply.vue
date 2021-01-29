<template>
  <div style="margin: 20px 15px;">
    <img src="../../assets/jb.png" style="width: 55%;">
    <div style="text-align: center;margin: 40px 0;">
      <!--<table cellspacing="0" cellpadding="0" style="margin: auto;-->
             <!--width: 100%;-->
             <!--font-size: 18px; border-collapse:separate; border-spacing:0px 10px;" >-->
        <!--<thead>-->
           <!--<th>车牌号</th>-->
           <!--<th>预约时间</th>-->
        <!--</thead>-->
        <!--<tbody>-->
          <!--<tr v-for="item in dataList" style="margin-top: 10px;">-->
            <!--<td>{{ item.carNo }}</td>-->
            <!--<td>{{ item.applyTime }}</td>-->
          <!--</tr>-->
        <!--</tbody>-->

      <!--</table>-->
      <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
        <thead>
        <tr style="background-color: #F7F7F7">
          <th>手机号</th>
          <th>车牌号</th>
          <th>预约时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in dataList">
          <td>{{ item.phone }}</td>
          <td>{{ item.carNo }}</td>
          <td>{{ item.applyTime }}</td>
        </tr>
        </tbody>
      </x-table>
    </div>
  </div>

</template>

<script>
  import { XTable, LoadMore } from 'vux'
    export default {
      components: {
        XTable,
        LoadMore
      },
      data(){
        return {
          dataList:[]
        }
      },
      methods:{

      },
      mounted(){
        this.ajax.WX_GET_APPLY_DATA({data: {}, showMsg: false
        }).then(res => {
          if(res.data.result){
            this.dataList = res.data.obj
            console.log(res.data)
            console.log(this.dataList);
          }
        })
      },
        name: "my-apply"
    }
</script>

<style scoped>

</style>
