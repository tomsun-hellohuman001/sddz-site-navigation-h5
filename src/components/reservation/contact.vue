<template>
  <div>
    <div style="margin: 20px 15px;">
      <img src="../../assets/jb.png" style="width: 55%;">
    </div>
  <div style="text-align: center;margin: 40px 0;">
    <table style=" margin: auto;
    width: 80%;
    font-size: 18px;border-collapse:separate; border-spacing:0px 10px;">
      <tr v-for="item in dataList">
        <td>{{ item.contactName }}</td>
        <td><a :href="'tel:'+ item.contactPhone">{{ item.contactPhone }}</a></td>
      </tr>
    </table>
  </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        dataList:[]
      }
    },
    methods:{

    },
    mounted(){
      this.ajax.WX_GET_CONTACT_DATA({data: {}, showMsg: false
              }).then(res => {
                if(res.data.result){
                  this.dataList = res.data.obj
                  console.log(res.data)
                  console.log(this.dataList);
                }
              })
    },
    name: "contact"
  }
</script>

<style scoped>

</style>
